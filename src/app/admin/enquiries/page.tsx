
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  CheckCircle2,
  Eye,
  Inbox,
  Trash2,
} from 'lucide-react'
import type { EnquiryDocument } from '@/types/database'
import DataTable from '@/components/admin/shared/DataTable'
import AdminSearchInput from '@/components/admin/shared/AdminSearchInput'

const EnquiriesPage = () => {
  const [enquiries, setEnquiries] = useState<EnquiryDocument[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | EnquiryDocument['status']
  >('all')

  useEffect(() => {
    const controller = new AbortController()

    const loadEnquiries = async () => {
      try {
        const response = await fetch('/api/enquiries', {
          cache: 'no-store',
          signal: controller.signal,
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || 'Failed to load enquiries.',
          )
        }

        setEnquiries(result.data as EnquiryDocument[])
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === 'AbortError'
        ) {
          return
        }

        console.error('Failed to load enquiries:', error)
      }
    }

    void loadEnquiries()

    return () => controller.abort()
  }, [])

  const filteredEnquiries = useMemo(() => {
    const query = search.trim().toLowerCase()

    return enquiries.filter((enquiry) => {
      const matchesSearch = [
        enquiry.name,
        enquiry.email,
        enquiry.subject,
        enquiry.message,
        enquiry.createdAt,
      ].some((value) => value.toLowerCase().includes(query))

      const matchesStatus =
        statusFilter === 'all' || enquiry.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [enquiries, search, statusFilter])

  const newCount = enquiries.filter(
    (enquiry) => enquiry.status === 'new',
  ).length

  const readCount = enquiries.filter(
    (enquiry) => enquiry.status === 'read',
  ).length

  const handleDelete = async (enquiry: EnquiryDocument) => {
    const confirmed = window.confirm(
      `Delete the enquiry from "${enquiry.name}"?`,
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `/api/enquiries/${encodeURIComponent(enquiry.id)}`,
        { method: 'DELETE' },
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Failed to delete enquiry.',
        )
      }

      setEnquiries((current) =>
        current.filter((item) => item.id !== enquiry.id),
      )
    } catch (error) {
      console.error('Failed to delete enquiry:', error)
      window.alert(
        'Could not delete this enquiry. Please try again.',
      )
    }
  }

  const columns = [
    {
      label: 'Sender',
      render: (enquiry: EnquiryDocument) => (
        <div className="min-w-0">
          <p className="font-semibold text-text-heading">
            {enquiry.name}
          </p>
          <p className="mt-1 max-w-xs truncate text-size-caption text-text-caption">
            {enquiry.email}
          </p>
        </div>
      ),
    },
    {
      label: 'Subject',
      render: (enquiry: EnquiryDocument) => (
        <div className="min-w-0 max-w-sm">
          <p className="font-medium text-text-heading">
            {enquiry.subject}
          </p>
          <p className="mt-1 truncate text-size-caption text-text-caption">
            {enquiry.message}
          </p>
        </div>
      ),
    },
    {
      label: 'Date received',
      render: (enquiry: EnquiryDocument) =>
        new Date(enquiry.createdAt).toLocaleDateString(),
    },
    {
      label: 'Status',
      render: (enquiry: EnquiryDocument) => (
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-size-caption font-medium ${
            enquiry.status === 'new'
              ? 'border-border-primary bg-surface-primary text-white'
              : 'border-border-success bg-surface-success text-white'
          }`}
        >
          {enquiry.status === 'new' ? (
            <>
              <Inbox size={14} aria-hidden="true" />
              New
            </>
          ) : (
            <>
              <CheckCircle2 size={14} aria-hidden="true" />
              Read
            </>
          )}
        </span>
      ),
    },
    {
      label: 'Actions',
      render: (enquiry: EnquiryDocument) => (
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/enquiries/${enquiry.id}`}
            title="View enquiry"
            aria-label={`View enquiry from ${enquiry.name}`}
            className="rounded-md border border-border-subtle p-2 text-text-heading transition-colors hover:bg-surface-section focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
          >
            <Eye size={16} />
          </Link>

          <button
            type="button"
            onClick={() => void handleDelete(enquiry)}
            title="Delete enquiry"
            aria-label={`Delete enquiry from ${enquiry.name}`}
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
      <div>
        <div className="mb-stack-tight flex items-center gap-2 text-size-small text-text-caption">
          <Inbox size={16} />
          Content management
        </div>

        <h1 className="text-size-h2 font-semibold tracking-tight text-text-heading">
          Enquiries
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Read and manage messages submitted through your contact form.
        </p>
      </div>

      <div className="grid gap-card-gap sm:grid-cols-3">
        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Total enquiries
          </p>
          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {enquiries.length}
          </p>
        </div>

        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            New enquiries
          </p>
          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {newCount}
          </p>
        </div>

        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Read enquiries
          </p>
          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {readCount}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
        <div className="mb-stack-content flex flex-col gap-stack-tight sm:flex-row sm:items-center sm:justify-between">
          <AdminSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search enquiries..."
            ariaLabel="Search enquiries"
          />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as typeof statusFilter,
              )
            }
            aria-label="Filter enquiries by status"
            className="rounded-md border border-border-subtle bg-surface-card px-3 py-2 text-size-small text-text-heading outline-none focus:border-border-primary focus:ring-2"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          rows={filteredEnquiries}
          emptyMessage={
            search || statusFilter !== 'all'
              ? 'No enquiries match your filters.'
              : 'No enquiries have been received yet.'
          }
        />
      </div>
    </div>
  )
}

export default EnquiriesPage
