
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

type GalleryDocument = {
  id: number
  type: 'image' | 'video'
  title: string
  url: string
  span: string
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
    const galleryId = Number(id)

    if (!Number.isSafeInteger(galleryId) || galleryId < 1) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid gallery item ID.',
        },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const galleryItem = await db
      .collection<GalleryDocument>('gallery')
      .findOne({ id: galleryId })

    if (!galleryItem) {
      return NextResponse.json(
        {
          success: false,
          message: 'Gallery item not found.',
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: galleryItem,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to retrieve gallery item:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve gallery item.',
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
