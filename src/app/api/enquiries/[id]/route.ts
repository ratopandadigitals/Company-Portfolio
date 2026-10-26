
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import type { EnquiryDocument } from '@/types/database'

type RouteContext = {
  params: Promise<{ id: string }>
}

const unauthorizedResponse = () =>
  NextResponse.json(
    { success: false, message: 'Unauthorized.' },
    { status: 401 },
  )

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return unauthorizedResponse()
    }

    const { id } = await context.params

    if (!id.trim() || id.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Invalid enquiry ID.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const enquiry = await db
      .collection<EnquiryDocument>('enquiries')
      .findOne({ id })

    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: 'Enquiry not found.' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: enquiry,
    })
  } catch (error) {
    console.error('Failed to retrieve enquiry:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to retrieve enquiry.' },
      { status: 500 },
    )
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return unauthorizedResponse()
    }

    const { id } = await context.params

    if (!id.trim() || id.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Invalid enquiry ID.' },
        { status: 400 },
      )
    }

    let body: unknown

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON request body.' },
        { status: 400 },
      )
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request data.' },
        { status: 400 },
      )
    }

    const data = body as Record<string, unknown>

    if (data.status !== 'new' && data.status !== 'read') {
      return NextResponse.json(
        { success: false, message: 'Invalid enquiry status.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const result = await db
      .collection<EnquiryDocument>('enquiries')
      .updateOne(
        { id },
        { $set: { status: data.status } },
      )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Enquiry not found.' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry status updated successfully.',
    })
  } catch (error) {
    console.error('Failed to update enquiry:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to update enquiry.' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext,
) {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return unauthorizedResponse()
    }

    const { id } = await context.params

    if (!id.trim() || id.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Invalid enquiry ID.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const result = await db
      .collection<EnquiryDocument>('enquiries')
      .deleteOne({ id })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Enquiry not found.' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry deleted successfully.',
    })
  } catch (error) {
    console.error('Failed to delete enquiry:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to delete enquiry.' },
      { status: 500 },
    )
  }
}
