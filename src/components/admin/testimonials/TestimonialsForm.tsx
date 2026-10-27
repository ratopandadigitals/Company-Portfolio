
'use client'

import { useState } from 'react'
import type { TestimonialItem } from '@/data/client'
import Image from 'next/image'

type TestimonialFormProps = {
  initialTestimonial?: TestimonialItem
  submitLabel: string
  onSubmit: (formData: FormData) => void
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

  const handleImageChange = (file?: File) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      window.alert('Please select a valid image file.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setBgImage(reader.result)
      }
    }

    reader.readAsDataURL(file)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    formData.set('bgImage', bgImage)

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-content">
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
          accept="image/*"
          onChange={(event) => handleImageChange(event.target.files?.[0])}
          className={uploadClass}
        />
        <span className={helperClass}>
          Upload an image for the testimonial background.
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
              onClick={() => setBgImage('')}
              className="text-size-small font-medium text-red-500 hover:underline"
            >
              Remove image
            </button>
          </div>
        )}
      </div>

     <button
  type="submit"
  className="mt-6 block rounded-md bg-surface-primary px-5 py-3 text-size-small font-semibold text-[var(--text-primary-on-color)] transition-colors hover:bg-surface-primary-hover"
>
  {submitLabel}
</button>
    </form>
  )
}

export default TestimonialForm
