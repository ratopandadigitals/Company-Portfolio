
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { TestimonialItem } from '@/data/client'
import Image from 'next/image'
import { AlertCircle, LoaderCircle } from 'lucide-react'

type TestimonialFormProps = {
  initialTestimonial?: TestimonialItem
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
  uploadData.append('folder', 'testimonials')

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

const labelClass = 'block text-size-small font-medium text-heading'

const helperClass = 'block text-size-caption text-caption'

const inputClass =
  'w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-size-body text-body outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-placeholder focus:border-border-primary focus:ring-2 focus:ring-[var(--primary-200)]'

const uploadClass =
  'block w-full cursor-pointer rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-size-body text-body file:mr-4 file:rounded-md file:border-0 file:bg-surface-page file:px-3 file:py-2 file:text-size-small file:font-medium file:text-heading'

const TestimonialForm = ({
  initialTestimonial,
  submitLabel,
  onSubmit,
}: TestimonialFormProps) => {
  const [bgImage, setBgImage] = useState(initialTestimonial?.bgImage ?? '')
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
      setBgImage(await uploadImage(file))
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Unable to upload the image.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isUploading || isSubmitting) return

    const formData = new FormData(event.currentTarget)
    formData.set('bgImage', bgImage)

    setError('')
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save the testimonial.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isBusy = isUploading || isSubmitting

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-content">
      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface-card p-inset-card text-size-body text-text-primary">
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}
      {initialTestimonial && (
        <div className="space-y-2">
          <label className={labelClass}>Testimonial ID</label>
          <input
            value={initialTestimonial.id}
            readOnly
            className={`${inputClass} cursor-not-allowed opacity-70`}
          />
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="quote" className={labelClass}>
          Testimonial Quote
        </label>
        <textarea
          id="quote"
          name="quote"
          defaultValue={initialTestimonial?.quote ?? ''}
          placeholder="Enter the client's testimonial"
          rows={5}
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="name" className={labelClass}>
          Client Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={initialTestimonial?.name ?? ''}
          placeholder="e.g. Dipesh Basnet"
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className={labelClass}>
          Client Role
        </label>
        <input
          id="role"
          name="role"
          defaultValue={initialTestimonial?.role ?? ''}
          placeholder="e.g. Co-founder, NovaTech"
          required
          className={inputClass}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="bgImage" className={labelClass}>
          Background Image
        </label>
        <input
          id="bgImage"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isBusy}
          onChange={handleImageChange}
          className={uploadClass}
        />
        <span className={helperClass}>
          {isUploading ? 'Uploading image to Cloudinary...' : 'Optional. Select one JPEG, PNG, or WebP image smaller than 5 MB.'}
        </span>

        {bgImage && (
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-border-subtle">
              <Image
                src={bgImage}
                alt="Testimonial background preview"
                width={800}
                height={300}
                unoptimized
                className="h-48 w-full object-cover"
              />
            </div>

            <button
              type="button"
              disabled={isBusy}
              onClick={() => setBgImage('')}
              className="text-size-small font-medium text-red-500 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              Remove image
            </button>
          </div>
        )}
      </div>

     <button
  type="submit"
  disabled={isBusy}
  className="mt-6 block rounded-md bg-surface-primary px-5 py-3 text-size-small font-semibold text-(--text-primary-on-color) transition-colors hover:bg-surface-primary-hover"
>
  {isBusy && <LoaderCircle size={16} className="mr-2 inline animate-spin" aria-hidden="true" />}
  {isUploading ? 'Uploading image...' : isSubmitting ? 'Saving...' : submitLabel}
</button>
    </form>
  )
}

export default TestimonialForm
