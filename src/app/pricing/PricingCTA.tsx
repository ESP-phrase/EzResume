'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { rdtTrack } from '@/lib/rdt'

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

export function OneTimeCTA() {
  const [loading, setLoading] = useState(false)
  return (
    <button
      onClick={async () => { setLoading(true); await goToCheckout('payment', 126.99) }}
      disabled={loading}
      className="w-full border border-stone-700 hover:border-stone-500 text-stone-200 hover:text-white font-semibold text-sm py-3 rounded-xl transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
      {loading ? 'Redirecting…' : 'Get Lifetime Access — $126.99'}
    </button>
  )
}

export function ProCTA() {
  const [loading, setLoading] = useState(false)
  return (
    <button
      onClick={async () => { setLoading(true); await goToCheckout('subscription', 24.99) }}
      disabled={loading}
      className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm py-3 rounded-xl transition-colors text-center flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
      {loading ? 'Redirecting…' : 'Start Pro — $24.99/mo'}
    </button>
  )
}
