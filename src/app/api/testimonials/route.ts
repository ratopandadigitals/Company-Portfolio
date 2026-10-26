import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { TestimonialItem } from '@/data/client'

export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const testimonials = await db
      .collection<TestimonialItem>('testimonials')
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

export const POST = async () => {
  return NextResponse.json(
    { success: false, message: 'Authentication required.' },
    { status: 401 },
  )
}