
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Mail, Trash2,CheckCircle2 } from 'lucide-react'
import type { EnquiryItem } from '@/data/enquiryStorage'
import {
  deleteEnquiry,
  getEnquiryById,
  markEnquiryAsRead,
} from '@/data/enquiryStorage'

const EnquiryDetailsPage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const id = params.id

  const [enquiry, setEnquiry] = useState<EnquiryItem | undefined>()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const updatedEnquiry =
      markEnquiryAsRead(id) ?? getEnquiryById(id)

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setEnquiry(updatedEnquiry)
    setIsLoaded(true)
  }, [id])

  const handleDelete = () => {
    if (!enquiry) return

    const confirmed = window.confirm(
      `Delete the enquiry from "${enquiry.name}"?`,
    )

    if (!confirmed) return

    if (deleteEnquiry(enquiry.id)) {
      router.push('/admin/enquiries')
    } else {
      window.alert('Could not delete this enquiry.')
    }
  }

  if (!isLoaded) {
    return (
      <p className="text-size-body text-text-caption">
        Loading enquiry...
      </p>
    )
  }

  if (!enquiry) {
    return (
      <div className="space-y-stack-content">
        <h1 className="text-size-h2 font-semibold text-text-heading">
          Enquiry not found
        </h1>

        <p className="text-size-body text-text-caption">
          This enquiry could not be found in the current Enquiries data.
        </p>

        <Link
          href="/admin/enquiries"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Enquiries
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full space-y-stack-content">
      <div className="flex flex-col gap-stack-tight sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Enquiries
          </Link>

          <h1 className="mt-stack-tight text-size-h2 font-semibold tracking-tight text-text-heading">
            Enquiry details
          </h1>

          <p className="mt-1 text-size-body text-text-caption">
            Message from {enquiry.name}.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center justify-center gap-2 self-start rounded-md border border-border-error bg-surface-error px-4 py-2 text-size-small font-semibold text-white transition-colors hover:bg-surface-error-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-error sm:self-center"
        >
          <Trash2 size={16} />
          Delete enquiry
        </button>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <div className="flex flex-col gap-2 border-b border-border-subtle pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-size-caption text-text-caption">
              SUBJECT
            </p>
            <h2 className="mt-1 text-size-h3 font-semibold text-text-heading">
              {enquiry.subject}
            </h2>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border-success bg-surface-success px-3 py-1 text-size-caption font-medium text-white">
  <CheckCircle2 size={14} aria-hidden="true" />
  Read
</span>
        </div>

        <div className="grid gap-4 border-b border-border-subtle py-4 sm:grid-cols-2">
          <div>
            <p className="text-size-small text-text-caption">Sender</p>
            <p className="mt-1 font-medium text-text-heading">
              {enquiry.name}
            </p>
          </div>

          <div>
            <p className="text-size-small text-text-caption">
              Email address
            </p>
            <a
              href={`mailto:${enquiry.email}`}
              className="mt-1 inline-flex items-center gap-2 break-all text-size-body font-medium text-text-primary hover:underline"
            >
              <Mail size={15} />
              {enquiry.email}
            </a>
          </div>

          <div>
            <p className="text-size-small text-text-caption">
              Date received
            </p>
            <p className="mt-1 text-size-body text-text-heading">
              {new Date(enquiry.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-size-small font-semibold text-text-heading">
            Message
          </h3>

          <p className="mt-2 whitespace-pre-wrap text-size-body leading-7 text-text-caption">
            {enquiry.message}
          </p>
        </div>

        <div className="flex justify-end border-t border-border-subtle pt-4">
          <a
            href={`mailto:${enquiry.email}?subject=${encodeURIComponent(`Re: ${enquiry.subject}`)}`}
className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-surface-primary px-5 py-3 text-size-small font-semibold text-primary-on-color transition-colors hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"          >
            <Mail size={16} />
            Reply by email
          </a>
        </div>
      </div>
    </div>
  )
}

export default EnquiryDetailsPage
