import { redirect } from 'next/navigation'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) return redirect('/sign-in?error=invalid')

  const record = await db.magicToken.findUnique({ where: { token } })
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return redirect('/sign-in?error=expired')
  }

  return redirect(`/auth/magic-signin?t=${encodeURIComponent(token)}`)
}
