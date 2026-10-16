
import Link from 'next/link'
import { ArrowRight, Inbox } from 'lucide-react'

const RecentActivity = () => {
  return (
    <section className="rounded-xl border border-border-subtle bg-surface-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-size-h3 font-semibold text-heading">
            Recent enquiries
          </h2>

          <p className="mt-2 text-size-small text-caption">
            Review messages submitted through your website.
          </p>
        </div>

        <Link
          href="/admin/enquiries"
          aria-label="View all enquiries"
          className="shrink-0 rounded-lg p-2 text-caption transition-colors hover:bg-surface-section hover:text-primary"
        >
          <ArrowRight aria-hidden="true" className="size-5" />
        </Link>
      </div>

      <div className="mt-6 flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-subtle px-4 py-8 text-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-surface-page text-success">
          <Inbox aria-hidden="true" className="size-6 stroke-2.5" />
        </span>

        <p className="text-size-body font-medium text-heading">
          No enquiry data yet
        </p>

        <p className="max-w-sm text-size-small text-caption">
          Recent website enquiries will appear here once we add the dummy data and enquiry management flow.
        </p>

        <Link
          href="/admin/enquiries"
          className="mt-1 text-size-small font-semibold text-primary hover:underline"
        >
          View enquiries
        </Link>
      </div>
    </section>
  )
}

export default RecentActivity