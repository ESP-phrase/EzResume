import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const email = 'demo@resumegenius.com'

  await db.user.upsert({
    where: { email },
    update: {},
    create: { email, name: 'Demo User' },
  })

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await db.magicToken.create({ data: { email, token, expiresAt } })

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001'
  return NextResponse.redirect(`${baseUrl}/api/auth/magic-link/verify?token=${token}`)
}
