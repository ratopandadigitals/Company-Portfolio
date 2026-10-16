
import {
  STATS_ITEMS,
  TESTIMONIALS_ITEMS,
} from '@/data/client'

import type {
  StatItem,
  TestimonialItem,
} from '@/data/client'

export type { StatItem, TestimonialItem }

const STORAGE_KEY = 'admin-client-proof'

type ClientProofData = {
  stats: StatItem[]
  testimonials: TestimonialItem[]
}

const getInitialClientProof = (): ClientProofData => ({
  stats: STATS_ITEMS,
  testimonials: TESTIMONIALS_ITEMS,
})

const getClientProof = (): ClientProofData => {
  if (typeof window === 'undefined') {
    return getInitialClientProof()
  }

  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) {
    return getInitialClientProof()
  }

  try {
    const parsedData = JSON.parse(storedData) as ClientProofData

    return {
      stats: Array.isArray(parsedData.stats)
        ? parsedData.stats
        : STATS_ITEMS,
      testimonials: Array.isArray(parsedData.testimonials)
        ? parsedData.testimonials
        : TESTIMONIALS_ITEMS,
    }
  } catch {
    return getInitialClientProof()
  }
}

const saveClientProof = (data: ClientProofData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// Stats

export const getStats = (): StatItem[] => {
  return getClientProof().stats
}

export const updateStats = (stats: StatItem[]): void => {
  const data = getClientProof()

  saveClientProof({
    ...data,
    stats,
  })
}

// Testimonials

export const getTestimonials = (): TestimonialItem[] => {
  return getClientProof().testimonials
}

export const createTestimonial = (
  testimonial: Omit<TestimonialItem, 'id'>,
): TestimonialItem => {
  const data = getClientProof()

  const newTestimonial: TestimonialItem = {
    ...testimonial,
    id: crypto.randomUUID(),
  }

  saveClientProof({
    ...data,
    testimonials: [...data.testimonials, newTestimonial],
  })

  return newTestimonial
}

export const getTestimonialById = (
  id: string,
): TestimonialItem | undefined => {
  return getTestimonials().find(
    (testimonial) => testimonial.id === id,
  )
}

export const updateTestimonial = (
  id: string,
  updatedTestimonial: TestimonialItem,
): TestimonialItem | undefined => {
  const data = getClientProof()

  const index = data.testimonials.findIndex(
    (testimonial) => testimonial.id === id,
  )

  if (index === -1) {
    return undefined
  }

  const updatedTestimonials = [...data.testimonials]
  updatedTestimonials[index] = updatedTestimonial

  saveClientProof({
    ...data,
    testimonials: updatedTestimonials,
  })

  return updatedTestimonial
}

export const deleteTestimonial = (id: string): boolean => {
  const data = getClientProof()

  const updatedTestimonials = data.testimonials.filter(
    (testimonial) => testimonial.id !== id,
  )

  if (updatedTestimonials.length === data.testimonials.length) {
    return false
  }

  saveClientProof({
    ...data,
    testimonials: updatedTestimonials,
  })

  return true
}
