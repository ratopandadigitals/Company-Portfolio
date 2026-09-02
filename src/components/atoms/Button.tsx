'use client'
import React from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { group } from 'console'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  icon?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit'
  variant?: 'primary' | 'dark' | 'outline'
}

const Button = (props: ButtonProps) => {

  const icon = props.icon === undefined ? true : props.icon
  const fullWidth = props.fullWidth || false
  const type = props.type || 'button'
  const variant = props.variant || 'primary'

  const variantClasses = variant === 'dark'
  
    ? 'bg-heading text-surface-page hover:opacity-90'
    : variant === 'outline'
    ? 'bg-transparent border border-border-subtle text-heading hover:bg-heading hover:text-surface-page'
    : 'bg-surface-primary hover:bg-surface-primary-hover text-white'

  const classes = [
    'group inline-flex items-center gap-1.5 px-6 py-3.5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap shrink-0',
    variantClasses,
    'text-cta font-medium font-secondary transition-colors',
    fullWidth ? 'w-full justify-center' : '',
  ].join(' ')

  const content = (
    <>
    <span>{props.children}</span>
    {icon && (
      <ArrowRight className='w-0 opacity-0 -translate-x-2 transition-all duration-200 ease-out group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 shrink-0' />
    )}
  </>
  )

  if (props.href) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={props.onClick}  className={classes}>
      {content}
    </button>
  )
}

export default Button