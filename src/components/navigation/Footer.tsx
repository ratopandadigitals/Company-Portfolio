import React from 'react'
import Logo from '@/components/atoms/Logo'
import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Input from '@/components/atoms/Input'

const SERVICE_LINKS_DEFAULT = ['Brand Identity', 'UI/UX Design', 'Web Development', 'Product Design', 'Digital Solutions', 'Growth']
const COMPANY_LINKS_DEFAULT = ['About', 'Work', 'Services', 'Events', 'Gallery', 'Contact']
const SOCIAL_LINKS_DEFAULT = ['Twitter', 'LinkedIn', 'Dribbble', 'GitHub', 'Instagram']

const FooterColumn = ({ title, links }: { title: string; links: string[] }) => (
  <div className="flex flex-col gap-4">
    <span className="text-heading text-xs font-bold uppercase tracking-wider font-secondary">
      {title}
    </span>
    <ul className="flex flex-col gap-3">
      {links.map((link) => (
        <li key={link}>
          <a href="#" className="text-caption text-small font-secondary hover:text-heading transition-colors">
            {link}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

type FooterProps = {
  description?: string
  serviceLinks?: string[]
  companyLinks?: string[]
  socialLinks?: string[]
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
  return (
    <footer className="bg-surface-page border-t border-border-subtle">
      <Container className="py-12 grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-28">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <Logo />
          <p className="text-caption text-sm font-secondary leading-relaxed">
            {description}
          </p>
          <form className="flex items-center gap-4 border border-border-subtle rounded-md p-2">
            <Input type="email" placeholder="Enter Your Email...." name="subscribe-email" />
            <Button icon={false}>Subscribe Us</Button>
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
          <span className="text-caption underline text-sm font-secondary">
            {TermsConditions } 
          </span>
          <span className="text-caption underline text-sm font-secondary">
           | 
          </span>
          <span className="text-caption underline text-sm font-secondary">
            {PrivacyPolicy}
          </span>
          </div>
        
        </Container>
      </div>
    </footer>
  )
}

export default Footer