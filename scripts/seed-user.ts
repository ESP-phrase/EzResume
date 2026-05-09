import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import bcrypt from 'bcryptjs'

async function main() {
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
  const db = new PrismaClient({ adapter })

  const email = 'admin@resumegenius.com'
  const password = 'Launch2024!'
  const hash = await bcrypt.hash(password, 12)

  const user = await db.user.upsert({
    where: { email },
    update: { password: hash },
    create: { email, name: 'Admin', password: hash },
  })

  console.log('Seeded user:', user.email)
  console.log('Password:', password)
  await db.$disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
