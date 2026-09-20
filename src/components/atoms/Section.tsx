import React from 'react'

type SectionProps = {
  children: React.ReactNode
  className?: string
}

// Uses your design token (--space-section: 128px) via Tailwind v4 py-stack-section,
// allowing section backgrounds to stretch full-width while managing vertical rhythm.
const Section = ({ children, className = '' }: SectionProps) => {
  return (
    <section className={`w-full pt-stack-container ${className}`}>
      {children}
    </section>
  )
}

export default Section