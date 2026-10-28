
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Layers,
  CalendarDays,
  Images,
  MessageSquare,
  UserRound,
  ChevronRight,
  MessageSquareQuote,
  X,
} from 'lucide-react'

import Logo from '@/components/atoms/Logo'
import { authClient } from '@/lib/auth-client'

const navigation = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Works', href: '/admin/works', icon: BriefcaseBusiness },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Events', href: '/admin/events', icon: CalendarDays },
  { label: 'Gallery', href: '/admin/gallery', icon: Images },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  {
    label: 'Testimonials',
    href: '/admin/testimonials',
    icon: MessageSquareQuote,
  },
  // { label: 'Settings', href: '/admin/settings', icon: Settings },
]

type AdminSidebarProps = {
  mobile?: boolean
  onNavigate?: () => void
  onClose?: () => void
}

const AdminSidebar = ({
  mobile = false,
  onNavigate,
  onClose,
}: AdminSidebarProps) => {
  const pathname = usePathname()

  const { data: session } = authClient.useSession()
  const user = session?.user
  const profileImage = user?.image || undefined
  const userName = user?.name || user?.email || 'Admin'

  return (
    <aside
      id={mobile ? 'admin-mobile-navigation' : undefined}
      aria-label={mobile ? 'Mobile admin navigation' : undefined}
      className={
        mobile
          ? 'relative flex h-full min-h-0 w-[min(18rem,calc(100vw-3rem))] shrink-0 flex-col overflow-hidden border-r border-border-subtle bg-surface-card shadow-xl'
          : 'hidden h-full min-h-0 w-64 shrink-0 flex-col overflow-hidden border-r border-border-subtle bg-surface-card lg:flex'
      }
    >
      {/* Brand */}
      <div className="flex h-19 shrink-0 items-center justify-between border-b border-border-divider px-5">
        <Logo href="/admin" compact />

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close admin navigation"
            className="inline-flex size-10 items-center justify-center rounded-md text-icon-secondary transition-colors hover:bg-surface-section hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
          >
            <X size={20} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav
        aria-label="Admin navigation"
        className="mt-2 min-h-0 flex-1 overflow-y-auto px-4"
      >
        <p className="mb-4 px-3 text-caption font-medium uppercase tracking-wider">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map(({ label, href, icon: Icon }) => {
            const isActive =
              href === '/admin'
                ? pathname === '/admin' ||
                  pathname === '/admin/dashboard'
                : pathname === href ||
                  pathname.startsWith(`${href}/`)

            return (
              <Link
                key={href}
                href={href}
                onClick={onNavigate}
                aria-current={isActive ? 'page' : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-heading'
                    : 'text-heading hover:bg-surface-section hover:text-heading'
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className="shrink-0"
                />

                <span className="flex-1">{label}</span>

                {isActive && (
                  <ChevronRight
                    size={15}
                    strokeWidth={1.8}
                    className="shrink-0"
                  />
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Administrator account */}
      <div className="mb-2 shrink-0 border-t border-border-divider px-2 pt-2">
        <Link
          href="/admin/settings"
          onClick={onNavigate}
          aria-label="Administrator account settings"
          aria-current={
            pathname === '/admin/settings' ? 'page' : undefined
          }
          className="mb-2 flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-surface-section"
        >
          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-divider bg-surface-section text-icon-primary">
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
              <UserRound size={19} strokeWidth={1.8} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-heading">
              {userName}
            </p>

            <p className="mt-0.5 truncate text-caption">
              Account settings
            </p>
          </div>

          <ChevronRight
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-icon-secondary"
          />
        </Link>
      </div>
    </aside>
  )
}

export default AdminSidebar
