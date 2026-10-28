
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ArrowUpRight,
  Bell,
  CheckCheck,
  ChevronDown,
  LogOut,
  Menu,
  UserRound,
} from 'lucide-react'

import ThemeToggle from '@/components/atoms/themeToggle'
import { authClient } from '@/lib/auth-client'
import type { AdminNotification } from '@/types/notification'

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

const AdminHeader = ({ onOpenNavigation }: { onOpenNavigation: () => void }) => {
  const pathname = usePathname()
  const router = useRouter()

  const [profileOpen, setProfileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [notificationError, setNotificationError] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  const { data: session, isPending } = authClient.useSession()

  const user = session?.user
  const profileImage = user?.image || undefined

  useEffect(() => {
    let active = true

    const loadNotifications = async () => {
      try {
        const response = await fetch('/api/admin/notifications', { cache: 'no-store' })
        const result = await response.json()
        if (!response.ok || !result.success) {
          throw new Error(result.message || 'Unable to load notifications.')
        }

        if (active) {
          setNotifications(result.data.notifications as AdminNotification[])
          setUnreadCount(result.data.unreadCount as number)
          setNotificationError('')
        }
      } catch {
        if (active) setNotificationError('Notifications are unavailable.')
      }
    }

    void loadNotifications()
    const interval = window.setInterval(() => void loadNotifications(), 40_000)

    return () => {
      active = false
      window.clearInterval(interval)
    }
  }, [])

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
    <header className="relative z-20 flex h-19 shrink-0 items-center justify-between gap-3 border-b border-border-subtle bg-surface-page px-4 sm:px-6 lg:px-8">
      {/* Current page */}
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <button
          type="button"
          aria-label="Open admin navigation"
          aria-controls="admin-mobile-navigation"
          onClick={onOpenNavigation}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-md text-icon-secondary transition-colors hover:bg-surface-section hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
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
        <div className="relative">
          <button
            type="button"
            aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : 'Notifications'}
            title="Notifications"
            aria-expanded={notificationsOpen}
            aria-controls="admin-notifications"
            onClick={() => setNotificationsOpen((open) => !open)}
            className="relative inline-flex size-10 items-center justify-center rounded-md text-icon-secondary transition-colors hover:bg-surface-section hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <Bell className="size-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-surface-error px-1 text-[10px] font-semibold leading-5 text-white">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          
        {notificationsOpen && (
          <section
            id="admin-notifications"
            aria-label="Notifications"
            className="fixed left-3 right-3 top-19 z-50 overflow-hidden rounded-lg border border-border-subtle bg-surface-card shadow-xl sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-88"
          >

              <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3">
                <h2 className="text-size-small font-semibold text-heading">Notifications</h2>
                <button
                  type="button"
                  disabled={!unreadCount}
                  onClick={async () => {
                    const response = await fetch('/api/admin/notifications', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ markAllRead: true }),
                    })
                    if (!response.ok) {
                      setNotificationError('Could not mark notifications as read.')
                      return
                    }
                    const userId = user?.id
                    if (userId) {
                      setNotifications((current) => current.map((item) => ({
                        ...item,
                        readBy: Array.from(new Set([...item.readBy, userId])),
                      })))
                    }
                    setUnreadCount(0)
                    setNotificationError('')
                  }}
                  className="inline-flex items-center gap-1.5 text-size-caption font-medium text-caption hover:text-heading disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <CheckCheck size={14} aria-hidden="true" />
                  Mark all read
                </button>
              </div>

              {notificationError && (
                <p role="alert" className="px-4 py-2 text-size-caption text-text-error">
                  {notificationError}
                </p>
              )}

              {notifications.length ? (
                <ul className="max-h-96 overflow-y-auto divide-y divide-border-subtle">
                  {notifications.map((notification) => {
                    const isRead = Boolean(user?.id && notification.readBy.includes(user.id))
                    return (
                      <li key={notification.id}>
                        <Link
                          href={notification.href}
                          onClick={async (event) => {
                            event.preventDefault()
                            setNotificationsOpen(false)
                            if (!isRead) {
                              const response = await fetch('/api/admin/notifications', {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: notification.id }),
                              })
                              if (response.ok && user?.id) {
                                setNotifications((current) => current.map((item) => item.id === notification.id
                                  ? { ...item, readBy: [...item.readBy, user.id] }
                                  : item))
                                setUnreadCount((count) => Math.max(0, count - 1))
                              }
                            }
                            router.push(notification.href)
                          }}
                          className={`block px-4 py-3 transition-colors hover:bg-surface-section ${isRead ? '' : 'bg-surface-page/60'}`}
                        >
                          <span className="flex items-start gap-3">
                            <span className={`mt-1.5 size-2 shrink-0 rounded-full ${isRead ? 'bg-transparent' : 'bg-primary'}`} aria-hidden="true" />
                            <span className="min-w-0 flex-1">
                              <span className="block text-size-small font-medium text-heading">{notification.title}</span>
                              <span className="mt-0.5 block wrap-break-word text-size-caption text-caption">{notification.message}</span>
                              <time className="mt-1 block text-size-caption text-caption" dateTime={notification.createdAt}>
                                {new Date(notification.createdAt).toLocaleString()}
                              </time>
                            </span>
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <p className="px-4 py-8 text-center text-size-small text-caption">
                  {notificationError ? 'Could not load notifications.' : 'You’re all caught up.'}
                </p>
              )}
            </section>
          )}
        </div>

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
