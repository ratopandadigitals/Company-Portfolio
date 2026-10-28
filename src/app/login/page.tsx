
'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import Logo from '@/components/atoms/Logo'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { authClient } from '@/lib/auth-client'

const AdminLoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isSubmitting) return

    setError('')
    setIsSubmitting(true)

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: '/admin',
      })

      if (result.error) {
        setError('Invalid email or password.')
        setIsSubmitting(false)
        return
      }

      router.replace('/admin')
    } catch {
      setError('Unable to sign in. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid h-dvh grid-cols-1 overflow-hidden bg-surface-page lg:grid-cols-2">
      {/* Left: brand visual */}
      <div className="relative hidden min-h-0 items-center justify-center overflow-hidden bg-dark-foundation-500 lg:flex">
        <div className="relative h-[85%] w-[85%]">
          <Image
            src="/Logincharacter/loginc.webp"
            alt=""
            fill
            sizes="50vw"
            priority
            className="object-contain"
          />
        </div>
      </div>

      {/* Right: login form */}
      <div className="flex min-h-0 items-center justify-center overflow-y-auto p-6 sm:p-10">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <div className="lg:hidden">
            <Logo href="/" />

            <div className="relative mx-auto mt-3 h-24 w-32 sm:h-32 sm:w-40">
              <Image
                src="/Logincharacter/loginc.webp"
                alt=""
                fill
                sizes="160px"
                priority
                className="object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-size-h2 font-primary font-bold text-heading">
              Admin Login
            </h1>

            <p className="text-size-small font-secondary text-caption">
              Sign in to manage the site. Access is restricted to the team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              required
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-body focus:border-primary focus:outline-none"
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                required
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 pr-12 text-body focus:border-primary focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-caption transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-border-primary"
              >
                {showPassword ? (
                  <EyeOff size={18} aria-hidden="true" />
                ) : (
                  <Eye size={18} aria-hidden="true" />
                )}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="text-size-small font-secondary text-error"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="dark"
              icon={false}
              fullWidth
              disabled={isSubmitting}
              className="mt-2"
            >
              {isSubmitting ? 'Signing in...' : 'Log In'}
            </Button>
          </form>

          <Link
            href="/admin/forgot-password"
            className="text-center text-size-small font-secondary text-caption transition-colors hover:text-heading"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
