
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { enforcePublicRateLimit } from '@/lib/rate-limit'
import { recordAdminNotification } from '@/lib/admin-notifications'
import { sendEmail } from '@/lib/mailer'
import type { EnquiryDocument, ServiceDocument } from '@/types/database'

export async function POST(request: Request) {
  try {
    const rateLimitResponse = await enforcePublicRateLimit(request, 'enquiry', 5)
    if (rateLimitResponse) return rateLimitResponse

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
    const serviceId = need.trim()
    const message = description.trim()

    if (
      !enquiryName ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryEmail) ||
      !serviceId ||
      !message ||
      enquiryName.length > 100 ||
      enquiryEmail.length > 254 ||
      serviceId.length > 100 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid enquiry details.' },
        { status: 400 },
      )
    }

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')
    const service = await db
      .collection<ServiceDocument>('services')
      .findOne({ id: serviceId })

    if (!service) {
      return NextResponse.json(
        { success: false, message: 'Please select an available service.' },
        { status: 400 },
      )
    }

    const subject = service.label
    const enquiry: EnquiryDocument = {
      id: crypto.randomUUID(),
      name: enquiryName,
      email: enquiryEmail,
      subject,
      serviceId,
      message,
      createdAt: new Date().toISOString(),
      status: 'new',
    }

    // Save the enquiry first.
    await db.collection<EnquiryDocument>('enquiries').insertOne(enquiry)
    await recordAdminNotification({
      kind: 'enquiry',
      title: 'New enquiry',
      message: `${enquiryName}: ${subject}`,
      href: `/admin/enquiries/${encodeURIComponent(enquiry.id)}`,
    })

    // Send an email notification after the enquiry is saved.
    try {
      const recipient = process.env.CONTACT_EMAIL

      if (!recipient) {
        throw new Error('CONTACT_EMAIL is not configured.')
      }

      await sendEmail({
        to: recipient,
        replyTo: enquiryEmail,
        subject: `New website enquiry: ${subject}`,
        text: [
          'You have received a new website enquiry.',
          '',
          `Name: ${enquiryName}`,
          `Email: ${enquiryEmail}`,
          `Subject: ${subject}`,
          '',
          'Message:',
          message,
          '',
          `Received at: ${enquiry.createdAt}`,
        ].join('\n'),
      })
    } 
    catch (emailError) {
      // Do not lose a saved enquiry if email delivery fails.
      console.error(
        'Enquiry saved, but notification email failed:',
        emailError,
      )
    }

    // Send a confirmation email to the customer.
    try {
      await sendEmail({
        to: enquiryEmail,
        subject: 'We received your enquiry | Rato Panda Digitals',
        text: [
          `Hello ${enquiryName},`,
          '',
          'Thank you for contacting Rato Panda Digitals.',
          'We have received your enquiry and will get back to you.',
          '',
          `Your enquiry: ${subject}`,
          '',
          'Best regards,',
          'Rato Panda Digitals',
        ].join('\n'),
      })
    } catch (emailError) {
      console.error(
        'Enquiry saved, but customer confirmation email failed:',
        emailError,
      )
    }


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
