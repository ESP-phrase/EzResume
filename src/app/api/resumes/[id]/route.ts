import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'

async function getOwnedResume(id: string, email: string) {
  const user = await db.user.findUnique({ where: { email } })
  if (!user) return null
  return db.savedResume.findFirst({ where: { id, userId: user.id } })
}

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const resume = await getOwnedResume(id, session.user.email)
  if (!resume) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ resume })
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const existing = await getOwnedResume(id, session.user.email)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const body = await req.json()
  const resume = await db.savedResume.update({
    where: { id },
    data: {
      ...(body.title !== undefined && { title: body.title }),
      ...(body.data !== undefined && { data: body.data }),
      ...(body.templateId !== undefined && { templateId: body.templateId }),
    },
  })
  return NextResponse.json({ resume })
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const existing = await getOwnedResume(id, session.user.email)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await db.savedResume.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
