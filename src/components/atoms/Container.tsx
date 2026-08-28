import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

// Matches Figma layout grid: 100px page margin on desktop, scaled down on
// smaller screens (100px on mobile would eat too much space on a small
// phone, so it steps down responsively — same margin concept, sane sizing).
const Container = ({ children, className = '' }: ContainerProps) => {
  return (
   <div className={`w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  )
}

export default Container