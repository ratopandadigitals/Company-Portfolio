
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { WorkItem } from '@/data/work'
import Image from 'next/image'

type WorkFormProps = {
  initialWork?: WorkItem
  submitLabel: string
  onSubmit: (formData: FormData) => void
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

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    onChange: (image: string) => void,
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
        onChange(reader.result)
      }
    }

    reader.onerror = () => {
      window.alert('Unable to read this image. Please try again.')
    }

    reader.readAsDataURL(file)
    event.currentTarget.value = ''
  }

  const handleGalleryChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(event.currentTarget.files ?? [])

    if (!files.length) return

    const imageFiles = files.filter((file) =>
      file.type.startsWith('image/'),
    )

    if (imageFiles.length !== files.length) {
      window.alert('Some files were skipped because they are not images.')
    }

    Promise.all(
      imageFiles.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader()

            reader.onload = () => {
              if (typeof reader.result === 'string') {
                resolve(reader.result)
              } else {
                reject(new Error('Unable to read image'))
              }
            }

            reader.onerror = () =>
              reject(new Error('Unable to read image'))

            reader.readAsDataURL(file)
          }),
      ),
    )
      .then((images) => setGallery((current) => [...current, ...images]))
      .catch(() => {
        window.alert('Unable to load the selected images. Please try again.')
      })

    event.currentTarget.value = ''
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    formData.set('previewImage', previewImage)
    formData.set('bgImage', bgImage)
    formData.set('gallery', gallery.join('\n'))

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
            accept="image/*"
            required={!previewImage}
            onChange={(event) =>
              handleImageChange(event, setPreviewImage)
            }
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
            accept="image/*"
            required={!bgImage}
            onChange={(event) =>
              handleImageChange(event, setBgImage)
            }
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
          accept="image/*"
          multiple
          onChange={handleGalleryChange}
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
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-surface-primary px-5 py-3 text-size-small font-semibold text-[var(--text-primary-on-color)] transition-colors duration-150 hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--border-primary)]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default WorkForm
