'use client'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import LiquidMetal from '@/components/Animation/LiquidMetal'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  icon?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit'
  variant?: 'primary' | 'dark' | 'outline' | 'liquid'
}

const Button = (props: ButtonProps) => {
  const icon = props.icon === undefined ? true : props.icon
  const fullWidth = props.fullWidth || false
  const type = props.type || 'button'
  const variant = props.variant || 'primary'
  const isLiquid = variant === 'liquid'

  const LIQUID_BORDER = 3 // px

  const variantClasses = isLiquid
    ? 'px-3 py-3.5 sm:px-4.5 sm:py-3.5 rounded-xl'
    : variant === 'dark'
    ? 'px-3. py-3.5 sm:px-6 sm:py-4.5 rounded-md bg-heading text-surface-page hover:opacity-80'
    : variant === 'outline'
    ? 'px-4 py-4 sm:px-5 sm:py-4 rounded-lg bg-transparent border border-border-subtle text-heading hover:bg-heading hover:text-surface-page'
    : 'px-2.5 py-2.5 sm:px-3.5 sm:py-3.5 rounded-md bg-surface-primary hover:bg-surface-primary-hover text-white'

  const classes = [
    'group relative inline-flex items-center gap-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap shrink-0 overflow-hidden',
    variantClasses,
    'text-size-cta font-medium font-secondary transition-colors',
    fullWidth ? 'w-full justify-center' : '',
  ].join(' ')

  const content = (
    <>
      {isLiquid && (
        <>
          <LiquidMetal className="rounded-lg" />
          <span
              className="absolute z-[1] rounded-lg bg-surface-page"
            style={{ inset: LIQUID_BORDER }}
          />
        </>
      )}
      <span className={`relative z-10 ${isLiquid ? 'text-heading' : ''}`}>{props.children}</span>
      {icon && (
        <ArrowRight
          className={`w-0 opacity-0 -translate-x-2 transition-all duration-200 ease-out group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 shrink-0 ${
            isLiquid ? 'relative z-10 text-heading' : ''
          }`}
        />
      )}
    </>
  )

  if (props.href) {
    return (
      <Link href={props.href} className={`${classes} ${props.className || ''}`.trim()}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={props.onClick} className={`${classes} ${props.className || ''}`.trim()}>
      {content}
    </button>
  )
}

export default Button