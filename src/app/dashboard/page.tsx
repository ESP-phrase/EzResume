import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import DashboardShell from './DashboardShell'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.email) redirect('/sign-in')

  const user = await db.user.findUnique({ where: { email: session.user.email } })
  if (!user) redirect('/sign-in')

  const resumes = await db.savedResume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  })

  return (
    <DashboardShell
      user={{ id: user.id, name: user.name, email: user.email }}
      initialResumes={resumes.map(r => ({
        id: r.id,
        title: r.title,
        templateId: r.templateId,
        updatedAt: r.updatedAt.toISOString(),
        createdAt: r.createdAt.toISOString(),
      }))}
    />
  )
}
