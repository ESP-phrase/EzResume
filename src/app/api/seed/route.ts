import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get('secret')
  if (secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const email = 'admin@resumegenius.com'
  const password = 'Launch2024!'
  const hash = await bcrypt.hash(password, 12)

  await db.user.upsert({
    where: { email },
    update: { password: hash },
    create: { email, name: 'Admin', password: hash },
  })

  return NextResponse.json({ ok: true, email, password })
}
