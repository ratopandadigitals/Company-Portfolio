
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import type { EnquiryDocument } from '@/types/database'

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request data.' },
        { status: 400 },
      )
    }

    const data = body as Record<string, unknown>
    const { name, email, need, description } = data

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof need !== 'string' ||
      typeof description !== 'string'
    ) {
      return NextResponse.json(
        { success: false, message: 'Please complete all fields.' },
        { status: 400 },
      )
    }

    const enquiryName = name.trim()
    const enquiryEmail = email.trim().toLowerCase()
    const subject = need.trim()
    const message = description.trim()

    if (
      !enquiryName ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryEmail) ||
      !subject ||
      !message ||
      enquiryName.length > 100 ||
      enquiryEmail.length > 254 ||
      subject.length > 200 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid enquiry details.' },
        { status: 400 },
      )
    }

    const enquiry: EnquiryDocument = {
      id: crypto.randomUUID(),
      name: enquiryName,
      email: enquiryEmail,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'new',
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    await db.collection<EnquiryDocument>('enquiries').insertOne(enquiry)

    return NextResponse.json(
      { success: true, message: 'Enquiry submitted successfully.' },
      { status: 201 },
    )
  } catch (error) {
    console.error('Failed to save enquiry:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to submit your enquiry.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const enquiries = await db
      .collection<EnquiryDocument>('enquiries')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: enquiries,
    })
  } catch (error) {
    console.error('Failed to retrieve enquiries:', error)

    return NextResponse.json(
      { success: false, message: 'Unable to retrieve enquiries.' },
      { status: 500 },
    )
  }
}
