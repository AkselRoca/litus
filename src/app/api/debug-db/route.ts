import { NextResponse } from 'next/server'
import { isEditor } from '@/lib/editorial/admin'

export async function GET() {
    if (!await isEditor()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const logs: string[] = []

    try {
        logs.push(`TURSO_DATABASE_URL: ${process.env.TURSO_DATABASE_URL ? 'SET (' + process.env.TURSO_DATABASE_URL.substring(0, 20) + '...)' : 'NOT SET'}`)
        logs.push(`TURSO_AUTH_TOKEN: ${process.env.TURSO_AUTH_TOKEN ? 'SET (length: ' + process.env.TURSO_AUTH_TOKEN.length + ')' : 'NOT SET'}`)
        logs.push(`NODE_ENV: ${process.env.NODE_ENV}`)

        // Try to import and connect
        logs.push('Attempting to import database module...')
        const { prisma } = await import('@/lib/database_final')
        logs.push('Database module imported successfully')

        // Try a simple query
        logs.push('Attempting to query database...')
        const count = await prisma.lead.count()
        logs.push(`Lead count: ${count}`)

        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            leadCount: count,
            logs
        })
    } catch (error) {
        logs.push(`ERROR: ${error instanceof Error ? error.message : String(error)}`)
        logs.push(`STACK: ${error instanceof Error ? error.stack : 'No stack'}`)

        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            logs
        }, { status: 500 })
    }
}
