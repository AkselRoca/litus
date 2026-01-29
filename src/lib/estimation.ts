/**
 * Service d'estimation intelligente des volumes de recherche
 * 
 * Alternative gratuite à DataForSEO basée sur :
 * - Population des villes françaises
 * - Ratios de recherche par métier (recherches / 10 000 habitants / mois)
 * - Données de concurrence estimées par saturation du marché
 */

// Populations des principales villes françaises (données INSEE 2023)
const POPULATIONS: Record<string, number> = {
    // Grandes métropoles
    'paris': 2148000,
    'marseille': 873076,
    'lyon': 522250,
    'toulouse': 498003,
    'nice': 342669,
    'nantes': 320732,
    'montpellier': 299096,
    'strasbourg': 290576,
    'bordeaux': 260958,
    'lille': 236234,
    'rennes': 222485,
    'reims': 182460,
    'saint-étienne': 172565,
    'toulon': 171953,
    'le havre': 169733,
    'grenoble': 158454,
    'dijon': 159346,
    'angers': 155786,
    'nîmes': 150610,
    'villeurbanne': 154781,
    'clermont-ferrand': 147284,
    'le mans': 143813,
    'aix-en-provence': 147122,
    'brest': 140064,
    'tours': 136463,
    'amiens': 134706,
    'limoges': 130592,
    'annecy': 130199,
    'perpignan': 119188,
    'boulogne-billancourt': 121334,
    'metz': 119962,
    'besançon': 118638,
    'orléans': 116685,
    'rouen': 114007,
    'mulhouse': 108999,
    'caen': 105512,
    'nancy': 104885,
    'argenteuil': 113748,
    'saint-denis': 113088,
    'montreuil': 111454,
    'avignon': 94787,
    'dunkerque': 86287,
    'poitiers': 89212,
    'la rochelle': 79879,
    'pau': 77215,
    'calais': 72589,
    'lorient': 57149,
    'vannes': 54020,
    'quimper': 63929,
    'valence': 65296,
    'chambéry': 60592,
    'troyes': 60924,
    'colmar': 70284,
    'saint-nazaire': 72526,
    'ajaccio': 73822,
    'bastia': 48332,
    'béziers': 79412,
    'cannes': 73868,
    'antibes': 72999,

    // Villes moyennes (région Bretagne pour l'exemple)
    'saint-brieuc': 45999,
    'lannion': 20020,
    'morlaix': 15217,
    'concarneau': 19318,
    'douarnenez': 14494,
    'fougères': 20877,
    'vitré': 18952,
    'dinan': 11073,
    'guingamp': 7029,
    'pontivy': 14730,
    'auray': 14518,
    'ploërmel': 9849,
    'loudéac': 9661,
    'lamballe': 13856,
    'paimpol': 7211,
    'perros-guirec': 7165,
    'ploufragan': 12050,
    'ploemeur': 18336,
    'lanester': 22714,
    'hennebont': 16121,
    'guidel': 11305,
    'plougastel-daoulas': 13545,
    'landerneau': 15776,
    'saint-pol-de-léon': 6639,
    'roscoff': 3278,
    'crozon': 7562,
    'châteaulin': 5273,
    'carhaix-plouguer': 7190,
    'pont-l-abbé': 8495,
    'fouesnant': 9846,
    'ergué-gabéric': 9245,
    'pluguffan': 4371,
    'plonéour-lanvern': 6458,
    'penmarch': 5391,
    'loctudy': 4067,
    'combrit': 3878,
    'bénodet': 3584,
    'trégunc': 7386,
    'rosporden': 7650,
    'scaër': 5178,
    'bannalec': 5714,
    'mellac': 3043,
    'quimperlé': 12375,
    'moëlan-sur-mer': 7157,
    'clohars-carnoët': 4200,
}

