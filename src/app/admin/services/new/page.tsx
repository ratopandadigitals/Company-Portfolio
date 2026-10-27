 'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertCircle, LoaderCircle } from 'lucide-react'
import type { ServiceItem } from '@/components/sections/services/Service'
import ServiceForm from '@/components/admin/services/ServiceForm'

const NewServicePage = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting) return

    setError('')
    setIsSubmitting(true)

    try {
      // const widthValue = String(formData.get('width') ?? '').trim()

     const service: Omit<ServiceItem, 'id'> = {
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
  ...(String(formData.get('width') ?? '').trim()
    ? { width: Number(formData.get('width')) }
    : {}),
}

      const response = await fetch('/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      })

      const result: {
        success?: boolean
        message?: string
        error?: string
      } = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ?? result.error ?? 'Failed to create service.',
        )
      }

      router.push('/admin/services')
      router.refresh()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while creating the service.',
      )
    } finally {
      setIsSubmitting(false)
    }
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
          Add service
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Add the service information displayed on your portfolio.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-border-subtle bg-surface-card p-inset-card text-size-body text-text-primary"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <p>{error}</p>
        </div>
      )}

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <ServiceForm
          onSubmit={handleSubmit}
          submitLabel={
            isSubmitting ? 'Creating service...' : 'Create service'
          }
        />

        {isSubmitting && (
          <p
            className="mt-stack-content flex items-center gap-2 text-size-small text-text-caption"
            role="status"
          >
            <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
            Saving service...
          </p>
        )}
      </div>
    </div>
  )
}

export default NewServicePage