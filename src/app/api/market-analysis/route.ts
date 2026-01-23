/**
 * API Market Analysis - Analyse de marché dynamique
 * Combine DataForSEO (volumes Google) + Gemini (analyse IA)
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getKeywordData, estimateSearchVolume } from '@/lib/dataforseo'
import { generateMarketAnalysis, MarketAnalysis } from '@/lib/gemini'

const analysisSchema = z.object({
    metier: z.string().min(2, 'Métier requis'),
    ville: z.string().min(2, 'Ville requise'),
    email: z.string().email('Email invalide').optional().or(z.literal('')),
})

export interface MarketAnalysisResponse {
    success: boolean
    analysis?: MarketAnalysis
    error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<MarketAnalysisResponse>> {
    try {
        const body = await request.json()
        const data = analysisSchema.parse(body)

        const { metier, ville, email } = data
        const keyword = `${metier} ${ville}`

        console.log(`[Market Analysis] Analyzing: ${keyword}`)

        // 1. Récupérer les données de mots-clés
        let keywordData = await getKeywordData(keyword)

        // Fallback si DataForSEO n'est pas configuré ou échoue
        if (!keywordData) {
            console.log('[Market Analysis] Using fallback estimation')
            keywordData = estimateSearchVolume(metier, ville)
        }

        console.log('[Market Analysis] Keyword data:', keywordData)

        // 2. Générer l'analyse IA
        const analysis = await generateMarketAnalysis(metier, ville, keywordData)

        console.log('[Market Analysis] Analysis generated:', {
            potentiel: analysis.potentielAnnuel,
            recherches: analysis.recherchesMensuelles,
        })

        // 3. Sauvegarder le lead
        const { prisma } = await import('@/lib/database_final')

        await prisma.lead.create({
            data: {
                type: 'market-analysis',
                email: email || null,
                phone: null,
                data: JSON.stringify({
                    metier,
                    ville,
                    analysis: {
                        potentielAnnuel: analysis.potentielAnnuel,
                        recherchesMensuelles: analysis.recherchesMensuelles,
                        concurrence: analysis.concurrence,
                        tendance: analysis.tendance,
                        panierMoyen: analysis.panierMoyen,
                        analyse: analysis.analyse,
                        conseils: analysis.conseils,
                    },
                    keywordData: {
                        searchVolume: keywordData.searchVolume,
                        cpc: keywordData.cpc,
                        competition: keywordData.competition,
                    },
                }),
                source: 'Estimateur de Potentiel',
                treated: false,
            },
        })

        console.log('[Market Analysis] Lead saved:', email || 'anonymous')

        return NextResponse.json({
            success: true,
            analysis,
        })
    } catch (error) {
        console.error('[Market Analysis] Error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: error.issues[0]?.message || 'Données invalides' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: 'Erreur lors de l\'analyse' },
            { status: 500 }
        )
    }
}
