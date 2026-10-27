'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { WorkItem } from '@/data/works'
import {
  getWorkBySlug,
  updateWork,

} from '@/data/work'
import WorkForm from '@/components/admin/works/WorkForm'

const EditWorkPage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const slug = params.id

  const [work, setWork] = useState<WorkItem | undefined>(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setWork(getWorkBySlug(slug))
    setIsLoaded(true)
  }, [slug])

  const handleSubmit = (formData: FormData) => {
    if (!work) return

    const updatedWork: WorkItem = {
      id: work.id,
      slug: String(formData.get('slug') ?? '').trim(),
      title: String(formData.get('title') ?? '').trim(),
      description: String(formData.get('description') ?? '').trim(),
      year: String(formData.get('year') ?? '').trim(),
      role: String(formData.get('role') ?? '').trim(),
      services: formData
        .getAll('services')
        .map((value) => String(value).trim())
        .filter(Boolean),
      tools: formData
        .getAll('tools')
        .map((value) => String(value).trim())
        .filter(Boolean),
      previewImage: String(formData.get('previewImage') ?? '').trim(),
      bgImage: String(formData.get('bgImage') ?? '').trim(),
      gallery: formData
        .getAll('gallery')
        .map((value) => String(value).trim())
        .filter(Boolean),
    }

    const duplicateSlug = getWorkBySlug(updatedWork.slug)

    if (duplicateSlug && updatedWork.slug !== work.slug) {
      window.alert('A work with this slug already exists.')
      return
    }

    const savedWork = updateWork(work.slug, updatedWork)

    if (!savedWork) {
      window.alert('Could not update this work.')
      return
    }

    router.push('/admin/works')
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
          This work could not be found in the current Works data.
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

      <div className="w-full rounded-lg border border-border-subtle text-white bg-surface-card p-inset-card shadow-sm">
        <WorkForm
          key={work.slug}
          initialWork={work}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditWorkPage