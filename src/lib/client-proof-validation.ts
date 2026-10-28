import type { StatItem, TestimonialItem } from '@/data/client'

export const parseTestimonialInput = (
  body: unknown,
): Omit<TestimonialItem, 'id'> | null => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null

  const data = body as Record<string, unknown>
  const { quote, name, role, bgImage } = data

  if (
    typeof quote !== 'string' ||
    typeof name !== 'string' ||
    typeof role !== 'string' ||
    typeof bgImage !== 'string'
  ) {
    return null
  }

  const testimonial = {
    quote: quote.trim(),
    name: name.trim(),
    role: role.trim(),
    bgImage: bgImage.trim(),
  }

  if (
    !testimonial.quote || testimonial.quote.length > 2000 ||
    !testimonial.name || testimonial.name.length > 200 ||
    !testimonial.role || testimonial.role.length > 200 ||
    testimonial.bgImage.length > 2048 ||
    testimonial.bgImage.startsWith('data:')
  ) {
    return null
  }

  return testimonial
}

export const parseStatsInput = (body: unknown): StatItem[] | null => {
  if (!Array.isArray(body) || body.length !== 3) return null

  const stats: StatItem[] = []

  for (const item of body) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return null

    const data = item as Record<string, unknown>
    if (
      typeof data.id !== 'string' ||
      typeof data.value !== 'string' ||
      typeof data.label !== 'string'
    ) {
      return null
    }

    const value = data.value.trim()
    const label = data.label.trim()
    if (!value || value.length > 30 || !label || label.length > 100) return null

    stats.push({ id: data.id, value, label })
  }

  if (new Set(stats.map((stat) => stat.id)).size !== stats.length) return null
  return stats
}