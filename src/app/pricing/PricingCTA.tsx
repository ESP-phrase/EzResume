'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { rdtTrack } from '@/lib/rdt'

export function OneTimeCTA() {
  return (
    <Link
      href="/start?plan=one-time"
      onClick={() => rdtTrack('AddToCart', { currency: 'USD', value: 3.24, itemCount: 1 })}
      className="w-full border border-stone-700 hover:border-stone-500 text-stone-200 hover:text-white font-semibold text-sm py-3 rounded-xl transition-colors text-center block"
    >
      Get Started
    </Link>
  )
}

export function ProCTA() {
  return (
    <Link
      href="/start?plan=subscription"
      onClick={() => rdtTrack('AddToCart', { currency: 'USD', value: 2.00, itemCount: 1 })}
      className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm py-3 rounded-xl transition-colors text-center flex items-center justify-center gap-2"
    >
      Start for $2/mo <ArrowRight className="w-4 h-4" />
    </Link>
  )
}
