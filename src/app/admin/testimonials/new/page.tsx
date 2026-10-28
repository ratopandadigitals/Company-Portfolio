
'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

import TestimonialForm from '@/components/admin/testimonials/TestimonialsForm'
import { createTestimonial} from '@/data/clientStorage'

const NewTestimonialPage = () => {
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    const quote = String(formData.get('quote') ?? '').trim()
    const name = String(formData.get('name') ?? '').trim()
    const role = String(formData.get('role') ?? '').trim()
    const bgImage = String(formData.get('bgImage') ?? '').trim()

    if (!quote || !name || !role) {
      window.alert('Please complete all testimonial fields.')
      return
    }

    const testimonialData = {
      quote,
      name,
      role,
      bgImage,
    }

   
    try {
      await createTestimonial(testimonialData)
      router.push('/admin/testimonials')
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to create testimonial.')
    }
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
          Add testimonial
        </h1>

        <p className="mt-stack-tight text-size-body text-text-caption">
          Add a client testimonial displayed in your portfolio.
        </p>
      </div>

      <div className="rounded-lg border border-border-subtle bg-surface-card p-inset-card shadow-sm">
        <TestimonialForm
          onSubmit={handleSubmit}
          submitLabel="Create testimonial"
        />
      </div>
    </div>
  )
}

export default NewTestimonialPage
