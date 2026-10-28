import { NextResponse } from 'next/server'
import { getAuthenticatedSession } from '@/lib/api-auth'
import clientPromise from '@/lib/mongodb'
import type { AdminNotification } from '@/types/notification'

export const GET = async () => {
  try {
    const session = await getAuthenticatedSession()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 })
    }

    const client = await clientPromise
    const collection = client
      .db('rato_panda_portfolio')
      .collection<AdminNotification>('admin_notifications')
    const userId = session.user.id
    const [notifications, unreadCount] = await Promise.all([
      collection
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(30)
        .toArray(),
      collection.countDocuments({ readBy: { $ne: userId } }),
    ])

    return NextResponse.json({
      success: true,
      data: { notifications, unreadCount },
    })
  } catch (error) {
    console.error('Failed to retrieve admin notifications:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to load notifications.' },
      { status: 500 },
    )
  }
}

export const PATCH = async (request: Request) => {
  try {
    const session = await getAuthenticatedSession()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 })
    }

    const body: unknown = await request.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ success: false, message: 'Invalid request.' }, { status: 400 })
    }

    const data = body as Record<string, unknown>
    const userId = session.user.id
    const collection = (await clientPromise)
      .db('rato_panda_portfolio')
      .collection<AdminNotification>('admin_notifications')

    if (data.markAllRead === true) {
      await collection.updateMany(
        { readBy: { $ne: userId } },
        { $addToSet: { readBy: userId } },
      )
    } else if (typeof data.id === 'string' && data.id.length <= 100) {
      await collection.updateOne(
        { id: data.id },
        { $addToSet: { readBy: userId } },
      )
    } else {
      return NextResponse.json({ success: false, message: 'Provide a notification ID or markAllRead.' }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update admin notifications:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to update notifications.' },
      { status: 500 },
    )
  }
}