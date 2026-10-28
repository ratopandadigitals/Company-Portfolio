
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { ServiceItem } from '@/components/sections/services/Service'
import Image from 'next/image'
import { AlertCircle, LoaderCircle } from 'lucide-react'

type ServiceFormProps = {
  initialService?: ServiceItem
  submitLabel: string
  onSubmit: (formData: FormData) => void | Promise<void>
}

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

const TIMELINE_OPTIONS = [
  '1-2 Weeks',
  '2-3 Weeks',
  '3-4 Weeks',
  '4-6 Weeks',
  '6-8 Weeks',
]

const ServiceForm = ({
  initialService,
  submitLabel,
  onSubmit,
}: ServiceFormProps) => {
  const [image, setImage] = useState(initialService?.image ?? '')
  const [tags, setTags] = useState<string[]>(
    initialService?.tags ?? [],
  )
  const [price, setPrice] = useState(
    (initialService?.price ?? '').replace(/^RS\s*/i, ''),
  )
  const [timeline, setTimeline] = useState(
    initialService?.timeline ?? TIMELINE_OPTIONS[1],
  )
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
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
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('folder', 'services')

      const response = await fetch('/api/admin/uploads', {
        method: 'POST',
        body: uploadData,
      })

      const result: {
        success?: boolean
        url?: string
        message?: string
      } = await response.json()

      if (!response.ok || !result.success || !result.url) {
        throw new Error(
          result.message ?? 'Unable to upload the image.',
        )
      }

      setImage(result.url)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Image upload failed. Please try again.',
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (isUploading || isSubmitting) return

    if (!image) {
      setError('Please upload an image before saving the service.')
      return
    }

    const numericPrice = price.trim()

    if (
      !numericPrice ||
      !/^\d+(\.\d{1,2})?$/.test(numericPrice) ||
      Number(numericPrice) <= 0
    ) {
      setError('Please enter a valid price greater than zero.')
      return
    }

    setError('')
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)

      formData.set('image', image)
      formData.set('price', `RS ${numericPrice}`)
      formData.set('timeline', timeline)
      formData.set('tags', tags.join('\n'))

      await onSubmit(formData)
    } catch {
      setError('Something went wrong while saving the service.')
    } finally {
      setIsSubmitting(false)
    }
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
      <div className="grid gap-5 sm:grid-cols-2">
        {initialService && (
          <label className="space-y-2">
            <span className={labelClass}>Service ID</span>
            <input
              name="id"
              value={initialService.id}
              readOnly
              className={`${inputClass} cursor-not-allowed opacity-70`}
            />
            <span className={helperClass}>
              The service ID cannot be changed when editing.
            </span>
          </label>
        )}

        <label className="space-y-2">
          <span className={labelClass}>Label</span>
          <input
            name="label"
            defaultValue={initialService?.label ?? ''}
            required
            className={inputClass}
            placeholder="Brand & Design System"
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className={labelClass}>Service title</span>
          <input
            name="title"
            defaultValue={initialService?.title ?? ''}
            required
            className={inputClass}
            placeholder="Enter service title"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className={labelClass}>Description</span>
        <textarea
          name="description"
          defaultValue={initialService?.description ?? ''}
          required
          rows={4}
          className={inputClass}
          placeholder="Describe the service..."
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClass}>Price</span>
<span className="flex items-center overflow-hidden rounded-md border border-border-subtle bg-surface-card focus-within:border-border-primary focus-within:ring-2 focus-within:ring-primary">            <span className="border-r border-border-subtle px-4 py-3 text-size-body text-caption">
              RS
            </span>
            <input
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
              className="w-full min-w-0 bg-transparent px-4 py-3 text-size-body text-body outline-none"
              placeholder="1000"
            />
          </span>
        </label>

        <label className="space-y-2">
          <span className={labelClass}>Timeline</span>
          <select
            name="timeline"
            value={timeline}
            onChange={(event) => setTimeline(event.target.value)}
            required
            className={inputClass}
          >
            {TIMELINE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}

            {initialService?.timeline &&
              !TIMELINE_OPTIONS.includes(initialService.timeline) && (
                <option value={initialService.timeline}>
                  {initialService.timeline}
                </option>
              )}
          </select>
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className={labelClass}>Width</span>
          <input
            type="number"
            name="width"
            defaultValue={initialService?.width ?? ''}
            min={1}
            className={inputClass}
            placeholder="Optional width"
          />
          <span className={helperClass}>
            Optional. Leave empty if the service does not need a custom width.
          </span>
        </label>
      </div>

      <label className="block space-y-2">
        <span className={labelClass}>Tags</span>
        <textarea
          name="tags"
          defaultValue={tags.join('\n')}
          required
          rows={4}
          className={inputClass}
          placeholder={'Logo Design\nBrand Guidelines\nColor & Typography'}
          onChange={(event) =>
            setTags(
              event.target.value
                .split('\n')
                .map((tag) => tag.trimStart()),
            )
          }
        />
        <span className={helperClass}>
          Enter one tag per line.
        </span>
      </label>

      <div className="space-y-2">
        <span className={labelClass}>Service image</span>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={!image}
          disabled={isBusy}
          onChange={handleImageChange}
          className={uploadClass}
        />

        {isUploading && (
          <p
            className="flex items-center gap-2 text-size-small text-text-caption"
            role="status"
          >
            <LoaderCircle
              size={16}
              className="animate-spin"
              aria-hidden="true"
            />
            Uploading image to Cloudinary...
          </p>
        )}

        {image && (
          <div className="flex items-center gap-3">
            <Image
              src={image}
              alt="Service preview"
              width={64}
              height={64}
              unoptimized
              className="size-16 rounded-md border border-border-subtle object-cover"
            />

            <button
              type="button"
              disabled={isBusy}
              onClick={() => {
                setImage('')
                setError('')
              }}
              className="text-size-small font-medium text-text-error hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove image
            </button>
          </div>
        )}

        <span className={helperClass}>
          Select one JPEG, PNG, or WebP image smaller than 5 MB.
        </span>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface-card p-inset-card text-size-body text-text-primary"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <p>{error}</p>
        </div>
      )}

      <div className="flex justify-end border-t border-border-subtle pt-5">
        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-surface-primary px-5 py-3 text-size-small font-semibold text-primary-on-color transition-colors duration-150 hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy && (
            <LoaderCircle
              size={16}
              className="animate-spin"
              aria-hidden="true"
            />
          )}
          {isUploading
            ? 'Uploading image...'
            : isSubmitting
              ? 'Saving...'
              : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default ServiceForm
