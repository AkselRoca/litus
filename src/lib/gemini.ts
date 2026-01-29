/**
 * Service Google Gemini - Génération d'analyses de marché
 * 
 * FORMULE SIMPLE:
 * Recherches × Taux capture × Panier = CA mensuel
 * 
 * Taux de capture réalistes (% des recherches qui deviennent clients):
 * - Concurrence forte: 3%
 * - Concurrence moyenne: 5%  
 * - Concurrence faible: 8%
 */

import { KeywordData } from './dataforseo'

export interface MarketAnalysis {
    potentielAnnuel: number
    potentielMensuel: number
    recherchesMensuelles: number
    concurrence: 'Faible' | 'Moyenne' | 'Forte'
    tendance: 'Hausse' | 'Stable' | 'Baisse'
    analyse: string
    panierMoyen: number
    tauxCapture: number
    cpc: number
    keyword: string
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

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

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
 * Calcule le potentiel de CA
 * 
 * Formule: Recherches × Taux capture × Panier = CA mensuel
 * 
 * Taux de capture = % des recherches mensuelles qui deviennent TES clients
 * Valeurs réalistes pour un acteur local bien positionné:
 * - Forte concurrence: 3% (beaucoup de concurrents)
 * - Moyenne: 5%
 * - Faible: 8% (peu de concurrents)
 */
function calculatePotential(
    searchVolume: number,
    competition: 'LOW' | 'MEDIUM' | 'HIGH',
    panierMoyen: number
): { potentielMensuel: number; potentielAnnuel: number; tauxCapture: number } {

    // Taux de capture réalistes pour un acteur bien positionné
    const tauxCapture = competition === 'HIGH' ? 0.03 : // 3%
        competition === 'MEDIUM' ? 0.05 : // 5%
            0.08 // 8%

    // Calcul simple et direct
    const clientsMensuels = searchVolume * tauxCapture
    const potentielMensuel = Math.round(clientsMensuels * panierMoyen)
    const potentielAnnuel = potentielMensuel * 12

    return { potentielMensuel, potentielAnnuel, tauxCapture }
}

/**
 * Génère une analyse de marché via Gemini
 */
export async function generateMarketAnalysis(
    metier: string,
    ville: string,
    keywordData: KeywordData
): Promise<MarketAnalysis> {
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
        throw new Error('GEMINI_API_KEY non configurée')
    }

    const metierLower = metier.toLowerCase()
    const panierMoyen = PANIERS_MOYENS[metierLower] || 500
    const keyword = `${metier} ${ville}`

    // Calcul du potentiel
    const { potentielMensuel, potentielAnnuel, tauxCapture } = calculatePotential(
        keywordData.searchVolume,
        keywordData.competition,
        panierMoyen
    )

    // Mapping de la concurrence
    const concurrence = keywordData.competition === 'HIGH' ? 'Forte' :
        keywordData.competition === 'MEDIUM' ? 'Moyenne' : 'Faible'

    try {
        const prompt = `Tu es un expert en marketing digital pour les entreprises locales en France.

Analyse le marché pour un ${metier} situé à ${ville}.

Données Google réelles (DataForSEO):
- Mot-clé analysé: "${keyword}"
- Volume de recherche: ${keywordData.searchVolume} recherches/mois
- CPC moyen: ${keywordData.cpc.toFixed(2)}€
- Niveau de concurrence: ${concurrence} (${keywordData.competitionIndex}/100)

Calculs:
- Panier moyen secteur: ${panierMoyen}€
- Taux de capture estimé: ${(tauxCapture * 100).toFixed(0)}%
- Clients potentiels/mois: ${Math.round(keywordData.searchVolume * tauxCapture)}
- Potentiel mensuel: ${potentielMensuel.toLocaleString('fr-FR')}€
- Potentiel annuel: ${potentielAnnuel.toLocaleString('fr-FR')}€

Génère une réponse JSON avec cette structure exacte (sans markdown):
{
    "tendance": "Hausse" ou "Stable" ou "Baisse",
    "analyse": "2-3 phrases d'analyse du marché local, mentionnant le volume de recherche et le potentiel. Sois factuel et basé sur les données."
}

L'analyse doit être factuelle et basée sur les données fournies.`

        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
            }),
        })

        if (!response.ok) {
            // Rate limit ou autre erreur - utiliser fallback local
            console.warn(`Gemini API error: ${response.status} - using local fallback`)
            return generateLocalAnalysis(metier, ville, keywordData, potentielMensuel, potentielAnnuel, concurrence, panierMoyen, tauxCapture)
        }

        const data: GeminiResponse = await response.json()
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (textContent) {
            try {
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
                    cpc: keywordData.cpc,
                    keyword,
                    analyse: geminiAnalysis.analyse,
                }
            } catch {
                // JSON parsing failed, use fallback
                return generateLocalAnalysis(metier, ville, keywordData, potentielMensuel, potentielAnnuel, concurrence, panierMoyen, tauxCapture)
            }
        }

        // No content, use fallback
        return generateLocalAnalysis(metier, ville, keywordData, potentielMensuel, potentielAnnuel, concurrence, panierMoyen, tauxCapture)
    } catch (error) {
        console.error('Gemini analysis error:', error)
        // Always return fallback instead of throwing
        return generateLocalAnalysis(metier, ville, keywordData, potentielMensuel, potentielAnnuel, concurrence, panierMoyen, tauxCapture)
    }
}

/**
 * Génère une analyse locale sans appel API
 */
function generateLocalAnalysis(
    metier: string,
    ville: string,
    keywordData: KeywordData,
    potentielMensuel: number,
    potentielAnnuel: number,
    concurrence: 'Faible' | 'Moyenne' | 'Forte',
    panierMoyen: number,
    tauxCapture: number
): MarketAnalysis {
    const keyword = `${metier} ${ville}`

    // Déterminer la tendance basée sur le volume
    const tendance = keywordData.searchVolume > 500 ? 'Hausse' :
        keywordData.searchVolume > 100 ? 'Stable' : 'Stable'

    // Générer une analyse textuelle basée sur les données
    const volumeText = keywordData.searchVolume > 1000 ? 'très recherché' :
        keywordData.searchVolume > 300 ? 'bien recherché' : 'modérément recherché'

    const concurrenceText = concurrence === 'Forte' ? 'un marché compétitif avec de nombreux acteurs' :
        concurrence === 'Moyenne' ? 'un marché avec une concurrence modérée' :
            'un marché avec peu de concurrents'

    const analyse = `Le marché "${metier}" à ${ville} est ${volumeText} avec environ ${keywordData.searchVolume.toLocaleString('fr-FR')} recherches mensuelles. C'est ${concurrenceText}. Avec un panier moyen de ${panierMoyen}€ et un taux de capture de ${(tauxCapture * 100).toFixed(0)}%, le potentiel de chiffre d'affaires est estimé à ${potentielMensuel.toLocaleString('fr-FR')}€/mois.`

    return {
        potentielAnnuel,
        potentielMensuel,
        recherchesMensuelles: keywordData.searchVolume,
        concurrence,
        tendance,
        panierMoyen,
        tauxCapture,
        cpc: keywordData.cpc,
        keyword,
        analyse,
    }
}

export { PANIERS_MOYENS }
