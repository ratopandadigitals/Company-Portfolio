import type { EventItem } from '@/data/events'

export const parseEventInput = (body: unknown): Omit<EventItem, 'id'> | null => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null

  const data = body as Record<string, unknown>
  const { slug, title, date, location, description, image, status, ctaLabel } = data

  if (
    typeof slug !== 'string' ||
    typeof title !== 'string' ||
    typeof date !== 'string' ||
    typeof location !== 'string' ||
    typeof description !== 'string' ||
    typeof image !== 'string' ||
    (status !== 'upcoming' && status !== 'past') ||
    typeof ctaLabel !== 'string'
  ) {
    return null
  }

  const event = {
    slug: slug.trim(),
    title: title.trim(),
    date: date.trim(),
    location: location.trim(),
    description: description.trim(),
    image: image.trim(),
    status: status as EventItem['status'],
    ctaLabel: ctaLabel.trim(),
  }

  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(event.slug) ||
    !event.title || event.title.length > 200 ||
    !event.date || event.date.length > 100 ||
    !event.location || event.location.length > 200 ||
    !event.description || event.description.length > 5000 ||
    !event.image || event.image.length > 2048 ||
    !event.ctaLabel || event.ctaLabel.length > 100
  ) {
    return null
  }

  return event
}