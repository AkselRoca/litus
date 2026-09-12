import { withAdmin } from '@/lib/admin/guard'
import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'

// GET /api/admin/config — Get config (admin)
export const GET = withAdmin(async function GET() {
    try {
        let config = await prisma.config.findUnique({
            where: { id: 'main' },
        })

        if (!config) {
            config = await prisma.config.create({
                data: {
                    id: 'main',
                    dispo: true,
                    nextAvailableDate: null,
                },
            })
        }

        return NextResponse.json({ success: true, data: config })
    } catch (error) {
        console.error('Error fetching config:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch config' },
            { status: 500 }
        )
    }
})

// PUT /api/admin/config — Update config (admin)
export const PUT = withAdmin(async function PUT(request: Request) {
    try {
        const body = await request.json()
        const { dispo, nextAvailableDate } = body

        const config = await prisma.config.upsert({
            where: { id: 'main' },
            update: {
                dispo: dispo ?? true,
                nextAvailableDate: nextAvailableDate ?? null,
            },
            create: {
                id: 'main',
                dispo: dispo ?? true,
                nextAvailableDate: nextAvailableDate ?? null,
            },
        })

        return NextResponse.json({ success: true, data: config })
    } catch (error) {
        console.error('Error updating config:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to update config' },
            { status: 500 }
        )
    }
})
