/**
 * Test endpoint pour débugger l'API market-analysis
 * Utilise l'estimation intelligente (gratuit)
 */

import { NextResponse } from 'next/server'
import { getEstimatedKeywordData } from '@/lib/estimation'
import { generateMarketAnalysis } from '@/lib/gemini'

export async function GET() {
    const logs: string[] = []

    try {
        // Test avec des données fixes
        const metier = 'Plombier'
        const ville = 'Paris'
        const keyword = `${metier} ${ville}`

        logs.push(`1. Keyword: ${keyword}`)

        // 1. Test Estimation intelligente
        logs.push('2. Estimation intelligente...')
        let keywordData
        try {
            keywordData = getEstimatedKeywordData(metier, ville)
            logs.push(`3. Estimation OK: ${JSON.stringify(keywordData)}`)
        } catch (error) {
            logs.push(`3. Estimation ERREUR: ${error instanceof Error ? error.message : String(error)}`)
            return NextResponse.json({ success: false, logs, step: 'estimation' })
        }

        // 2. Test Gemini
        logs.push('4. Appel Gemini...')
        let analysis
        try {
            analysis = await generateMarketAnalysis(metier, ville, keywordData)
            logs.push(`5. Gemini OK: potentiel=${analysis.potentielAnnuel}€`)
        } catch (error) {
            logs.push(`5. Gemini ERREUR: ${error instanceof Error ? error.message : String(error)}`)
            return NextResponse.json({ success: false, logs, step: 'gemini' })
        }

        // 3. Test save to DB
        logs.push('6. Sauvegarde en base...')
        try {
            const { prisma } = await import('@/lib/database_final')

            const savedAnalysis = await prisma.marketAnalysis.create({
                data: {
                    metier,
                    ville,
                    keyword: keywordData.keyword,
                    searchVolume: keywordData.searchVolume,
                    cpc: keywordData.cpc,
                    competition: keywordData.competition,
                    competitionIndex: keywordData.competitionIndex,
                    dataSource: 'estimation',
                    panierMoyen: analysis.panierMoyen,
                    tauxConversion: 0,
                    tauxCapture: analysis.tauxCapture,
                    potentielMensuel: analysis.potentielMensuel,
                    potentielAnnuel: analysis.potentielAnnuel,
                    tendance: analysis.tendance,
                    analyse: analysis.analyse,
                    conseils: '[]',
                    leadId: null,
                    email: null,
                },
            })
            logs.push(`7. Sauvegarde OK: id=${savedAnalysis.id}`)
        } catch (error) {
            logs.push(`7. Sauvegarde ERREUR: ${error instanceof Error ? error.message : String(error)}`)
            return NextResponse.json({ success: false, logs, step: 'database' })
        }

        return NextResponse.json({
            success: true,
            logs,
            analysis: {
                potentielAnnuel: analysis.potentielAnnuel,
                potentielMensuel: analysis.potentielMensuel,
                searchVolume: keywordData.searchVolume,
            }
        })

    } catch (error) {
        logs.push(`ERREUR GLOBALE: ${error instanceof Error ? error.message : String(error)}`)
        return NextResponse.json({ success: false, logs, step: 'unknown' })
    }
}
