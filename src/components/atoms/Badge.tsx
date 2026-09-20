import React from 'react'

type BadgeProps = {
  children: React.ReactNode
  dotColor?: 'success' | 'warning' | 'info' | 'error'
}

const DOT_COLOR_MAP = {
  success: 'bg-success',
  warning: 'bg-warning-',
  info: 'bg-information',
  error: 'bg-error',
}

const Badge = ({ children, dotColor = 'success' }: BadgeProps) => {
  return (
    <div className="inline-flex items-center gap-2 border border-border-subtle/50  text-xs sm:text-sm font-medium font-secondary text-caption bg-surface-default px-3 py-1 rounded-full">
      <span className={`h-2 w-2 rounded-full ${DOT_COLOR_MAP[dotColor]} animate-pulse`} />
      <span>{children}</span>
    </div>
  )
}

export default Badge