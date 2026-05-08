'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/Logo'

export default function SignUpPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      setLoading(false)
      setError(data.error || 'Something went wrong')
      return
    }
    await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    router.push('/builder')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      <div className="px-6 py-5 border-b border-stone-800/60">
        <Logo size="md" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl text-stone-100 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Create your account</h1>
            <p className="text-stone-500 text-sm">Free to build · Pay only to download</p>
          </div>

          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-stone-400 text-sm">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus:border-amber-500 focus:ring-amber-500/20"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-stone-400 text-sm">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus:border-amber-500 focus:ring-amber-500/20"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-stone-400 text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-stone-800 border-stone-700 text-stone-100 placeholder:text-stone-600 focus:border-amber-500 focus:ring-amber-500/20"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold h-11"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
              </Button>
            </form>

            <p className="text-center text-stone-600 text-xs mt-5">
              By signing up, you agree to our{' '}
              <a href="#" className="text-stone-500 hover:text-stone-300 transition-colors">Terms</a>
              {' '}and{' '}
              <a href="#" className="text-stone-500 hover:text-stone-300 transition-colors">Privacy Policy</a>
            </p>
          </div>

          <p className="text-center text-stone-500 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
