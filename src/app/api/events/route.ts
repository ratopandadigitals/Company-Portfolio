
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { recordAdminNotification } from '@/lib/admin-notifications'
import type { EventDocument } from '@/types/database'
import { parseEventInput } from '@/lib/event-validation'

export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const events = await db
      .collection<EventDocument>('events')
      .find({})
      .sort({ date: 1 })
      .toArray()

    return NextResponse.json(
      {
        success: true,
        data: events,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to retrieve events:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve events.',
      },
      { status: 500 },
    )
  }
}

export const POST = async (request: Request) => {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const eventInput = parseEventInput(await request.json().catch(() => null))

    if (!eventInput) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid event details.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const collection = client
      .db('rato_panda_portfolio')
      .collection<EventDocument>('events')
    const counter = await client
      .db('rato_panda_portfolio')
      .collection<{ _id: string; sequence: number }>('counters')
      .findOneAndUpdate(
        { _id: 'events' },
        { $inc: { sequence: 1 } },
        { returnDocument: 'after' },
      )

    if (!counter) {
      throw new Error('The Events counter is not initialized. Run the data migration.')
    }

    const event: EventDocument = {
      ...eventInput,
      id: String(counter.sequence).padStart(2, '0'),
    }

    await collection.insertOne(event)
    await recordAdminNotification({
      kind: 'content',
      title: 'Event created',
      message: event.title,
      href: `/admin/events/${encodeURIComponent(event.slug)}`,
    })

    return NextResponse.json(
      { success: true, message: 'Event created successfully.', data: event },
      { status: 201 },
    )
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { success: false, message: 'An event with this slug already exists.' },
        { status: 409 },
      )
    }

    console.error('Failed to create event:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to create event.' },
      { status: 500 },
    )
  }
}
