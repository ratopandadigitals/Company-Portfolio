
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { ServiceItem } from '@/data/serviceStorage'
import Image from 'next/image'

type ServiceFormProps = {
  initialService?: ServiceItem
  submitLabel: string
  onSubmit: (formData: FormData) => void
}

const ServiceForm = ({
  initialService,
  submitLabel,
  onSubmit,
}: ServiceFormProps) => {
  const [image, setImage] = useState(initialService?.image ?? '')

  const [tags, setTags] = useState<string[]>(
    initialService?.tags ?? [],
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

    formData.set('image', image)
    formData.set('tags', tags.join('\n'))

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
          <span className={labelClass}>Service ID</span>
          <input
            name="id"
            defaultValue={initialService?.id ?? ''}
            required
            pattern="[A-Za-z0-9-]+"
            title="Use letters, numbers, and hyphens only."
            readOnly={Boolean(initialService)}
            className={`${inputClass} ${
              initialService ? 'cursor-not-allowed opacity-70' : ''
            }`}
            placeholder="brand-design-system"
          />
          <span className={helperClass}>
            Used to identify this service. It cannot be changed when editing.
          </span>
        </label>

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
          <input
            name="price"
            defaultValue={initialService?.price ?? ''}
            required
            className={inputClass}
            placeholder="RS 1000"
          />
        </label>

        <label className="space-y-2">
          <span className={labelClass}>Timeline</span>
          <input
            name="timeline"
            defaultValue={initialService?.timeline ?? ''}
            required
            className={inputClass}
            placeholder="2-3 Weeks"
          />
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
          accept="image/*"
          required={!image}
          onChange={handleImageChange}
          className={uploadClass}
        />

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
              onClick={() => setImage('')}
              className="text-size-small font-medium text-text-error hover:underline"
            >
              Remove image
            </button>
          </div>
        )}

        <span className={helperClass}>
          Select one image for this service.
        </span>
      </div>

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

export default ServiceForm
