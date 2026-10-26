
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { GalleryDocument } from '@/types/database'


export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const gallery = await db
      .collection<GalleryDocument>('gallery')
      .find({})
      .sort({ id: 1 })
      .toArray()

    return NextResponse.json(
      {
        success: true,
        data: gallery,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to retrieve gallery items:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve gallery items.',
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
