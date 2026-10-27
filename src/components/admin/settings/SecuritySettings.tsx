
'use client'

import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { authClient } from '@/lib/auth-client'

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handlePasswordChange = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (newPassword.length < 8) {
      setErrorMessage('Your new password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('The new passwords do not match.')
      return
    }

    if (currentPassword === newPassword) {
      setErrorMessage(
        'Your new password must differ from your current password.',
      )
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      })

      if (error) {
        setErrorMessage(
          error.message || 'Unable to change your password. Please try again.',
        )
        return
      }

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setShowCurrentPassword(false)
      setShowNewPassword(false)
      setShowConfirmPassword(false)
      setSuccessMessage('Your password has been changed successfully.')
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-xl border border-border-subtle bg-surface-card p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-surface-section text-icon-primary">
          <ShieldCheck size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="font-semibold text-heading">
            Account security
          </h2>
          <p className="mt-1 text-sm text-caption">
            Manage your password and account security.
          </p>
        </div>
      </div>

      <form onSubmit={handlePasswordChange} className="mt-6 space-y-5">
        <div>
          <h3 className="text-sm font-medium text-heading">
            Change password
          </h3>
          <p className="mt-1 text-sm text-caption">
            Enter your current password and choose a new one.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="current-password"
            className="text-sm font-medium text-heading"
          >
            Current password
          </label>

          <div className="relative">
            <input
              id="current-password"
              type={showCurrentPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              disabled={isSubmitting}
              className="h-11 w-full rounded-lg border border-border-subtle bg-surface-section px-3 pr-11 text-sm text-heading outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:opacity-60"
            />

            <button
              type="button"
              onClick={() => setShowCurrentPassword((visible) => !visible)}
              aria-label={
                showCurrentPassword ? 'Hide current password' : 'Show current password'
              }
              aria-pressed={showCurrentPassword}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-icon-secondary transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-primary-500"
            >
              {showCurrentPassword ? (
                <EyeOff size={18} aria-hidden="true" />
              ) : (
                <Eye size={18} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="new-password"
              className="text-sm font-medium text-heading"
            >
              New password
            </label>

            <div className="relative">
              <input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                autoComplete="new-password"
                minLength={8}
                required
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                disabled={isSubmitting}
                className="h-11 w-full rounded-lg border border-border-subtle bg-surface-section px-3 pr-11 text-sm text-heading outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword((visible) => !visible)}
                aria-label={
                  showNewPassword ? 'Hide new password' : 'Show new password'
                }
                aria-pressed={showNewPassword}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-icon-secondary transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-primary-500"
              >
                {showNewPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>

            <p className="text-xs text-caption">
              Use at least 8 characters.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-heading"
            >
              Confirm new password
            </label>

            <div className="relative">
              <input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                disabled={isSubmitting}
                className="h-11 w-full rounded-lg border border-border-subtle bg-surface-section px-3 pr-11 text-sm text-heading outline-none focus-visible:border-primary-500 focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((visible) => !visible)}
                aria-label={
                  showConfirmPassword
                    ? 'Hide confirmation password'
                    : 'Show confirmation password'
                }
                aria-pressed={showConfirmPassword}
                className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-lg text-icon-secondary transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-primary-500"
              >
                {showConfirmPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {errorMessage && (
          <p role="alert" className="text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p role="status" className="text-sm text-green-600">
            {successMessage}
          </p>
        )}

        <div className="border-t border-border-divider pt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary-500 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Updating password...' : 'Update password'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default SecuritySettings
