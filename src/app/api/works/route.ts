
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { writeAdminNotification } from '@/lib/admin-notifications'
import type { WorkDocument } from '@/types/database'
import { parseWorkInput } from '@/lib/work-validation'
import { withWorksMutation } from '@/lib/works-mutations'

export const GET = async () => {
  try {
    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const works = await db
      .collection<WorkDocument>('works')
      .find({})
      .sort({ id: 1 })
      .toArray()

    return NextResponse.json(
      {
        success: true,
        data: works,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to retrieve works:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve works.',
      },
      { status: 500 },
    )
  }
}

export const POST = async (request: Request) => {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const workInput = parseWorkInput(await request.json().catch(() => null))

    if (!workInput) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid project details.' },
        { status: 400 },
      )
    }

    const createdWork = await withWorksMutation(async (collection, session) => {
      if (await collection.findOne({ slug: workInput.slug }, { session })) {
        return null
      }

      const total = (await collection.countDocuments({}, { session })) + 1
      const work: WorkDocument = {
        ...workInput,
        id: `${String(total).padStart(2, '0')}/${String(total).padStart(2, '0')}`,
      }

      await collection.insertOne(work, { session })
      const works = await collection.find({}, { session }).sort({ id: 1 }).toArray()

      for (const [index, item] of works.entries()) {
        const id = `${String(index + 1).padStart(2, '0')}/${String(works.length).padStart(2, '0')}`
        if (item.id !== id) {
          await collection.updateOne({ slug: item.slug }, { $set: { id } }, { session })
        }
      }

      await writeAdminNotification({
        kind: 'content',
        title: 'Work created',
        message: work.title,
        href: `/admin/works/${encodeURIComponent(work.slug)}`,
      }, session)

      return collection.findOne({ slug: work.slug }, { session })
    })

    if (!createdWork) {
      return NextResponse.json(
        { success: false, message: 'A project with this slug already exists.' },
        { status: 409 },
      )
    }

    return NextResponse.json(
      { success: true, message: 'Project created successfully.', data: createdWork },
      { status: 201 },
    )
  } catch (error) {
    console.error('Failed to create work:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to create project.' },
      { status: 500 },
    )
  }
}
