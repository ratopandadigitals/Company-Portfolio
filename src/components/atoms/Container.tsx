import { div } from 'framer-motion/m'
import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div 
     className={`w-full mx-auto max-w-360 px-4 sm:px-6 lg:px-page-margin ${className}`}
    >
      {children}
    </div>
  )
}

export default Container