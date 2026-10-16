
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ServiceItem } from '@/components/sections/services/Service'
import ServiceForm from '@/components/admin/services/ServiceForm'
import { createService, getServices } from '@/data/serviceStorage'
import { ArrowLeft } from 'lucide-react'

const NewServicePage = () => {
  const router = useRouter()

  const handleSubmit = (formData: FormData) => {
    const label = String(formData.get('label') ?? '').trim()

    if (getServices().some((service) => service.label === label)) {
      window.alert('A service with this label already exists.')
      return
    }

    const service: ServiceItem = {
  id: crypto.randomUUID(),
  label,
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

    createService(service)

    router.push('/admin/services')
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

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <ServiceForm
          onSubmit={handleSubmit}
          submitLabel="Create service"
        />
      </div>
    </div>
  )
}

export default NewServicePage
