
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  UserRound,
} from 'lucide-react'

import ThemeToggle from '@/components/atoms/themeToggle'

const PAGE_NAMES: Record<string, string> = {
  dashboard: 'Dashboard',
  services: 'Services',
  works: 'Works',
  events: 'Events',
  gallery: 'Gallery',
  enquiries: 'Enquiries',
  testimonials: 'Testimonials',
}

const SINGULAR_NAMES: Record<string, string> = {
  services: 'Service',
  works: 'Work',
  events: 'Event',
  testimonials: 'Testimonial',
}

export default function AdminHeader() {
  const pathname = usePathname()
  const [profileOpen, setProfileOpen] = useState(false)

  const segments = pathname.split('/').filter(Boolean).slice(1)
  const section = segments[0] || 'dashboard'
  const action = segments[1]

  let pageTitle = PAGE_NAMES[section] || 'Dashboard'

  if (action === 'new') {
    pageTitle = `Add ${SINGULAR_NAMES[section] || pageTitle}`
  } else if (action) {
    pageTitle = `Edit ${SINGULAR_NAMES[section] || pageTitle}`
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
        {/* Notifications: UI only until notification functionality exists */}
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="relative inline-flex size-10 items-center justify-center rounded-md text-icon-secondary transition-colors hover:bg-surface-section hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <Bell className="size-5" aria-hidden="true" />
        </button>

        {/* Existing light/dark theme toggle */}
        <ThemeToggle />

        {/* Administrator profile */}
        <div className="relative">
          <button
            type="button"
            aria-label="Administrator profile"
            aria-expanded={profileOpen}
            aria-haspopup="true"
            onClick={() => setProfileOpen((open) => !open)}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border-subtle bg-surface-card px-2 text-heading transition-colors hover:bg-surface-section focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-surface-section">
              <UserRound
                className="size-4"
                aria-hidden="true"
              />
            </span>

            <span className="hidden text-sm sm:inline">
              Administrator
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
              className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border-subtle bg-surface-card p-3 shadow-lg"
            >
              <p className="text-sm font-medium text-heading">
                Administrator
              </p>
              <p className="mt-1 text-xs text-caption">
                Admin account
              </p>
            </div>
          )}
        </div>

        {/* Public website */}
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-1.5 rounded-md text-sm text-caption transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          <span className="hidden md:inline">View website</span>
          <ArrowUpRight
            className="size-4"
            aria-hidden="true"
          />
        </Link>
      </div>
    </header>
  )
}