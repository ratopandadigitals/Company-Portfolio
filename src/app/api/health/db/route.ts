
import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export const GET = async () => {
  try {
    const client = await clientPromise
    await client.db('rato_panda_portfolio').command({ ping: 1 })

    return NextResponse.json({
      success: true,
      message: 'MongoDB Atlas connected successfully',
    })
  } catch (error) {
    console.error('MongoDB health check failed:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
      },
      { status: 500 },
    )
  }
}
