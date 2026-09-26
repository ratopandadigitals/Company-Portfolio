import React from 'react'

type SectionProps = {
  children: React.ReactNode
  className?: string
}
// Add above the return:
// NOTE: top-padding only, by design — see globals.css audit. Footer must supply
// its own top spacing; do not change this to py- without checking Footer.
const Section = ({ children, className = '' }: SectionProps) => {
  
  return (
    <section className={`w-full pt-stack-container ${className}`}>
      {children}
    </section>
  )
}

export default Section