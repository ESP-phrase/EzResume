'use client'

import { useRouter } from 'next/navigation'
import { Upload, PenLine } from 'lucide-react'
import { Logo } from '@/components/Logo'

export default function StartPage() {
  const router = useRouter()

  function choose(type: 'upload' | 'scratch') {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('resumeStartType', type)
    }
    router.push('/sign-in')
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      {/* Nav */}
      <nav className="px-6 py-5 border-b border-stone-800/60">
        <Logo size="md" />
      </nav>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <h1 className="text-3xl text-stone-100 mb-2 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
          How would you like to start?
        </h1>
        <p className="text-stone-500 text-sm mb-12 text-center">
          Choose your starting point — you can always change it later.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
          {/* Upload */}
          <button
            onClick={() => choose('upload')}
            className="group bg-stone-900 border border-stone-700 hover:border-amber-500/50 rounded-2xl p-8 text-left transition-all duration-200 hover:bg-stone-800/80"
          >
            <div className="w-14 h-14 bg-stone-800 border border-stone-700 rounded-2xl flex items-center justify-center mb-5 group-hover:border-amber-500/30 transition-colors">
              <Upload className="w-6 h-6 text-stone-400" />
            </div>
            <div className="font-bold text-stone-100 text-lg mb-2">I already have a resume</div>
            <div className="text-stone-500 text-sm leading-relaxed">
              Upload your existing resume and let AI polish and improve it instantly.
            </div>
            <div className="mt-5 inline-flex items-center gap-1.5 text-amber-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Upload resume <span aria-hidden>→</span>
            </div>
          </button>

          {/* Scratch */}
          <button
            onClick={() => choose('scratch')}
            className="group bg-stone-900 border border-stone-700 hover:border-amber-500/50 rounded-2xl p-8 text-left transition-all duration-200 hover:bg-stone-800/80"
          >
            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:border-amber-400/40 transition-colors">
              <PenLine className="w-6 h-6 text-amber-400" />
            </div>
            <div className="font-bold text-stone-100 text-lg mb-2">Start from scratch</div>
            <div className="text-stone-500 text-sm leading-relaxed">
              Our AI will guide you through building a powerful resume step by step.
            </div>
            <div className="mt-5 inline-flex items-center gap-1.5 text-amber-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Start building <span aria-hidden>→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
