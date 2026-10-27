import type { ReactNode } from 'react'

type AdminPageHeaderProps = {
  title: string
  description: string
  actions?: ReactNode
}

export default function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-border-subtle pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-heading">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-caption">{description}</p>
      </div>
      {actions}
    </div>
  )
}