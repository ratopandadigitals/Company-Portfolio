
import type { EventItem } from '@/data/events'
export type {EventItem}
const STORAGE_KEY = 'admin-events'

const getInitialEvents = (): EventItem[] => {
  return []
}

export const getEvents = (): EventItem[] => {
  if (typeof window === 'undefined') {
    return getInitialEvents()
  }

  const storedEvents = localStorage.getItem(STORAGE_KEY)

  if (!storedEvents) {
    return getInitialEvents()
  }

  try {
    return JSON.parse(storedEvents) as EventItem[]
  } catch {
    return getInitialEvents()
  }
}

const saveEvents = (events: EventItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export const createEvent = (
  event: Omit<EventItem, 'id'>,
): EventItem => {
  const events = getEvents()

  const newEvent: EventItem = {
    ...event,
    id: crypto.randomUUID(),
  }

  saveEvents([...events, newEvent])

  return newEvent
}

export const getEventBySlug = (
  slug: string,
): EventItem | undefined => {
  return getEvents().find((event) => event.slug === slug)
}

export const updateEvent = (
  slug: string,
  updatedEvent: EventItem,
): EventItem | undefined => {
  const events = getEvents()
  const index = events.findIndex((event) => event.slug === slug)

  if (index === -1) {
    return undefined
  }

  const updatedEvents = [...events]
  updatedEvents[index] = updatedEvent

  saveEvents(updatedEvents)

  return updatedEvent
}

export const deleteEvent = (slug: string): boolean => {
  const events = getEvents()
  const updatedEvents = events.filter((event) => event.slug !== slug)

  if (updatedEvents.length === events.length) {
    return false
  }

  saveEvents(updatedEvents)

  return true
}
