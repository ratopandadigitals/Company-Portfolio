
import Link from 'next/link'
import { ArrowRight, Inbox } from 'lucide-react'
import type { EnquiryItem } from '@/types/enquiry'

type RecentActivityProps = {
  enquiries: Pick<EnquiryItem, 'id' | 'name' | 'subject' | 'createdAt' | 'status'>[]
}

const RecentActivity = ({ enquiries }: RecentActivityProps) => {
  return (
    <section className="rounded-xl border border-border-subtle bg-surface-card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-size-h3 font-semibold text-heading">
            New enquiries
          </h2>

          <p className="mt-2 text-size-small text-caption">
            Latest unread messages from your website.
          </p>
        </div>

        <Link
          href="/admin/enquiries"
          className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-md px-2 text-size-small font-semibold text-success transition-colors hover:bg-surface-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface-page"
        >
          View all enquiries
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      {enquiries.length ? (
        <ul className="mt-6 divide-y divide-border-subtle">
          {enquiries.map((enquiry) => (
            <li key={enquiry.id}>
              <Link
                href={`/admin/enquiries/${encodeURIComponent(enquiry.id)}`}
                className="flex items-center justify-between gap-4 py-4 transition-colors hover:text-primary"
              >
                <span className="min-w-0">
                  <span className="block truncate text-size-body font-medium text-heading">
                    {enquiry.name}
                  </span>
                  <span className="mt-1 block truncate text-size-small text-caption">
                    {enquiry.subject}
                  </span>
                </span>
                <span className="shrink-0 text-right">
                  <span className="block text-size-caption text-caption">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </span>
                  <span className="mt-1 block text-size-caption font-medium text-caption">
                    <span className="inline-flex rounded-full border border-border-primary bg-surface-primary px-2 py-0.5 text-[11px] font-semibold text-white">
                      New
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-subtle px-4 py-8 text-center">
          <span className="flex size-11 items-center justify-center rounded-full bg-surface-page text-success">
            <Inbox aria-hidden="true" className="size-6 stroke-2.5" />
          </span>
          <p className="text-size-body font-medium text-heading">No new enquiries</p>
          <p className="max-w-sm text-size-small text-caption">
            You’re caught up. Read messages remain available in the full enquiries list.
          </p>
          {/*  */}
        </div>
      )}
    </section>
  )
}

export default RecentActivity