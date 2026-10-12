import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import AdminPageHeader from '@/components/admin/AdminPageHeader'

const sections = [
  { label: 'Services', href: '/admin/services', description: 'Manage service content.' },
  { label: 'Works', href: '/admin/works', description: 'Manage portfolio projects.' },
  { label: 'Events', href: '/admin/events', description: 'Manage event listings.' },
  { label: 'Gallery', href: '/admin/gallery', description: 'Review gallery content.' },
  { label: 'Enquiries', href: '/admin/enquiries', description: 'Review incoming enquiries.' },
]

export default function AdminPage() {
  return (
    <>
      <AdminPageHeader title="Overview" description="Admin workspace for the Rato Panda Digitals website." />
      <section aria-label="Admin sections" className="divide-y divide-border-subtle border-y border-border-subtle">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="flex items-center justify-between gap-4 py-5 text-heading hover:text-caption">
            <span>
              <span className="block font-semibold">{section.label}</span>
              <span className="mt-1 block text-sm text-caption">{section.description}</span>
            </span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
        ))}
      </section>
      <p className="mt-6 text-sm text-caption">Content is not connected to persistent storage yet.</p>
    </>
  )
}