import type { ClientSession, Collection } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import type { WorkDocument } from '@/types/database'

export const withWorksMutation = async <T>(
  mutation: (
    collection: Collection<WorkDocument>,
    session: ClientSession,
  ) => Promise<T>,
): Promise<T> => {
  const client = await clientPromise
  const session = client.startSession()

  try {
    const result = await session.withTransaction(async () => {
      const db = client.db('rato_panda_portfolio')
      await db.collection<{ _id: string; sequence: number }>('counters').updateOne(
        { _id: 'works' },
        { $inc: { sequence: 1 } },
        { upsert: true, session },
      )

      return mutation(db.collection<WorkDocument>('works'), session)
    })

    if (result === undefined) {
      throw new Error('Works transaction did not return a result.')
    }

    return result
  } finally {
    await session.endSession()
  }
}