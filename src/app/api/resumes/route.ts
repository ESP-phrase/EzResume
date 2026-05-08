import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await db.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ resumes: [] })
  const resumes = await db.savedResume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  })
  return NextResponse.json({ resumes })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const user = await db.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })
  const body = await req.json().catch(() => ({}))
  const resume = await db.savedResume.create({
    data: {
      userId: user.id,
      title: body.title ?? 'My Resume',
      data: body.data ?? JSON.stringify({ personalInfo: { name: '', email: '', phone: '', location: '', linkedin: '', website: '', summary: '' }, experience: [], education: [], skills: [] }),
      templateId: body.templateId ?? 'classic',
    },
  })
  return NextResponse.json({ resume }, { status: 201 })
}
