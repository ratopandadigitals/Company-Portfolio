import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { recordAdminNotification } from '@/lib/admin-notifications'
import type { StatDocument } from '@/types/database'
import { parseStatsInput } from '@/lib/client-proof-validation'

export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const stats = await db
      .collection<StatDocument>('stats')
      .find({})
      .sort({ id: 1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)

    return NextResponse.json(
      { success: false, message: 'Failed to fetch stats.' },
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

    const statsInput = parseStatsInput(await request.json().catch(() => null))
    if (!statsInput) {
      return NextResponse.json({ success: false, message: 'Exactly three valid statistics are required.' }, { status: 400 })
    }

    const client = await clientPromise
    const collection = client.db('rato_panda_portfolio').collection<StatDocument>('stats')
    const existing = await collection.find({}).toArray()
    if (existing.length !== 3 || statsInput.some((stat) => !existing.some((item) => item.id === stat.id))) {
      return NextResponse.json({ success: false, message: 'The existing three statistics must be edited without adding or removing items.' }, { status: 409 })
    }

    await Promise.all(statsInput.map(({ id, value, label }) =>
      collection.updateOne({ id }, { $set: { value, label } }),
    ))
    const stats = await collection.find({}).sort({ id: 1 }).toArray()
    await recordAdminNotification({
      kind: 'content',
      title: 'Statistics updated',
      message: 'Client Proof statistics were edited.',
      href: '/admin/testimonials',
    })
    return NextResponse.json({ success: true, message: 'Statistics updated successfully.', data: stats })
  } catch (error) {
    console.error('Failed to update stats:', error)
    return NextResponse.json({ success: false, message: 'Unable to update statistics.' }, { status: 500 })
  }
}