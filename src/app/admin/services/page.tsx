
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  BriefcaseBusiness,
  Pencil,
  Plus,

  Trash2,
} from 'lucide-react'
import Image from 'next/image'
import type { ServiceItem } from '@/components/sections/services/Service'
import { deleteService, getServices } from '@/data/serviceStorage'
import DataTable from '@/components/admin/shared/DataTable'
import AdminSearchInput from '@/components/admin/shared/AdminSearchInput'

const ServicesPage = () => {
  const [services, setServices] = useState<ServiceItem[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setServices(getServices())
  }, [])

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) return services

    return services.filter((service) =>
      [
        service.id,
        service.label,
        service.title,
        service.description,
        service.image,
        service.price,
        service.timeline,
        ...service.tags,
      ].some((value) => String(value).toLowerCase().includes(query)),
    )
  }, [services, search])

  const handleDelete = (service: ServiceItem) => {
    const confirmed = window.confirm(
      `Delete the service "${service.title}"?`,
    )

    if (!confirmed) return

    if (deleteService(service.id)) {
      setServices(getServices())
    }
  }

  const columns = [
    {
      label: 'Service',
      render: (service: ServiceItem) => (
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-page">
           <Image
              src={service.image}
              alt={`${service.title} preview`}
              width={48}
              height={48}
              unoptimized
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-text-heading">
              {service.title}
            </p>

            <p className="mt-1 text-size-caption text-text-caption">
              {service.label}
            </p>
          </div>
        </div>
      ),
    },
    {
      label: 'Service ID',
      render: (service: ServiceItem) => service.id,
    },
    {
      label: 'Price',
      render: (service: ServiceItem) => service.price,
    },
    {
      label: 'Timeline',
      render: (service: ServiceItem) => service.timeline,
    },
    {
      label: 'Actions',
      render: (service: ServiceItem) => (
        <div className="flex items-center gap-6">
          <Link
            href={`/admin/services/${encodeURIComponent(service.id)}`}
            title="Edit service"
            aria-label={`Edit ${service.title}`}
            className="rounded-md border border-border-success bg-surface-success p-2 text-white transition-colors hover:bg-surface-success-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-success"
          >
            <Pencil size={16} />
          </Link>

          <button
            type="button"
            onClick={() => handleDelete(service)}
            title="Delete service"
            aria-label={`Delete ${service.title}`}
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
            Services
          </h1>

          <p className="mt-stack-tight text-size-body text-text-caption">
            Manage the services displayed on your portfolio.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-surface-primary px-4 py-2 text-size-small font-semibold text-white on-color transition-colors hover:bg-surface-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-primary sm:self-auto"
        >
          <Plus size={18} />
          Add service
        </Link>
      </div>

      <div className="grid gap-card-gap sm:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Total services
          </p>

          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {services.length}
          </p>
        </div>

        <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
          <p className="text-size-small text-text-caption">
            Matching services
          </p>

          <p className="mt-stack-tight text-size-h3 font-semibold text-text-heading">
            {filteredServices.length}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-compact">
         <AdminSearchInput
  value={search}
  onChange={setSearch}
  placeholder="Search services..."
  ariaLabel="Search services"
/>

        <DataTable
          columns={columns}
          rows={filteredServices}
          emptyMessage={
            search
              ? 'No services match your search.'
              : 'No services have been added yet.'
          }
        />
      </div>
    </div>
  )
}

export default ServicesPage
