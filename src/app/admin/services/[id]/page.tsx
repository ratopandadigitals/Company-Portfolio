'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { ServiceItem } from '@/components/sections/services/Service'
import {
  getServices,
  updateService,
} from '@/data/serviceStorage'
import ServiceForm from '@/components/admin/services/ServiceForm'

const EditServicePage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const serviceId = params.id

  const [service, setService] = useState<ServiceItem | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setService(
      getServices().find((item) => item.id === serviceId),
    )
    setIsLoaded(true)
  }, [serviceId])

  const handleSubmit = (formData: FormData) => {
    if (!service) return

    const updatedService: ServiceItem = {
      id: service.id,
      label: String(formData.get('label') ?? '').trim(),
      title: String(formData.get('title') ?? '').trim(),
      image: String(formData.get('image') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      tags: String(formData.get('tags') ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      price: String(formData.get('price') ?? '').trim(),
      timeline: String(formData.get('timeline') ?? '').trim(),
      width: Number(formData.get('width') ?? 200),
    }

    const duplicateLabel = getServices().find(
      (item) =>
        item.id !== service.id &&
        item.label === updatedService.label,
    )

    if (duplicateLabel) {
      window.alert('A service with this label already exists.')
      return
    }

    const savedService = updateService(service.id, updatedService)

    if (!savedService) {
      window.alert('Could not update this service.')
      return
    }

    router.push('/admin/services')
  }

  if (!isLoaded) {
    return (
      <p className="text-size-body text-text-caption">
        Loading service...
      </p>
    )
  }

  if (!service) {
    return (
      <div className="flex w-full flex-col gap-stack-content">
        <h1 className="text-size-h2 font-semibold text-text-heading">
          Service not found
        </h1>

        <p className="text-size-body text-text-caption">
          This service could not be found in the current Services data.
        </p>

        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Services
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full space-y-stack-content">
      <div>
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Services
        </Link>

        <h1 className="mt-stack-content text-size-h2 font-semibold tracking-tight text-text-heading">
          Edit service
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Update the details for {service.title}.
        </p>
      </div>

      <div className="w-full rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <ServiceForm
          key={service.id}
          initialService={service}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditServicePage
