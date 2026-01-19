import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
    prisma_database_final: PrismaClient | undefined
}

function createPrismaClient() {
    // Production : Turso (LibSQL)
    if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
        console.log('[Prisma] Connecting to Turso database')

        const libsql = createClient({
            url: process.env.TURSO_DATABASE_URL,
            authToken: process.env.TURSO_AUTH_TOKEN,
        })

        const adapter = new PrismaLibSQL(libsql)
        return new PrismaClient({ adapter } as any)
    }

    // Dev local : SQLite
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db').replace(/\\/g, '/')
    const dbUrl = `file:${dbPath}`
    console.log('[Prisma] Connecting to local database:', dbUrl)

    return new PrismaClient({
        datasources: {
            db: {
                url: dbUrl,
            },
        },
    } as any)
}

export const prisma = globalForPrisma.prisma_database_final ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_database_final = prisma

