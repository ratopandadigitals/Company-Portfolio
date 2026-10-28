
import type { EventItem } from '@/data/events'
export type { EventItem }

type ApiResponse<T> = {
  success: boolean
  message?: string
  data: T
}

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  const result = await response.json() as ApiResponse<T>

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Unable to save event data.')
  }

  return result.data
}

export const getEvents = (): Promise<EventItem[]> =>
  request<EventItem[]>('/api/events', { cache: 'no-store' })

export const getEventBySlug = (slug: string): Promise<EventItem> =>
  request<EventItem>(`/api/events/${encodeURIComponent(slug)}`, { cache: 'no-store' })

export const createEvent = (
  event: Omit<EventItem, 'id'>,
): Promise<EventItem> =>
  request<EventItem>('/api/events', {
    method: 'POST',
    body: JSON.stringify(event),
  })

export const updateEvent = (
  slug: string,
  updatedEvent: Omit<EventItem, 'id'>,
): Promise<EventItem> =>
  request<EventItem>(`/api/events/${encodeURIComponent(slug)}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedEvent),
  })

export const deleteEvent = (slug: string): Promise<void> =>
  request<void>(`/api/events/${encodeURIComponent(slug)}`, {
    method: 'DELETE',
  })
