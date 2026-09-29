
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Sun, Moon, Menu, X } from 'lucide-react'
import Logo from '@/components/atoms/Logo'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import NavLink from '@/components/atoms/NavLink'
import Container from '@/components/atoms/Container'

type NavItem = {
  label: string
  href: string
}

type NavbarProps = {
  navItems?: NavItem[]
  ctaLabel?: string
  ctaHref?: string
  badgeText?: string
  logoLightSrc?: string
  logoDarkSrc?: string
}

const NAV_ITEMS_DEFAULT: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Works', href: '/works' },
  { label: 'Gallery', href: '/gallery' },
]

const Navbar = (props: NavbarProps) => {
  const navItems = props.navItems || NAV_ITEMS_DEFAULT
  const ctaLabel = props.ctaLabel || 'Contact'
  const ctaHref = props.ctaHref || '/contact'
  const badgeText = props.badgeText || 'Available for New Projects'
  const logoLightSrc = props.logoLightSrc || '/Light.webp'
  const logoDarkSrc = props.logoDarkSrc || '/Dark.webp'

  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMobileMenuOpen(false)
      mobileMenuButtonRef.current?.focus()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMobileMenuOpen])

  const { resolvedTheme, setTheme } = useTheme()

  const isDarkMode = resolvedTheme === 'dark'
  const isThemeReady = resolvedTheme !== undefined

  const toggleTheme = () => {
    setTheme(isDarkMode ? 'light' : 'dark')
  }

  return (
    <header className='w-full bg-surface-page/90 backdrop-blur-md sticky top-0 z-50 transition-colors'>
      <div className='w-full py-2 flex justify-center items-center'>
        <Badge dotColor='success'>{badgeText}</Badge>
      </div>

      <Container>
        <div className='flex items-center justify-between h-20'>
          <Logo lightSrc={logoLightSrc} darkSrc={logoDarkSrc} />

          <nav className='hidden lg:flex items-center gap-8'>
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={pathname === item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className='hidden sm:flex items-center gap-4'>
            <button
              onClick={toggleTheme}
              aria-label='Toggle theme'
              className='p-2.5 rounded-md bg-surface-default border border-border-subtle text-heading transition-colors'
            >
              {isThemeReady && isDarkMode ? (
                <Sun className='w-5 h-5' />
              ) : (
                <Moon className='w-5 h-5' />
              )}
            </button>

            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>

          <button
            ref={mobileMenuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='lg:hidden p-2 text-caption rounded-sm hover:bg-surface-default'
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls='mobile-navigation'
          >
            {isMobileMenuOpen ? (
              <X aria-hidden='true' className='w-6 h-6' />
            ) : (
              <Menu aria-hidden='true' className='w-6 h-6' />
            )}
          </button>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div
          id='mobile-navigation'
          className='lg:hidden flex flex-col gap-3 border-t border-border-subtle bg-surface-page px-4 pt-2 pb-6 space-y-3'
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={pathname === item.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          <Button href={ctaHref} fullWidth>
            {ctaLabel}
          </Button>
        </div>
      )}
    </header>
  )
}

export default Navbar