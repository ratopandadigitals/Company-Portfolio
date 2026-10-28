'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { WorkItem } from '@/data/works'
import WorkForm from '@/components/admin/works/WorkForm'

const EditWorkPage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const slug = params.id

  const [work, setWork] = useState<WorkItem | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    let isActive = true

    const loadWork = async () => {
      try {
        const response = await fetch(
          `/api/works/${encodeURIComponent(slug)}`,
          { cache: 'no-store', signal: controller.signal },
        )
        const result = await response.json()

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || 'Work not found.')
        }

        if (isActive) setWork(result.data as WorkItem)
      } catch (loadError) {
        if (loadError instanceof Error && loadError.name === 'AbortError') return
        if (isActive) {
          setWork(undefined)
          setError(
            loadError instanceof Error ? loadError.message : 'Unable to load project.',
          )
        }
      } finally {
        if (isActive) setIsLoaded(true)
      }
    }

    void loadWork()
    return () => {
      isActive = false
      controller.abort()
    }
  }, [slug])

  const handleSubmit = async (formData: FormData) => {
    if (!work || isSubmitting) return
    setError('')
    setIsSubmitting(true)

    try {
      const updatedWork: Omit<WorkItem, 'id'> = {
        slug: String(formData.get('slug') ?? '').trim(),
        title: String(formData.get('title') ?? '').trim(),
        description: String(formData.get('description') ?? '').trim(),
        year: String(formData.get('year') ?? '').trim(),
        role: String(formData.get('role') ?? '').trim(),
        services: String(formData.get('services') ?? '')
          .split('\n')
          .map((value) => value.trim())
          .filter(Boolean),
        tools: String(formData.get('tools') ?? '')
          .split('\n')
          .map((value) => value.trim())
          .filter(Boolean),
        previewImage: String(formData.get('previewImage') ?? '').trim(),
        bgImage: String(formData.get('bgImage') ?? '').trim(),
        gallery: String(formData.get('gallery') ?? '')
          .split('\n')
          .map((value) => value.trim())
          .filter(Boolean),
      }

      const response = await fetch(
        `/api/works/${encodeURIComponent(work.slug)}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedWork),
        },
      )
      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to update project.')
      }

      router.push('/admin/works')
      router.refresh()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to update project. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoaded) {
    return (
      <p className="text-size-body text-text-caption">
        Loading work...
      </p>
    )
  }

  if (!work) {
    return (
      <div className="flex w-full flex-col gap-stack-content">
        <h1 className="text-size-h2 font-semibold text-text-heading">
          Work not found
        </h1>

        <p className="text-size-body text-text-caption">
          {error || 'This work could not be found in MongoDB.'}
        </p>

        <Link
          href="/admin/works"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Works
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full space-y-stack-content">
      <div>
        <Link
          href="/admin/works"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Works
        </Link>

        <h1 className="mt-stack-content text-size-h2 font-semibold tracking-tight text-text-heading">
          Edit work
        </h1>

        <p className="mt-stack-tight text-size-body text-caption">
          Update the details for {work.title}.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-size-small text-text-error">
          {error}
        </p>
      )}

      <div className="w-full rounded-lg border border-border-subtle text-white bg-surface-card p-inset-card shadow-sm">
        <WorkForm
          key={work.slug}
          initialWork={work}
          onSubmit={handleSubmit}
          submitLabel={isSubmitting ? 'Saving changes...' : 'Save changes'}
        />
      </div>
    </div>
  )
}

export default EditWorkPage