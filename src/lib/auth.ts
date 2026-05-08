import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string
        const password = credentials?.password as string
        if (!email || !password) return null
        const user = await db.user.findUnique({ where: { email } })
        if (!user || !user.password) return null
        const valid = await bcrypt.compare(password, user.password)
        if (!valid) return null
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
    Credentials({
      id: 'magic-token',
      credentials: { token: { type: 'text' } },
      authorize: async (credentials) => {
        const token = credentials?.token as string
        if (!token) return null
        const record = await db.magicToken.findUnique({ where: { token } })
        if (!record || record.usedAt || record.expiresAt < new Date()) return null
        await db.magicToken.update({ where: { token }, data: { usedAt: new Date() } })
        const user = await db.user.findUnique({ where: { email: record.email } })
        if (!user) return null
        return { id: user.id, email: user.email, name: user.name }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/sign-in' },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === 'google' && user?.email) {
        const dbUser = await db.user.upsert({
          where: { email: user.email },
          update: { name: user.name ?? undefined },
          create: { email: user.email, name: user.name },
        })
        token.id = dbUser.id
        token.name = dbUser.name
      } else if (user) {
        token.id = user.id
        if (user.name) token.name = user.name
        if (user.email) token.email = user.email
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        if (token.name) session.user.name = token.name as string
      }
      return session
    },
  },
})
