'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/navigation/Footer'
import Navbar from '@/components/navigation/Navbar'

export default function PublicSiteChrome({ position }: { position: 'header' | 'footer' }) {
  const pathname = usePathname()
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null

  return position === 'header' ? <Navbar /> : <Footer />
}