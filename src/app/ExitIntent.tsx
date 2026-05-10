'use client'

import { useEffect, useState } from 'react'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ExitIntent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('exit_intent_shown')) return

    let triggered = false

    function handleMouseLeave(e: MouseEvent) {
      // Trigger when cursor moves near the top (toward back button / address bar)
      if (triggered || e.clientY > 50) return
      triggered = true
      sessionStorage.setItem('exit_intent_shown', '1')
      // Small delay so it doesn't feel jarring
      setTimeout(() => setShow(true), 200)
    }

    // Wait 5 seconds before enabling — don't fire on fresh page load
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-stone-950/80 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      <div className="bg-stone-900 border border-stone-700 rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-stone-600 hover:text-stone-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-5">
          <Sparkles className="w-7 h-7 text-amber-400" />
        </div>

        <h2 className="text-2xl text-stone-100 mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
          Wait — see it work first.
        </h2>
        <p className="text-stone-400 text-sm leading-relaxed mb-6">
          Paste any resume bullet below and watch the AI rewrite it in 5 seconds. No account, no card, no commitment.
        </p>

        {/* Mini inline demo */}
        <MiniDemo onClose={() => setShow(false)} />

        <div className="mt-5 pt-5 border-t border-stone-800 flex items-center justify-between">
          <button onClick={() => setShow(false)} className="text-stone-600 hover:text-stone-400 text-sm transition-colors">
            No thanks
          </button>
          <Link
            href="/start"
            onClick={() => setShow(false)}
            className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-sm font-semibold transition-colors"
          >
            Build my resume free <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function MiniDemo({ onClose }: { onClose: () => void }) {
  const [bullet, setBullet] = useState('Managed a team and worked on improving the product')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRewrite() {
    if (!bullet.trim() || loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/resume/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet }),
      })
      const data = await res.json()
      if (data.enhanced) setResult(data.enhanced)
    } catch {}
    setLoading(false)
  }

  if (result) {
    return (
      <div className="space-y-3">
        <div className="bg-stone-800 rounded-xl p-3">
          <div className="text-[10px] text-stone-600 font-bold uppercase tracking-widest mb-1">Before</div>
          <p className="text-stone-500 text-xs leading-relaxed">{bullet}</p>
        </div>
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-3">
          <div className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">After ✦</div>
          <p className="text-stone-200 text-xs leading-relaxed font-medium">{result}</p>
        </div>
        <Link
          href="/start"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm py-3 rounded-xl transition-colors"
        >
          Do this for my whole resume <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <textarea
        value={bullet}
        onChange={(e) => setBullet(e.target.value)}
        rows={2}
        className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-stone-100 placeholder:text-stone-600 text-xs leading-relaxed focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
      />
      <button
        onClick={handleRewrite}
        disabled={loading || !bullet.trim()}
        className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm py-3 rounded-xl transition-colors disabled:opacity-40"
      >
        {loading ? (
          <><span className="w-4 h-4 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" /> Rewriting…</>
        ) : (
          <><Sparkles className="w-4 h-4" /> Rewrite with AI</>
        )}
      </button>
    </div>
  )
}
