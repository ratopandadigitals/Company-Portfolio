
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import type { WorkDocument } from '@/types/database'


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
      .findOne({ id })

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

export const PATCH = async () => {
  return NextResponse.json(
    {
      success: false,
      message: 'Admin authentication is required.',
    },
    { status: 401 },
  )
}

export const DELETE = async () => {
  return NextResponse.json(
    {
      success: false,
      message: 'Admin authentication is required.',
    },
    { status: 401 },
  )
}
