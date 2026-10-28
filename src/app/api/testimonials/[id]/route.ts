import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { recordAdminNotification } from '@/lib/admin-notifications'
import type { TestimonialDocument } from '@/types/database'
import { parseTestimonialInput } from '@/lib/client-proof-validation'

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

    const testimonial = await db
      .collection<TestimonialDocument>('testimonials')
      .findOne({ id })

    if (!testimonial) {
      return NextResponse.json(
        { success: false, message: 'Testimonial not found.' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: testimonial,
    })
  } catch (error) {
    console.error('Failed to fetch testimonial:', error)

    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonial.' },
      { status: 500 },
    )
  }
}

export const PATCH = async (request: Request, context: RouteContext) => {
  try {
    const session = await getAuthenticatedSession()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 })
    }

    const { id } = await context.params
    const testimonialInput = parseTestimonialInput(await request.json().catch(() => null))
    if (!testimonialInput) {
      return NextResponse.json({ success: false, message: 'Please provide valid testimonial details.' }, { status: 400 })
    }

    const client = await clientPromise
    const collection = client.db('rato_panda_portfolio').collection<TestimonialDocument>('testimonials')
    const result = await collection.updateOne({ id }, { $set: testimonialInput })
    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, message: 'Testimonial not found.' }, { status: 404 })
    }

    await recordAdminNotification({
      kind: 'content',
      title: 'Testimonial updated',
      message: testimonialInput.name,
      href: '/admin/testimonials',
    })

    return NextResponse.json({
      success: true,
      message: 'Testimonial updated successfully.',
      data: { id, ...testimonialInput },
    })
  } catch (error) {
    console.error('Failed to update testimonial:', error)
    return NextResponse.json({ success: false, message: 'Unable to update testimonial.' }, { status: 500 })
  }
}

export const DELETE = async (_request: Request, context: RouteContext) => {
  try {
    const session = await getAuthenticatedSession()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: 'Unauthorized.' }, { status: 401 })
    }

    const { id } = await context.params
    const client = await clientPromise
    const collection = client.db('rato_panda_portfolio').collection<TestimonialDocument>('testimonials')
    const result = await collection.deleteOne({ id })
    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: 'Testimonial not found.' }, { status: 404 })
    }

    await recordAdminNotification({
      kind: 'content',
      title: 'Testimonial deleted',
      message: `Testimonial ${id}`,
      href: '/admin/testimonials',
    })

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully.' })
  } catch (error) {
    console.error('Failed to delete testimonial:', error)
    return NextResponse.json({ success: false, message: 'Unable to delete testimonial.' }, { status: 500 })
  }
}