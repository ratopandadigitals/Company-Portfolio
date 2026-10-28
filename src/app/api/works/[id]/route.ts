
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { getAuthenticatedSession } from '@/lib/api-auth'
import { writeAdminNotification } from '@/lib/admin-notifications'
import type { WorkDocument } from '@/types/database'
import { parseWorkInput } from '@/lib/work-validation'
import { withWorksMutation } from '@/lib/works-mutations'

type RouteContext = {
  params: Promise<{ id: string }>
}

export const GET = async (
  _request: Request,
  context: RouteContext,
) => {
  try {
    const { id } = await context.params

    const client = await clientPromise
    const db = client.db('rato_panda_portfolio')

    const work = await db
      .collection<WorkDocument>('works')
      .findOne({ slug: id })

    if (!work) {
      return NextResponse.json(
        {
          success: false,
          message: 'Work not found.',
        },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: work,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Failed to retrieve work:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Unable to retrieve work.',
      },
      { status: 500 },
    )
  }
}

export const PATCH = async (
  request: Request,
  context: RouteContext,
) => {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const { id: currentSlug } = await context.params
    const workInput = parseWorkInput(await request.json().catch(() => null))

    if (!workInput) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid project details.' },
        { status: 400 },
      )
    }

    const updatedWork = await withWorksMutation(async (collection, session) => {
      const existingWork = await collection.findOne({ slug: currentSlug }, { session })
      if (!existingWork) return null

      if (
        workInput.slug !== currentSlug &&
        (await collection.findOne({ slug: workInput.slug }, { session }))
      ) {
        return false
      }

      await collection.updateOne(
        { slug: currentSlug },
        { $set: { ...workInput, id: existingWork.id } },
        { session },
      )

      await writeAdminNotification({
        kind: 'content',
        title: 'Work updated',
        message: workInput.title,
        href: `/admin/works/${encodeURIComponent(workInput.slug)}`,
      }, session)

      return collection.findOne({ slug: workInput.slug }, { session })
    })

    if (updatedWork === null) {
      return NextResponse.json(
        { success: false, message: 'Work not found.' },
        { status: 404 },
      )
    }
    if (updatedWork === false) {
      return NextResponse.json(
        { success: false, message: 'A project with this slug already exists.' },
        { status: 409 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Project updated successfully.',
      data: updatedWork,
    })
  } catch (error) {
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { success: false, message: 'A project with this slug already exists.' },
        { status: 409 },
      )
    }

    console.error('Failed to update work:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to update project.' },
      { status: 500 },
    )
  }
}

export const DELETE = async (
  _request: Request,
  context: RouteContext,
) => {
  try {
    const session = await getAuthenticatedSession()

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const { id: slug } = await context.params
    const deleted = await withWorksMutation(async (collection, session) => {
      const result = await collection.deleteOne({ slug }, { session })
      if (result.deletedCount === 0) return false

      const works = await collection.find({}, { session }).sort({ id: 1 }).toArray()

      for (const [index, work] of works.entries()) {
        const id = `${String(index + 1).padStart(2, '0')}/${String(works.length).padStart(2, '0')}`
        if (work.id !== id) {
          await collection.updateOne({ slug: work.slug }, { $set: { id } }, { session })
        }
      }

      await writeAdminNotification({
        kind: 'content',
        title: 'Work deleted',
        message: slug,
        href: '/admin/works',
      }, session)

      return true
    })

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'Work not found.' },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully.',
    })
  } catch (error) {
    console.error('Failed to delete work:', error)
    return NextResponse.json(
      { success: false, message: 'Unable to delete project.' },
      { status: 500 },
    )
  }
}
