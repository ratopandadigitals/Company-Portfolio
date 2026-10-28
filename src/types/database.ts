import type { ObjectId } from 'mongodb'

import type { WorkItem } from '@/data/works'
import type { ServiceItem } from '@/components/sections/services/Service'
import type { EventItem } from '@/data/events'
import type { MediaItem } from '@/components/sections/gallery/MediaData'
import type { StatItem, TestimonialItem } from '@/data/client'
import type { EnquiryItem } from '@/types/enquiry'

/**
 * Shared MongoDB document types.
 *
 * Existing application fields are preserved.
 * MongoDB adds its own _id field to inserted documents.
 */

export type WorkDocument = WorkItem & {
  _id?: ObjectId
}

export type ServiceDocument = ServiceItem & {
  _id?: ObjectId
}

export type EventDocument = EventItem & {
  _id?: ObjectId
}

export type GalleryDocument = MediaItem & {
  _id?: ObjectId
}

export type StatDocument = StatItem & {
  _id?: ObjectId
}

export type TestimonialDocument = TestimonialItem & {
  _id?: ObjectId
}

export type EnquiryDocument = EnquiryItem & {
  _id?: ObjectId
}

export type NewsletterSubscriber = {
  _id?: ObjectId
  email: string
  subscribedAt: string
}
