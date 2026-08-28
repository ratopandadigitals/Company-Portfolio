'use client'

import React, { useState } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import Logo from '@/components/atoms/Logo'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import NavLink from '@/components/atoms/NavLink'
import Container from '@/components/atoms/Container'

type NavbarProps = {
  navItems?: string[]
  ctaLabel?: string
  ctaHref?: string
  badgeText?: string
  logoLightSrc?: string
  logoDarkSrc?: string
}

// Defaults exist so Navbar still works with zero props — but every value
// below can be overridden by whoever uses <Navbar />, e.g. from a data file.
const Navbar = ({
  navItems = ['Home', 'About', 'Services', 'Events', 'Work', 'Gallery'],
  ctaLabel = 'Contact',
  ctaHref = '/contact',
  badgeText = 'Available for New Projects',
  logoLightSrc = '/light.png',
  logoDarkSrc = '/dark.png',
}: NavbarProps) => {
  const [activeTab, setActiveTab] = useState(navItems[0])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    const next = !isDarkMode
    setIsDarkMode(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <header className="w-full bg-surface-page/90 backdrop-blur-md   sticky top-0 z-50 transition-colors">
      <div className="w-full  py-2 flex justify-center items-center">
        <Badge dotColor="success">{badgeText}</Badge>
      </div>

      <Container>
        <div className="flex items-center justify-between h-20">
          <Logo lightSrc={logoLightSrc} darkSrc={logoDarkSrc} />

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink key={item} active={activeTab === item} onClick={() => setActiveTab(item)}>
                {item}
              </NavLink>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-md bg-surface-default  border border-disabled hover:opacity-80 text-heading transition-colors"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Button href={ctaHref}>{ctaLabel}</Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-caption rounded-sm hover:bg-surface-default"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-subtle bg-surface-page px-4 pt-2 pb-6 space-y-3">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveTab(item)
                setIsMobileMenuOpen(false)
              }}
              className={[
                'block w-full text-left px-3 py-2 rounded-md text-base font-medium font-secondary',
                activeTab === item
                  ? 'bg-surface-default text-heading font-semibold'
                  : 'text-caption hover:bg-surface-default',
              ].join(' ')}
            >
              {item}
            </button>
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