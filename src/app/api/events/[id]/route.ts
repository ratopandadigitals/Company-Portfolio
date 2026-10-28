
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { recordAdminNotification } from '@/lib/admin-notifications'
import type { EventDocument } from '@/types/database'
import { parseEventInput } from '@/lib/event-validation'

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
      .findOne({ slug: id })

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

export const PATCH = async (
  request: Request,
  context: RouteContext,
) => {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const { id: slug } = await context.params
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
    const existingEvent = await collection.findOne({ slug })

    if (!existingEvent) {
      return NextResponse.json(
        { success: false, message: 'Event not found.' },
        { status: 404 },
      )
    }

    if (
      eventInput.slug !== slug &&
      (await collection.findOne({ slug: eventInput.slug }))
    ) {
      return NextResponse.json(
        { success: false, message: 'An event with this slug already exists.' },
        { status: 409 },
      )
    }

    await collection.updateOne(
      { slug },
      { $set: { ...eventInput, id: existingEvent.id } },
    )
    const updatedEvent = await collection.findOne({ slug: eventInput.slug })
    await recordAdminNotification({
      kind: 'content',
      title: 'Event updated',
      message: eventInput.title,
      href: `/admin/events/${encodeURIComponent(eventInput.slug)}`,
    })

    return NextResponse.json({
      success: true,
      message: 'Event updated successfully.',
      data: updatedEvent,
    })
  } catch (error) {
    console.error('Failed to update event:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to update event.' },
      { status: 500 },
    )
  }
}

export const DELETE = async (
  _request: Request,
  context: RouteContext,
) => {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const { id: slug } = await context.params
    const client = await clientPromise
    const collection = client
      .db('rato_panda_portfolio')
      .collection<EventDocument>('events')
    const result = await collection.deleteOne({ slug })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Event not found.' },
        { status: 404 },
      )
    }

    await recordAdminNotification({
      kind: 'content',
      title: 'Event deleted',
      message: slug,
      href: '/admin/events',
    })

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully.',
    })
  } catch (error) {
    console.error('Failed to delete event:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to delete event.' },
      { status: 500 },
    )
  }
}
