/**
 * Service DataForSEO - Keywords Data API
 * Récupère les volumes de recherche Google réels
 * 
 * ATTENTION: Ce service est OBLIGATOIRE pour l'analyse de marché.
 * Pas de fallback - les vraies données sont requises.
 */

export interface KeywordData {
    keyword: string
    searchVolume: number
    cpc: number // Cost per click en EUR
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
 * 
 * @throws Error si les credentials ne sont pas configurés ou si l'API échoue
 */
export async function getKeywordData(
    keyword: string,
    locationName: string = 'France'
): Promise<KeywordData> {
    const login = process.env.DATAFORSEO_LOGIN
    const password = process.env.DATAFORSEO_PASSWORD

    if (!login || !password) {
        throw new Error('DataForSEO n\'est pas configuré. Ajoutez DATAFORSEO_LOGIN et DATAFORSEO_PASSWORD.')
    }

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
        throw new Error(`DataForSEO API error: ${response.status}`)
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

    throw new Error(`Aucune donnée trouvée pour "${keyword}"`)
}

function mapCompetition(competition: string): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (competition === 'HIGH') return 'HIGH'
    if (competition === 'MEDIUM') return 'MEDIUM'
    return 'LOW'
}
