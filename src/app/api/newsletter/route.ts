
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { sendEmail } from '@/lib/mailer'
import type { NewsletterSubscriber } from '@/types/database'

export const POST = async (request: Request) => {
  try {
    const body: unknown = await request.json()

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: 'Invalid request data.' },
        { status: 400 },
      )
    }

    const data = body as Record<string, unknown>

    if (typeof data.email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Please provide an email address.' },
        { status: 400 },
      )
    }

    const email = data.email.trim().toLowerCase()

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const subscribers = db.collection<NewsletterSubscriber>(
      'newsletter_subscribers',
    )

    const existingSubscriber = await subscribers.findOne({ email })

    if (existingSubscriber) {
      return NextResponse.json(
        {
          success: false,
          message: 'This email is already subscribed.',
        },
        { status: 409 },
      )
    }

    const subscriber: NewsletterSubscriber = {
      email,
      subscribedAt: new Date().toISOString(),
    }

    await subscribers.insertOne(subscriber)

    // Send a welcome email after saving the subscriber.
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to Rato Panda Digitals',
        text: [
          'Hello,',
          '',
          'Thank you for subscribing to Rato Panda Digitals!',
          '',
          'You can look forward to updates about our latest projects, services, and news.',
          '',
          'Best regards,',
          'Rato Panda Digitals',
        ].join('\n'),
      })
    } catch (emailError) {
      console.error(
        'Subscriber saved, but welcome email failed:',
        emailError,
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to the newsletter.',
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Failed to save newsletter subscription:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to subscribe right now. Please try again.',
      },
      { status: 500 },
    )
  }
}
