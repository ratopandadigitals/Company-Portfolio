export type EnquiryStatus = 'new' | 'read'

export type EnquiryItem = {
  id: string
  name: string
  email: string
  subject: string
  serviceId?: string
  message: string
  createdAt: string
  status: EnquiryStatus
}