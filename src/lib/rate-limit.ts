import { ipAddress } from '@vercel/functions'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const WINDOW = '10 m'
let redis: Redis | undefined
const limiters = new Map<string, Ratelimit>()

const unavailableResponse = () =>
  NextResponse.json(
    { success: false, message: 'Request protection is temporarily unavailable.' },
    { status: 503 },
  )

export const enforcePublicRateLimit = async (
  request: Request,
  endpoint: 'enquiry' | 'newsletter',
  maximum: number,
): Promise<NextResponse | null> => {
  const hasRedisCredentials = Boolean(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN,
  )

  if (!hasRedisCredentials) {
    return process.env.NODE_ENV === 'development' ? null : unavailableResponse()
  }

  try {
    redis ??= Redis.fromEnv()

    const limiterKey = `${endpoint}:${maximum}`
    let limiter = limiters.get(limiterKey)

    if (!limiter) {
      limiter = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(maximum, WINDOW),
        prefix: `rato-panda:rate-limit:${endpoint}`,
      })
      limiters.set(limiterKey, limiter)
    }

    const clientIp = ipAddress(request) ?? 'unknown'
    const result = await limiter.limit(clientIp)
    const headers = new Headers({
      'X-RateLimit-Limit': String(result.limit),
      'X-RateLimit-Remaining': String(result.remaining),
      'X-RateLimit-Reset': String(Math.ceil(result.reset / 1000)),
    })

    if (!result.success) {
      headers.set(
        'Retry-After',
        String(Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))),
      )
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429, headers },
      )
    }

    return null
  } catch (error) {
    console.error(`Rate limiting unavailable for ${endpoint}:`, error)
    return unavailableResponse()
  }
}