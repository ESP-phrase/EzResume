'use client'

import { useState } from 'react'
import { Sparkles, ArrowRight, Loader2, RotateCcw } from 'lucide-react'
import Link from 'next/link'

const EXAMPLES = [
  'Managed a team of engineers and worked on backend systems',
  'Helped with marketing campaigns and social media',
  'Responsible for customer support and improving satisfaction',
  'Worked on sales and helped grow the business',
]

export default function HomeDemoSection() {
  const [bullet, setBullet] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tried, setTried] = useState(false)

  async function handleRewrite() {
    if (!bullet.trim() || loading) return
    setLoading(true)
    setError('')
    setResult('')
    try {
      const res = await fetch('/api/resume/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet }),
      })
      const data = await res.json()
      if (data.enhanced) {
        setResult(data.enhanced)
        setTried(true)
      } else {
        setError('Something went wrong. Try again.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    }
    setLoading(false)
  }

  return (
    <section className="py-28 px-6 bg-stone-900/40 border-y border-stone-800/60">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Try it free — no account needed
          </div>
          <h2 className="text-4xl text-stone-100 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Paste a bullet.<br /><em style={{ fontStyle: 'italic', color: '#FBBF24' }}>Watch it transform.</em>
          </h2>
          <p className="text-stone-500 text-base">Type your resume bullet below and see the AI rewrite it in real time.</p>
        </div>

        {/* Quick examples */}
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => { setBullet(ex); setResult('') }}
              className="text-xs text-stone-500 hover:text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700 px-3 py-1.5 rounded-full transition-all"
            >
              {ex.length > 40 ? ex.slice(0, 40) + '…' : ex}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="relative mb-4">
          <textarea
            value={bullet}
            onChange={(e) => { setBullet(e.target.value); setResult('') }}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleRewrite() }}
            placeholder="Paste or type a resume bullet point here…"
            rows={3}
            className="w-full bg-stone-900 border border-stone-700 focus:border-amber-500/60 rounded-2xl px-5 py-4 text-stone-100 placeholder:text-stone-600 text-sm leading-relaxed focus:outline-none transition-colors resize-none"
          />
          <div className="absolute bottom-3 right-3 text-stone-700 text-[10px]">⌘ + Enter</div>
        </div>

        <button
          onClick={handleRewrite}
          disabled={loading || !bullet.trim()}
          className="w-full h-12 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed mb-6"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Rewriting…</>
          ) : (
            <><Sparkles className="w-4 h-4" /> Rewrite with AI</>
          )}
        </button>

        {/* Result */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Before */}
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Before</span>
                </div>
                <p className="text-stone-500 text-sm leading-relaxed">{bullet}</p>
              </div>
              {/* After */}
              <div className="bg-stone-900 border border-amber-500/30 rounded-2xl p-5 relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">After</span>
                </div>
                <p className="text-stone-100 text-sm leading-relaxed font-medium">{result}</p>
                <button
                  onClick={() => { setBullet(''); setResult('') }}
                  className="absolute top-4 right-4 text-stone-600 hover:text-stone-400 transition-colors"
                  title="Try another"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Post-demo CTA */}
            <div className="text-center bg-stone-900 border border-stone-800 rounded-2xl p-6">
              <p className="text-stone-100 font-semibold mb-1">Ready to do this for your whole resume?</p>
              <p className="text-stone-500 text-sm mb-5">Build your complete AI-enhanced resume in under 5 minutes. Free to build.</p>
              <Link
                href="/start"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-7 py-3 rounded-xl transition-colors"
              >
                Build My Resume <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 text-center">
            {error}
          </div>
        )}
      </div>
    </section>
  )
}
