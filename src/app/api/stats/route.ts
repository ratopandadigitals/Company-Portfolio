import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { StatItem } from '@/data/client'

export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const stats = await db
      .collection<StatItem>('stats')
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

export const PATCH = async () => {
  return NextResponse.json(
    { success: false, message: 'Authentication required.' },
    { status: 401 },
  )
}