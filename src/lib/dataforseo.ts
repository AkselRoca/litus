/**
 * Service DataForSEO - Keywords Data API
 * Récupère les volumes de recherche Google réels
 */

export interface KeywordData {
    keyword: string
    searchVolume: number
    cpc: number // Cost per click en USD
    competition: 'LOW' | 'MEDIUM' | 'HIGH'
    competitionIndex: number // 0-100
}

interface DataForSEOResponse {
    tasks: Array<{
        result: Array<{
            keyword: string
            search_volume: number
            cpc: number
            competition: string
            competition_index: number
        }>
    }>
}

const DATAFORSEO_API_URL = 'https://api.dataforseo.com/v3'

/**
 * Récupère les données de mots-clés depuis DataForSEO
 */
export async function getKeywordData(
    keyword: string,
    locationName: string = 'France'
): Promise<KeywordData | null> {
    const login = process.env.DATAFORSEO_LOGIN
    const password = process.env.DATAFORSEO_PASSWORD

    if (!login || !password) {
        console.warn('DataForSEO credentials not configured, using fallback')
        return null
    }

    try {
        const auth = Buffer.from(`${login}:${password}`).toString('base64')

        const response = await fetch(
            `${DATAFORSEO_API_URL}/keywords_data/google_ads/search_volume/live`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Basic ${auth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([
                    {
                        keywords: [keyword],
                        location_name: locationName,
                        language_name: 'French',
                    },
                ]),
            }
        )

        if (!response.ok) {
            console.error('DataForSEO API error:', response.status)
            return null
        }

        const data: DataForSEOResponse = await response.json()

        if (data.tasks?.[0]?.result?.[0]) {
            const result = data.tasks[0].result[0]
            return {
                keyword: result.keyword,
                searchVolume: result.search_volume || 0,
                cpc: result.cpc || 0,
                competition: mapCompetition(result.competition),
                competitionIndex: result.competition_index || 0,
            }
        }

        return null
    } catch (error) {
        console.error('DataForSEO fetch error:', error)
        return null
    }
}

/**
 * Génère une estimation de volume de recherche basée sur des heuristiques
 * Utilisé en fallback si DataForSEO n'est pas configuré
 */
export function estimateSearchVolume(metier: string, ville: string): KeywordData {
    // Estimation basée sur la taille de la ville (heuristique)
    const villePopulations: Record<string, number> = {
        paris: 2200000,
        marseille: 870000,
        lyon: 520000,
        toulouse: 490000,
        nice: 340000,
        nantes: 320000,
        montpellier: 290000,
        strasbourg: 280000,
        bordeaux: 260000,
        lille: 230000,
        rennes: 220000,
        reims: 180000,
        'le havre': 170000,
        'saint-étienne': 170000,
        toulon: 170000,
        grenoble: 160000,
        dijon: 155000,
        angers: 150000,
        nîmes: 150000,
        'le mans': 145000,
        lorient: 57000,
    }

    const villeLower = ville.toLowerCase()
    const population = villePopulations[villeLower] || 50000

    // Formule simplifiée: ~0.5 recherche / 1000 habitants / mois pour services locaux
    const baseVolume = Math.round((population / 1000) * 0.5)

    // Ajustement selon le type de métier (certains métiers sont plus recherchés)
    const metierMultipliers: Record<string, number> = {
        plombier: 1.8,
        électricien: 1.5,
        serrurier: 1.2,
        couvreur: 1.0,
        chauffagiste: 1.1,
        menuisier: 0.9,
        peintre: 1.0,
        maçon: 0.8,
        jardinier: 1.3,
        coiffeur: 2.0,
        avocat: 1.4,
        dentiste: 1.6,
        architecte: 0.7,
    }

    const metierLower = metier.toLowerCase()
    const multiplier = metierMultipliers[metierLower] || 1.0

    const estimatedVolume = Math.round(baseVolume * multiplier)

    // Estimation de la concurrence basée sur la taille de la ville
    let competition: 'LOW' | 'MEDIUM' | 'HIGH'
    if (population > 500000) {
        competition = 'HIGH'
    } else if (population > 100000) {
        competition = 'MEDIUM'
    } else {
        competition = 'LOW'
    }

    return {
        keyword: `${metier} ${ville}`,
        searchVolume: Math.max(estimatedVolume, 10), // Minimum 10
        cpc: competition === 'HIGH' ? 3.5 : competition === 'MEDIUM' ? 2.0 : 1.0,
        competition,
        competitionIndex: competition === 'HIGH' ? 75 : competition === 'MEDIUM' ? 45 : 20,
    }
}

function mapCompetition(competition: string): 'LOW' | 'MEDIUM' | 'HIGH' {
    switch (competition?.toUpperCase()) {
        case 'HIGH':
            return 'HIGH'
        case 'MEDIUM':
            return 'MEDIUM'
        default:
            return 'LOW'
    }
}
