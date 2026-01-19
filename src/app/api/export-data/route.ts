import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'

// Endpoint pour exporter toutes les données (appelé en local pour obtenir le JSON)
export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { order: 'asc' }
        })

        return NextResponse.json({
            success: true,
            count: projects.length,
            projects: projects
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    } catch (error) {
        console.error("Export Error:", error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
