
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { recordAdminNotification } from '@/lib/admin-notifications'
import type { GalleryDocument } from '@/types/database'
import { parseGalleryInput } from '@/lib/gallery-validation'

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

    const { id } = await context.params
    const galleryId = Number(id)
    const itemInput = parseGalleryInput(await request.json().catch(() => null))

    if (!Number.isSafeInteger(galleryId) || galleryId < 1 || !itemInput) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid gallery details.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const collection = client
      .db('rato_panda_portfolio')
      .collection<GalleryDocument>('gallery')
    const result = await collection.updateOne(
      { id: galleryId },
      { $set: itemInput },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Gallery item not found.' },
        { status: 404 },
      )
    }

    await recordAdminNotification({
      kind: 'content',
      title: 'Gallery item updated',
      message: itemInput.title,
      href: '/admin/gallery',
    })

    return NextResponse.json({
      success: true,
      message: 'Gallery item updated successfully.',
      data: { id: galleryId, ...itemInput },
    })
  } catch (error) {
    console.error('Failed to update gallery item:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to update gallery item.' },
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

    const { id } = await context.params
    const galleryId = Number(id)

    if (!Number.isSafeInteger(galleryId) || galleryId < 1) {
      return NextResponse.json(
        { success: false, message: 'Invalid gallery item ID.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const collection = client
      .db('rato_panda_portfolio')
      .collection<GalleryDocument>('gallery')
    const result = await collection.deleteOne({ id: galleryId })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Gallery item not found.' },
        { status: 404 },
      )
    }

    await recordAdminNotification({
      kind: 'content',
      title: 'Gallery item deleted',
      message: `Gallery item ${galleryId}`,
      href: '/admin/gallery',
    })

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully.',
    })
  } catch (error) {
    console.error('Failed to delete gallery item:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to delete gallery item.' },
      { status: 500 },
    )
  }
}
