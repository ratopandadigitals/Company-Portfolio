'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import type { ServiceItem } from '@/components/sections/services/Service'
import ServiceForm from '@/components/admin/services/ServiceForm'

const EditServicePage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const serviceId = params.id

  const [service, setService] = useState<ServiceItem | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isActive = true

    const fetchService = async () => {
      setIsLoaded(false)
      setService(undefined)
      setError('')

      try {
        const response = await fetch(
          `/api/services/${encodeURIComponent(serviceId)}`,
        )

        const result: {
          success?: boolean
          data?: ServiceItem
          message?: string
          error?: string
        } = await response.json()

        if (!response.ok || !result.success || !result.data) {
          throw new Error(
            result.message ?? result.error ?? 'Could not load this service.',
          )
        }

        if (isActive) {
          setService(result.data)
        }
      } catch (error) {
        if (isActive) {
          setError(
            error instanceof Error
              ? error.message
              : 'Something went wrong while loading the service.',
          )
        }
      } finally {
        if (isActive) {
          setIsLoaded(true)
        }
      }
    }

    void fetchService()

    return () => {
      isActive = false
    }
  }, [serviceId])

  const handleSubmit = async (formData: FormData) => {
    if (!service || isSubmitting) return

    setError('')
    setIsSubmitting(true)

    try {
      const widthValue = String(formData.get('width') ?? '').trim()

      const updatedService: Omit<ServiceItem, 'id'> = {
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
        ...(widthValue ? { width: Number(widthValue) } : {}),
      }

      const response = await fetch(
        `/api/services/${encodeURIComponent(service.id)}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedService),
        },
      )

      const result: {
        success?: boolean
        message?: string
        error?: string
      } = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? result.error ?? 'Failed to update service.',
        )
      }

      router.push('/admin/services')
      router.refresh()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while updating the service.',
      )
    } finally {
      setIsSubmitting(false)
    }
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
          {error || 'This service could not be found.'}
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

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface-card p-inset-card text-size-body text-text-primary"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <p>{error}</p>
        </div>
      )}

      <div className="w-full rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <ServiceForm
          key={service.id}
          initialService={service}
          onSubmit={handleSubmit}
          submitLabel={isSubmitting ? 'Saving changes...' : 'Save changes'}
        />
      </div>
    </div>
  )
}

export default EditServicePage