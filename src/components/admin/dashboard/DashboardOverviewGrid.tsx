
import {
  BriefcaseBusiness,
  FolderKanban,
  CalendarDays,
  Images,
} from 'lucide-react'

import DashboardStatCard from './DashboardStatCard'

const stats = [
  {
    label: 'Services',
    value: 6,
    description: 'Website service entries',
    href: '/admin/services',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Works',
    value: 8,
    description: 'Portfolio projects',
    href: '/admin/works',
    icon: FolderKanban,
  },
  {
    label: 'Events',
    value: 4,
    description: 'Total event entries',
    href: '/admin/events',
    icon: CalendarDays,
  },
  {
    label: 'Gallery',
    value: 24,
    description: 'Gallery items',
    href: '/admin/gallery',
    icon: Images,
  },
]

const DashboardOverviewGrid = () => {
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