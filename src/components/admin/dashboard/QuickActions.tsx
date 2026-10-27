
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'

const actions = [
  { label: 'Add new work', href: '/admin/works/new' },
  { label: 'Create event', href: '/admin/events/new' },
  { label: 'Add service', href: '/admin/services/new' },
]

const QuickActions = () => {
  return (
    <section className="rounded-xl border border-border-subtle bg-surface-card p-5 sm:p-6">
      <h2 className="text-size-h3 font-semibold text-heading">
        Quick actions
      </h2>

      <p className="mt-2 text-size-small text-caption">
        Shortcuts to common content management tasks.
      </p>

      <div className="mt-5 flex flex-col">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center justify-between gap-3 border-t border-border-subtle py-4 text-size-body text-body transition-colors hover:text-primary"
          >
            <span className="flex items-center gap-3">
              <Plus aria-hidden="true" className="size-4 shrink-0" />
              {action.label}
            </span>

            <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default QuickActions