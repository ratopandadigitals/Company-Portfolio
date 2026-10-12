'use client'

import type { FormEventHandler } from 'react'

type WorkFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>
}

export default function WorkForm({ onSubmit }: WorkFormProps) {
  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <label className="grid gap-2 text-sm text-heading">
        Project title
        <input name="title" required className="rounded-md border border-border-subtle bg-surface-page px-3 py-2" />
      </label>
      <label className="grid gap-2 text-sm text-heading">
        Client
        <input name="client" className="rounded-md border border-border-subtle bg-surface-page px-3 py-2" />
      </label>
      <label className="grid gap-2 text-sm text-heading">
        Summary
        <textarea name="summary" required rows={3} className="rounded-md border border-border-subtle bg-surface-page px-3 py-2" />
      </label>
      <button type="submit" className="w-fit rounded-md bg-heading px-4 py-2 text-sm font-medium text-surface-page">Save work</button>
    </form>
  )
}