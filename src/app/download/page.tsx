'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Loader2, Download } from 'lucide-react'
import { Logo } from '@/components/Logo'
import type { Resume } from '@/types/resume'
import { rdtTrack } from '@/lib/rdt'

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((m) => m.PDFDownloadLink),
  { ssr: false }
)
const ResumeDocument = dynamic(() => import('@/components/pdf/ResumeDocument'), { ssr: false })

function DownloadInner() {
  const params = useSearchParams()
  const resumeId = params.get('resume_id')
  const sessionId = params.get('session_id')
  const [resume, setResume] = useState<Resume | null>(null)
  const [templateId, setTemplateId] = useState<string>('classic')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (sessionId) {
      rdtTrack('Purchase', { currency: 'USD' })
    }
  }, [sessionId])

  useEffect(() => {
    if (!resumeId) return
    const saved = localStorage.getItem(`resume_${resumeId}`)
    if (saved) {
      const parsed = JSON.parse(saved)
      const { templateId: tid, ...resumeData } = parsed
      setResume(resumeData)
      if (tid) setTemplateId(tid)
      setReady(true)
    }
  }, [resumeId])

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-4">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 max-w-sm w-full text-center">
          <p className="text-stone-500 text-sm mb-4">Invalid download link.</p>
          <Button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold" onClick={() => (window.location.href = '/builder')}>
            Back to Builder
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col">
      <div className="px-6 py-5 border-b border-stone-800/60">
        <Logo size="md" />
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 max-w-sm w-full text-center space-y-4">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mx-auto">
            <Download className="w-6 h-6 text-amber-400" />
          </div>
          <h1 className="text-xl text-stone-100" style={{ fontFamily: 'var(--font-serif)' }}>Payment confirmed!</h1>
          <p className="text-stone-500 text-sm">Your AI-enhanced resume is ready to download.</p>

          {!ready && (
            <div className="flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
            </div>
          )}

          {ready && resume && (
            <PDFDownloadLink
              document={<ResumeDocument resume={resume} templateId={templateId as import('@/types/resume').TemplateId} />}
              fileName={`${resume.personalInfo.name?.replace(/\s+/g, '_') || 'resume'}_resume.pdf`}
            >
              {({ loading }) => (
                <Button className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {loading ? 'Preparing PDF...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          )}

          <Button variant="ghost" size="sm" className="text-stone-500 hover:text-stone-300" onClick={() => (window.location.href = '/builder')}>
            Build another resume
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-950" />}>
      <DownloadInner />
    </Suspense>
  )
}
