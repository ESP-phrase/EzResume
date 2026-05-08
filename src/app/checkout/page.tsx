'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Lock, CreditCard, Zap, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'

type Plan = 'one-time' | 'subscription'

export default function CheckoutPage() {
  const [plan, setPlan] = useState<Plan>('subscription')
  const [loading, setLoading] = useState(false)

  async function handlePay() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    alert('Payment flow ready — connect your provider to continue.')
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-stone-800/60">
        <Logo size="md" />
        <div className="flex items-center gap-1.5 text-stone-500 text-xs">
          <Lock className="w-3 h-3" />
          Secure checkout
        </div>
      </nav>

      <div className="flex-1 flex items-start justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left — plan selector */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/builder" className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-300 text-sm transition-colors mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to resume
            </Link>
            <h1 className="text-2xl text-stone-100" style={{ fontFamily: 'var(--font-serif)' }}>Choose your plan</h1>
            <p className="text-stone-500 text-sm">Your resume is ready — unlock your download below.</p>

            <div className="space-y-3 pt-2">
              {/* One-time */}
              <button
                onClick={() => setPlan('one-time')}
                className={`w-full text-left rounded-2xl border p-5 transition-all duration-150 ${
                  plan === 'one-time'
                    ? 'border-amber-500/60 bg-amber-500/5'
                    : 'border-stone-700 bg-stone-900 hover:border-stone-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan === 'one-time' ? 'border-amber-500 bg-amber-500' : 'border-stone-600'
                    }`}>
                      {plan === 'one-time' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-100">One-Time Download</div>
                      <div className="text-stone-500 text-sm mt-0.5">Single PDF, yours forever</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-stone-100">$4.99</div>
                    <div className="text-stone-500 text-xs">one time</div>
                  </div>
                </div>
                <ul className="mt-4 ml-7 space-y-1.5">
                  {['1 resume PDF download', 'AI-enhanced bullet points', 'All templates', 'ATS-optimized'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-stone-500">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </button>

              {/* Subscription */}
              <button
                onClick={() => setPlan('subscription')}
                className={`w-full text-left rounded-2xl border-2 p-5 transition-all duration-150 relative overflow-hidden ${
                  plan === 'subscription'
                    ? 'border-amber-500/60 bg-amber-500/5'
                    : 'border-stone-700 bg-stone-900 hover:border-stone-600'
                }`}
              >
                <div className="absolute top-3.5 right-4">
                  <span className="bg-amber-500 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Best value
                  </span>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan === 'subscription' ? 'border-amber-500 bg-amber-500' : 'border-stone-600'
                    }`}>
                      {plan === 'subscription' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-100">Monthly Pro</div>
                      <div className="text-stone-500 text-sm mt-0.5">Unlimited resumes, all features</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-stone-100">$9.99</div>
                    <div className="text-stone-500 text-xs">per month</div>
                  </div>
                </div>
                <ul className="mt-4 ml-7 space-y-1.5">
                  {['Unlimited PDF downloads', 'Unlimited AI enhancements', 'All 6 templates', 'Priority support', 'ATS score checker (soon)'].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-stone-400">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </button>
            </div>
          </div>

          {/* Right — order summary */}
          <div className="lg:col-span-2">
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sticky top-8">
              <h2 className="font-bold text-stone-100 mb-4">Order summary</h2>

              {/* Resume preview chip */}
              <div className="bg-stone-800/60 rounded-xl p-3 flex items-center gap-3 mb-5">
                <div className="w-8 h-10 bg-stone-700 rounded flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-4 h-4 text-stone-400" />
                </div>
                <div>
                  <div className="text-stone-100 text-sm font-medium">My Resume</div>
                  <div className="text-stone-500 text-xs">Classic template · PDF</div>
                </div>
              </div>

              <div className="space-y-2 border-t border-stone-800 pt-4 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">{plan === 'one-time' ? 'One-time download' : 'Pro subscription'}</span>
                  <span className="text-stone-100 font-medium">{plan === 'one-time' ? '$4.99' : '$9.99/mo'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Tax</span>
                  <span className="text-stone-500">Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-bold border-t border-stone-800 pt-3 mt-3">
                  <span className="text-stone-100">Total</span>
                  <span className="text-amber-400 text-lg">{plan === 'one-time' ? '$4.99' : '$9.99/mo'}</span>
                </div>
              </div>

              <Button
                onClick={handlePay}
                disabled={loading}
                className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-base"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    {plan === 'one-time' ? 'Pay $4.99 & Download' : 'Start Pro · $9.99/mo'}
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-stone-600 text-xs">
                <Lock className="w-3 h-3" />
                Payments secured by encryption
              </div>

              {plan === 'subscription' && (
                <p className="text-center text-stone-600 text-xs mt-3">
                  Cancel anytime. No questions asked.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
