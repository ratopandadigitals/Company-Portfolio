'use client'

import type { FormEventHandler } from 'react'

type EventFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>
}

export default function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <label className="grid gap-2 text-sm text-heading">
        Event title
        <input name="title" required className="rounded-md border border-border-subtle bg-surface-page px-3 py-2" />
      </label>
      <label className="grid gap-2 text-sm text-heading">
        Date
        <input name="date" type="date" required className="rounded-md border border-border-subtle bg-surface-page px-3 py-2" />
      </label>
      <label className="grid gap-2 text-sm text-heading">
        Location
        <input name="location" className="rounded-md border border-border-subtle bg-surface-page px-3 py-2" />
      </label>
      <button type="submit" className="w-fit rounded-md bg-heading px-4 py-2 text-sm font-medium text-surface-page">Save event</button>
    </form>
  )
}