
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { recordAdminNotification } from '@/lib/admin-notifications'
import type { GalleryDocument } from '@/types/database'
import { parseGalleryInput } from '@/lib/gallery-validation'

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

export const POST = async (request: Request) => {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const itemInput = parseGalleryInput(await request.json().catch(() => null))

    if (!itemInput) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid gallery details.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')
    const collection = client
      .db('rato_panda_portfolio')
      .collection<GalleryDocument>('gallery')
    const counter = await db
      .collection<{ _id: string; sequence: number }>('counters')
      .findOneAndUpdate(
        { _id: 'gallery' },
        { $inc: { sequence: 1 } },
        { returnDocument: 'after' },
      )

    if (!counter) {
      throw new Error('The Gallery counter is not initialized. Run the data migration.')
    }

    const item: GalleryDocument = {
      ...itemInput,
      id: counter.sequence,
    }

    await collection.insertOne(item)
    await recordAdminNotification({
      kind: 'content',
      title: 'Gallery item added',
      message: item.title,
      href: '/admin/gallery',
    })

    return NextResponse.json(
      { success: true, message: 'Gallery item created successfully.', data: item },
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
        { success: false, message: 'Gallery item ID conflict. Please retry; if it persists, run the data migration.' },
        { status: 409 },
      )
    }

    console.error('Failed to create gallery item:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to create gallery item.' },
      { status: 500 },
    )
  }
}
