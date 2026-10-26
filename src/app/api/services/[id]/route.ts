
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

type ServiceDocument = {
  id: string
  label: string
  title: string
  image: string
  description: string
  tags: string[]
  width?: number
  price: string
  timeline: string
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

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const service = await db
      .collection<ServiceDocument>('services')
      .findOne({ id })

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: 'Service not found.',
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: service,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to retrieve service:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve service.',
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
