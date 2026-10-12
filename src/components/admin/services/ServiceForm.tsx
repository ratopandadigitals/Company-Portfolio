'use client'

import type { FormEventHandler } from 'react'

type ServiceFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>
}

export default function ServiceForm({ onSubmit }: ServiceFormProps) {
  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <label className="grid gap-2 text-sm text-heading">
        Service name
        <input name="name" required className="rounded-md border border-border-subtle bg-surface-page px-3 py-2" />
      </label>
      <label className="grid gap-2 text-sm text-heading">
        Summary
        <textarea name="summary" required rows={3} className="rounded-md border border-border-subtle bg-surface-page px-3 py-2" />
      </label>
      <label className="grid gap-2 text-sm text-heading">
        Status
        <select name="status" className="rounded-md border border-border-subtle bg-surface-page px-3 py-2">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>
      <button type="submit" className="w-fit rounded-md bg-heading px-4 py-2 text-sm font-medium text-surface-page">Save service</button>
    </form>
  )
}