
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
import DataTable from '@/components/admin/shared/DataTable'
import AdminSearchInput from '@/components/admin/shared/AdminSearchInput'
import Image from 'next/image'

const WorksPage = () => {
  const [works, setWorks] = useState<WorkItem[]>([])
  const [search, setSearch] = useState('')
  const [legacyWorks, setLegacyWorks] = useState<WorkItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isImporting, setIsImporting] = useState(false)
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadWorks = async () => {
      try {
        const storedWorks = localStorage.getItem('admin-works')

        if (storedWorks) {
          try {
            const parsedWorks: unknown = JSON.parse(storedWorks)
            if (Array.isArray(parsedWorks)) {
              setLegacyWorks(parsedWorks as WorkItem[])
            }
          } catch {
            setError('Browser-saved project data could not be read; MongoDB projects are still available.')
          }
        }

        const response = await fetch('/api/works', {
          cache: 'no-store',
          signal: controller.signal,
        })
        const result = await response.json()

        if (!response.ok || !result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || 'Unable to load projects.')
        }

        setWorks(result.data as WorkItem[])
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name === 'AbortError') return
        setError('Unable to load projects. Please try again.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadWorks()
    return () => controller.abort()
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

  const handleDelete = async (work: WorkItem) => {
    const confirmed = window.confirm(
      `Delete the project "${work.title}"?`,
    )

    if (!confirmed) return

    setDeletingSlug(work.slug)
    setError('')

    try {
      const response = await fetch(
        `/api/works/${encodeURIComponent(work.slug)}`,
        { method: 'DELETE' },
      )
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to delete project.')
      }

      setWorks((current) => current.filter((item) => item.slug !== work.slug))
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : 'Unable to delete project. Please try again.',
      )
    } finally {
      setDeletingSlug(null)
    }
  }

  const handleImportLegacyWorks = async () => {
    if (!legacyWorks.length || isImporting) return

    const confirmed = window.confirm(
      `Import ${legacyWorks.length} browser-saved projects into MongoDB? Projects with matching slugs will be replaced by the browser-saved versions.`,
    )
    if (!confirmed) return

    setIsImporting(true)
    setError('')

    try {
      const uploadedImages = new Map<string, string>()
      const uploadLegacyImage = async (image: string) => {
        if (!image.startsWith('data:')) return image
        const existingUrl = uploadedImages.get(image)
        if (existingUrl) return existingUrl

        const blob = await fetch(image).then((response) => response.blob())
        const extension = blob.type.split('/')[1] || 'jpg'
        const formData = new FormData()
        formData.append('file', new File([blob], `legacy-work.${extension}`, { type: blob.type }))
        formData.append('folder', 'works')

        const response = await fetch('/api/admin/uploads', {
          method: 'POST',
          body: formData,
        })
        const result = await response.json()

        if (!response.ok || !result.success || !result.url) {
          throw new Error(result.message || 'Unable to upload a saved project image.')
        }

        uploadedImages.set(image, result.url as string)
        return result.url as string
      }

      const worksToImport = await Promise.all(
        legacyWorks.map(async (work) => ({
          ...work,
          previewImage: await uploadLegacyImage(work.previewImage),
          bgImage: await uploadLegacyImage(work.bgImage),
          gallery: await Promise.all(work.gallery.map(uploadLegacyImage)),
        })),
      )

      const response = await fetch('/api/works/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ works: worksToImport }),
      })
      const result = await response.json()

      if (!response.ok || !result.success || !Array.isArray(result.data)) {
        throw new Error(result.message || 'Unable to import saved projects.')
      }

      localStorage.removeItem('admin-works')
      setWorks(result.data as WorkItem[])
      setLegacyWorks([])
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : 'Unable to import saved projects. Please try again.',
      )
    } finally {
      setIsImporting(false)
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
            onClick={() => void handleDelete(work)}
            disabled={deletingSlug !== null}
            title="Delete project"
            aria-label={`Delete ${work.title}`}
            className="rounded-md border border-border-error bg-surface-error p-2 text-white transition-colors hover:bg-surface-error-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-error disabled:cursor-not-allowed disabled:opacity-50"
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

      {legacyWorks.length > 0 && (
        <div className="flex flex-col gap-3 rounded-lg border border-border-subtle bg-surface-card p-inset-compact sm:flex-row sm:items-center sm:justify-between">
          <p className="text-size-small text-text-caption">
            {legacyWorks.length} browser-saved project{legacyWorks.length === 1 ? '' : 's'} found. Import them into MongoDB before removing this browser data.
          </p>
          <button
            type="button"
            onClick={() => void handleImportLegacyWorks()}
            disabled={isImporting}
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-border-primary px-4 py-2 text-size-small font-semibold text-text-primary disabled:cursor-wait disabled:opacity-60"
          >
            {isImporting ? 'Importing projects...' : 'Import browser-saved projects'}
          </button>
        </div>
      )}

      {error && (
        <p role="alert" className="text-size-small text-text-error">
          {error}
        </p>
      )}

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
       <AdminSearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search projects..."
        ariaLabel="Search projects"
      />

              <DataTable
          columns={columns}
          rows={isLoading ? [] : filteredWorks}
          emptyMessage={
            isLoading
              ? 'Loading projects...'
              : search
              ? 'No projects match your search.'
              : 'No projects have been added yet.'
          }
        />
      </div>
    </div>
  )
}

export default WorksPage
