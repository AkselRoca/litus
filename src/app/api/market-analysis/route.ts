/**
 * API Market Analysis - Analyse de marché propulsée par l'IA (Gemini)
 * 
 * Utilise Gemini pour estimer de manière fiable le marché local (Volume, CPC)
 * pour n'importe quelle requête libre et créer un discours de vente percutant pour l'agence.
 * 
 * FLUX:
 * 1. Première requête (sans email) → Crée l'analyse, la stocke en BDD et renvoie l'ID
 * 2. Deuxième requête (avec email + analysisId) → Met à jour l'analyse + crée un VRAI Lead
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateMarketAnalysis, MarketAnalysis } from '@/lib/gemini'

const analysisSchema = z.object({
    metier: z.string().min(2, 'Le métier ou l\'activité est requis'),
    ville: z.string().min(2, 'La ville est requise'),
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

        // ÉTAPE 2 : Capture d'Email (Le prospect veut un VRAI audit)
        if (analysisId && email) {
            console.log(`[Market Analysis] Updating analysis ${analysisId} with email ${email}`)

            // Création du Lead
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

            // Lier l'analyse au Lead
            await prisma.marketAnalysis.update({
                where: { id: analysisId },
                data: { email, leadId: lead.id },
            })

            return NextResponse.json({ success: true, analysisId })
        }

        // ÉTAPE 1 : Première estimation de marché 100% IA
        console.log(`[Market Analysis] Generating estimation for: ${metier} | ${ville}`)

        // Requête unique à Gemini (Génère Data + Pitch)
        const analysis = await generateMarketAnalysis(metier, ville)

        console.log('[Market Analysis] Generated KPIs:', {
            volume: analysis.recherchesMensuelles,
            potentiel: analysis.potentielMensuel,
            taux: analysis.tauxCapture,
        })

        // On assigne un Index fictif interne pour la base de données selon le string
        const competitionIndexStr = analysis.concurrence === 'Forte' ? 85 : analysis.concurrence === 'Moyenne' ? 50 : 20

        // Sauvegarder l'analyse en Base de données
        const savedAnalysis = await prisma.marketAnalysis.create({
            data: {
                metier,
                ville,
                keyword: analysis.keyword,

                // Données IA
                searchVolume: analysis.recherchesMensuelles,
                cpc: analysis.cpc,
                competition: analysis.concurrence === 'Forte' ? 'HIGH' : analysis.concurrence === 'Moyenne' ? 'MEDIUM' : 'LOW',
                competitionIndex: competitionIndexStr,
                dataSource: 'gemini_estimation',

                // Calculs
                panierMoyen: analysis.panierMoyen,
                tauxConversion: 0,
                tauxCapture: analysis.tauxCapture,
                potentielMensuel: analysis.potentielMensuel,
                potentielAnnuel: analysis.potentielAnnuel,

                // Analyse texte
                tendance: analysis.tendance,
                analyse: analysis.analyse,
                conseils: '[]',

                leadId: null,
                email: null,
            },
        })

        return NextResponse.json({
            success: true,
            analysis: {
                ...analysis,
                isEstimation: true,
            },
            analysisId: savedAnalysis.id,
        })
    } catch (error) {
        console.error('[Market Analysis API] Error:', error)

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, error: 'Veuillez saisir une activité et une ville valides.' },
                { status: 400 }
            )
        }

        const message = error instanceof Error ? error.message : 'Erreur interne imprévue.'
        return NextResponse.json(
            { success: false, error: message },
            { status: 500 }
        )
    }
}
