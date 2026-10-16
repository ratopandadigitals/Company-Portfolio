
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  BriefcaseBusiness,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react'
import type { WorkItem } from '@/data/works'
import { deleteWork, getWorks } from '@/data/work'
import DataTable from '@/components/admin/shared/DataTable'
import AdminSearchInput from '@/components/admin/shared/AdminSearchInput'
import Image from 'next/image'

const WorksPage = () => {
  const [works, setWorks] = useState<WorkItem[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setWorks(getWorks())
  }, [])

  const filteredWorks = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return works

    return works.filter((work) =>
      [
        work.id,
        work.slug,
        work.title,
        work.description,
        work.year,
        work.role,
        ...work.services,
        ...work.tools,
      ].some((value) => value.toLowerCase().includes(query)),
    )
  }, [works, search])

  const handleDelete = (work: WorkItem) => {
    const confirmed = window.confirm(
      `Delete the project "${work.title}"?`,
    )

    if (!confirmed) return

    if (deleteWork(work.slug)) {
      setWorks(getWorks())
    }
  }

  const columns = [
    {
      label: 'Project',
      render: (work: WorkItem) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-page">
            <Image
              src={work.previewImage}
              alt={`${work.title} preview`}
              width={48}
              height={48}
              unoptimized
              className="h-full w-full object-cover"
            />
                      </div>

          <div className="min-w-0">
            <p className="font-semibold text-text-heading">
              {work.title}
            </p>

            <p className="mt-1 text-size-caption text-text-caption">
              {work.slug}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: 'Project ID',
      render: (work: WorkItem) => work.id,
    },
    {
      label: 'Year',
      render: (work: WorkItem) => work.year,
    },
    {
      label: 'Role',
      render: (work: WorkItem) => work.role,
    },
    {
      label: 'Actions',
      render: (work: WorkItem) => (
        <div className="flex items-center gap-6">
          <Link
            href={`/admin/works/${encodeURIComponent(work.slug)}`}
            title="Edit project"
            aria-label={`Edit ${work.title}`}
            className="rounded-md border border-border-success bg-surface-success p-2 text-white transition-colors hover:bg-surface-success-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-success"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() => handleDelete(work)}
            title="Delete project"
            aria-label={`Delete ${work.title}`}
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
            <BriefcaseBusiness size={16} />
            Content management
          </div>

          <h1 className="text-size-h2 font-semibold tracking-tight text-text-heading">
            Works
          </h1>

          <p className="mt-stack-tight text-size-body text-text-caption">
            Manage the projects displayed on your portfolio.
          </p>
        </div>

        <Link
          href="/admin/works/new"
className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-surface-primary px-4 py-2 text-size-small font-semibold text-white on-color transition-colors hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary sm:self-auto"        >
          <Plus size={18} />
          Add project
        </Link>
      </div>

      <div className="grid gap-card-gap sm:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Total projects
          </p>

          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {works.length}
          </p>
        </div>

        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Matching projects
          </p>

          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {filteredWorks.length}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
       <AdminSearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search projects..."
        ariaLabel="Search projects"
      />

              <DataTable
          columns={columns}
          rows={filteredWorks}
          emptyMessage={
            search
              ? 'No projects match your search.'
              : 'No projects have been added yet.'
          }
        />
      </div>
    </div>
  )
}

export default WorksPage
