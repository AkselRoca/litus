/**
 * Debug endpoint pour vérifier la configuration
 */

import { NextResponse } from 'next/server'

export async function GET() {
    const checks: Record<string, string> = {}

    // 1. Vérifier DataForSEO
    const dfLogin = process.env.DATAFORSEO_LOGIN
    const dfPassword = process.env.DATAFORSEO_PASSWORD
    checks['DATAFORSEO_LOGIN'] = dfLogin ? `✅ Configuré (${dfLogin.substring(0, 5)}...)` : '❌ Non configuré'
    checks['DATAFORSEO_PASSWORD'] = dfPassword ? '✅ Configuré' : '❌ Non configuré'

    // 2. Vérifier Gemini
    const geminiKey = process.env.GEMINI_API_KEY
    checks['GEMINI_API_KEY'] = geminiKey ? `✅ Configuré (${geminiKey.substring(0, 10)}...)` : '❌ Non configuré'

    // 3. Vérifier Turso
    const tursoUrl = process.env.TURSO_DATABASE_URL
    const tursoAuth = process.env.TURSO_AUTH_TOKEN
    checks['TURSO_DATABASE_URL'] = tursoUrl ? '✅ Configuré' : '❌ Non configuré'
    checks['TURSO_AUTH_TOKEN'] = tursoAuth ? '✅ Configuré' : '❌ Non configuré'

    // 4. Tester la connexion à la base
    try {
        const { prisma } = await import('@/lib/database_final')
        const count = await prisma.lead.count()
        checks['DATABASE_CONNECTION'] = `✅ Connecté (${count} leads)`
    } catch (error) {
        checks['DATABASE_CONNECTION'] = `❌ Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`
    }

    // 5. Tester la table MarketAnalysis
    try {
        const { prisma } = await import('@/lib/database_final')
        const count = await prisma.marketAnalysis.count()
        checks['MARKET_ANALYSIS_TABLE'] = `✅ Existe (${count} analyses)`
    } catch (error) {
        checks['MARKET_ANALYSIS_TABLE'] = `❌ Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`
    }

    // 6. Tester DataForSEO API
    if (dfLogin && dfPassword) {
        try {
            const auth = Buffer.from(`${dfLogin}:${dfPassword}`).toString('base64')
            const response = await fetch(
                'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Basic ${auth}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify([{
                        keywords: ['test'],
                        location_name: 'France',
                        language_name: 'French',
                    }]),
                }
            )
            if (response.ok) {
                checks['DATAFORSEO_API'] = '✅ API accessible'
            } else {
                checks['DATAFORSEO_API'] = `❌ API erreur: ${response.status}`
            }
        } catch (error) {
            checks['DATAFORSEO_API'] = `❌ Erreur: ${error instanceof Error ? error.message : 'Inconnue'}`
        }
    } else {
        checks['DATAFORSEO_API'] = '⏭️ Non testé (credentials manquants)'
    }

    return NextResponse.json({
        timestamp: new Date().toISOString(),
        checks,
    })
}
