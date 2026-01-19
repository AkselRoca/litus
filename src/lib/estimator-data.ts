/**
 * Base de données estimateur - Combinaisons Métier × Ville
 * Format: { metier, ville, searchVolume, avgTicket, conversionRate }
 */

export interface EstimatorData {
    metier: string
    ville: string
    searchVolume: number // Recherches Google/mois
    avgTicket: number // Panier moyen €
    conversionRate: number // Taux de conversion %
}

// Data pré-calculée (à enrichir progressivement)
export const estimatorDatabase: EstimatorData[] = [
    // Lorient - 10 métiers
    {
        metier: 'Plombier',
        ville: 'Lorient',
        searchVolume: 880,
        avgTicket: 350,
        conversionRate: 2.5,
    },
    {
        metier: 'Électricien',
        ville: 'Lorient',
        searchVolume: 720,
        avgTicket: 280,
        conversionRate: 2.3,
    },
    {
        metier: 'Coiffeur',
        ville: 'Lorient',
        searchVolume: 1200,
        avgTicket: 45,
        conversionRate: 15,
    },
    {
        metier: 'Architecte',
        ville: 'Lorient',
        searchVolume: 390,
        avgTicket: 8500,
        conversionRate: 1.2,
    },
    {
        metier: 'Avocat',
        ville: 'Lorient',
        searchVolume: 650,
        avgTicket: 1200,
        conversionRate: 1.8,
    },
    {
        metier: 'Menuisier',
        ville: 'Lorient',
        searchVolume: 520,
        avgTicket: 2200,
        conversionRate: 1.8,
    },
    {
        metier: 'Peintre',
        ville: 'Lorient',
        searchVolume: 610,
        avgTicket: 1500,
        conversionRate: 2.2,
    },
    {
        metier: 'Maçon',
        ville: 'Lorient',
        searchVolume: 580,
        avgTicket: 4500,
        conversionRate: 1.5,
    },
    {
        metier: 'Jardinier',
        ville: 'Lorient',
        searchVolume: 890,
        avgTicket: 180,
        conversionRate: 5,
    },
    {
        metier: 'Serrurier',
        ville: 'Lorient',
        searchVolume: 450,
        avgTicket: 250,
        conversionRate: 3.5,
    },

    // Le Mans - 10 métiers
    {
        metier: 'Plombier',
        ville: 'Le Mans',
        searchVolume: 1100,
        avgTicket: 380,
        conversionRate: 2.8,
    },
    {
        metier: 'Électricien',
        ville: 'Le Mans',
        searchVolume: 920,
        avgTicket: 300,
        conversionRate: 2.5,
    },
    {
        metier: 'Coiffeur',
        ville: 'Le Mans',
        searchVolume: 1500,
        avgTicket: 50,
        conversionRate: 16,
    },
    {
        metier: 'Architecte',
        ville: 'Le Mans',
        searchVolume: 480,
        avgTicket: 9000,
        conversionRate: 1.3,
    },
    {
        metier: 'Avocat',
        ville: 'Le Mans',
        searchVolume: 820,
        avgTicket: 1300,
        conversionRate: 2,
    },
    {
        metier: 'Menuisier',
        ville: 'Le Mans',
        searchVolume: 680,
        avgTicket: 2500,
        conversionRate: 1.9,
    },
    {
        metier: 'Peintre',
        ville: 'Le Mans',
        searchVolume: 750,
        avgTicket: 1600,
        conversionRate: 2.4,
    },
    {
        metier: 'Maçon',
        ville: 'Le Mans',
        searchVolume: 720,
        avgTicket: 4800,
        conversionRate: 1.6,
    },
    {
        metier: 'Jardinier',
        ville: 'Le Mans',
        searchVolume: 1050,
        avgTicket: 200,
        conversionRate: 5.5,
    },
    {
        metier: 'Serrurier',
        ville: 'Le Mans',
        searchVolume: 550,
        avgTicket: 280,
        conversionRate: 4,
    },
]

/**
 * Recherche fuzzy métier/ville dans la DB
 */
export function findEstimation(
    metier: string,
    ville: string
): EstimatorData | null {
    const metierLower = metier.toLowerCase().trim()
    const villeLower = ville.toLowerCase().trim()

    // Recherche exacte d'abord
    let match = estimatorDatabase.find(
        item =>
            item.metier.toLowerCase() === metierLower &&
            item.ville.toLowerCase() === villeLower
    )

    // Recherche partielle si pas de match exact
    if (!match) {
        match = estimatorDatabase.find(
            item =>
                item.metier.toLowerCase().includes(metierLower) &&
                item.ville.toLowerCase().includes(villeLower)
        )
    }

    return match || null
}

/**
 * Calcul CA potentiel annuel
 */
export function calculatePotential(data: EstimatorData): number {
    const monthlyRevenue =
        data.searchVolume * (data.conversionRate / 100) * data.avgTicket
    const yearlyRevenue = monthlyRevenue * 12

    return Math.round(yearlyRevenue)
}

/**
 * Liste des métiers disponibles
 */
export const availableMetiers = [
    ...new Set(estimatorDatabase.map(item => item.metier)),
].sort()

/**
 * Liste des villes disponibles
 */
export const availableVilles = [
    ...new Set(estimatorDatabase.map(item => item.ville)),
].sort()
