/**
 * Service Google Gemini - Génération d'analyses de marché
 */

import { KeywordData } from './dataforseo'

export interface MarketAnalysis {
    potentielAnnuel: number
    recherchesMensuelles: number
    concurrence: 'Faible' | 'Moyenne' | 'Forte'
    tendance: 'Hausse' | 'Stable' | 'Baisse'
    analyse: string
    conseils: string[]
    panierMoyen: number
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

/**
 * Génère une analyse de marché personnalisée via Gemini
 */
export async function generateMarketAnalysis(
    metier: string,
    ville: string,
    keywordData: KeywordData
): Promise<MarketAnalysis> {
    const apiKey = process.env.GEMINI_API_KEY

    // Estimation du panier moyen par métier
    const paniersMoyens: Record<string, number> = {
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
    }

    const metierLower = metier.toLowerCase()
    const panierMoyen = paniersMoyens[metierLower] || 500

    // Calcul du potentiel annuel
    // Formule: Volume × Taux de conversion estimé × Panier moyen × 12 mois
    const tauxConversion = keywordData.competition === 'HIGH' ? 0.015 :
        keywordData.competition === 'MEDIUM' ? 0.025 : 0.035

    const potentielAnnuel = Math.round(
        keywordData.searchVolume * tauxConversion * panierMoyen * 12
    )

    // Mapping de la concurrence
    const concurrence = keywordData.competition === 'HIGH' ? 'Forte' :
        keywordData.competition === 'MEDIUM' ? 'Moyenne' : 'Faible'

    // Si pas de clé Gemini, retourner une analyse basique
    if (!apiKey) {
        return {
            potentielAnnuel,
            recherchesMensuelles: keywordData.searchVolume,
            concurrence,
            tendance: 'Stable',
            panierMoyen,
            analyse: `Avec ${keywordData.searchVolume} recherches mensuelles pour "${metier}" à ${ville}, vous avez un potentiel de marché significatif. La concurrence est ${concurrence.toLowerCase()}, ce qui représente une opportunité intéressante.`,
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
- Panier moyen estimé: ${panierMoyen}€

Génère une réponse JSON avec cette structure exacte (sans markdown, juste le JSON):
{
    "tendance": "Hausse" ou "Stable" ou "Baisse",
    "analyse": "Une analyse de 2-3 phrases sur le potentiel du marché",
    "conseils": ["conseil 1", "conseil 2", "conseil 3", "conseil 4"]
}

Sois concis, professionnel et orienté action. Les conseils doivent être spécifiques au métier de ${metier}.`

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
                recherchesMensuelles: keywordData.searchVolume,
                concurrence,
                tendance: geminiAnalysis.tendance || 'Stable',
                panierMoyen,
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
            recherchesMensuelles: keywordData.searchVolume,
            concurrence,
            tendance: 'Stable',
            panierMoyen,
            analyse: `Le marché pour "${metier}" à ${ville} présente un potentiel de ${potentielAnnuel.toLocaleString('fr-FR')}€ de chiffre d'affaires annuel. Avec ${keywordData.searchVolume} recherches mensuelles et une concurrence ${concurrence.toLowerCase()}, c'est une opportunité à saisir.`,
            conseils: [
                `Créez un site web professionnel optimisé pour "${metier} ${ville}"`,
                'Activez votre fiche Google Business Profile avec photos et avis',
                'Lancez des campagnes Google Ads sur vos mots-clés locaux',
                'Développez votre présence sur les annuaires locaux (Pages Jaunes, etc.)',
            ],
        }
    }
}
