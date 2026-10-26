
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

type EventDocument = {
  id: string
  slug: string
  title: string
  date: string
  location: string
  description: string
  image: string
  status: 'upcoming' | 'past'
  ctaLabel: string
}

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

    const event = await db
      .collection<EventDocument>('events')
      .findOne({ id })

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: 'Event not found.',
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: event,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to retrieve event:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve event.',
      },
      { status: 500 },
    )
  }
}

export const PATCH = async () => {
  return NextResponse.json(
    {
      success: false,
      message: 'Admin authentication is required.',
    },
    { status: 401 },
  )
}

export const DELETE = async () => {
  return NextResponse.json(
    {
      success: false,
      message: 'Admin authentication is required.',
    },
    { status: 401 },
  )
}
