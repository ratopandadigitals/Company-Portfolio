
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { EventItem } from '@/data/events'
import { getEventBySlug, updateEvent } from '@/data/eventStorage'
import EventForm from '@/components/admin/events/EventForm'

const EditEventPage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const slug = params.id

  const [event, setEvent] = useState<EventItem | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setEvent(getEventBySlug(slug))
    setIsLoaded(true)
  }, [slug])

  const handleSubmit = (formData: FormData) => {
    if (!event) return

    const updatedEvent: EventItem = {
      id: event.id,
      slug: String(formData.get('slug') ?? '').trim(),
      title: String(formData.get('title') ?? '').trim(),
      date: String(formData.get('date') ?? '').trim(),
      location: String(formData.get('location') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      image: String(formData.get('image') ?? '').trim(),
      status: String(formData.get('status') ?? 'upcoming') as EventItem['status'],
      ctaLabel: String(formData.get('ctaLabel') ?? '').trim(),
    }

    const duplicateSlug = getEventBySlug(updatedEvent.slug)

    if (duplicateSlug && updatedEvent.slug !== event.slug) {
      window.alert('An event with this slug already exists.')
      return
    }

    const savedEvent = updateEvent(event.slug, updatedEvent)

    if (!savedEvent) {
      window.alert('Could not update this event.')
      return
    }

    router.push('/admin/events')
  }

  if (!isLoaded) {
    return (
      <p className="text-size-body text-text-caption">
        Loading event...
      </p>
    )
  }

  if (!event) {
    return (
      <div className="flex w-full flex-col gap-stack-content">
        <h1 className="text-size-h2 font-semibold text-text-heading">
          Event not found
        </h1>

        <p className="text-size-body text-text-caption">
          This event could not be found in the current Events data.
        </p>

        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Events
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full space-y-stack-content">
      <div>
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Events
        </Link>

        <h1 className="mt-stack-content text-size-h2 font-semibold tracking-tight text-text-heading">
          Edit event
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Update the details for {event.title}.
        </p>
      </div>

      <div className="w-full rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <EventForm
          key={event.slug}
          initialEvent={event}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditEventPage
