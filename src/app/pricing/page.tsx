import Link from 'next/link'
import { CheckCircle, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { OneTimeCTA, ProCTA } from './PricingCTA'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Free to build, pay only when you download. One-time $2.59 or unlimited downloads at $1.59/mo.',
}

const ONE_TIME = [
  'One resume PDF download',
  'All AI bullet rewrites',
  'All templates',
  'ATS-optimized format',
  'Yours to keep forever',
]

const ONE_TIME_NO = [
  'Unlimited downloads',
  'Priority support',
]

const PRO = [
  'Unlimited PDF downloads',
  'Unlimited AI enhancements',
  'All 6 templates',
  'Priority support',
  'ATS score checker (soon)',
  'Cancel anytime',
]

const FAQ = [
  {
    q: 'Is it really free to build?',
    a: 'Yes. You can build, edit, and preview your entire resume at no cost. You only pay when you want the PDF.',
  },
  {
    q: 'What happens after I pay?',
    a: "You get an instant PDF download. One-time plan gives you that single file forever. Pro gives you unlimited downloads for as long as you're subscribed.",
  },
  {
    q: 'Can I cancel the subscription?',
    a: 'Anytime, instantly, from your account settings. No cancellation fees, no waiting period.',
  },
  {
    q: 'Is the $2/mo price permanent?',
    a: 'This is a launch offer. The price will increase once we exit the early-access period. Lock it in now and keep it.',
  },
  {
    q: "What if I'm not happy with the output?",
    a: 'Every bullet is fully editable. The AI gives you a strong starting point — you have complete control over the final version.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 border-b border-stone-800/60 flex items-center justify-between">
        <Logo size="md" />
        <div className="flex items-center gap-6">
          <Link href="/sign-in" className="text-stone-400 hover:text-stone-100 text-sm transition-colors">Sign in</Link>
          <Link href="/start" className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm px-4 py-2 rounded-lg transition-colors">
            Get Started
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        {/* Header */}
        <section className="pt-20 pb-16 px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
            Launch pricing — limited time
          </div>
          <h1 className="text-5xl text-stone-100 mb-4 leading-tight" style={{ fontFamily: 'var(--font-serif)' }}>
            Free to build.<br />Pay only to download.
          </h1>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            No subscription required. Build and preview your full resume for free — pay when you're ready for the PDF.
          </p>
        </section>

        {/* Plans */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* One-time */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 flex flex-col">
              <div className="mb-6">
                <div className="text-stone-400 text-sm font-semibold uppercase tracking-widest mb-3">One-Time</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-black text-stone-100">$2.59</span>
                  <span className="text-stone-500 text-sm line-through">$4.99</span>
                  <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-0.5 rounded-full">48% off</span>
                </div>
                <p className="text-stone-500 text-sm">Single PDF, yours to keep forever</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {ONE_TIME.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-stone-300">
                    <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" /> {f}
                  </li>
                ))}
                {ONE_TIME_NO.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-stone-600">
                    <X className="w-4 h-4 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <OneTimeCTA />
            </div>

            {/* Pro */}
            <div className="bg-amber-500/5 border-2 border-amber-500/50 rounded-2xl p-8 flex flex-col relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-amber-500 text-stone-950 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Most popular
                </span>
              </div>

              <div className="mb-6">
                <div className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Pro</div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-black text-stone-100">$1.59</span>
                  <span className="text-stone-500 text-sm">/month</span>
                  <span className="text-stone-500 text-sm line-through">$9.99</span>
                </div>
                <p className="text-stone-500 text-sm">Unlimited everything — lock in this price forever</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {PRO.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-stone-200">
                    <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>

              <ProCTA />
              <p className="text-center text-stone-600 text-xs mt-3">Cancel anytime · No questions asked</p>
            </div>
          </div>

          {/* Free callout */}
          <div className="max-w-4xl mx-auto mt-6">
            <div className="bg-stone-900/60 border border-stone-800 rounded-xl px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="text-stone-100 font-semibold text-sm">Always free to build</span>
                <span className="text-stone-500 text-sm ml-2">— no credit card needed to start</span>
              </div>
              <Link href="/start" className="text-amber-500 hover:text-amber-400 text-sm font-semibold transition-colors flex items-center gap-1">
                Build for free <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="px-6 pb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-stone-100 mb-8 text-center" style={{ fontFamily: 'var(--font-serif)' }}>Everything compared</h2>
            <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest text-stone-500 border-b border-stone-800">
                <div className="px-6 py-4">Feature</div>
                <div className="px-6 py-4 text-center border-l border-stone-800">One-Time · $2.59</div>
                <div className="px-6 py-4 text-center border-l border-stone-800 text-amber-400">Pro · $1.59/mo</div>
              </div>
              {[
                ['Build & preview resume', true, true],
                ['AI bullet rewriter', true, true],
                ['All templates', true, true],
                ['ATS-optimized format', true, true],
                ['PDF downloads', '1', 'Unlimited'],
                ['AI enhancements', '1 resume', 'Unlimited'],
                ['Priority support', false, true],
                ['ATS score checker', false, 'Soon'],
              ].map(([feature, one, pro]) => (
                <div key={String(feature)} className="grid grid-cols-3 border-b border-stone-800/60 last:border-0">
                  <div className="px-6 py-4 text-stone-400 text-sm">{feature}</div>
                  <div className="px-6 py-4 text-center border-l border-stone-800">
                    {one === true ? <CheckCircle className="w-4 h-4 text-stone-400 mx-auto" /> : one === false ? <X className="w-4 h-4 text-stone-700 mx-auto" /> : <span className="text-stone-300 text-sm">{one}</span>}
                  </div>
                  <div className="px-6 py-4 text-center border-l border-stone-800">
                    {pro === true ? <CheckCircle className="w-4 h-4 text-amber-500 mx-auto" /> : pro === false ? <X className="w-4 h-4 text-stone-700 mx-auto" /> : <span className="text-amber-400 text-sm font-medium">{pro}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 pb-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl text-stone-100 mb-10 text-center" style={{ fontFamily: 'var(--font-serif)' }}>Common questions</h2>
            <div className="space-y-6">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="border-b border-stone-800/60 pb-6">
                  <div className="text-stone-100 font-semibold mb-2">{q}</div>
                  <div className="text-stone-500 text-sm leading-relaxed">{a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24 text-center">
          <h2 className="text-4xl text-stone-100 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Start for free.<br />Pay when you&apos;re ready.
          </h2>
          <p className="text-stone-500 mb-8 text-sm">No credit card required to build.</p>
          <Link href="/start" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 py-4 rounded-xl transition-colors">
            Build My Resume for Free <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/60 px-6 py-8 flex items-center justify-between text-stone-600 text-xs">
        <Logo size="sm" />
        <div className="flex gap-6">
          <a href="#" className="hover:text-stone-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-stone-400 transition-colors">Terms</a>
        </div>
      </footer>
    </div>
  )
}
