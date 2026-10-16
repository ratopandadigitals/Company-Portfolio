
'use client'

import { useEffect, useMemo, useState, type FormEvent } from 'react'
import Link from 'next/link'
import {
  MessageSquareQuote,
  Pencil,
  Plus,

  Trash2,
  X,
} from 'lucide-react'
import type { StatItem, TestimonialItem } from '@/data/client'
import {
  deleteTestimonial,
  getStats,
  getTestimonials,
  updateStats,
} from '@/data/clientStorage'
import DataTable from '@/components/admin/shared/DataTable'
import AdminSearchInput from '@/components/admin/shared/AdminSearchInput'
import Image from 'next/image'

const TestimonialsPage = () => {
  const [stats, setStats] = useState<StatItem[]>([])
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [search, setSearch] = useState('')

  const [editingStat, setEditingStat] = useState<StatItem | null>(null)
  const [statValue, setStatValue] = useState('')
  const [statLabel, setStatLabel] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setStats(getStats())
    setTestimonials(getTestimonials())
  }, [])

  const filteredTestimonials = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return testimonials

    return testimonials.filter((testimonial) =>
      [
        testimonial.id,
        testimonial.quote,
        testimonial.name,
        testimonial.role,
        testimonial.bgImage,
      ].some((value) => String(value).toLowerCase().includes(query)),
    )
  }, [testimonials, search])

  const handleEditStat = (stat: StatItem) => {
    setEditingStat(stat)
    setStatValue(stat.value)
    setStatLabel(stat.label)
  }

  const handleSaveStat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!editingStat) return

    const updatedStats = stats.map((stat) =>
      stat.id === editingStat.id
        ? {
            ...stat,
            value: statValue.trim(),
            label: statLabel.trim(),
          }
        : stat,
    )

    updateStats(updatedStats)
    setStats(updatedStats)
    setEditingStat(null)
  }

  const handleDelete = (testimonial: TestimonialItem) => {
    const confirmed = window.confirm(
      `Delete the testimonial from "${testimonial.name}"?`,
    )

    if (!confirmed) return

    if (deleteTestimonial(testimonial.id)) {
      setTestimonials(getTestimonials())
    }
  }

  const testimonialColumns = [
    {
      label: 'Client',
      render: (testimonial: TestimonialItem) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-page">
            {testimonial.bgImage && (
             <Image
              src={testimonial.bgImage}
              alt={`${testimonial.name} testimonial background`}
              width={48}
              height={48}
              unoptimized
              className="h-full w-full object-cover"
            />
            )}
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-text-heading">
              {testimonial.name}
            </p>
            <p className="mt-1 text-size-caption text-text-caption">
              {testimonial.role}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: 'Testimonial',
      render: (testimonial: TestimonialItem) => (
        <p className="max-w-lg text-size-small text-body">
          {testimonial.quote}
        </p>
      ),
    },
    {
      label: 'Testimonial ID',
      render: (testimonial: TestimonialItem) => testimonial.id,
    },
    {
      label: 'Actions',
      render: (testimonial: TestimonialItem) => (
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/testimonials/${encodeURIComponent(testimonial.id)}`}
            title="Edit testimonial"
            aria-label={`Edit testimonial from ${testimonial.name}`}
            className="rounded-md border border-border-success bg-surface-success p-2 text-white transition-colors hover:bg-surface-success-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-success"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() => handleDelete(testimonial)}
            title="Delete testimonial"
            aria-label={`Delete testimonial from ${testimonial.name}`}
            className="rounded-md border border-border-error bg-surface-error p-2 text-white transition-colors hover:bg-surface-error-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-error"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ]

  const statsColumns = [
    {
      label: 'Value',
      render: (stat: StatItem) => (
        <span className="font-semibold text-text-heading">
          {stat.value}
        </span>
      ),
    },
    {
      label: 'Label',
      render: (stat: StatItem) => stat.label,
    },
    {
      label: 'Actions',
      render: (stat: StatItem) => (
        <button
          type="button"
          onClick={() => handleEditStat(stat)}
          title={`Edit ${stat.label}`}
          aria-label={`Edit stat ${stat.label}`}
          className="inline-flex items-center gap-2 rounded-md border border-border-subtle bg-surface-card px-3 py-2 text-size-small font-medium text-text-heading transition-colors hover:bg-surface-page focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary"
        >
          <Pencil size={15} />
          Edit
        </button>
      ),
    },
  ]

  return (
    <div className="space-y-stack-content">
      {/* Page heading */}
      <div>
        <div className="mb-stack-tight flex items-center gap-2 text-size-small text-text-caption">
          <MessageSquareQuote size={16} />
          Content management
        </div>

        {/* <h1 className="text-size-h2 font-semibold tracking-tight text-text-heading">
        
        </h1> */}

        {/* <p className="mt-stack-tight text-size-body text-text-caption">
          Manage client testimonials and portfolio statistics.
        </p> */}
      </div>

      {/* Testimonials — first */}
      <section className="space-y-stack-content">
        <div className="flex flex-col gap-content sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-size-h3 font-semibold tracking-tight text-text-heading">
              Testimonials
            </h2>

            <p className="mt-stack-tight text-size-body text-text-caption">
              Manage client testimonials displayed on your portfolio.
            </p>
          </div>

          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-surface-primary px-4 py-2 text-size-small font-semibold text-white on-color transition-colors hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary sm:self-auto"
          >
            <Plus size={18} />
            Add testimonial
          </Link>
        </div>

        {/* Summary cards */}
        
{/* Summary cards */}
<div className="grid grid-cols-1 gap-card-gap sm:grid-cols-2 xl:grid-cols-4">
  <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
    <p className="text-size-small text-text-caption">
      Total Testimonials
    </p>
    <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
      {testimonials.length}
    </p>
  </div>

  <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
    <p className="text-size-small text-text-caption">
      Matching Testimonials
    </p>
    <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
      {filteredTestimonials.length}
    </p>
  </div>

  <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
    <p className="text-size-small text-text-caption">
      Total Statistics
    </p>
    <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
      {stats.length}
    </p>
  </div>

  <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
    <p className="text-size-small text-text-caption">
      Last Updated
    </p>
    <p className="mt-stack-tight text-size-body font-semibold text-text-heading">
      Not tracked yet
    </p>
  </div>
</div>


        {/* Search and testimonial table */}
        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
           <AdminSearchInput
  value={search}
  onChange={setSearch}
  placeholder="Search testimonials..."
  ariaLabel="Search testimonials"
/>

          <DataTable
            columns={testimonialColumns}
            rows={filteredTestimonials}
            getRowKey={(testimonial) => testimonial.id}
            emptyMessage={
              search
                ? 'No testimonials match your search.'
                : 'No testimonials have been added yet.'
            }
          />
        </div>
      </section>

      {/* Statistics — below testimonials */}
      <section className="space-y-stack-content rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
        <div>
          <h2 className="text-size-h3 font-semibold tracking-tight text-text-heading">
            Statistics
          </h2>

          <p className="mt-stack-tight text-size-body text-text-caption">
            Manage the three statistics displayed in your Client Proof section.
          </p>
        </div>

        <DataTable
          columns={statsColumns}
          rows={stats}
          getRowKey={(stat) => stat.id}
          emptyMessage="No statistics found."
        />
      </section>

      {/* Edit statistic modal */}
      {editingStat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setEditingStat(null)
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-stat-title"
            className="w-full max-w-md space-y-stack-content rounded-xl border border-border-subtle bg-surface-card p-inset-card shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="edit-stat-title"
                  className="text-size-h3 font-semibold text-text-heading"
                >
                  Edit Statistic
                </h2>

                <p className="mt-stack-tight text-size-small text-text-caption">
                  Update the value and label for this statistic.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEditingStat(null)}
                aria-label="Close edit statistic dialog"
                className="rounded-md p-1 text-text-caption hover:bg-surface-page hover:text-text-heading"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStat} className="space-y-stack-content">
              <div className="space-y-2">
                <label
                  htmlFor="stat-value"
                  className="block text-size-small font-medium text-text-heading"
                >
                  Value
                </label>

                <input
                  id="stat-value"
                  value={statValue}
                  onChange={(event) => setStatValue(event.target.value)}
                  required
                  maxLength={30}
                  className="w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-size-body text-body outline-none focus:border-border-primary focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 4+"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="stat-label"
                  className="block text-size-small font-medium text-text-heading"
                >
                  Label
                </label>

                <input
                  id="stat-label"
                  value={statLabel}
                  onChange={(event) => setStatLabel(event.target.value)}
                  required
                  maxLength={100}
                  className="w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-size-body text-body outline-none focus:border-border-primary focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Finalized Projects"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStat(null)}
                  className="rounded-md border border-border-subtle px-4 py-2 text-size-small font-medium text-text-heading transition-colors hover:bg-surface-page"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-md bg-surface-primary px-4 py-2 text-size-small font-semibold text-white on-color transition-colors hover:bg-surface-primary-hover"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default TestimonialsPage
