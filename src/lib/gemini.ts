/**
 * Service Google Gemini - Génération d'analyses de marché
 * 
 * FORMULE DE CALCUL SIMPLE ET RÉALISTE:
 * Volume recherche × Taux de capture (5-15%) × Panier moyen = CA mensuel
 * 
 * EXPLICATION:
 * - "Taux de capture" = % des recherches qui finissent par devenir VOS clients
 * - Inclut implicitement : CTR, taux de conversion, et part de marché
 * - Plus la concurrence est forte, moins on capte
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
 * Calcule le potentiel de CA de manière simple et réaliste
 * 
 * FORMULE SIMPLE:
 * Recherches × Taux capture × Panier = CA mensuel
 * 
 * Le "taux de capture" représente le % des recherches mensuelles
 * qui finissent par devenir TES clients. Il intègre :
 * - Le taux de clic
 * - Le taux de conversion
 * - Ta part de marché face aux concurrents
 * 
 * Valeurs réalistes basées sur l'industrie :
 * - Concurrence forte : 0.5% (beaucoup de concurrents, difficile de se démarquer)
 * - Concurrence moyenne : 1% (position classique)
 * - Concurrence faible : 2% (peu de concurrents, plus facile)
 */
function calculatePotential(
    searchVolume: number,
    competition: 'LOW' | 'MEDIUM' | 'HIGH',
    panierMoyen: number
): { potentielMensuel: number; potentielAnnuel: number; tauxCapture: number } {

    // Taux de capture réaliste (% des recherches qui deviennent TES clients)
    const tauxCapture = competition === 'HIGH' ? 0.005 : // 0.5%
        competition === 'MEDIUM' ? 0.01 : // 1%
            0.02 // 2%

    // Calcul simple
    const clientsMensuels = searchVolume * tauxCapture
    const potentielMensuel = Math.round(clientsMensuels * panierMoyen)
    const potentielAnnuel = potentielMensuel * 12

    return { potentielMensuel, potentielAnnuel, tauxCapture }
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

    // Calcul du potentiel
    const { potentielMensuel, potentielAnnuel, tauxCapture } = calculatePotential(
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
            tauxCapture,
            analyse: `Avec ${keywordData.searchVolume.toLocaleString('fr-FR')} recherches mensuelles pour "${metier}" à ${ville}, vous pouvez raisonnablement capter ${(tauxCapture * 100).toFixed(1)}% du marché. La concurrence est ${concurrence.toLowerCase()}, ce qui représente une opportunité intéressante.`,
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
- Volume de recherche mensuel: ${keywordData.searchVolume} recherches/mois pour "${metier} ${ville}"
- Coût par clic moyen: ${keywordData.cpc.toFixed(2)}€
- Niveau de concurrence: ${concurrence}
- Panier moyen du secteur: ${panierMoyen}€
- Taux de capture estimé: ${(tauxCapture * 100).toFixed(1)}%
- Potentiel mensuel calculé: ${potentielMensuel.toLocaleString('fr-FR')}€
- Potentiel annuel calculé: ${potentielAnnuel.toLocaleString('fr-FR')}€

Génère une réponse JSON avec cette structure exacte (sans markdown, juste le JSON):
{
    "tendance": "Hausse" ou "Stable" ou "Baisse",
    "analyse": "Une analyse de 2-3 phrases sur le potentiel du marché, réaliste et basée sur les données",
    "conseils": ["conseil 1", "conseil 2", "conseil 3", "conseil 4"]
}

IMPORTANT: Sois réaliste. Les conseils doivent être spécifiques au métier de ${metier}.`

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
            tauxCapture,
            analyse: `Le marché pour "${metier}" à ${ville} présente un potentiel de ${potentielAnnuel.toLocaleString('fr-FR')}€ de chiffre d'affaires annuel. Avec ${keywordData.searchVolume.toLocaleString('fr-FR')} recherches mensuelles et une concurrence ${concurrence.toLowerCase()}, vous pouvez capter environ ${(tauxCapture * 100).toFixed(1)}% du marché.`,
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
