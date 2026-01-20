import { NextResponse } from 'next/server'

// Temporary endpoint to add analytics tables to the database
export async function GET() {
    try {
        const { prisma } = await import('@/lib/database_final')

        // SQL to add PageView table
        const createPageView = `
            CREATE TABLE IF NOT EXISTS "PageView" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "path" TEXT NOT NULL,
                "referrer" TEXT,
                "userAgent" TEXT,
                "country" TEXT,
                "sessionId" TEXT,
                "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `

        // SQL to add WebVital table
        const createWebVital = `
            CREATE TABLE IF NOT EXISTS "WebVital" (
                "id" TEXT NOT NULL PRIMARY KEY,
                "name" TEXT NOT NULL,
                "value" REAL NOT NULL,
                "rating" TEXT NOT NULL,
                "path" TEXT NOT NULL,
                "sessionId" TEXT,
                "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `

        // Create indexes
        const indexes = [
            `CREATE INDEX IF NOT EXISTS "PageView_path_idx" ON "PageView"("path")`,
            `CREATE INDEX IF NOT EXISTS "PageView_createdAt_idx" ON "PageView"("createdAt")`,
            `CREATE INDEX IF NOT EXISTS "PageView_sessionId_idx" ON "PageView"("sessionId")`,
            `CREATE INDEX IF NOT EXISTS "WebVital_name_idx" ON "WebVital"("name")`,
            `CREATE INDEX IF NOT EXISTS "WebVital_createdAt_idx" ON "WebVital"("createdAt")`,
            `CREATE INDEX IF NOT EXISTS "WebVital_rating_idx" ON "WebVital"("rating")`,
        ]

        // Execute migrations
        await prisma.$executeRawUnsafe(createPageView)
        await prisma.$executeRawUnsafe(createWebVital)

        for (const idx of indexes) {
            await prisma.$executeRawUnsafe(idx)
        }

        return NextResponse.json({
            success: true,
            message: 'Analytics tables created successfully',
            tables: ['PageView', 'WebVital']
        })

    } catch (error) {
        console.error('[Migrate Analytics] Error:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
