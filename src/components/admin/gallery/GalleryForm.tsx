
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { MediaItem } from '@/components/sections/gallery/MediaData'
import Image from 'next/image'

type GalleryFormProps = {
  initialMedia?: MediaItem
  submitLabel: string
  onSubmit: (formData: FormData) => void
}

const GalleryForm = ({
  initialMedia,
  submitLabel,
  onSubmit,
}: GalleryFormProps) => {
  const [image, setImage] = useState(
    initialMedia?.type === 'image' ? initialMedia.url : '',
  )

  const [mediaType, setMediaType] = useState<MediaItem['type']>(
    initialMedia?.type ?? 'image',
  )

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.currentTarget.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      window.alert('Please select a valid image file.')
      event.currentTarget.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result)
      }
    }

    reader.onerror = () => {
      window.alert('Unable to read this image. Please try again.')
    }

    reader.readAsDataURL(file)
    event.currentTarget.value = ''
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    formData.set('type', mediaType)
    formData.set(
      'url',
      mediaType === 'image'
        ? image
        : String(formData.get('url') ?? '').trim(),
    )

    onSubmit(formData)
  }

  const labelClass =
    'block text-size-small font-medium text-heading'

  const helperClass =
    'block text-size-caption text-caption'

  const inputClass =
    'w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-size-body text-body outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-placeholder focus:border-border-primary focus:ring-2 focus:ring-[var(--primary-200)]'

  const uploadClass =
    'block w-full cursor-pointer rounded-md border border-border-subtle bg-surface-card px-3 py-2 text-size-small text-body file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-surface-section file:px-3 file:py-2 file:text-size-small file:font-medium file:text-heading'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClass}>Media ID</span>
          <input
            name="id"
            value={initialMedia?.id ?? 'Generated automatically'}
            readOnly
            className={`${inputClass} cursor-not-allowed opacity-70`}
          />
          <span className={helperClass}>
            Generated automatically when the media item is created.
          </span>
        </label>

        <label className="space-y-2">
          <span className={labelClass}>Title</span>
          <input
            name="title"
            defaultValue={initialMedia?.title ?? ''}
            required
            className={inputClass}
            placeholder="Enter media title"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClass}>Media type</span>
          <select
            name="type"
            value={mediaType}
            onChange={(event) =>
              setMediaType(event.target.value as MediaItem['type'])
            }
            required
            className={inputClass}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className={labelClass}>Grid span</span>
          <select
            name="span"
            defaultValue={initialMedia?.span ?? 'row-span-1'}
            required
            className={inputClass}
          >
            <option value="row-span-1">One row</option>
            <option value="row-span-2">Two rows</option>
          </select>
        </label>
      </div>

      {mediaType === 'image' ? (
        <div className="space-y-2">
          <span className={labelClass}>Gallery image</span>

          <input
            type="file"
            accept="image/*"
            required={!image}
            onChange={handleImageChange}
            className={uploadClass}
          />

          {image && (
            <div className="flex items-center gap-3">
              <Image
            src={image}
            alt="Gallery preview"
            width={80}
            height={80}
            unoptimized
            className="size-20 rounded-md border border-border-subtle object-cover"
            />

              <button
                type="button"
                onClick={() => setImage('')}
                className="text-size-small font-medium text-text-error hover:underline"
              >
                Remove image
              </button>
            </div>
          )}

          <span className={helperClass}>
            Select one image for your gallery. The preview updates after selection.
          </span>
        </div>
      ) : (
        <label className="block space-y-2">
          <span className={labelClass}>Video URL or path</span>
          <input
            name="url"
            type="text"
            defaultValue={initialMedia?.type === 'video' ? initialMedia.url : ''}
            required
            className={inputClass}
            placeholder="https://example.com/video.mp4"
          />
          <span className={helperClass}>
            Enter the video URL or public asset path.
          </span>
        </label>
      )}

      <div className="flex justify-end border-t border-border-subtle pt-5">
        <button
          type="submit"
className="inline-flex min-h-11 items-center justify-center rounded-md bg-surface-primary px-5 py-3 text-size-small font-semibold text-primary-on-color transition-colors duration-150 hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
>
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default GalleryForm
