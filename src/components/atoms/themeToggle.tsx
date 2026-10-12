'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
const { resolvedTheme, setTheme } = useTheme()
const [mounted, setMounted] = useState(false)


useEffect(() => {
	setMounted(true)
}, [])

const isDarkMode = resolvedTheme === 'dark'

return (
	<button
		type="button"
		onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
		aria-label={
			mounted
				? `Switch to ${isDarkMode ? 'light' : 'dark'} mode`
				: 'Toggle theme'
		}
		title={
			mounted
				? `Switch to ${isDarkMode ? 'light' : 'dark'} mode`
				: 'Toggle theme'
		}
		className="rounded-md border border-border-subtle bg-surface-default p-2.5 text-heading transition-colors hover:bg-surface-section focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
	>
		{!mounted ? (
			<span className="block size-5" aria-hidden="true" />
		) : isDarkMode ? (
			<Sun className="size-5" aria-hidden="true" />
		) : (
			<Moon className="size-5" aria-hidden="true" />
		)}
	</button>
)


}

export default ThemeToggle
