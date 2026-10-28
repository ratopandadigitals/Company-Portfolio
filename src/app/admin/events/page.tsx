
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  CalendarDays,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react'
import type { EventItem } from '@/data/events'
import { deleteEvent, getEvents } from '@/data/eventStorage'
import DataTable from '@/components/admin/shared/DataTable'
import AdminSearchInput from '@/components/admin/shared/AdminSearchInput'
import Image from 'next/image'


const EventsPage = () => {
  const [events, setEvents] = useState<EventItem[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    getEvents()
      .then(setEvents)
      .catch(() => setError('Unable to load events. Please try again.'))
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false)
      })

    return () => controller.abort()
  }, [])

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return events

    return events.filter((event) =>
      [
        event.id,
        event.slug,
        event.title,
        event.date,
        event.location,
        event.description,
        event.status,
        event.ctaLabel,
      ].some((value) => value.toLowerCase().includes(query)),
    )
  }, [events, search])

  const handleDelete = async (event: EventItem) => {
    const confirmed = window.confirm(
      `Delete the event "${event.title}"?`,
    )

    if (!confirmed) return

    try {
      await deleteEvent(event.slug)
      setEvents((current) => current.filter((item) => item.slug !== event.slug))
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete event.')
    }
  }

  const columns = [
    {
      label: 'Event',
      render: (event: EventItem) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-page">
            <Image
            src={event.image}
            alt={`${event.title} preview`}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
             </div>

          <div className="min-w-0">
            <p className="font-semibold text-text-heading">
              {event.title}
            </p>

            <p className="mt-1 text-size-caption text-text-caption">
              {event.slug}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: 'Event ID',
      render: (event: EventItem) => event.id,
    },
    {
      label: 'Date',
      render: (event: EventItem) => event.date,
    },
    {
      label: 'Location',
      render: (event: EventItem) => event.location,
    },
    {
      label: 'Status',
      render: (event: EventItem) => event.status,
    },
    {
      label: 'Actions',
      render: (event: EventItem) => (
        <div className="flex items-center gap-6">
          <Link
            href={`/admin/events/${encodeURIComponent(event.slug)}`}
            title="Edit event"
            aria-label={`Edit ${event.title}`}
            className="rounded-md border border-border-success bg-surface-success p-2 text-white transition-colors hover:bg-surface-success-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-success"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() => handleDelete(event)}
            title="Delete event"
            aria-label={`Delete ${event.title}`}
            className="rounded-md border border-border-error bg-surface-error p-2 text-white transition-colors hover:bg-surface-error-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-error"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-stack-content">
      <div className="flex flex-col gap-content sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-stack-tight flex items-center gap-2 text-size-small text-text-caption">
            <CalendarDays size={16} />
            Content management
          </div>

          <h1 className="text-size-h2 font-semibold tracking-tight text-text-heading">
            Events
          </h1>

          <p className="mt-stack-tight text-size-body text-text-caption">
            Manage the events displayed on your portfolio.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-surface-primary px-4 py-2 text-size-small font-semibold text-white on-color transition-colors hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary sm:self-auto"
        >
          <Plus size={18} />
          Add event
        </Link>
      </div>

      <div className="grid gap-card-gap sm:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Total events
          </p>

          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {events.length}
          </p>
        </div>

        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Matching events
          </p>

          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {filteredEvents.length}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
        {error && <p role="alert" className="mb-4 text-size-small text-text-error">{error}</p>}
        <AdminSearchInput
  value={search}
  onChange={setSearch}
  placeholder="Search events..."
  ariaLabel="Search events"
/>
        <DataTable
          columns={columns}
          rows={isLoading ? [] : filteredEvents}
          emptyMessage={isLoading ? 'Loading events...' : search ? 'No events match your search.' : 'No events have been added yet.'}
        />
      </div>
    </div>
  )
}

export default EventsPage
