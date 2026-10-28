
import {
  BriefcaseBusiness,
  FolderKanban,
  CalendarDays,
  Images,
} from 'lucide-react'

import DashboardStatCard from './DashboardStatCard'

type DashboardOverviewGridProps = {
  counts: {
    services: number
    works: number
    events: number
    gallery: number
  }
}

const DashboardOverviewGrid = ({ counts }: DashboardOverviewGridProps) => {
  const stats = [
  {
    label: 'Services',
    value: counts.services,
    description: 'Website service entries',
    href: '/admin/services',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Works',
    value: counts.works,
    description: 'Portfolio projects',
    href: '/admin/works',
    icon: FolderKanban,
  },
  {
    label: 'Events',
    value: counts.events,
    description: 'Total event entries',
    href: '/admin/events',
    icon: CalendarDays,
  },
  {
    label: 'Gallery',
    value: counts.gallery,
    description: 'Gallery items',
    href: '/admin/gallery',
    icon: Images,
  },
  ]

  return (
    <section
      aria-label="Website content overview"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => (
        <DashboardStatCard key={stat.href} {...stat} />
      ))}
    </section>
  )
}

export default DashboardOverviewGrid