
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { WorkItem } from '@/data/works'
import Image from 'next/image'

type WorkFormProps = {
  initialWork?: WorkItem
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
    throw new Error('Each image must be smaller than 5 MB.')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', 'works')

  const response = await fetch('/api/admin/uploads', {
    method: 'POST',
    body: formData,
  })
  const result: { success?: boolean; url?: string; message?: string } =
    await response.json()

  if (!response.ok || !result.success || !result.url) {
    throw new Error(result.message || 'Unable to upload the image.')
  }

  return result.url
}

const WorkForm = ({
  initialWork,
  submitLabel,
  onSubmit,
}: WorkFormProps) => {
  const [previewImage, setPreviewImage] = useState(
    initialWork?.previewImage ?? '',
  )
  const [bgImage, setBgImage] = useState(
    initialWork?.bgImage ?? '',
  )
  const [gallery, setGallery] = useState<string[]>(
    initialWork?.gallery ?? [],
  )
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (image: string) => void,
  ) => {
    const input = event.currentTarget
    const file = input.files?.[0]

    if (!file) return

    input.value = ''
    setError('')
    setIsUploading(true)

    try {
      onChange(await uploadImage(file))
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : 'Unable to upload the image. Please try again.',
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handleGalleryChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const input = event.currentTarget
    const files = Array.from(input.files ?? [])
    input.value = ''

    if (!files.length) return

    setError('')
    setIsUploading(true)

    try {
      const images = await Promise.all(files.map(uploadImage))
      setGallery((current) => [...current, ...images])
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : 'Unable to upload gallery images. Please try again.',
      )
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isUploading || isSubmitting) return

    const formData = new FormData(event.currentTarget)

    formData.set('previewImage', previewImage)
    formData.set('bgImage', bgImage)
    formData.set('gallery', gallery.join('\n'))

    setError('')
    setIsSubmitting(true)

    try {
      await onSubmit(formData)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to save the project. Please try again.',
      )
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
      {error && (
        <p role="alert" className="text-size-small text-text-error">
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClass}>Project title</span>
          <input
            name="title"
            defaultValue={initialWork?.title ?? ''}
            required
            className={inputClass}
            placeholder="Enter project title"
          />
        </label>

        <label className="space-y-2">
          <span className={labelClass}>Slug</span>
          <input
            name="slug"
            defaultValue={initialWork?.slug ?? ''}
            required
            pattern="[A-Za-z0-9-]+"
            title="Use letters, numbers, and hyphens only."
            className={inputClass}
            placeholder="project-name"
          />
          <span className={helperClass}>
            Used for the public project URL.
          </span>
        </label>

        {initialWork ? (
          <label className="space-y-2">
            <span className={labelClass}>Project ID</span>
            <input
              value={initialWork.id}
              readOnly
              className={`${inputClass} cursor-not-allowed opacity-70`}
            />
            <span className={helperClass}>
              Generated automatically from the total number of projects.
            </span>
          </label>
        ) : (
          <div className="space-y-2">
            <span className={labelClass}>Project ID</span>
            <div
              className={`${inputClass} text-caption`}
              aria-live="polite"
            >
              Generated automatically
            </div>
            <span className={helperClass}>
              Assigned when you save the project. Project numbers update
              when projects are added or deleted.
            </span>
          </div>
        )}

        <label className="space-y-2">
          <span className={labelClass}>Year</span>
          <input
            name="year"
            defaultValue={initialWork?.year ?? ''}
            required
            className={inputClass}
            placeholder="2026"
          />
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className={labelClass}>Role</span>
          <input
            name="role"
            defaultValue={initialWork?.role ?? ''}
            required
            className={inputClass}
            placeholder="UI/UX Designer"
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span className={labelClass}>Description</span>
        <textarea
          name="description"
          defaultValue={initialWork?.description ?? ''}
          required
          rows={4}
          className={inputClass}
          placeholder="Describe the project..."
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelClass}>Services</span>
          <textarea
            name="services"
            defaultValue={initialWork?.services.join('\n') ?? ''}
            required
            rows={4}
            className={inputClass}
            placeholder={'UI Design & Prototyping\nUX Research'}
          />
          <span className={helperClass}>
            Enter one service per line.
          </span>
        </label>

        <label className="space-y-2">
          <span className={labelClass}>Tools</span>
          <textarea
            name="tools"
            defaultValue={initialWork?.tools.join('\n') ?? ''}
            required
            rows={4}
            className={inputClass}
            placeholder={'Figma\nNext.js'}
          />
          <span className={helperClass}>
            Enter one tool per line.
          </span>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <span className={labelClass}>Preview image</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required={!previewImage}
            onChange={(event) =>
              handleImageChange(event, setPreviewImage)
            }
            disabled={isBusy}
            className={uploadClass}
          />
          {previewImage && (
            <div className="flex items-center gap-3">
          <Image
            src={previewImage}
            alt="Project preview"
            width={64}
            height={64}
            unoptimized
            className="size-16 rounded-md border border-border-subtle object-cover"
          />
              <button
                type="button"
                onClick={() => setPreviewImage('')}
                className="text-size-small font-medium text-text-error hover:underline"
              >
                Remove image
              </button>
            </div>
          )}
          <span className={helperClass}>
            Select one image for the project preview.
          </span>
        </div>

        <div className="space-y-2">
          <span className={labelClass}>Background image</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            required={!bgImage}
            onChange={(event) =>
              handleImageChange(event, setBgImage)
            }
            disabled={isBusy}
            className={uploadClass}
          />
          {bgImage && (
            <div className="flex items-center gap-3">
          <Image
          src={bgImage}
          alt="Project background"
          width={64}
          height={64}
          unoptimized
          className="size-16 rounded-md border border-border-subtle object-cover"
            />
              <button
                type="button"
                onClick={() => setBgImage('')}
                className="text-size-small font-medium text-text-error hover:underline"
              >
                Remove image
              </button>
            </div>
          )}
          <span className={helperClass}>
            Select one background image.
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <span className={labelClass}>Gallery images</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleGalleryChange}
          disabled={isBusy}
          className={uploadClass}
        />

        {gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {gallery.map((image, index) => (
              <div
                key={`${image.slice(0, 40)}-${index}`}
                className="overflow-hidden rounded-md border border-border-subtle bg-surface-card"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  width={400}
                  height={225}
                  unoptimized
                  className="aspect-video w-full object-cover"
                />
                <div className="flex items-center justify-between gap-2 p-2">
                  <span className="truncate text-size-caption text-caption">
                    Image {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setGallery((current) =>
                        current.filter((_, i) => i !== index),
                      )
                    }
                    className="text-size-caption font-medium text-text-error hover:underline"
                    aria-label={`Remove gallery image ${index + 1}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <span className={helperClass}>
          Select multiple images for the project gallery.
        </span>
      </div>

      <div className="flex justify-end border-t border-border-subtle pt-5">
        <button
          type="submit"
          disabled={isBusy}
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-surface-primary px-5 py-3 text-size-small font-semibold text-text-primary-on-color transition-colors duration-150 hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? 'Uploading images...' : isSubmitting ? 'Saving project...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default WorkForm
