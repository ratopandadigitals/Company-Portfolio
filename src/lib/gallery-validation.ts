import type { MediaItem } from '@/components/sections/gallery/MediaData'

export const parseGalleryInput = (body: unknown): Omit<MediaItem, 'id'> | null => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null

  const data = body as Record<string, unknown>
  const { type, title, url, span } = data

  if (
    (type !== 'image' && type !== 'video') ||
    typeof title !== 'string' ||
    typeof url !== 'string' ||
    (span !== 'row-span-1' && span !== 'row-span-2')
  ) {
    return null
  }

  const item: Omit<MediaItem, 'id'> = {
    type: type as MediaItem['type'],
    title: title.trim(),
    url: url.trim(),
    span,
  }

  if (
    !item.title || item.title.length > 200 ||
    !item.url || item.url.length > 2048 ||
    (item.type === 'image' && item.url.startsWith('data:'))
  ) {
    return null
  }

  return item
}