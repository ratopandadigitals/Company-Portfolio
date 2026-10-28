
import type { MediaItem } from '@/components/sections/gallery/MediaData'

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
    throw new Error(result.message || 'Unable to save gallery data.')
  }

  return result.data
}

export const getMediaItems = (): Promise<MediaItem[]> =>
  request<MediaItem[]>('/api/gallery', { cache: 'no-store' })

export const getMediaItemById = (id: number): Promise<MediaItem> =>
  request<MediaItem>(`/api/gallery/${id}`, { cache: 'no-store' })

export const createMediaItem = (
  item: Omit<MediaItem, 'id'>,
): Promise<MediaItem> =>
  request<MediaItem>('/api/gallery', {
    method: 'POST',
    body: JSON.stringify(item),
  })

export const updateMediaItem = (
  id: number,
  updatedItem: Omit<MediaItem, 'id'>,
): Promise<MediaItem> =>
  request<MediaItem>(`/api/gallery/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedItem),
  })

export const deleteMediaItem = (id: number): Promise<void> =>
  request<void>(`/api/gallery/${id}`, { method: 'DELETE' })
