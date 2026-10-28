
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { WorkItem } from '@/data/works'
import WorkForm from '@/components/admin/works/WorkForm'
import { ArrowLeft } from 'lucide-react'

const NewWorkPage = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setError('')
    setIsSubmitting(true)

    try {
      const work: Omit<WorkItem, 'id'> = {
        slug: String(formData.get('slug') ?? '').trim(),
        title: String(formData.get('title') ?? '').trim(),
        description: String(formData.get('description') ?? '').trim(),
        year: String(formData.get('year') ?? '').trim(),
        role: String(formData.get('role') ?? '').trim(),
      services: String(formData.get('services') ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      tools: String(formData.get('tools') ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      previewImage: String(formData.get('previewImage') ?? '').trim(),
      bgImage: String(formData.get('bgImage') ?? '').trim(),
      gallery: String(formData.get('gallery') ?? '')
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      }

      const response = await fetch('/api/works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(work),
      })
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to create project.')
      }

      router.push('/admin/works')
      router.refresh()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to create project. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className=" w-full  space-y-stack-content">
      <div>
       <Link
  href="/admin/works"
  className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
>
  <ArrowLeft size={16} aria-hidden="true" />
  Back to Works
</Link>

        <h1 className="mt-stack-content text-size-h2 font-semibold tracking-tight text-text-heading">
          Add project
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Add the project information used by your portfolio.
        </p>
      </div>

      <div className="rounded-lg border text-white border-border-subtle bg-surface-card p-inset-card shadow-sm">
        {error && (
          <p role="alert" className="mb-4 text-size-small text-text-error">
            {error}
          </p>
        )}
        <WorkForm
          onSubmit={handleSubmit}
          submitLabel={isSubmitting ? 'Creating project...' : 'Create project'}
        />
      </div>
    </div>
  )
}

export default NewWorkPage