// Ratios de recherche par métier (recherches mensuelles pour 10 000 habitants)
// Basé sur des moyennes nationales observables
const RATIOS_METIER: Record<string, { ratio: number; panierMoyen: number; cpcEstime: number }> = {
    // Artisans BTP
    'plombier': { ratio: 45, panierMoyen: 350, cpcEstime: 8.50 },
    'electricien': { ratio: 38, panierMoyen: 280, cpcEstime: 6.20 },
    'électricien': { ratio: 38, panierMoyen: 280, cpcEstime: 6.20 },
    'couvreur': { ratio: 25, panierMoyen: 4500, cpcEstime: 12.00 },
    'chauffagiste': { ratio: 22, panierMoyen: 800, cpcEstime: 9.50 },
    'serrurier': { ratio: 55, panierMoyen: 180, cpcEstime: 15.00 },
    'menuisier': { ratio: 18, panierMoyen: 2200, cpcEstime: 5.80 },
    'peintre': { ratio: 28, panierMoyen: 1500, cpcEstime: 4.50 },
    'maçon': { ratio: 15, panierMoyen: 5000, cpcEstime: 7.20 },
    'carreleur': { ratio: 14, panierMoyen: 1800, cpcEstime: 5.00 },
    'vitrier': { ratio: 12, panierMoyen: 250, cpcEstime: 8.00 },
    'climaticien': { ratio: 20, panierMoyen: 1200, cpcEstime: 7.50 },
    'pisciniste': { ratio: 8, panierMoyen: 15000, cpcEstime: 6.00 },
    'charpentier': { ratio: 10, panierMoyen: 3500, cpcEstime: 5.50 },
    'façadier': { ratio: 8, panierMoyen: 4000, cpcEstime: 6.80 },
    'terrassier': { ratio: 6, panierMoyen: 2500, cpcEstime: 4.20 },

    // Jardin & Extérieur
    'jardinier': { ratio: 35, panierMoyen: 200, cpcEstime: 3.50 },
    'paysagiste': { ratio: 25, panierMoyen: 1500, cpcEstime: 4.80 },
    'elagueur': { ratio: 15, panierMoyen: 400, cpcEstime: 5.20 },
    'élageur': { ratio: 15, panierMoyen: 400, cpcEstime: 5.20 },

    // Bien-être & Santé
    'coiffeur': { ratio: 85, panierMoyen: 45, cpcEstime: 2.50 },
    'coiffeuse': { ratio: 85, panierMoyen: 45, cpcEstime: 2.50 },
    'ostéopathe': { ratio: 40, panierMoyen: 60, cpcEstime: 3.80 },
    'osteopathe': { ratio: 40, panierMoyen: 60, cpcEstime: 3.80 },
    'kinésithérapeute': { ratio: 35, panierMoyen: 50, cpcEstime: 2.80 },
    'kine': { ratio: 35, panierMoyen: 50, cpcEstime: 2.80 },
    'kiné': { ratio: 35, panierMoyen: 50, cpcEstime: 2.80 },
    'dentiste': { ratio: 65, panierMoyen: 150, cpcEstime: 5.50 },
    'psychologue': { ratio: 45, panierMoyen: 70, cpcEstime: 4.20 },
    'esthéticienne': { ratio: 55, panierMoyen: 80, cpcEstime: 3.00 },
    'estheticienne': { ratio: 55, panierMoyen: 80, cpcEstime: 3.00 },
    'masseur': { ratio: 30, panierMoyen: 65, cpcEstime: 3.50 },
    'spa': { ratio: 25, panierMoyen: 120, cpcEstime: 4.00 },

    // Professions libérales
    'avocat': { ratio: 50, panierMoyen: 1200, cpcEstime: 12.00 },
    'notaire': { ratio: 30, panierMoyen: 800, cpcEstime: 8.00 },
    'architecte': { ratio: 25, panierMoyen: 8500, cpcEstime: 7.50 },
    'comptable': { ratio: 40, panierMoyen: 500, cpcEstime: 9.00 },
    'expert-comptable': { ratio: 35, panierMoyen: 800, cpcEstime: 11.00 },

    // Automobile
    'garagiste': { ratio: 48, panierMoyen: 450, cpcEstime: 4.80 },
    'carrossier': { ratio: 22, panierMoyen: 800, cpcEstime: 5.50 },
    'mecanicien': { ratio: 42, panierMoyen: 350, cpcEstime: 4.20 },
    'mécanicien': { ratio: 42, panierMoyen: 350, cpcEstime: 4.20 },

    // Restauration
    'restaurant': { ratio: 120, panierMoyen: 35, cpcEstime: 2.00 },
    'pizzeria': { ratio: 65, panierMoyen: 25, cpcEstime: 1.80 },
    'traiteur': { ratio: 28, panierMoyen: 400, cpcEstime: 3.50 },
    'boulangerie': { ratio: 75, panierMoyen: 15, cpcEstime: 1.50 },
    'boulanger': { ratio: 75, panierMoyen: 15, cpcEstime: 1.50 },

    // Autres services
    'photographe': { ratio: 35, panierMoyen: 350, cpcEstime: 3.80 },
    'wedding planner': { ratio: 12, panierMoyen: 2500, cpcEstime: 4.50 },
    'coach sportif': { ratio: 28, panierMoyen: 50, cpcEstime: 3.20 },
    'déménageur': { ratio: 38, panierMoyen: 800, cpcEstime: 6.50 },
    'demenageur': { ratio: 38, panierMoyen: 800, cpcEstime: 6.50 },
    'pressing': { ratio: 20, panierMoyen: 25, cpcEstime: 2.00 },
    'fleuriste': { ratio: 45, panierMoyen: 50, cpcEstime: 2.50 },
    'imprimeur': { ratio: 18, panierMoyen: 200, cpcEstime: 4.00 },
    'agence immobilière': { ratio: 85, panierMoyen: 5000, cpcEstime: 8.50 },
    'agence immobiliere': { ratio: 85, panierMoyen: 5000, cpcEstime: 8.50 },
    'immobilier': { ratio: 85, panierMoyen: 5000, cpcEstime: 8.50 },
}

