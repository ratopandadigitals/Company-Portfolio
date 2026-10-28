
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { recordAdminNotification } from '@/lib/admin-notifications'
import type { ServiceDocument } from '@/types/database'

export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const services = await db
      .collection<ServiceDocument>('services')
      .find({})
      .sort({ id: 1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: services,
    })
  } catch (error) {
    console.error('Failed to retrieve services:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve services.',
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

    const serviceFields = {
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
      !serviceFields.label ||
      !serviceFields.title ||
      !serviceFields.image ||
      !serviceFields.description ||
      !serviceFields.tags.length ||
      !serviceFields.price ||
      !serviceFields.timeline ||
      serviceFields.label.length > 200 ||
      serviceFields.title.length > 200 ||
      serviceFields.image.length > 2048 ||
      serviceFields.description.length > 5000 ||
      serviceFields.tags.some((tag) => tag.length > 100) ||
      serviceFields.price.length > 100 ||
      serviceFields.timeline.length > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please complete all service fields correctly.',
        },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')
    const collection = db.collection<ServiceDocument>('services')
    const duplicateLabel = await collection.findOne(
      { label: serviceFields.label },
      { collation: { locale: 'en', strength: 2 } },
    )

    if (duplicateLabel) {
      return NextResponse.json(
        { success: false, message: 'A service with this label already exists.' },
        { status: 409 },
      )
    }

    const counter = await db
      .collection<{ _id: string; sequence: number }>('counters')
      .findOneAndUpdate(
        { _id: 'services' },
        { $inc: { sequence: 1 } },
        { returnDocument: 'after' },
      )

    if (!counter) {
      throw new Error('The Services counter is not initialized. Run the data migration.')
    }

    const service: ServiceDocument = {
      ...serviceFields,
      id: String(counter.sequence),
    }

    await collection.insertOne(service)
    await recordAdminNotification({
      kind: 'content',
      title: 'Service created',
      message: service.title,
      href: `/admin/services/${encodeURIComponent(service.id)}`,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Service created successfully.',
        data: service,
      },
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
        { success: false, message: 'A service with this label or ID already exists.' },
        { status: 409 },
      )
    }

    console.error('Failed to create service:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to create service.' },
      { status: 500 },
    )
  }
}
