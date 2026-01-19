// @ts-ignore
const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis as unknown as {
    prisma_db_v1: any
}

export const prisma = globalForPrisma.prisma_db_v1 ?? new PrismaClient({
    datasourceUrl: "file:./dev.db"
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_db_v1 = prisma
