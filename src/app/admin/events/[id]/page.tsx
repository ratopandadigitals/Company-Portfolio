
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { EventItem } from '@/data/eventStorage'
import {
  getEventBySlug,
  updateEvent,
} from '@/data/eventStorage'
import EventForm from '@/components/admin/events/EventForm'

const EditEventPage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const eventId = params.id

  const [event, setEvent] = useState<EventItem | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    let active = true
    getEventBySlug(eventId)
      .then((loadedEvent) => {
        if (active) setEvent(loadedEvent)
      })
      .catch(() => {
        if (active) setEvent(undefined)
      })
      .finally(() => {
        if (active) setIsLoaded(true)
      })

    return () => { active = false }
  }, [eventId])

  const handleSubmit = async (formData: FormData) => {
    if (!event) return

    const updatedEvent: Omit<EventItem, 'id'> = {
      title: String(formData.get('title') ?? '').trim(),
      slug: String(formData.get('slug') ?? '').trim(),
      date: String(formData.get('date') ?? '').trim(),
      location: String(formData.get('location') ?? '').trim(),
      status: String(formData.get('status') ?? 'upcoming') as EventItem['status'],
      ctaLabel: String(formData.get('ctaLabel') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      image: String(formData.get('image') ?? '').trim(),
    }

    try {
      await updateEvent(event.slug, updatedEvent)
      router.push('/admin/events')
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Could not update this event.')
    }
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
          key={event.id}
          initialEvent={event}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditEventPage
