'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'

function MagicSignInInner() {
  const params = useSearchParams()
  const router = useRouter()
  const token = params.get('t')

  useEffect(() => {
    if (!token) {
      router.replace('/sign-in?error=invalid')
      return
    }
    signIn('magic-token', { token, redirect: false }).then((res) => {
      if (res?.error) {
        router.replace('/sign-in?error=expired')
      } else {
        window.location.replace('/dashboard')
      }
    })
  }, [token, router])

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="text-center space-y-5">
        <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mx-auto">
          <svg viewBox="0 0 22 26" width="20" height="24" fill="none">
            <path d="M0 0h16l6 6v20H0V0z" fill="#292524" stroke="#57534E" strokeWidth="1" strokeLinejoin="round"/>
            <path d="M16 0l6 6h-6V0z" fill="#F59E0B"/>
            <line x1="3.5" y1="11" x2="18.5" y2="11" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="3.5" y1="15" x2="18.5" y2="15" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="3.5" y1="19" x2="12" y2="19" stroke="#78716C" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <Loader2 className="w-5 h-5 text-amber-500 animate-spin mx-auto" />
        <p className="text-stone-500 text-sm">Signing you in…</p>
      </div>
    </div>
  )
}

export default function MagicSignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-950" />}>
      <MagicSignInInner />
    </Suspense>
  )
}
