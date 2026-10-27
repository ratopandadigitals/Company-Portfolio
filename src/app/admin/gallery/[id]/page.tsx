
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { MediaItem } from '@/components/sections/gallery/MediaData'
import {
  getMediaItemById,
  updateMediaItem,
} from '@/data/galleryStorage'
import GalleryForm from '@/components/admin/gallery/GalleryForm'

const EditGalleryPage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const mediaId = Number(params.id)

  const [media, setMedia] = useState<MediaItem | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setMedia(
      Number.isInteger(mediaId) && mediaId > 0
        ? getMediaItemById(mediaId)
        : undefined,
    )
    setIsLoaded(true)
  }, [mediaId])

  const handleSubmit = (formData: FormData) => {
    if (!media) return

    const updatedMedia: MediaItem = {
      id: media.id,
      title: String(formData.get('title') ?? '').trim(),
      url: String(formData.get('url') ?? '').trim(),
      type: String(formData.get('type') ?? 'image') as MediaItem['type'],
      span: String(formData.get('span') ?? 'row-span-1'),
    }

    if (!updatedMedia.url) {
      window.alert('Please provide a media URL or select an image.')
      return
    }

    const savedMedia = updateMediaItem(media.id, updatedMedia)

    if (!savedMedia) {
      window.alert('Could not update this gallery item.')
      return
    }

    router.push('/admin/gallery')
  }

  if (!isLoaded) {
    return (
      <p className="text-size-body text-text-caption">
        Loading gallery item...
      </p>
    )
  }

  if (!media) {
    return (
      <div className="flex w-full flex-col gap-stack-content">
        <h1 className="text-size-h2 font-semibold text-text-heading">
          Gallery item not found
        </h1>

        <p className="text-size-body text-text-caption">
          This media item could not be found in the current Gallery data.
        </p>

        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Gallery
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full space-y-stack-content">
      <div>
        <Link
          href="/admin/gallery"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Gallery
        </Link>

        <h1 className="mt-stack-content text-size-h2 font-semibold tracking-tight text-text-heading">
          Edit media
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Update the details for {media.title}.
        </p>
      </div>

      <div className="w-full rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <GalleryForm
          key={media.id}
          initialMedia={media}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditGalleryPage
