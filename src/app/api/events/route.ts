
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { EventDocument } from '@/types/database'


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

export const POST = async () => {
  return NextResponse.json(
    {
      success: false,
      message: 'Admin authentication is required.',
    },
    { status: 401 },
  )
}
