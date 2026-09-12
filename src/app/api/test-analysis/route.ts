/**
 * Test endpoint pour débugger l'API market-analysis
 * Utilise l'estimation IA Gemini
 */

import { NextResponse } from 'next/server'
import { generateMarketAnalysis } from '@/lib/gemini'
import { isEditor } from '@/lib/editorial/admin'

export async function GET() {
    if (!await isEditor()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const logs: string[] = []

    try {
        // Test avec des données fixes
        const metier = 'Plombier'
        const ville = 'Paris'
        const keyword = `${metier} ${ville}`

        logs.push(`1. Keyword: ${keyword}`)

        // 1. Test Gemini
        logs.push('2. Appel Gemini...')
        let analysis
        try {
            analysis = await generateMarketAnalysis(metier, ville)
            logs.push(`3. Gemini OK: potentiel=${analysis.potentielAnnuel}€`)
        } catch (error) {
            logs.push(`3. Gemini ERREUR: ${error instanceof Error ? error.message : String(error)}`)
            return NextResponse.json({ success: false, logs, step: 'gemini' })
        }

        // 2. Test save to DB
        logs.push('4. Sauvegarde en base...')
        try {
            const { prisma } = await import('@/lib/database_final')

            // Simulation index
            const competitionIndexStr = analysis.concurrence === 'Forte' ? 85 : analysis.concurrence === 'Moyenne' ? 50 : 20

            const savedAnalysis = await prisma.marketAnalysis.create({
                data: {
                    metier,
                    ville,
                    keyword: analysis.keyword,
                    searchVolume: analysis.recherchesMensuelles,
                    cpc: analysis.cpc,
                    competition: analysis.concurrence === 'Forte' ? 'HIGH' : analysis.concurrence === 'Moyenne' ? 'MEDIUM' : 'LOW',
                    competitionIndex: competitionIndexStr,
                    dataSource: 'gemini_test',
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
            logs.push(`5. Sauvegarde OK: id=${savedAnalysis.id}`)
        } catch (error) {
            logs.push(`5. Sauvegarde ERREUR: ${error instanceof Error ? error.message : String(error)}`)
            return NextResponse.json({ success: false, logs, step: 'database' })
        }

        return NextResponse.json({
            success: true,
            logs,
            analysis: {
                potentielAnnuel: analysis.potentielAnnuel,
                potentielMensuel: analysis.potentielMensuel,
                searchVolume: analysis.recherchesMensuelles,
            }
        })

    } catch (error) {
        logs.push(`ERREUR GLOBALE: ${error instanceof Error ? error.message : String(error)}`)
        return NextResponse.json({ success: false, logs, step: 'unknown' })
    }
}
