
export type EnquiryStatus = 'new' | 'read'

export type EnquiryItem = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
  status: EnquiryStatus
}

const STORAGE_KEY = 'admin-enquiries'

const initialEnquiries: EnquiryItem[] = [
  {
    id: 'sample-enquiry-1',
    name: 'Sample Visitor',
    email: 'visitor@example.com',
    subject: 'Website development',
    message:
      'Hello, I would like to learn more about your website development services. Could you share more information?',
    createdAt: '2026-10-15T09:30:00.000Z',
    status: 'new',
  },
  {
    id: 'sample-enquiry-2',
    name: 'Demo Client',
    email: 'client@example.com',
    subject: 'UI/UX design enquiry',
    message:
      'I am interested in UI/UX design for a new product. Please let me know how we could discuss the project.',
    createdAt: '2026-10-14T06:15:00.000Z',
    status: 'read',
  },
]

export const getEnquiries = (): EnquiryItem[] => {
  if (typeof window === 'undefined') return []

  const storedEnquiries = localStorage.getItem(STORAGE_KEY)

  if (storedEnquiries === null) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialEnquiries))
    return initialEnquiries
  }

  try {
    const parsed: unknown = JSON.parse(storedEnquiries)
    return Array.isArray(parsed) ? (parsed as EnquiryItem[]) : []
  } catch {
    return []
  }
}

const saveEnquiries = (enquiries: EnquiryItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries))
}

export const createEnquiry = (
  enquiry: Pick<EnquiryItem, 'name' | 'email' | 'subject' | 'message'>,
): EnquiryItem => {
  const newEnquiry: EnquiryItem = {
    ...enquiry,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  }

  saveEnquiries([newEnquiry, ...getEnquiries()])
  return newEnquiry
}

export const getEnquiryById = (
  id: string,
): EnquiryItem | undefined => {
  return getEnquiries().find((enquiry) => enquiry.id === id)
}

export const markEnquiryAsRead = (id: string): EnquiryItem | undefined => {
  const enquiries = getEnquiries()
  const index = enquiries.findIndex((enquiry) => enquiry.id === id)

  if (index === -1) return undefined

  const updatedEnquiry = { ...enquiries[index], status: 'read' as const }
  enquiries[index] = updatedEnquiry
  saveEnquiries(enquiries)

  return updatedEnquiry
}

export const deleteEnquiry = (id: string): boolean => {
  const enquiries = getEnquiries()
  const updatedEnquiries = enquiries.filter((enquiry) => enquiry.id !== id)

  if (updatedEnquiries.length === enquiries.length) return false

  saveEnquiries(updatedEnquiries)
  return true
}
