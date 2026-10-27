
import { WORK_ITEMS, type WorkItem } from '@/data/works'

export type { WorkItem }

const STORAGE_KEY = 'admin-works'

const getInitialWorks = (): WorkItem[] => {
  return WORK_ITEMS.map((work) => ({
    ...work,
    services: [...work.services],
    tools: [...work.tools],
    gallery: [...work.gallery],
  }))
}

export const getWorks = (): WorkItem[] => {
  if (typeof window === 'undefined') {
    return getInitialWorks()
  }

  const storedWorks = localStorage.getItem(STORAGE_KEY)

  if (!storedWorks) {
    return getInitialWorks()
  }

  try {
    const parsedWorks = JSON.parse(storedWorks) as WorkItem[]

    return Array.isArray(parsedWorks)
      ? parsedWorks.map((work) => ({
          ...work,
          services: [...work.services],
          tools: [...work.tools],
          gallery: [...work.gallery],
        }))
      : getInitialWorks()
  } catch {
    return getInitialWorks()
  }
}

const saveWorks = (works: WorkItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works))
}

const updateProjectIds = (items: WorkItem[]): WorkItem[] => {
  const total = items.length

  return items.map((work, index) => ({
    ...work,
    id: `${String(index + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`,
  }))
}

export const getWorkBySlug = (
  slug: string,
): WorkItem | undefined => {
  const work = getWorks().find((item) => item.slug === slug)

  if (!work) return undefined

  return {
    ...work,
    services: [...work.services],
    tools: [...work.tools],
    gallery: [...work.gallery],
  }
}

export const createWork = (
  work: Omit<WorkItem, 'id'>,
): WorkItem => {
  const works = getWorks()

  const newWork: WorkItem = {
    ...work,
    id: '',
    services: [...work.services],
    tools: [...work.tools],
    gallery: [...work.gallery],
  }

  const updatedWorks = updateProjectIds([...works, newWork])

  saveWorks(updatedWorks)

  const createdWork = updatedWorks[updatedWorks.length - 1]

  return {
    ...createdWork,
    services: [...createdWork.services],
    tools: [...createdWork.tools],
    gallery: [...createdWork.gallery],
  }
}

export const updateWork = (
  currentSlug: string,
  updatedWork: WorkItem,
): WorkItem | undefined => {
  const works = getWorks()
  const existingWork = works.find(
    (work) => work.slug === currentSlug,
  )

  if (!existingWork) return undefined

  const nextWork: WorkItem = {
    ...updatedWork,
    id: existingWork.id,
    services: [...updatedWork.services],
    tools: [...updatedWork.tools],
    gallery: [...updatedWork.gallery],
  }

  const updatedWorks = works.map((work) =>
    work.slug === currentSlug ? nextWork : work,
  )

  saveWorks(updatedWorks)

  return {
    ...nextWork,
    services: [...nextWork.services],
    tools: [...nextWork.tools],
    gallery: [...nextWork.gallery],
  }
}

export const deleteWork = (slug: string): boolean => {
  const works = getWorks()
  const updatedWorks = works.filter(
    (work) => work.slug !== slug,
  )

  if (updatedWorks.length === works.length) {
    return false
  }

  saveWorks(updateProjectIds(updatedWorks))

  return true
}
