'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import AdminHeader from '@/components/admin/layout/AdminHeader'
import AdminSidebar from '@/components/admin/layout/AdminSidebar'

const AdminShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)

  useEffect(() => {
    if (!mobileNavigationOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNavigationOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [mobileNavigationOpen])

  return (
    <div className="flex h-dvh overflow-hidden bg-surface-page">
      <AdminSidebar />

      {mobileNavigationOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close admin navigation"
            onClick={() => setMobileNavigationOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <AdminSidebar
            key={pathname}
            mobile
            onNavigate={() => setMobileNavigationOpen(false)}
            onClose={() => setMobileNavigationOpen(false)}
          />
        </div>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <AdminHeader onOpenNavigation={() => setMobileNavigationOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl p-4 sm:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminShell