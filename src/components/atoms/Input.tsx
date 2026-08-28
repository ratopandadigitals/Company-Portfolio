import React from 'react'

type InputProps = {
  type?: 'text' | 'email' | 'tel'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
}

const Input = ({ type = 'text', placeholder, value, onChange, name }: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="flex-1 bg-transparent px-3 text-sm font-secondary text-heading placeholder:text-caption focus:outline-none"
    />
  )
}

export default Input