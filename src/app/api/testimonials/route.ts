import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { recordAdminNotification } from '@/lib/admin-notifications'
import type { TestimonialDocument } from '@/types/database'
import { parseTestimonialInput } from '@/lib/client-proof-validation'

export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const testimonials = await db
      .collection<TestimonialDocument>('testimonials')
      .find({})
      .sort({ id: 1 })
      .toArray()

    return NextResponse.json({
      success: true,
      data: testimonials,
    })
  } catch (error) {
    console.error('Failed to fetch testimonials:', error)

    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials.' },
      { status: 500 },
    )
  }
}

export const POST = async (request: Request) => {
  try {
    const session = await getAuthenticatedSession()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 })
    }

    const testimonialInput = parseTestimonialInput(await request.json().catch(() => null))
    if (!testimonialInput) {
      return NextResponse.json({ success: false, message: 'Please provide valid testimonial details.' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')
    const collection = db.collection<TestimonialDocument>('testimonials')
    const counter = await db
      .collection<{ _id: string; sequence: number }>('counters')
      .findOneAndUpdate(
        { _id: 'testimonials' },
        { $inc: { sequence: 1 } },
        { returnDocument: 'after' },
      )

    if (!counter) {
      throw new Error('The Testimonials counter is not initialized. Run the data migration.')
    }

    const testimonial: TestimonialDocument = {
      ...testimonialInput,
      id: String(counter.sequence).padStart(2, '0'),
    }

    await collection.insertOne(testimonial)
    await recordAdminNotification({
      kind: 'content',
      title: 'Testimonial added',
      message: testimonial.name,
      href: '/admin/testimonials',
    })
    return NextResponse.json(
      { success: true, message: 'Testimonial created successfully.', data: testimonial },
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
        { success: false, message: 'Testimonial ID conflict. Please retry; if it persists, run the data migration.' },
        { status: 409 },
      )
    }

    console.error('Failed to create testimonial:', error)
    return NextResponse.json({ success: false, message: 'Unable to create testimonial.' }, { status: 500 })
  }
}