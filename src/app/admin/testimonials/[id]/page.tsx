
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import type { TestimonialItem } from '@/data/client'
import {
  getTestimonialById,
  updateTestimonial,
} from '@/data/clientStorage'
import TestimonialForm from '@/components/admin/testimonials/TestimonialsForm'

const EditTestimonialPage = () => {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const testimonialId = params.id

  const [testimonial, setTestimonial] = useState<
    TestimonialItem | undefined
  >(undefined)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setTestimonial(getTestimonialById(testimonialId))
    setIsLoaded(true)
  }, [testimonialId])

  const handleSubmit = (formData: FormData) => {
    if (!testimonial) return

    const updatedTestimonial: TestimonialItem = {
      id: testimonial.id,
      quote: String(formData.get('quote') ?? '').trim(),
      name: String(formData.get('name') ?? '').trim(),
      role: String(formData.get('role') ?? '').trim(),
      bgImage: String(formData.get('bgImage') ?? '').trim(),
    }

    if (
      !updatedTestimonial.quote ||
      !updatedTestimonial.name ||
      !updatedTestimonial.role
    ) {
      window.alert('Please complete all testimonial fields.')
      return
    }

    const savedTestimonial = updateTestimonial(
      testimonial.id,
      updatedTestimonial,
    )

    if (!savedTestimonial) {
      window.alert('Could not update this testimonial.')
      return
    }

    router.push('/admin/testimonials')
  }

  if (!isLoaded) {
    return (
      <p className="text-size-body text-text-caption">
        Loading testimonial...
      </p>
    )
  }

  if (!testimonial) {
    return (
      <div className="flex w-full flex-col gap-stack-content">
        <h1 className="text-size-h2 font-semibold text-text-heading">
          Testimonial not found
        </h1>

        <p className="text-size-body text-text-caption">
          This testimonial could not be found in the current Client Proof data.
        </p>

        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Client Proof
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full space-y-stack-content">
      <div>
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center gap-2 text-size-small font-medium text-text-caption transition-colors hover:text-text-primary"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Client Proof
        </Link>

        <h1 className="mt-stack-content text-size-h2 font-semibold tracking-tight text-text-heading">
          Edit testimonial
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Update the testimonial from {testimonial.name}.
        </p>
      </div>

      <div className="w-full rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <TestimonialForm
          key={testimonial.id}
          initialTestimonial={testimonial}
          onSubmit={handleSubmit}
          submitLabel="Save changes"
        />
      </div>
    </div>
  )
}

export default EditTestimonialPage