// Valeurs par défaut pour métiers inconnus
const DEFAULT_RATIO = { ratio: 25, panierMoyen: 500, cpcEstime: 5.00 }

export interface EstimationData {
    keyword: string
    searchVolume: number
    cpc: number
    competition: 'LOW' | 'MEDIUM' | 'HIGH'
    competitionIndex: number
    isEstimation: true
    populationUsed: number
}

/**
 * Normalise le nom d'une ville pour la recherche
 */
function normalizeCity(city: string): string {
    return city
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/['-]/g, ' ')
        .trim()
}

/**
 * Trouve la population d'une ville
 * Si la ville exacte n'est pas trouvée, estime basé sur une population moyenne
 */
function getCityPopulation(city: string): number {
    const normalized = normalizeCity(city)

    // Recherche exacte
    if (POPULATIONS[normalized]) {
        return POPULATIONS[normalized]
    }

    // Recherche partielle
    for (const [key, pop] of Object.entries(POPULATIONS)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return pop
        }
    }

    // Estimation pour petites villes non répertoriées
    // Moyenne française des communes : ~1 800 habitants
    // Mais si quelqu'un cherche, c'est probablement une ville de 5-10k
    return 8000
}

/**
 * Trouve les données du métier
 */
function getMetierData(metier: string): { ratio: number; panierMoyen: number; cpcEstime: number } {
    const normalized = metier.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Recherche exacte
    if (RATIOS_METIER[normalized]) {
        return RATIOS_METIER[normalized]
    }

    // Recherche partielle
    for (const [key, data] of Object.entries(RATIOS_METIER)) {
        if (normalized.includes(key) || key.includes(normalized)) {
            return data
        }
    }

    return DEFAULT_RATIO
}

/**
 * Estime le niveau de concurrence basé sur la taille de la ville
 */
function estimateCompetition(population: number): { level: 'LOW' | 'MEDIUM' | 'HIGH'; index: number } {
    if (population > 200000) {
        return { level: 'HIGH', index: 75 + Math.floor(Math.random() * 15) }
    } else if (population > 50000) {
        return { level: 'MEDIUM', index: 45 + Math.floor(Math.random() * 20) }
    } else {
        return { level: 'LOW', index: 15 + Math.floor(Math.random() * 25) }
    }
}

/**
 * Génère une estimation de volume de recherche
 */
export function getEstimatedKeywordData(metier: string, ville: string): EstimationData {
    const population = getCityPopulation(ville)
    const metierData = getMetierData(metier)
    const competition = estimateCompetition(population)

    // Calcul du volume : (population / 10000) × ratio
    // Avec un minimum de 50 recherches/mois pour les petites villes
    const rawVolume = Math.round((population / 10000) * metierData.ratio)
    const searchVolume = Math.max(50, rawVolume)

    // Arrondir à des valeurs "propres" (comme DataForSEO le ferait)
    const roundedVolume = searchVolume < 100 ? Math.round(searchVolume / 10) * 10
        : searchVolume < 1000 ? Math.round(searchVolume / 50) * 50
            : Math.round(searchVolume / 100) * 100

    // Ajuster le CPC légèrement en fonction de la concurrence
    const cpcMultiplier = competition.level === 'HIGH' ? 1.3 : competition.level === 'MEDIUM' ? 1.0 : 0.8
    const adjustedCpc = Math.round(metierData.cpcEstime * cpcMultiplier * 100) / 100

    return {
        keyword: `${metier} ${ville}`,
        searchVolume: Math.max(50, roundedVolume),
        cpc: adjustedCpc,
        competition: competition.level,
        competitionIndex: competition.index,
        isEstimation: true,
        populationUsed: population,
    }
}
