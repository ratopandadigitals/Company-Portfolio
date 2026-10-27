
'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/atoms/Logo'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { authClient } from '@/lib/auth-client'

const AdminLoginPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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

            <Input
              type="password"
              placeholder="Password"
              value={password}
              required
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border-subtle bg-surface-card px-4 py-3 text-body focus:border-primary focus:outline-none"
            />

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
