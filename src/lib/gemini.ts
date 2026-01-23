/**
 * Service Google Gemini - Génération d'analyses de marché
 * 
 * FORMULE DE CALCUL RÉALISTE:
 * - Volume recherche × Taux clic (30%) × Taux conversion × Taux capture × Panier × 12
 * - Taux capture = Part de marché réaliste qu'un nouvel acteur peut capter (5-15%)
 */

import { KeywordData } from './dataforseo'

export interface MarketAnalysis {
    potentielAnnuel: number
    potentielMensuel: number
    recherchesMensuelles: number
    concurrence: 'Faible' | 'Moyenne' | 'Forte'
    tendance: 'Hausse' | 'Stable' | 'Baisse'
    analyse: string
    conseils: string[]
    panierMoyen: number
    tauxConversion: number
    tauxCapture: number
}

interface GeminiResponse {
    candidates: Array<{
        content: {
            parts: Array<{
                text: string
            }>
        }
    }>
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

// Paniers moyens par métier (en euros)
const PANIERS_MOYENS: Record<string, number> = {
    plombier: 350,
    électricien: 280,
    couvreur: 4500,
    chauffagiste: 800,
    serrurier: 180,
    menuisier: 2200,
    peintre: 1500,
    maçon: 5000,
    jardinier: 200,
    coiffeur: 45,
    avocat: 1200,
    dentiste: 150,
    architecte: 8500,
    carreleur: 1800,
    vitrier: 250,
    climaticien: 1200,
    pisciniste: 15000,
    ostéopathe: 60,
    kinésithérapeute: 50,
}

/**
 * Calcule le potentiel de CA de manière réaliste
 * 
 * Formule:
 * Volume × CTR organique (30%) × Taux conversion × Taux capture marché × Panier × 12
 * 
 * Où:
 * - CTR organique = 30% des recherches cliquent sur un résultat organique local
 * - Taux conversion = % de visiteurs qui deviennent clients (1.5-3.5%)
 * - Taux capture = Part de marché réaliste pour UN acteur (5-15%)
 */
function calculateRealisticPotential(
    searchVolume: number,
    competition: 'LOW' | 'MEDIUM' | 'HIGH',
    panierMoyen: number
): { potentielMensuel: number; potentielAnnuel: number; tauxConversion: number; tauxCapture: number } {

    // CTR organique moyen (combien cliquent sur un résultat local)
    const ctrOrganique = 0.30 // 30%

    // Taux de conversion (visiteurs → clients)
    const tauxConversion = competition === 'HIGH' ? 0.015 : // 1.5%
        competition === 'MEDIUM' ? 0.025 : // 2.5%
            0.035 // 3.5%

    // Taux de capture marché (part qu'UN acteur peut raisonnablement capter)
    // Plus la concurrence est forte, moins on capte
    const tauxCapture = competition === 'HIGH' ? 0.05 : // 5%
        competition === 'MEDIUM' ? 0.10 : // 10%
            0.15 // 15%

    // Calcul
    const visiteursMensuels = searchVolume * ctrOrganique
    const clientsMensuels = visiteursMensuels * tauxConversion * tauxCapture
    const potentielMensuel = Math.round(clientsMensuels * panierMoyen)
    const potentielAnnuel = potentielMensuel * 12

    return { potentielMensuel, potentielAnnuel, tauxConversion, tauxCapture }
}

/**
 * Génère une analyse de marché personnalisée via Gemini
 */
export async function generateMarketAnalysis(
    metier: string,
    ville: string,
    keywordData: KeywordData
): Promise<MarketAnalysis> {
    const apiKey = process.env.GEMINI_API_KEY

    const metierLower = metier.toLowerCase()
    const panierMoyen = PANIERS_MOYENS[metierLower] || 500

    // Calcul réaliste du potentiel
    const { potentielMensuel, potentielAnnuel, tauxConversion, tauxCapture } = calculateRealisticPotential(
        keywordData.searchVolume,
        keywordData.competition,
        panierMoyen
    )

    // Mapping de la concurrence
    const concurrence = keywordData.competition === 'HIGH' ? 'Forte' :
        keywordData.competition === 'MEDIUM' ? 'Moyenne' : 'Faible'

    // Si pas de clé Gemini, retourner une analyse basique
    if (!apiKey) {
        return {
            potentielAnnuel,
            potentielMensuel,
            recherchesMensuelles: keywordData.searchVolume,
            concurrence,
            tendance: 'Stable',
            panierMoyen,
            tauxConversion,
            tauxCapture,
            analyse: `Avec ${keywordData.searchVolume} recherches mensuelles pour "${metier}" à ${ville}, vous pouvez raisonnablement capter ${(tauxCapture * 100).toFixed(0)}% du marché. La concurrence est ${concurrence.toLowerCase()}, ce qui représente une opportunité intéressante.`,
            conseils: [
                'Créez un site web optimisé pour le référencement local',
                'Inscrivez-vous sur Google Business Profile',
                'Collectez des avis clients pour renforcer votre crédibilité',
                'Investissez dans des campagnes Google Ads ciblées',
            ],
        }
    }

    try {
        const prompt = `Tu es un expert en marketing digital pour les entreprises locales en France.
        
Analyse le marché pour un ${metier} situé à ${ville}.

Données de recherche Google:
- Volume de recherche mensuel: ${keywordData.searchVolume} recherches/mois
- Coût par clic moyen: ${keywordData.cpc.toFixed(2)}€
- Niveau de concurrence: ${concurrence}
- Panier moyen du secteur: ${panierMoyen}€
- Potentiel annuel calculé: ${potentielAnnuel.toLocaleString('fr-FR')}€

Génère une réponse JSON avec cette structure exacte (sans markdown, juste le JSON):
{
    "tendance": "Hausse" ou "Stable" ou "Baisse",
    "analyse": "Une analyse de 2-3 phrases sur le potentiel du marché, réaliste et basée sur les données",
    "conseils": ["conseil 1", "conseil 2", "conseil 3", "conseil 4"]
}

IMPORTANT: Sois réaliste dans ton analyse. Le potentiel calculé tient compte qu'un seul acteur ne peut capter qu'une fraction du marché (${(tauxCapture * 100).toFixed(0)}%).
Les conseils doivent être spécifiques au métier de ${metier}.`

        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                },
            }),
        })

        if (!response.ok) {
            console.error('Gemini API error:', response.status)
            throw new Error('Gemini API error')
        }

        const data: GeminiResponse = await response.json()
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (textContent) {
            // Parse la réponse JSON de Gemini
            const cleanJson = textContent.replace(/```json\n?|\n?```/g, '').trim()
            const geminiAnalysis = JSON.parse(cleanJson)

            return {
                potentielAnnuel,
                potentielMensuel,
                recherchesMensuelles: keywordData.searchVolume,
                concurrence,
                tendance: geminiAnalysis.tendance || 'Stable',
                panierMoyen,
                tauxConversion,
                tauxCapture,
                analyse: geminiAnalysis.analyse || `Marché prometteur pour ${metier} à ${ville}.`,
                conseils: geminiAnalysis.conseils || [
                    'Optimisez votre présence en ligne',
                    'Développez votre réputation locale',
                ],
            }
        }

        throw new Error('Invalid Gemini response')
    } catch (error) {
        console.error('Gemini analysis error:', error)

        // Fallback en cas d'erreur
        return {
            potentielAnnuel,
            potentielMensuel,
            recherchesMensuelles: keywordData.searchVolume,
            concurrence,
            tendance: 'Stable',
            panierMoyen,
            tauxConversion,
            tauxCapture,
            analyse: `Le marché pour "${metier}" à ${ville} présente un potentiel réaliste de ${potentielAnnuel.toLocaleString('fr-FR')}€ de chiffre d'affaires annuel. Avec ${keywordData.searchVolume} recherches mensuelles et une concurrence ${concurrence.toLowerCase()}, vous pouvez capter environ ${(tauxCapture * 100).toFixed(0)}% du marché.`,
            conseils: [
                `Créez un site web professionnel optimisé pour "${metier} ${ville}"`,
                'Activez votre fiche Google Business Profile avec photos et avis',
                'Lancez des campagnes Google Ads sur vos mots-clés locaux',
                'Développez votre présence sur les annuaires locaux (Pages Jaunes, etc.)',
            ],
        }
    }
}

export { PANIERS_MOYENS }
