import type { ObjectId } from 'mongodb'

export type AdminNotificationKind =
  | 'enquiry'
  | 'newsletter'
  | 'content'

export type AdminNotificationInput = {
  kind: AdminNotificationKind
  title: string
  message: string
  href: string
}

export type AdminNotification = AdminNotificationInput & {
  _id?: ObjectId
  id: string
  createdAt: string
  readBy: string[]
}