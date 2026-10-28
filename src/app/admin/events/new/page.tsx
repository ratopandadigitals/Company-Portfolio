
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { EventItem } from '@/data/events'
import EventForm from '@/components/admin/events/EventForm'
import { createEvent } from '@/data/eventStorage'

const NewEventPage = () => {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const slug = String(formData.get('slug') ?? '').trim()

    const event: Omit<EventItem, 'id'> = {
      slug,
      title: String(formData.get('title') ?? '').trim(),
      date: String(formData.get('date') ?? '').trim(),
      location: String(formData.get('location') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      image: String(formData.get('image') ?? '').trim(),
      status: String(formData.get('status') ?? 'upcoming') as EventItem['status'],
      ctaLabel: String(formData.get('ctaLabel') ?? '').trim(),
    }

    try {
      await createEvent(event)
      router.push('/admin/events')
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to create event.')
    }
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
          Add event
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Add the event information displayed on your portfolio.
        </p>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <EventForm
          onSubmit={handleSubmit}
          submitLabel="Create event"
        />
      </div>
    </div>
  )
}

export default NewEventPage
