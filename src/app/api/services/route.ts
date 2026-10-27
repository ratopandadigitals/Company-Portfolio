
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
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

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')
    const collection = db.collection<ServiceDocument>('services')

    const services = await collection.find({}).toArray()

    const normalizedLabel = label.trim().toLowerCase()

    const duplicateLabel = services.some(
      (service) => service.label.trim().toLowerCase() === normalizedLabel,
    )

    if (duplicateLabel) {
      return NextResponse.json(
        {
          success: false,
          message: 'A service with this label already exists.',
        },
        { status: 409 },
      )
    }

    const numericIds = services
      .map((service) => Number(service.id))
      .filter((id) => Number.isSafeInteger(id) && id > 0)

    const nextId = String(Math.max(0, ...numericIds) + 1)

    const service: ServiceDocument = {
      id: nextId,
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
        {
          success: false,
          message: 'Please complete all service fields correctly.',
        },
        { status: 400 },
      )
    }

    await collection.insertOne(service)

    return NextResponse.json(
      {
        success: true,
        message: 'Service created successfully.',
        data: service,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Failed to create service:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to create service.' },
      { status: 500 },
    )
  }
}
