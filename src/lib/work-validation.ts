import type { WorkItem } from '@/data/works'

export type WorkInput = Omit<WorkItem, 'id'>

export const parseWorkInput = (value: unknown): WorkInput | undefined => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined
  }

  const data = value as Record<string, unknown>
  const { slug, title, description, year, role, services, tools, previewImage, bgImage, gallery } = data

  if (
    typeof slug !== 'string' ||
    typeof title !== 'string' ||
    typeof description !== 'string' ||
    typeof year !== 'string' ||
    typeof role !== 'string' ||
    typeof previewImage !== 'string' ||
    typeof bgImage !== 'string' ||
    !Array.isArray(services) ||
    !services.every((item) => typeof item === 'string') ||
    !Array.isArray(tools) ||
    !tools.every((item) => typeof item === 'string') ||
    !Array.isArray(gallery) ||
    !gallery.every((item) => typeof item === 'string')
  ) {
    return undefined
  }

  const work: WorkInput = {
    slug: slug.trim(),
    title: title.trim(),
    description: description.trim(),
    year: year.trim(),
    role: role.trim(),
    services: services.map((item) => item.trim()).filter(Boolean),
    tools: tools.map((item) => item.trim()).filter(Boolean),
    previewImage: previewImage.trim(),
    bgImage: bgImage.trim(),
    gallery: gallery.map((item) => item.trim()).filter(Boolean),
  }

  if (
    !/^[A-Za-z0-9-]+$/.test(work.slug) ||
    !work.title ||
    !work.description ||
    !work.year ||
    !work.role ||
    !work.services.length ||
    !work.tools.length ||
    !work.previewImage ||
    !work.bgImage ||
    work.slug.length > 100 ||
    work.title.length > 200 ||
    work.description.length > 5000 ||
    work.year.length > 20 ||
    work.role.length > 200 ||
    work.services.some((item) => item.length > 100) ||
    work.tools.some((item) => item.length > 100) ||
    work.previewImage.length > 2048 ||
    work.bgImage.length > 2048 ||
    work.gallery.some((item) => !item || item.length > 2048) ||
    work.gallery.length > 30
  ) {
    return undefined
  }

  return work
}