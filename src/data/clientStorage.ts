
import type {
  StatItem,
  TestimonialItem,
} from '@/data/client'

export type { StatItem, TestimonialItem }

type ApiResult<T> = { success: boolean; message?: string; data: T }

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  const result = await response.json() as ApiResult<T>

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Unable to save client proof data.')
  }

  return result.data
}

export const getStats = (): Promise<StatItem[]> =>
  request<StatItem[]>('/api/stats', { cache: 'no-store' })

export const updateStats = (stats: StatItem[]): Promise<StatItem[]> =>
  request<StatItem[]>('/api/stats', {
    method: 'PATCH',
    body: JSON.stringify(stats),
  })

export const getTestimonials = (): Promise<TestimonialItem[]> =>
  request<TestimonialItem[]>('/api/testimonials', { cache: 'no-store' })

export const createTestimonial = (
  testimonial: Omit<TestimonialItem, 'id'>,
): Promise<TestimonialItem> =>
  request<TestimonialItem>('/api/testimonials', {
    method: 'POST',
    body: JSON.stringify(testimonial),
  })

export const getTestimonialById = (id: string): Promise<TestimonialItem> =>
  request<TestimonialItem>(`/api/testimonials/${encodeURIComponent(id)}`, { cache: 'no-store' })

export const updateTestimonial = (
  id: string,
  testimonial: Omit<TestimonialItem, 'id'>,
): Promise<TestimonialItem> =>
  request<TestimonialItem>(`/api/testimonials/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(testimonial),
  })

export const deleteTestimonial = (id: string): Promise<void> =>
  request<void>(`/api/testimonials/${encodeURIComponent(id)}`, { method: 'DELETE' })
