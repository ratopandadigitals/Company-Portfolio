import React from 'react'

type NavLinkProps = {
  children: string
  active?: boolean
  onClick?: () => void
}

const NavLink = ({ children, active = false, onClick }: NavLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={[
        'py-1 text-base font-medium font-secondary transition-colors',
        active
          ? 'text-heading font-semibold border-b-2 border-(--crimson-500)'
          : 'text-caption hover:text-heading',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export default NavLink