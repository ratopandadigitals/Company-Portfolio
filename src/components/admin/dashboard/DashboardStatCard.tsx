
import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

type DashboardStatCardProps = {
  label: string
  value: number
  description: string
  href: string
  icon: LucideIcon
}

const DashboardStatCard = ({
  label,
  value,
  description,
  href,
  icon: Icon,
}: DashboardStatCardProps) => {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between gap-6 rounded-xl border border-border-subtle bg-surface-card p-5 transition-colors duration-200 hover:border-primary sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-size-small text-caption">
          {label}
        </span>

        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-page text-success">
          <Icon aria-hidden="true" className="size-5 stroke-2" />
        </span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-primary text-size-h2 font-bold text-heading">
            {value}
          </p>

          <p className="mt-1 text-size-caption text-caption">
            {description}
          </p>
        </div>

        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-caption transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>
    </Link>
  )
}

export default DashboardStatCard