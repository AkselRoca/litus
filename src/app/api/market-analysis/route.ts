/**
 * API Market Analysis - Analyse de marché dynamique
 * Combine DataForSEO (volumes Google) + Gemini (analyse IA)
 * 
 * FLUX:
 * 1. Première requête (sans email) → Crée analyse, retourne analysisId
 * 2. Deuxième requête (avec email + analysisId) → Met à jour l'analyse existante + crée Lead
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getKeywordData, estimateSearchVolume, KeywordData } from '@/lib/dataforseo'
import { generateMarketAnalysis, MarketAnalysis } from '@/lib/gemini'

const analysisSchema = z.object({
    metier: z.string().min(2, 'Métier requis'),
    ville: z.string().min(2, 'Ville requise'),
    email: z.string().email('Email invalide').optional().or(z.literal('')),
    analysisId: z.string().optional(), // ID d'une analyse existante à mettre à jour
})

export interface MarketAnalysisResponse {
    success: boolean
    analysis?: MarketAnalysis
    analysisId?: string
    error?: string
}

export async function POST(request: NextRequest): Promise<NextResponse<MarketAnalysisResponse>> {
    try {
        const body = await request.json()
        const data = analysisSchema.parse(body)

        const { metier, ville, email, analysisId } = data
        const keyword = `${metier} ${ville}`

        const { prisma } = await import('@/lib/database_final')

        // Si on a un analysisId ET un email, on met à jour l'analyse existante
        if (analysisId && email) {
            console.log(`[Market Analysis] Updating existing analysis ${analysisId} with email`)

            // Créer le lead
            const lead = await prisma.lead.create({
                data: {
                    type: 'market-analysis',
                    email: email,
                    phone: null,
                    data: JSON.stringify({ metier, ville, analysisId }),
                    source: 'Estimateur de Potentiel',
                    status: 'new',
                    treated: false,
                },
            })

            // Mettre à jour l'analyse avec l'email et le leadId
            await prisma.marketAnalysis.update({
                where: { id: analysisId },
                data: {
                    email: email,
                    leadId: lead.id,
                },
            })

            console.log(`[Market Analysis] Updated analysis ${analysisId} with lead ${lead.id}`)

            return NextResponse.json({
                success: true,
                analysisId,
            })
        }

        // Sinon, créer une nouvelle analyse
        console.log(`[Market Analysis] Analyzing: ${keyword}`)

        // 1. Récupérer les données de mots-clés
        let keywordData: KeywordData | null = await getKeywordData(keyword)
        let dataSource: 'dataforseo' | 'estimation' = 'dataforseo'

        // Fallback si DataForSEO n'est pas configuré ou échoue
        if (!keywordData) {
            console.log('[Market Analysis] Using fallback estimation')
            keywordData = estimateSearchVolume(metier, ville)
            dataSource = 'estimation'
        }

        console.log('[Market Analysis] Keyword data:', {
            source: dataSource,
            searchVolume: keywordData.searchVolume,
            competition: keywordData.competition,
        })

        // 2. Générer l'analyse IA avec calculs réalistes
        const analysis = await generateMarketAnalysis(metier, ville, keywordData)

        console.log('[Market Analysis] Analysis generated:', {
            potentielMensuel: analysis.potentielMensuel,
            potentielAnnuel: analysis.potentielAnnuel,
            tauxCapture: analysis.tauxCapture,
        })

        // 3. Sauvegarder l'analyse (sans email pour l'instant)
        const savedAnalysis = await prisma.marketAnalysis.create({
            data: {
                metier,
                ville,
                keyword,

                // Données SEO
                searchVolume: keywordData.searchVolume,
                cpc: keywordData.cpc,
                competition: keywordData.competition,
                competitionIndex: keywordData.competitionIndex,
                dataSource,

                // Calculs
                panierMoyen: analysis.panierMoyen,
                tauxConversion: 0, // Deprecated, kept for schema compatibility
                tauxCapture: analysis.tauxCapture,
                potentielMensuel: analysis.potentielMensuel,
                potentielAnnuel: analysis.potentielAnnuel,

                // Analyse IA
                tendance: analysis.tendance,
                analyse: analysis.analyse,
                conseils: JSON.stringify(analysis.conseils),

                // Pas d'email ni de lead pour l'instant
                leadId: null,
                email: null,
            },
        })

        console.log('[Market Analysis] Saved:', savedAnalysis.id)

        return NextResponse.json({
            success: true,
            analysis,
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

        return NextResponse.json(
            { success: false, error: 'Erreur lors de l\'analyse' },
            { status: 500 }
        )
    }
}
