
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

const ALLOWED_FOLDERS = [
  'profile',
  'works',
  'services',
  'events',
  'gallery',
  'testimonials',
] as const

export const POST = async (request: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized.' },
        { status: 401 },
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')
    const requestedFolder = formData.get('folder')

    if (typeof File === 'undefined' || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Please select an image.' },
        { status: 400 },
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Only JPEG, PNG, and WebP images are allowed.',
        },
        { status: 400 },
      )
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: 'The image must be smaller than 5 MB.',
        },
        { status: 400 },
      )
    }

    const folder =
      typeof requestedFolder === 'string' &&
      ALLOWED_FOLDERS.some((allowed) => allowed === requestedFolder)
        ? requestedFolder
        : 'profile'

    const buffer = Buffer.from(await file.arrayBuffer())

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `rato-panda-digitals/${folder}`,
              resource_type: 'image',
            },
            (error, uploadedFile) => {
              if (error) {
                reject(error)
                return
              }

              if (!uploadedFile) {
                reject(new Error('Cloudinary returned no upload result.'))
                return
              }

              resolve(uploadedFile)
            },
          )
          .end(buffer)
      },
    )

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    })
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Image upload failed. Please try again.',
      },
      { status: 500 },
    )
  }
}
