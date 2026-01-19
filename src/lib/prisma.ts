import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
    prisma_litus_v10: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma_litus_v10 ?? new PrismaClient({
    log: ['info', 'warn', 'error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_litus_v10 = prisma
