
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { EventItem } from '@/data/eventStorage'
import Image from 'next/image'
import { AlertCircle, LoaderCircle } from 'lucide-react'

type EventFormProps = {
  initialEvent?: EventItem
  submitLabel: string
  onSubmit: (formData: FormData) => void | Promise<void>
}

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const uploadImage = async (file: File): Promise<string> => {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only JPEG, PNG, and WebP images are allowed.')
  }

  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    throw new Error('The image must be smaller than 5 MB.')
  }

  const uploadData = new FormData()
  uploadData.append('file', file)
  uploadData.append('folder', 'events')

  const response = await fetch('/api/admin/uploads', {
    method: 'POST',
    body: uploadData,
  })
  const result: { success?: boolean; url?: string; message?: string } =
    await response.json()

  if (!response.ok || !result.success || !result.url) {
    throw new Error(result.message || 'Unable to upload the image.')
  }

  return result.url
}

const EventForm = ({
  initialEvent,
  submitLabel,
  onSubmit,
}: EventFormProps) => {
  const [image, setImage] = useState(initialEvent?.image ?? '')
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget
    const file = input.files?.[0]

    input.value = ''
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPEG, PNG, and WebP images are allowed.')
      return
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      setError('The image must be smaller than 5 MB.')
      return
    }

    setError('')
    setIsUploading(true)
    try {
      setImage(await uploadImage(file))
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload the image.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isUploading || isSubmitting) return
    if (!image) {
      setError('Please upload an image before saving the event.')
      return
    }

    const formData = new FormData(event.currentTarget)
    formData.set('image', image)
    setError('')
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save the event.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isBusy = isUploading || isSubmitting

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-content">
      <div className="grid gap-card-gap sm:grid-cols-2">
        <div className="space-y-stack-tight">
          <label
            htmlFor="title"
            className="block text-size-small font-medium text-text-heading"
          >
            Event title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={initialEvent?.title ?? ''}
            required
            className="w-full rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-body text-text-heading outline-none focus:border-border-primary focus:ring-2"
            placeholder="Design Systems Workshop"
          />
        </div>

        <div className="space-y-stack-tight">
          <label
            htmlFor="slug"
            className="block text-size-small font-medium text-text-heading"
          >
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            defaultValue={initialEvent?.slug ?? ''}
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            title="Use lowercase letters, numbers, and hyphens."
            className="w-full rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-body text-text-heading outline-none focus:border-border-primary focus:ring-2"
            placeholder="design-systems-workshop"
          />
          <p className="text-size-caption text-text-caption">
            Use lowercase letters, numbers, and hyphens.
          </p>
        </div>

        <div className="space-y-stack-tight">
          <label
            htmlFor="date"
            className="block text-size-small font-medium text-text-heading"
          >
            Event date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initialEvent?.date ?? ''}
            required
            className="w-full rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-body text-text-heading outline-none focus:border-border-primary focus:ring-2"
          />
        </div>

        <div className="space-y-stack-tight">
          <label
            htmlFor="location"
            className="block text-size-small font-medium text-text-heading"
          >
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            defaultValue={initialEvent?.location ?? ''}
            required
            className="w-full rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-body text-text-heading outline-none focus:border-border-primary focus:ring-2"
            placeholder="Kathmandu, Nepal"
          />
        </div>

        <div className="space-y-stack-tight">
          <label
            htmlFor="status"
            className="block text-size-small font-medium text-text-heading"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={initialEvent?.status ?? 'upcoming'}
            required
            className="w-full rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-body text-text-heading outline-none focus:border-border-primary focus:ring-2"
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
        </div>

        <div className="space-y-stack-tight">
          <label
            htmlFor="ctaLabel"
            className="block text-size-small font-medium text-text-heading"
          >
            Button label
          </label>
          <input
            id="ctaLabel"
            name="ctaLabel"
            type="text"
            defaultValue={initialEvent?.ctaLabel ?? ''}
            required
            className="w-full rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-body text-text-heading outline-none focus:border-border-primary focus:ring-2"
            placeholder="Register now"
          />
        </div>
      </div>

      <div className="space-y-stack-tight">
        <label
          htmlFor="description"
          className="block text-size-small font-medium text-text-heading"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={initialEvent?.description ?? ''}
          required
          rows={5}
          className="w-full resize-y rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-body text-text-heading outline-none focus:border-border-primary focus:ring-2"
          placeholder="Describe the event..."
        />
      </div>

           <div className="space-y-2">
        <span className="block text-size-small font-medium text-text-heading">
          Event image
        </span>

        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={!image}
          disabled={isBusy}
          onChange={handleImageChange}
          className="block w-full cursor-pointer rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-small text-text-heading file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-surface-card file:px-3 file:py-2 file:text-size-small file:font-medium file:text-text-heading"
        />

        {image && (
          <div className="flex items-center gap-3">
            <Image
              src={image}
              alt="Event preview"
              width={80}
              height={80}
              unoptimized
              className="size-20 rounded-md border border-border-subtle object-cover"
            />

            <button
              type="button"
              disabled={isBusy}
              onClick={() => setImage('')}
              className="text-size-small font-medium text-text-error hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove image
            </button>
          </div>
        )}

        <span className="block text-size-caption text-text-caption">
          {isUploading
            ? 'Uploading image to Cloudinary...'
            : 'Select one JPEG, PNG, or WebP image smaller than 5 MB.'}
        </span>
      </div>
      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface-card p-inset-card text-size-body text-text-primary">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-end border-t border-border-subtle pt-stack-content">
        <button
          type="submit"
          disabled={isBusy}
          className="rounded-md bg-surface-primary px-5 py-2.5 text-size-small font-semibold text-white transition-colors hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
        >
          {isBusy && <LoaderCircle size={16} className="mr-2 inline animate-spin" aria-hidden="true" />}
          {isUploading ? 'Uploading image...' : isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default EventForm
