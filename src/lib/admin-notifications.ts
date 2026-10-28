import type { ClientSession } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { AdminNotification, AdminNotificationInput } from '@/types/notification'

export const createAdminNotification = (
  input: AdminNotificationInput,
): AdminNotification => ({
  ...input,
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
  readBy: [],
})

export const writeAdminNotification = async (
  input: AdminNotificationInput,
  session?: ClientSession,
): Promise<void> => {
  const client = await clientPromise
  await client
    .db('rato_panda_portfolio')
    .collection<AdminNotification>('admin_notifications')
    .insertOne(createAdminNotification(input), { session })
}

export const recordAdminNotification = async (
  input: AdminNotificationInput,
): Promise<void> => {
  try {
    await writeAdminNotification(input)
  } catch (error) {
    console.error('Unable to record admin notification:', error)
  }
}