'use client'

import { useState, useEffect, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Loader2, Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { Logo } from '@/components/Logo'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

type Mode = 'choose' | 'magic-sent'

function SignInInner() {
  const [email, setEmail] = useState('')
  const [mode, setMode] = useState<Mode>('choose')
  const [loading, setLoading] = useState<'google' | 'magic' | null>(null)
  const [error, setError] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const e = searchParams.get('error')
    if (e === 'expired') setError('This magic link has expired or already been used. Please request a new one.')
    if (e === 'invalid') setError('Invalid sign-in link. Please request a new one.')
  }, [searchParams])

  async function handleGoogle() {
    setLoading('google')
    setError('')
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading('magic')
    setError('')
    const res = await fetch('/api/auth/magic-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setLoading(null)
    if (!res.ok) {
      setError('Could not send email. Please try again.')
    } else {
      setMode('magic-sent')
    }
  }

  if (mode === 'magic-sent') {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-7 h-7 text-amber-400" />
          </div>
          <h1 className="text-2xl font-bold text-stone-100 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Check your inbox</h1>
          <p className="text-stone-500 text-sm mb-1">We sent a sign-in link to</p>
          <p className="text-stone-200 font-semibold mb-5">{email}</p>
          <p className="text-stone-600 text-xs leading-relaxed">Click the link in the email to sign in.<br />It expires in 10 minutes.</p>
          <button
            onClick={() => setMode('choose')}
            className="mt-8 text-amber-500 hover:text-amber-400 text-sm transition-colors"
          >
            Use a different email
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Nav bar */}
      <div className="px-6 py-5 border-b border-stone-800/60">
        <Logo size="md" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl text-stone-100 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Welcome back
            </h1>
            <p className="text-stone-500 text-sm">Sign in to continue building your resume</p>
          </div>

          <div className="space-y-3">
            {/* Google */}
            <button
              onClick={handleGoogle}
              disabled={loading !== null}
              className="w-full h-11 flex items-center justify-center gap-2.5 bg-stone-100 hover:bg-white text-stone-900 font-semibold text-sm rounded-lg border border-stone-200 transition-colors disabled:opacity-50"
            >
              {loading === 'google' ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleIcon />}
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 py-1">
              <div className="flex-1 h-px bg-stone-800" />
              <span className="text-stone-700 text-xs">or</span>
              <div className="flex-1 h-px bg-stone-800" />
            </div>

            {/* Magic link */}
            <form onSubmit={handleMagicLink} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600 z-10 pointer-events-none" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-4 bg-stone-900 border border-stone-700 rounded-lg text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/60 text-sm transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg px-4 py-2.5">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading !== null || !email}
                className="w-full h-11 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading === 'magic' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>Continue with Email <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-stone-700 text-xs pt-1">
              No password needed — we&apos;ll email you a sign-in link.
            </p>
          </div>

          <p className="text-center text-stone-700 text-xs mt-8">
            By continuing, you agree to our{' '}
            <a href="#" className="text-stone-500 hover:text-stone-300 transition-colors">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-stone-500 hover:text-stone-300 transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-950" />}>
      <SignInInner />
    </Suspense>
  )
}
