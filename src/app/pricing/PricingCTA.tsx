'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { rdtTrack } from '@/lib/rdt'
import Link from 'next/link'

async function goToCheckout(mode: 'payment' | 'subscription', value: number) {
  rdtTrack('AddToCart', { currency: 'USD', value, itemCount: 1 })
  const res = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, resumeId: 'direct' }),
  })
  const data = await res.json()
  if (data.url) window.location.href = data.url
}

export function FreeCTA() {
  return (
    <Link
      href="/start"
      className="w-full border border-stone-700 hover:border-stone-500 hover:bg-stone-800 text-stone-200 font-semibold text-sm py-3 rounded-xl transition-colors text-center block"
    >
      Get started
    </Link>
  )
}

export function ProCTA() {
  const [loading, setLoading] = useState(false)
  return (
    <button
      onClick={async () => { setLoading(true); await goToCheckout('subscription', 29) }}
      disabled={loading}
      className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm py-3 rounded-xl transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {loading ? 'Redirecting…' : 'Get Started'}
    </button>
  )
}

export function LifetimeCTA() {
  const [loading, setLoading] = useState(false)
  return (
    <button
      onClick={async () => { setLoading(true); await goToCheckout('payment', 149) }}
      disabled={loading}
      className="w-full border border-stone-700 hover:border-amber-500/50 hover:bg-stone-800 text-stone-100 font-semibold text-sm py-3 rounded-xl transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {loading ? 'Redirecting…' : 'Get started'}
    </button>
  )
}

// Backward compat export
export function OneTimeCTA() {
  return <LifetimeCTA />
}
