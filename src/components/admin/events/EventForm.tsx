
'use client'

import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import type { EventItem } from '@/data/eventStorage'
import Image from 'next/image'

type EventFormProps = {
  initialEvent?: EventItem
  submitLabel: string
  onSubmit: (formData: FormData) => void
}

const EventForm = ({
  initialEvent,
  submitLabel,
  onSubmit,
}: EventFormProps) => {
  const [image, setImage] = useState(initialEvent?.image ?? '')

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(new FormData(event.currentTarget))
  }

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

      <div className="space-y-stack-tight">
        <label
          htmlFor="image"
          className="block text-size-small font-medium text-text-heading"
        >
          Event image path or URL
        </label>
        <input
          id="image"
          name="image"
          type="text"
          value={image}
          onChange={handleImageChange}
          required
          className="w-full rounded-md border border-border-subtle bg-surface-page px-3 py-2 text-size-body text-text-heading outline-none focus:border-border-primary focus:ring-2"
          placeholder="/events/workshop.webp"
        />

        {image && (
          <div className="pt-stack-tight">
            <p className="mb-stack-tight text-size-caption text-text-caption">
              Image preview
            </p>
            <Image
              src={image}
              alt="Event preview"
              width={600}
              height={300}
              unoptimized
              className="h-40 w-full max-w-sm rounded-md border border-border-subtle object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end border-t border-border-subtle pt-stack-content">
        <button
          type="submit"
          className="rounded-md bg-surface-primary px-5 py-2.5 text-size-small font-semibold text-white transition-colors hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export default EventForm
