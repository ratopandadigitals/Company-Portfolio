
'use client'

import { useRef, useState } from 'react'
import { UserRound, Camera, LoaderCircle } from 'lucide-react'
import { authClient } from '@/lib/auth-client'
import Image from 'next/image'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

const ProfileSettings = () => {
  const { data: session, isPending, error: sessionError } =
    authClient.useSession()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const user = session?.user

  const displayName = user?.name || 'Administrator'
  const displayEmail = user?.email || ''

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    setErrorMessage('')
    setSuccessMessage('')

    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMessage('Please select a JPEG, PNG, or WebP image.')
      event.target.value = ''
      return
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      setErrorMessage('The image must be smaller than 5 MB.')
      event.target.value = ''
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'profile')

      const response = await fetch('/api/admin/uploads', {
        method: 'POST',
        body: formData,
      })

      const result = (await response.json()) as {
        success?: boolean
        url?: string
        message?: string
      }

      if (!response.ok || !result.success || !result.url) {
        setErrorMessage(
          result.message || 'Unable to upload your profile picture.',
        )
        return
      }

      const { error: updateError } = await authClient.updateUser({
        image: result.url,
      })

      if (updateError) {
        setErrorMessage(
          'Your image uploaded, but your profile could not be updated. Please try again.',
        )
        return
      }

      setSuccessMessage('Profile picture updated successfully.')
    } catch {
      setErrorMessage(
        'Something went wrong while updating your profile picture.',
      )
    } finally {
      setIsUploading(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <section className="rounded-xl border border-border-subtle bg-surface-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-surface-section text-icon-primary">
          <UserRound size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="font-semibold text-heading">Profile</h2>
          <p className="mt-1 text-sm text-caption">
            Manage your administrator profile information.
          </p>
        </div>
      </div>

      {isPending ? (
        <p className="mt-6 text-sm text-caption">Loading profile...</p>
      ) : sessionError ? (
        <p role="alert" className="mt-6 text-sm text-red-500">
          Unable to load your profile. Please refresh the page.
        </p>
      ) : !user ? (
        <p className="mt-6 text-sm text-caption">
          No signed-in user was found. Please sign in again.
        </p>
      ) : (
        <>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
           {user.image ? (
  <Image
    src={user.image}
    alt={`${displayName}'s profile`}
    width={80}
    height={80}
    unoptimized
    className="size-20 shrink-0 rounded-full border border-border-divider object-cover"
  />
) : (
              <div className="flex size-20 shrink-0 items-center justify-center rounded-full border border-border-divider bg-surface-section text-icon-primary">
                <UserRound size={32} strokeWidth={1.5} />
              </div>
            )}

            <div className="space-y-2">
              <p className="font-medium text-heading">{displayName}</p>
              <p className="text-sm text-caption">
                Administrator account
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={isUploading}
                className="sr-only"
                aria-label="Choose a profile picture"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-4 py-2 text-sm font-medium text-heading transition-colors hover:bg-surface-section focus-visible:outline-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isUploading ? (
                  <LoaderCircle
                    size={16}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Camera size={16} aria-hidden="true" />
                )}

                {isUploading ? 'Uploading...' : 'Change picture'}
              </button>

              <p className="text-xs text-caption">
                JPEG, PNG, or WebP. Maximum file size: 5 MB.
              </p>
            </div>
          </div>

          {errorMessage && (
            <p role="alert" className="mt-4 text-sm text-red-500">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p role="status" className="mt-4 text-sm text-green-600">
              {successMessage}
            </p>
          )}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="profile-name"
                className="text-sm font-medium text-heading"
              >
                Name
              </label>

              <input
                id="profile-name"
                type="text"
                value={displayName}
                readOnly
                className="h-11 w-full rounded-lg border border-border-subtle bg-surface-section px-3 text-sm text-heading"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="profile-email"
                className="text-sm font-medium text-heading"
              >
                Email address
              </label>

              <input
                id="profile-email"
                type="email"
                value={displayEmail}
                readOnly
                className="h-11 w-full rounded-lg border border-border-subtle bg-surface-section px-3 text-sm text-heading"
              />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default ProfileSettings
