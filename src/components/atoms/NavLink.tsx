import React from 'react'
import Link from 'next/link'

type NavLinkProps = {
  children: string
  href: string
  active?: boolean
  onClick?: () => void
}

const NavLink = (props: NavLinkProps) => {

  const active = props.active || false

  return (
    <Link
      href={props.href}
      onClick={props.onClick}
      className={[
        'py-1 text-base font-medium font-secondary transition-colors',
        active
          ? 'text-heading font-semibold border-b-2 )'
          : 'text-caption hover:text-heading',
      ].join(' ')}
    >
      {props.children}
    </Link>
  )
}

export default NavLink