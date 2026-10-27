'use client'

import { usePathname } from 'next/navigation'
import PublicSiteChrome from '@/components/navigation/PublicSiteChrome'

type PublicChromeWrapperProps = {
  position: 'header' | 'footer'
}

const PublicChromeWrapper = ({ position }: PublicChromeWrapperProps) => {
  const pathname = usePathname()

  const isAdminRoute =
    pathname === '/admin' || pathname.startsWith('/admin/')

  const isLoginRoute = pathname === '/login'

  if (isAdminRoute || isLoginRoute) {
    return null
  }

  return <PublicSiteChrome position={position} />
}

export default PublicChromeWrapper