
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { WorkDocument } from '@/types/database'


export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const works = await db
      .collection<WorkDocument>('works')
      .find({})
      .sort({ id: 1 })
      .toArray()

    return NextResponse.json(
      {
        success: true,
        data: works,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to retrieve works:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve works.',
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
