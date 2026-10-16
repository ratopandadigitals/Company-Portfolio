
'use client'

import { useEffect, useState } from 'react'
import type { StatItem } from '@/data/client'
import { getStats, updateStats } from '@/data/clientStorage'

const inputClass =
  'w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-size-body text-body outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-placeholder focus:border-border-primary focus:ring-2 focus:ring-[var(--primary-200)]'

const labelClass = 'block text-size-small font-medium text-heading'

const StatsForm = () => {
  const [stats, setStats] = useState<StatItem[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Read localStorage after hydration to avoid an SSR mismatch.
    setStats(getStats())
  }, [])

  const handleChange = (
    id: string,
    field: 'value' | 'label',
    value: string,
  ) => {
    setStats((previous) =>
      previous.map((stat) =>
        stat.id === id ? { ...stat, [field]: value } : stat,
      ),
    )
    setSaved(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateStats(stats)
    setSaved(true)
  }

  if (stats.length === 0) {
    return (
      <p className="text-size-body text-caption">
        No stats available to edit.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-stack-content">
      <div className="space-y-stack-section">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className="space-y-4 rounded-xl border border-border-subtle bg-surface-card p-inset-card"
          >
            <h3 className="text-size-body font-semibold text-text-heading">
              Stat {index + 1}
            </h3>

            <div className="space-y-2">
              <label htmlFor={`stat-value-${stat.id}`} className={labelClass}>
                Value
              </label>

              <input
                id={`stat-value-${stat.id}`}
                className={inputClass}
                value={stat.value}
                onChange={(event) =>
                  handleChange(stat.id, 'value', event.target.value)
                }
                placeholder="e.g. 4+"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor={`stat-label-${stat.id}`} className={labelClass}>
                Label
              </label>

              <input
                id={`stat-label-${stat.id}`}
                className={inputClass}
                value={stat.label}
                onChange={(event) =>
                  handleChange(stat.id, 'label', event.target.value)
                }
                placeholder="e.g. Finalized Projects"
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-primary-500 px-5 py-3 text-size-small font-semibold text-white transition-opacity hover:opacity-90"
        >
          Save Stats
        </button>

        {saved && (
          <p role="status" className="text-size-small text-caption">
            Stats saved successfully.
          </p>
        )}
      </div>
    </form>
  )
}

export default StatsForm