
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Image as ImageIcon,
  Pencil,
  Plus,
  
  Trash2,
  Video,
} from 'lucide-react'
import type { MediaItem } from '@/components/sections/gallery/MediaData'
import {
  deleteMediaItem,
  getMediaItems,
} from '@/data/galleryStorage'
import DataTable from '@/components/admin/shared/DataTable'
import NextImage from 'next/image'
import AdminSearchInput from '@/components/admin/shared/AdminSearchInput'

const GalleryPage = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setMediaItems(getMediaItems())
  }, [])

  const filteredMedia = useMemo(() => {
    const query = search.trim().toLowerCase()

    return mediaItems.filter((item) => {
      const matchesSearch = [
        item.id,
        item.type,
        item.title,
        item.url,
        item.span,
      ].some((value) => String(value).toLowerCase().includes(query))

      const matchesType = typeFilter === 'all' || item.type === typeFilter

      return matchesSearch && matchesType
    })
  }, [mediaItems, search, typeFilter])

  const handleDelete = (item: MediaItem) => {
    const confirmed = window.confirm(
      `Delete the gallery item "${item.title}"?`,
    )

    if (!confirmed) return

    if (deleteMediaItem(item.id)) {
      setMediaItems(getMediaItems())
    }
  }

  const columns = [
    {
      label: 'Media',
      render: (item: MediaItem) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-page">
            {item.type === 'image' ? (
              <NextImage
                    src={item.url}
                    alt={item.title}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Video size={20} className="text-text-caption" />
              </div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-text-heading">
              {item.title}
            </p>
            <p className="mt-1 max-w-xs truncate text-size-caption text-text-caption">
              {item.url}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: 'Media ID',
      render: (item: MediaItem) => item.id,
    },
    {
      label: 'Type',
      render: (item: MediaItem) => (
        <span className="inline-flex items-center gap-2 text-size-small text-text-caption">
          {item.type === 'image' ? (
            <ImageIcon size={16} />
          ) : (
            <Video size={16} />
          )}
          {item.type === 'image' ? 'Image' : 'Video'}
        </span>
      ),
    },
    {
      label: 'Grid span',
      render: (item: MediaItem) => item.span,
    },
    {
      label: 'Actions',
      render: (item: MediaItem) => (
        <div className="flex items-center gap-6">
          <Link
            href={`/admin/gallery/${item.id}`}
            title="Edit media"
            aria-label={`Edit ${item.title}`}
            className="rounded-md border border-border-success bg-surface-success p-2 text-white transition-colors hover:bg-surface-success-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-success"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() => handleDelete(item)}
            title="Delete media"
            aria-label={`Delete ${item.title}`}
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
            <ImageIcon size={16} />
            Content management
          </div>

          <h1 className="text-size-h2 font-semibold tracking-tight text-text-heading">
            Gallery
          </h1>

          <p className="mt-stack-tight text-size-body text-text-caption">
            Manage the images and videos displayed in your portfolio gallery.
          </p>
        </div>

        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-surface-primary px-4 py-2 text-size-small font-semibold text-white on-color transition-colors hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary sm:self-auto"
        >
          <Plus size={18} />
          Add media
        </Link>
      </div>

      <div className="grid gap-card-gap sm:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Total media
          </p>
          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {mediaItems.length}
          </p>
        </div>

        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Matching media
          </p>
          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {filteredMedia.length}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
        <div className="mb-stack-content flex flex-col gap-stack-tight sm:flex-row sm:items-center sm:justify-between">
          <AdminSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search images..."
            ariaLabel="Search images"
          />
          

          <select
            value={typeFilter}
            onChange={(event) =>
              setTypeFilter(event.target.value as typeof typeFilter)
            }
            aria-label="Filter by media type"
            className="rounded-md border border-border-subtle bg-surface-card px-3 py-2 text-size-small text-text-heading outline-none focus:border-border-primary focus:ring-2"
          >
            <option value="all">All media</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          rows={filteredMedia}
          emptyMessage={
            search || typeFilter !== 'all'
              ? 'No media matches your filters.'
              : 'No gallery media has been added yet.'
          }
        />
      </div>
    </div>
  )
}

export default GalleryPage
