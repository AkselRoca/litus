/**
 * API Admin - Liste des analyses de marché
 */

import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import type { MarketAnalysis } from '@prisma/client'

export async function GET() {
    try {
        const session = await auth()
        if (!session) {
            return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
        }

        const { prisma } = await import('@/lib/database_final')

        const analyses = await prisma.marketAnalysis.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
        })

        // Parse les conseils JSON pour chaque analyse
        const parsedAnalyses = analyses.map((a: MarketAnalysis) => ({
            ...a,
            conseils: JSON.parse(a.conseils),
        }))

        return NextResponse.json(parsedAnalyses)
    } catch (error) {
        console.error('[Admin Market Analysis] Error:', error)
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        )
    }
}
