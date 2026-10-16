
import { mediaItems, type MediaItem } from '@/components/sections/gallery/MediaData'

const STORAGE_KEY = 'admin-gallery'

const getInitialMediaItems = (): MediaItem[] => {
  return mediaItems
}

export const getMediaItems = (): MediaItem[] => {
  if (typeof window === 'undefined') {
    return getInitialMediaItems()
  }

  const storedItems = localStorage.getItem(STORAGE_KEY)

  if (!storedItems) {
    return getInitialMediaItems()
  }

  try {
    return JSON.parse(storedItems) as MediaItem[]
  } catch {
    return getInitialMediaItems()
  }
}

const saveMediaItems = (items: MediaItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const createMediaItem = (
  item: Omit<MediaItem, 'id'>,
): MediaItem => {
  const items = getMediaItems()

  const newItem: MediaItem = {
    ...item,
    id: items.reduce((maxId, current) => Math.max(maxId, current.id), 0) + 1,
  }

  saveMediaItems([...items, newItem])

  return newItem
}

export const getMediaItemById = (
  id: number,
): MediaItem | undefined => {
  return getMediaItems().find((item) => item.id === id)
}

export const updateMediaItem = (
  id: number,
  updatedItem: MediaItem,
): MediaItem | undefined => {
  const items = getMediaItems()
  const index = items.findIndex((item) => item.id === id)

  if (index === -1) {
    return undefined
  }

  const updatedItems = [...items]
  updatedItems[index] = { ...updatedItem, id }

  saveMediaItems(updatedItems)

  return updatedItems[index]
}

export const deleteMediaItem = (id: number): boolean => {
  const items = getMediaItems()
  const updatedItems = items.filter((item) => item.id !== id)

  if (updatedItems.length === items.length) {
    return false
  }

  saveMediaItems(updatedItems)

  return true
}
