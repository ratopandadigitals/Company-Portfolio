import React from 'react'

type HeadingLevel = 'display' | 'h1' | 'h2' | 'h3'

type HeadingProps = {
  children: React.ReactNode
  level?: HeadingLevel
  as?: React.ElementType
  className?: string
}

// Maps design-system level -> actual HTML tag when `as` isn't overridden.
// Keeps semantic HTML (h1/h2/h3) decoupled from visual size (display/h1/h2/h3).
const DEFAULT_TAG: Record<HeadingLevel, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
}

// Tailwind's JIT scanner needs full literal class strings — template-literal
// interpolation like `text-${level}` never gets generated. Explicit map instead.
const SIZE_CLASS: Record<HeadingLevel, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
}

const Heading = ({ children, level = 'h2', as, className = '' }: HeadingProps) => {
  const Tag = as ?? DEFAULT_TAG[level]

  return (
    <Tag className={`font-primary font-extrabold text-heading ${SIZE_CLASS[level]} ${className}`}>
      {children}
    </Tag>
  )
}

export default Heading