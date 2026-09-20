import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = ({ className = '', ...props }: InputProps) => {
  return (
    <input
      {...props}
      className={`flex-1 bg-transparent px-3 text-sm font-secondary text-heading placeholder:text-caption focus:outline-none ${className}`}
    />
  )
}

export default Input