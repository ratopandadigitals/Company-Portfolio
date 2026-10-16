import {
  SERVICES_DATA,
  type ServiceItem,
} from '@/components/sections/services/Service'

export type { ServiceItem }

const STORAGE_KEY = 'admin-services'

const getInitialServices = (): ServiceItem[] => {
  return SERVICES_DATA.map((service) => ({
    ...service,
    tags: [...service.tags],
  }))
}

export const getServices = (): ServiceItem[] => {
  if (typeof window === 'undefined') {
    return getInitialServices()
  }

  const storedServices = localStorage.getItem(STORAGE_KEY)

  if (!storedServices) {
    return getInitialServices()
  }

  try {
    const parsedServices = JSON.parse(storedServices) as ServiceItem[]

    return Array.isArray(parsedServices)
      ? parsedServices.map((service) => ({
          ...service,
          tags: [...service.tags],
        }))
      : getInitialServices()
  } catch {
    return getInitialServices()
  }
}

const saveServices = (services: ServiceItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services))
}

export const getServiceById = (
  id: string,
): ServiceItem | undefined => {
  const service = getServices().find((item) => item.id === id)

  if (!service) return undefined

  return {
    ...service,
    tags: [...service.tags],
  }
}

export const createService = (
  service: ServiceItem,
): ServiceItem => {
  const services = getServices()

  const newService: ServiceItem = {
    ...service,
    tags: [...service.tags],
  }

  saveServices([...services, newService])

  return {
    ...newService,
    tags: [...newService.tags],
  }
}

export const updateService = (
  id: string,
  updatedService: ServiceItem,
): ServiceItem | undefined => {
  const services = getServices()
  const existingService = services.find(
    (service) => service.id === id,
  )

  if (!existingService) return undefined

  const nextService: ServiceItem = {
    ...updatedService,
    id: existingService.id,
    tags: [...updatedService.tags],
  }

  const updatedServices = services.map((service) =>
    service.id === id ? nextService : service,
  )

  saveServices(updatedServices)

  return {
    ...nextService,
    tags: [...nextService.tags],
  }
}

export const deleteService = (id: string): boolean => {
  const services = getServices()
  const updatedServices = services.filter(
    (service) => service.id !== id,
  )

  if (updatedServices.length === services.length) {
    return false
  }

  saveServices(updatedServices)

  return true
}
