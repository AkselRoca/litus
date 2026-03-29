import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'

// GET /api/config — Public endpoint to get site config (availability badge)
export async function GET() {
    try {
        let config = await prisma.config.findUnique({
            where: { id: 'main' },
        })

        // Si pas de config, en créer une par défaut
        if (!config) {
            config = await prisma.config.create({
                data: {
                    id: 'main',
                    dispo: true,
                    nextAvailableDate: null,
                },
            })
        }

        return NextResponse.json({
            success: true,
            data: {
                dispo: config.dispo,
                nextAvailableDate: config.nextAvailableDate,
            },
        })
    } catch (error) {
        console.error('Error fetching config:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch config' },
            { status: 500 }
        )
    }
}
