'use client'

import { Search } from 'lucide-react'

type AdminSearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  ariaLabel: string
}

const AdminSearchInput = ({
  value,
  onChange,
  placeholder,
  ariaLabel,
}: AdminSearchInputProps) => {
  return (
<label className="mb-stack-content flex w-full max-w-md items-center gap-3 rounded-md border border-border-subtle px-inset-compact focus-within:border-border-primary focus-within:ring-2 focus-within:ring-border-primary">      <Search
        size={18}
        aria-hidden="true"
        className="shrink-0 text-caption"
      />

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
className="min-w-0 flex-1 appearance-none border-0 bg-transparent py-2 text-size-body text-body ! outline-none ! ring-0 placeholder:text-placeholder"      />
    </label>
  )
}

export default AdminSearchInput
