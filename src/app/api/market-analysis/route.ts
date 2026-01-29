/**
 * API Market Analysis - Analyse de marché avec estimation intelligente
 * 
 * Utilise un système d'estimation basé sur :
 * - Population des villes françaises
 * - Ratios de recherche par métier
 * 
 * FLUX:
 * 1. Première requête (sans email) → Crée analyse estimée, retourne analysisId
 * 2. Deuxième requête (avec email + analysisId) → Met à jour l'analyse + crée Lead pour audit réel
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getEstimatedKeywordData } from '@/lib/estimation'
import { generateMarketAnalysis, MarketAnalysis } from '@/lib/gemini'

const analysisSchema = z.object({
    metier: z.string().min(2, 'Métier requis'),
    ville: z.string().min(2, 'Ville requise'),
    email: z.string().email('Email invalide').optional().or(z.literal('')),
    analysisId: z.string().optional(),
})

export interface MarketAnalysisResponse {
    success: boolean
    analysis?: MarketAnalysis & { isEstimation?: boolean }
    analysisId?: string
    error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<MarketAnalysisResponse>> {
    try {
        const body = await request.json()
        const data = analysisSchema.parse(body)

        const { metier, ville, email, analysisId } = data

        const { prisma } = await import('@/lib/database_final')

        // Si on a un analysisId ET un email, on met à jour l'analyse existante
        if (analysisId && email) {
            console.log(`[Market Analysis] Updating analysis ${analysisId} with email for real audit`)

            const lead = await prisma.lead.create({
                data: {
                    type: 'market-analysis',
                    email: email,
                    phone: null,
                    data: JSON.stringify({ metier, ville, analysisId, wantsRealAudit: true }),
                    source: 'Estimateur de Potentiel',
                    status: 'new',
                    treated: false,
                },
            })

            await prisma.marketAnalysis.update({
                where: { id: analysisId },
                data: { email, leadId: lead.id },
            })

            return NextResponse.json({ success: true, analysisId })
        }

        // Nouvelle analyse avec estimation intelligente
        console.log(`[Market Analysis] Generating estimation for: ${metier} ${ville}`)

        // Utiliser l'estimation intelligente (gratuite)
        const keywordData = getEstimatedKeywordData(metier, ville)

        console.log('[Market Analysis] Estimation data:', {
            keyword: keywordData.keyword,
            searchVolume: keywordData.searchVolume,
            cpc: keywordData.cpc,
            competition: keywordData.competition,
            competitionIndex: keywordData.competitionIndex,
            populationUsed: keywordData.populationUsed,
        })

        // Générer l'analyse IA
        const analysis = await generateMarketAnalysis(metier, ville, keywordData)

        console.log('[Market Analysis] Analysis:', {
            potentielMensuel: analysis.potentielMensuel,
            potentielAnnuel: analysis.potentielAnnuel,
            tauxCapture: analysis.tauxCapture,
        })

        // Sauvegarder l'analyse
        const savedAnalysis = await prisma.marketAnalysis.create({
            data: {
                metier,
                ville,
                keyword: keywordData.keyword,

                // Données estimées
                searchVolume: keywordData.searchVolume,
                cpc: keywordData.cpc,
                competition: keywordData.competition,
                competitionIndex: keywordData.competitionIndex,
                dataSource: 'estimation', // Indique que c'est une estimation

                // Calculs
                panierMoyen: analysis.panierMoyen,
                tauxConversion: 0,
                tauxCapture: analysis.tauxCapture,
                potentielMensuel: analysis.potentielMensuel,
                potentielAnnuel: analysis.potentielAnnuel,

                // Analyse IA
                tendance: analysis.tendance,
                analyse: analysis.analyse,
                conseils: '[]',

                leadId: null,
                email: null,
            },
        })

        console.log('[Market Analysis] Saved:', savedAnalysis.id)

        return NextResponse.json({
            success: true,
            analysis: {
                ...analysis,
                isEstimation: true,
            },
            analysisId: savedAnalysis.id,
        })
    } catch (error) {
        console.error('[Market Analysis] Error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: error.issues[0]?.message || 'Données invalides' },
                { status: 400 }
            )
        }

        const message = error instanceof Error ? error.message : 'Erreur inconnue'
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        )
    }
}
