import { NextResponse } from 'next/server'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { writeAdminNotification } from '@/lib/admin-notifications'
import { parseWorkInput } from '@/lib/work-validation'
import { withWorksMutation } from '@/lib/works-mutations'

export const POST = async (request: Request) => {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const body: unknown = await request.json().catch(() => null)

    if (
      !body ||
      typeof body !== 'object' ||
      Array.isArray(body) ||
      !Array.isArray((body as Record<string, unknown>).works) ||
      !(body as { works: unknown[] }).works.length ||
      (body as { works: unknown[] }).works.length > 100
    ) {
      return NextResponse.json(
        { success: false, message: 'No valid browser-saved projects were provided.' },
        { status: 400 },
      )
    }

    const works = (body as { works: unknown[] }).works.map(parseWorkInput)

    if (works.some((work) => !work)) {
      return NextResponse.json(
        { success: false, message: 'One or more saved projects are invalid.' },
        { status: 400 },
      )
    }

    const validWorks = works as NonNullable<(typeof works)[number]>[]
    const slugs = validWorks.map((work) => work.slug)

    if (new Set(slugs).size !== slugs.length) {
      return NextResponse.json(
        { success: false, message: 'The saved projects contain duplicate slugs.' },
        { status: 400 },
      )
    }

    const data = await withWorksMutation(async (collection, session) => {
      const existingWorks = await collection.find({}, { session }).sort({ id: 1 }).toArray()
      let nextPosition = existingWorks.length

      for (const work of validWorks) {
        const existing = await collection.findOne({ slug: work.slug }, { session })

        if (existing) {
          await collection.updateOne({ slug: work.slug }, { $set: work }, { session })
          continue
        }

        nextPosition += 1
        await collection.insertOne({
          ...work,
          id: `${String(nextPosition).padStart(2, '0')}/${String(nextPosition).padStart(2, '0')}`,
        }, { session })
      }

      const importedWorks = await collection.find({}, { session }).sort({ id: 1 }).toArray()

      for (const [index, work] of importedWorks.entries()) {
        const id = `${String(index + 1).padStart(2, '0')}/${String(importedWorks.length).padStart(2, '0')}`
        if (work.id !== id) {
          await collection.updateOne({ slug: work.slug }, { $set: { id } }, { session })
        }
      }

      await writeAdminNotification({
        kind: 'content',
        title: 'Works imported',
        message: `${validWorks.length} browser-saved project${validWorks.length === 1 ? '' : 's'} imported.`,
        href: '/admin/works',
      }, session)

      return collection.find({}, { session }).sort({ id: 1 }).toArray()
    })

    return NextResponse.json({
      success: true,
      message: `${validWorks.length} browser-saved projects imported successfully.`,
      data,
    })
  } catch (error) {
    console.error('Failed to import browser-saved works:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to import browser-saved projects.' },
      { status: 500 },
    )
  }
}