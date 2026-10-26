import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { TestimonialItem } from '@/data/client'

type RouteContext = {
  params: Promise<{ id: string }>
}

export const GET = async (
  _request: Request,
  context: RouteContext,
) => {
  try {
    const { id } = await context.params

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const testimonial = await db
      .collection<TestimonialItem>('testimonials')
      .findOne({ id })

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found.' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: testimonial,
    })
  } catch (error) {
    console.error('Failed to fetch testimonial:', error)

    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonial.' },
      { status: 500 },
    )
  }
}

export const PATCH = async () => {
  return NextResponse.json(
    { success: false, message: 'Authentication required.' },
    { status: 401 },
  )
}

export const DELETE = async () => {
  return NextResponse.json(
    { success: false, message: 'Authentication required.' },
    { status: 401 },
  )
}