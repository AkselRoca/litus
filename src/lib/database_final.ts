import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

// Hack Vercel : Prisma exige DATABASE_URL pour valider le schéma à l'initialisation, 
// même si on override avec l'adapter LibSQL par la suite.
if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "file:./dev.db"
}

const globalForPrisma = globalThis as unknown as {
    prisma_database_final: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
    console.log('[Prisma] Environment check:', {
        hasTursoUrl: !!process.env.TURSO_DATABASE_URL,
        hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
        nodeEnv: process.env.NODE_ENV,
    })

    // Production : Turso (LibSQL)
    if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
        try {
            console.log('[Prisma] Connecting to Turso database...')
            console.log('[Prisma] URL prefix:', process.env.TURSO_DATABASE_URL?.substring(0, 30) + '...')

            const libsql = createClient({
                url: process.env.TURSO_DATABASE_URL,
                authToken: process.env.TURSO_AUTH_TOKEN,
            })

            console.log('[Prisma] LibSQL client created')

            const adapter = new PrismaLibSQL(libsql)
            console.log('[Prisma] Adapter created')

            const client = new PrismaClient({ adapter } as any)
            console.log('[Prisma] PrismaClient created successfully')

            return client
        } catch (error) {
            console.error('[Prisma] ERROR creating Turso client:', error)
            throw new Error(`Failed to create Prisma client with Turso: ${error}`)
        }
    }

    // Dev local : SQLite - Fallback
    console.log('[Prisma] No Turso credentials found, using default SQLite connection')

    try {
        return new PrismaClient()
    } catch (error) {
        console.error('[Prisma] ERROR creating local client:', error)
        throw new Error(`Failed to create local Prisma client: ${error}`)
    }
}

export const prisma = globalForPrisma.prisma_database_final ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma_database_final = prisma
}
