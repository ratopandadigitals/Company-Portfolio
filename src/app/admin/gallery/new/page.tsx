'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { MediaItem } from '@/components/sections/gallery/MediaData'
import GalleryForm from '@/components/admin/gallery/GalleryForm'
import { createMediaItem } from '@/data/galleryStorage'

const NewGalleryPage = () => {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const title = String(formData.get('title') ?? '').trim()
    const url = String(formData.get('url') ?? '').trim()

    const mediaItem: Omit<MediaItem, 'id'> = {
      title,
      url,
      type: String(formData.get('type') ?? 'image') as MediaItem['type'],
      span: String(formData.get('span') ?? 'row-span-1'),
    }

    try {
      await createMediaItem(mediaItem)
      router.push('/admin/gallery')
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to add gallery item.')
    }
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
          Add media
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Add an image or video to your portfolio gallery.
        </p>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <GalleryForm
          onSubmit={handleSubmit}
          submitLabel="Add media"
        />
      </div>
    </div>
  )
}

export default NewGalleryPage