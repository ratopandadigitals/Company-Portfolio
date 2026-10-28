
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { MediaItem } from '@/components/sections/gallery/MediaData'
import Image from 'next/image'
import { AlertCircle, LoaderCircle } from 'lucide-react'

type GalleryFormProps = {
  initialMedia?: MediaItem
  submitLabel: string
  onSubmit: (formData: FormData) => void | Promise<void>
}

const MAX_FILE_SIZE = 5 * 1024 * 1024
const MAX_VIDEO_SIZE = 25 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm']

const uploadMedia = async (
  file: File,
  type: MediaItem['type'],
): Promise<string> => {
  const allowedTypes = type === 'image' ? ALLOWED_TYPES : ALLOWED_VIDEO_TYPES
  const maxFileSize = type === 'image' ? MAX_FILE_SIZE : MAX_VIDEO_SIZE
  const allowedTypesMessage = type === 'image'
    ? 'Only JPEG, PNG, and WebP images are allowed.'
    : 'Only MP4 and WebM videos are allowed.'

  if (!allowedTypes.includes(file.type)) throw new Error(allowedTypesMessage)
  if (file.size === 0 || file.size > maxFileSize) {
    throw new Error(`The ${type} must be smaller than ${type === 'image' ? '5' : '25'} MB.`)
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', 'gallery')
  formData.append('mediaType', type)

  const response = await fetch('/api/admin/uploads', {
    method: 'POST',
    body: formData,
  })
  const result: { success?: boolean; url?: string; message?: string } =
    await response.json()

  if (!response.ok || !result.success || !result.url) {
    throw new Error(result.message || `Unable to upload the ${type}.`)
  }

  return result.url
}

const GalleryForm = ({
  initialMedia,
  submitLabel,
  onSubmit,
}: GalleryFormProps) => {
  const [mediaUrl, setMediaUrl] = useState(initialMedia?.url ?? '')

  const [mediaType, setMediaType] = useState<MediaItem['type']>(
    initialMedia?.type ?? 'image',
  )
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleMediaChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const input = event.currentTarget
    const file = input.files?.[0]

    if (!file) return

    input.value = ''
    setError('')
    setIsUploading(true)
    try {
      setMediaUrl(await uploadMedia(file, mediaType))
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : `Unable to upload the ${mediaType}.`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isUploading || isSubmitting) return

    if (!mediaUrl) {
      setError(`Please upload a ${mediaType} before saving.`)
      return
    }

    const formData = new FormData(event.currentTarget)

    formData.set('type', mediaType)
    formData.set('url', mediaUrl)

    setError('')
    setIsSubmitting(true)
    Promise.resolve(onSubmit(formData))
      .catch((submitError: unknown) => {
        setError(submitError instanceof Error ? submitError.message : 'Unable to save gallery media.')
      })
      .finally(() => setIsSubmitting(false))
  }

  const labelClass =
    'block text-size-small font-medium text-heading'

  const helperClass =
    'block text-size-caption text-caption'

  const inputClass =
    'w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-size-body text-body outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-placeholder focus:border-border-primary focus:ring-2 focus:ring-[var(--primary-200)]'

  const uploadClass =
    'block w-full cursor-pointer rounded-md border border-border-subtle bg-surface-card px-3 py-2 text-size-small text-body file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-surface-section file:px-3 file:py-2 file:text-size-small file:font-medium file:text-heading'
  const isBusy = isUploading || isSubmitting

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface-card p-inset-card text-size-body text-text-primary">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}
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
            onChange={(event) => {
              const nextType = event.target.value as MediaItem['type']
              setMediaType(nextType)
              if (nextType !== initialMedia?.type) setMediaUrl('')
              setError('')
            }}
            required
            disabled={isBusy}
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
            accept="image/jpeg,image/png,image/webp"
            required={!mediaUrl}
            disabled={isBusy}
            onChange={handleMediaChange}
            className={uploadClass}
          />

          {mediaUrl && (
            <div className="flex items-center gap-3">
              <Image
            src={mediaUrl}
            alt="Gallery preview"
            width={80}
            height={80}
            unoptimized
            className="size-20 rounded-md border border-border-subtle object-cover"
            />

              <button
                type="button"
                disabled={isBusy}
                onClick={() => setMediaUrl('')}
                className="text-size-small font-medium text-text-error hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove image
              </button>
            </div>
          )}

          <span className={helperClass}>
            {isUploading ? 'Uploading image to Cloudinary...' : 'Select one JPEG, PNG, or WebP image smaller than 5 MB.'}
          </span>
        </div>
      ) : (
        <div className="block space-y-2">
          <span className={labelClass}>Gallery video</span>
          <input
            type="file"
            accept="video/mp4,video/webm"
            required={!mediaUrl}
            disabled={isBusy}
            onChange={handleMediaChange}
            className={uploadClass}
          />
          {mediaUrl && (
            <div className="space-y-2">
              <video
                src={mediaUrl}
                controls
                preload="metadata"
                className="h-40 w-full max-w-sm rounded-md border border-border-subtle bg-black object-contain"
              />
              <button
                type="button"
                disabled={isBusy}
                onClick={() => setMediaUrl('')}
                className="text-size-small font-medium text-text-error hover:underline disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove video
              </button>
            </div>
          )}
          <span className={helperClass}>
            {isUploading ? 'Uploading video to Cloudinary...' : 'Select one MP4 or WebM video smaller than 25 MB.'}
          </span>
        </div>
      )}

      <div className="flex justify-end border-t border-border-subtle pt-5">
        <button
          type="submit"
          disabled={isBusy}
className="inline-flex min-h-11 items-center justify-center rounded-md bg-surface-primary px-5 py-3 text-size-small font-semibold text-primary-on-color transition-colors duration-150 hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
>
          {isBusy && <LoaderCircle size={16} className="mr-2 animate-spin" aria-hidden="true" />}
          {isUploading ? 'Uploading image...' : isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default GalleryForm
