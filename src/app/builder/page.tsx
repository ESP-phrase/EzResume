import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import ResumeBuilder from '@/components/resume/ResumeBuilder'

export default async function BuilderPage() {
  const session = await auth()
  if (!session?.user?.email) redirect('/sign-in')

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />
      </div>
    }>
      <ResumeBuilder />
    </Suspense>
  )
}
