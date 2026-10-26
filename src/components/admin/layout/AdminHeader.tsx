
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  LogOut,
  UserRound,
} from 'lucide-react'

import ThemeToggle from '@/components/atoms/themeToggle'
import { authClient } from '@/lib/auth-client'

const PAGE_NAMES: Record<string, string> = {
  dashboard: 'Dashboard',
  services: 'Services',
  works: 'Works',
  events: 'Events',
  gallery: 'Gallery',
  enquiries: 'Enquiries',
  testimonials: 'Testimonials',
  settings: 'Settings',
}

const SINGULAR_NAMES: Record<string, string> = {
  services: 'Service',
  works: 'Work',
  events: 'Event',
  testimonials: 'Testimonial',
}

const AdminHeader = () => {
  const pathname = usePathname()
  const router = useRouter()

  const [profileOpen, setProfileOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  const { data: session, isPending } = authClient.useSession()

  const user = session?.user
  const profileImage = user?.image || undefined

  const segments = pathname.split('/').filter(Boolean).slice(1)
  const section = segments[0] || 'dashboard'
  const action = segments[1]

  let pageTitle = PAGE_NAMES[section] || 'Dashboard'

  if (action === 'new') {
    pageTitle = `Add ${SINGULAR_NAMES[section] || pageTitle}`
  } else if (action) {
    pageTitle = `Edit ${SINGULAR_NAMES[section] || pageTitle}`
  }

  const userName = user?.name || user?.email || 'Admin'
  const userEmail = user?.email || ''

  const handleLogout = async () => {
    if (isLoggingOut) return

    setIsLoggingOut(true)
    setLogoutError('')

    try {
      const result = await authClient.signOut()

      if (result.error) {
        setLogoutError('Unable to log out. Please try again.')
        setIsLoggingOut(false)
        return
      }

      setProfileOpen(false)
      router.replace('/login')
      router.refresh()
    } catch {
      setLogoutError('Unable to log out. Please try again.')
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="relative z-20 flex h-[76px] shrink-0 items-center justify-between gap-3 border-b border-border-subtle bg-surface-page px-4 sm:px-6 lg:px-8">
      {/* Current page */}
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="shrink-0 text-caption">Admin</span>

        <span aria-hidden="true" className="text-caption">
          /
        </span>

        <h1 className="truncate font-medium text-heading">
          {pageTitle}
        </h1>
      </div>

      {/* Header actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-md text-icon-secondary transition-colors hover:bg-surface-section hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <Bell className="size-5" aria-hidden="true" />
        </button>

        <ThemeToggle />

        {/* Signed-in user profile */}
        <div className="relative">
          <button
            type="button"
            aria-label="User profile"
            aria-expanded={profileOpen}
            aria-haspopup="true"
            onClick={() => setProfileOpen((open) => !open)}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border-subtle bg-surface-card px-2 text-heading transition-colors hover:bg-surface-section focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <span className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-subtle bg-surface-section">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={`${userName}'s profile`}
                  width={28}
                  height={28}
                  unoptimized
                  className="size-full object-cover"
                />
              ) : (
                <UserRound className="size-4" aria-hidden="true" />
              )}
            </span>

            <span className="hidden max-w-36 truncate text-sm sm:inline">
              {isPending ? 'Loading...' : userName}
            </span>

            <ChevronDown
              className={`hidden size-4 text-icon-secondary transition-transform sm:block ${
                profileOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {profileOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-border-subtle bg-surface-card p-3 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-subtle bg-surface-section">
                  {profileImage ? (
                    <Image
                      src={profileImage}
                      alt={`${userName}'s profile`}
                      width={40}
                      height={40}
                      unoptimized
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound size={20} aria-hidden="true" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-heading">
                    {userName}
                  </p>

                  {userEmail && (
                    <p className="mt-1 break-all text-xs text-caption">
                      {userEmail}
                    </p>
                  )}
                </div>
              </div>

              {logoutError && (
                <p role="alert" className="mt-3 text-sm text-red-600">
                  {logoutError}
                </p>
              )}

              <div className="my-3 border-t border-border-subtle" />

              <Link
                href="/admin/settings"
                role="menuitem"
                onClick={() => setProfileOpen(false)}
                className="block rounded-md px-2 py-2 text-sm text-heading transition-colors hover:bg-surface-section"
              >
                Account settings
              </Link>

              <button
                type="button"
                role="menuitem"
                onClick={handleLogout}
                disabled={isLoggingOut || isPending || !user}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-heading transition-colors hover:bg-surface-section disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut className="size-4" aria-hidden="true" />
                {isLoggingOut ? 'Logging out...' : 'Log out'}
              </button>
            </div>
          )}
        </div>

        {/* Public website */}
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-1.5 rounded-md text-sm text-caption transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <span className="hidden md:inline">View website</span>
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </header>
  )
}

export default AdminHeader
