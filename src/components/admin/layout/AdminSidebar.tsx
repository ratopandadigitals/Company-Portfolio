
'use client'

import Link from 'next/link'
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
} from 'lucide-react'

const navigation = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Works', href: '/admin/works', icon: BriefcaseBusiness },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Events', href: '/admin/events', icon: CalendarDays },
  { label: 'Gallery', href: '/admin/gallery', icon: Images },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
  
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full min-h-0 w-64 shrink-0 flex-col overflow-hidden border-r border-border-subtle bg-surface-card">
      {/* Brand */}
      <div className="flex h-[76px] shrink-0 items-center border-b border-border-divider px-5">
        <Link
          href="/admin"
          aria-label="Rato Panda Digitals admin home"
          className="flex min-w-0 items-center gap-3"
        >
          {/* Replace with the official brand logo */}
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border-divider bg-surface-section">
            <span className="text-sm font-semibold text-heading">RP</span>
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-5 text-heading">
              Rato Panda Digitals
            </p>
            
            
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Admin navigation"
        className="min-h-0 flex-1 px-4 mt-2"
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

      {/* Administrator */}
      <div className=" mb-2 shrink-0 border-t border-border-divider">
        <button
          type="button"
          aria-label="Administrator account"
          className="flex w-full items-center gap-3 rounded-lg p-1 mb-2 text-left transition-colors hover:bg-surface-section"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border-divider bg-surface-section text-icon-primary">
            <UserRound size={19} strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-heading">
              Administrator
            </p>
            <p className="mt-0.5 truncate text-caption">
              Admin account
            </p>
          </div>

          <ChevronRight
            size={16}
            strokeWidth={1.8}
            className="shrink-0 text-icon-secondary"
          />
        </button>
      </div>
    </aside>
  )
}
