import {
    calculatePotential,
    findEstimation,
} from '@/lib/estimator-data'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { metier, ville } = body

        // Validation
        if (!metier || !ville) {
            return NextResponse.json(
                { error: 'Métier et ville sont requis' },
                { status: 400 }
            )
        }

        // Recherche dans la DB
        const data = findEstimation(metier, ville)

        if (!data) {
            return NextResponse.json(
                {
                    error: 'Aucune donnée disponible pour cette combinaison',
                    suggestion:
                        'Essayez un métier courant comme Plombier, Électricien, Coiffeur, Architecte ou Avocat.',
                },
                { status: 404 }
            )
        }

        // Calcul du potentiel
        const potentiel = calculatePotential(data)

        // Retour des données
        return NextResponse.json({
            metier: data.metier,
            ville: data.ville,
            potentiel,
            details: {
                searchVolume: data.searchVolume,
                avgTicket: data.avgTicket,
                conversionRate: data.conversionRate,
            },
        })
    } catch (error) {
        console.error('Erreur API estimator:', error)
        return NextResponse.json(
            { error: 'Erreur serveur' },
            { status: 500 }
        )
    }
}
