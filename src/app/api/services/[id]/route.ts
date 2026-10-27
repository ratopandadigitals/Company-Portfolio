
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import type { ServiceDocument } from '@/types/database'

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

    const service = await db
      .collection<ServiceDocument>('services')
      .findOne({ id })

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Service not found.' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: service,
    })
  } catch (error) {
    console.error('Failed to retrieve service:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to retrieve service.' },
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
    const body: unknown = await request.json()

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request data.' },
        { status: 400 },
      )
    }

    const data = body as Record<string, unknown>
    const { label, title, image, description, tags, price, timeline, width } =
      data

    if (
      typeof label !== 'string' ||
      typeof title !== 'string' ||
      typeof image !== 'string' ||
      typeof description !== 'string' ||
      !Array.isArray(tags) ||
      !tags.every((tag) => typeof tag === 'string') ||
      typeof price !== 'string' ||
      typeof timeline !== 'string' ||
      (width !== undefined &&
        (typeof width !== 'number' ||
          !Number.isFinite(width) ||
          width <= 0))
    ) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid service details.' },
        { status: 400 },
      )
    }

    const service: Omit<ServiceDocument, '_id' | 'id'> = {
      label: label.trim(),
      title: title.trim(),
      image: image.trim(),
      description: description.trim(),
      tags: tags.map((tag) => tag.trim()).filter(Boolean),
      price: price.trim(),
      timeline: timeline.trim(),
      ...(width !== undefined ? { width } : {}),
    }

    if (
      !service.label ||
      !service.title ||
      !service.image ||
      !service.description ||
      !service.tags.length ||
      !service.price ||
      !service.timeline ||
      service.label.length > 200 ||
      service.title.length > 200 ||
      service.image.length > 2048 ||
      service.description.length > 5000 ||
      service.tags.some((tag) => tag.length > 100) ||
      service.price.length > 100 ||
      service.timeline.length > 100
    ) {
      return NextResponse.json(
        { success: false, message: 'Please complete all service fields correctly.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const collection = client
      .db('rato_panda_portfolio')
      .collection<ServiceDocument>('services')

    const existingService = await collection.findOne({ id })

    if (!existingService) {
      return NextResponse.json(
        { success: false, message: 'Service not found.' },
        { status: 404 },
      )
    }

    const duplicateLabel = await collection.findOne({
      id: { $ne: id },
      label: {
        $regex: `^${service.label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`,
        $options: 'i',
      },
    })

    if (duplicateLabel) {
      return NextResponse.json(
        { success: false, message: 'Another service already uses this label.' },
        { status: 409 },
      )
    }

    await collection.updateOne({ id }, { $set: service })

    return NextResponse.json({
      success: true,
      message: 'Service updated successfully.',
      data: { id, ...service },
    })
  } catch (error) {
    console.error('Failed to update service:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to update service.' },
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

    const client = await clientPromise
    const collection = client
      .db('rato_panda_portfolio')
      .collection<ServiceDocument>('services')

    const result = await collection.deleteOne({ id })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Service not found.' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully.',
    })
  } catch (error) {
    console.error('Failed to delete service:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to delete service.' },
      { status: 500 },
    )
  }
}
