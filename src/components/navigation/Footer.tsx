'use client'

import React, { useState } from 'react'
import Logo from '@/components/atoms/Logo'
import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Section from '../atoms/Section'
import Input from '@/components/atoms/Input'
import Link from 'next/link'

type LinkItem = { label: string; href: string }

const SERVICE_LINKS_DEFAULT: LinkItem[] = [
  { label: 'Brand Identity', href: '/services/brand-identity' },
  { label: 'UI/UX Design', href: '/services/ui-ux-design' },
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Product Design', href: '/services/product-design' },
  { label: 'Digital Solutions', href: '/services/digital-solutions' },
  { label: 'Growth', href: '/services/growth' },
]

const COMPANY_LINKS_DEFAULT: LinkItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/works' },
  { label: 'Services', href: '/services' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

const SOCIAL_LINKS_DEFAULT: LinkItem[] = [
  { label: 'Twitter', href: 'https://twitter.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61589834703416' },
  { label: 'GitHub', href: 'https://github.com/ratopandadigitals' },
  { label: 'Instagram', href: 'https://www.instagram.com/ratopandadigitals' },
]

const FooterColumn = ({ title, links }: { title: string; links: LinkItem[] }) => (
  <div className="flex flex-col gap-4">
    <span className="text-heading text-xs font-bold  hover:underline  uppercase tracking-wider font-secondary">
      {title}
    </span>
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : '_self'}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="relative text-caption text-size-small font-secondary transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-heading after:transition-all after:duration-300 hover:after:w-full"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

type FooterProps = {
  description?: string
  serviceLinks?: LinkItem[]
  companyLinks?: LinkItem[]
  socialLinks?: LinkItem[]
  copyrightText?: string
  TermsConditions?: string
  PrivacyPolicy?: string
}

const Footer = ({
  description = 'Rato Panda Digitals is a creative technology company combining strategy, design, and technology to build purposeful digital experiences and products.',
  serviceLinks = SERVICE_LINKS_DEFAULT,
  companyLinks = COMPANY_LINKS_DEFAULT,
  socialLinks = SOCIAL_LINKS_DEFAULT,
  copyrightText = '© 2026 Rato Panda Digitals. All rights reserved.',
  TermsConditions = 'Terms & Conditions',
  PrivacyPolicy = 'Privacy Policy',
 
}: FooterProps) => {

const [email, setEmail] = useState('')
const [isOpen, setIsOpen] = useState(false)

const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  console.log({ email })

  setEmail('')
  setIsOpen(true)
}
  return (
    <Section className="bg-surface-page border-t border-border-subtle">
      <Container className="py-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-28">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Logo />
          <p className="text-caption text-sm font-secondary leading-relaxed">
            {description}
          </p>
          <form
                onSubmit={handleSubscribe}
                className="flex items-center gap-4 border border-border-subtle rounded-md p-2"
              >
                <Input
                  type="email"
                  placeholder="Enter Your Email...."
                  name="subscribe-email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

              <Button type="submit" icon={false}>
                Subscribe Us
              </Button>
            </form>
        </div>

        <FooterColumn title="Services" links={serviceLinks} />
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Social" links={socialLinks} />
      </Container>
      <div className="border-t border-border-subtle">
        <Container className="py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-caption text-sm font-secondary">
            {copyrightText}
          </span>

          <div className="gap-8 flex items-center justify-center">
            <Link
              href="/terms-and-conditions"
              className="text-caption underline text-sm font-secondary hover:text-heading transition-colors"
            >
              {TermsConditions}
            </Link>

            <span className="text-caption text-sm font-secondary">
              |
            </span>

            <Link
              href="/privacy-policy"
              className="text-caption underline text-sm font-secondary hover:text-heading transition-colors"
            >
              {PrivacyPolicy}
            </Link>
          </div>
        </Container>
      </div>

{isOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
    role="dialog"
    aria-modal="true"
    aria-labelledby="subscribe-success-message"
  >
    <div className="w-full max-w-md rounded-2xl border border-border-subtle bg-surface-page p-8 text-center shadow-lg">
      <h3
        id="subscribe-success-message"
        className="text-h4 font-primary font-bold text-heading"
      >
        Thanks for subscribing!
      </h3>

      <p className="mt-2 text-caption font-secondary leading-relaxed">
        You have successfully subscribed to our newsletter.
      </p>

      <div className="mt-6">
        <Button onClick={() => setIsOpen(false)} icon={false}>
          Close
        </Button>
      </div>
    </div>
  </div>
)}
    </Section>
  )
}

export default Footer