import { CaseStudyTemplate, generateCaseStudyMetadata } from '@/components/templates/CaseStudyTemplate'

const caseStudyData = {
    slug: 'plombier-le-mans',
    clientName: 'Plomberie Express 72',
    industry: 'Plombier',
    location: 'Le Mans',
    services: ['Google Ads', 'Landing Page'],
    duration: '3 mois',
    challenge: {
        title: 'Le Défi',
        description: 'Plomberie Express 72 investissait déjà en publicité Google Ads mais avec un coût par lead exorbitant de 45€. Les campagnes étaient mal optimisées et le taux de conversion de la page d\'atterrissage était catastrophique.',
        painPoints: [
            'Coût par lead de 45€ (non rentable)',
            'Taux de conversion de 2% seulement',
            'Budget pub gaspillé sur des mots-clés non pertinents',
            'Landing page non optimisée pour le mobile',
            'Aucun suivi des appels téléphoniques',
        ],
    },
    solution: {
        title: 'Notre Solution',
        description: 'Refonte complète de la stratégie Google Ads avec une landing page haute conversion et un suivi précis des performances.',
        steps: [
            {
                title: 'Audit et restructuration des campagnes',
                description: 'Analyse des campagnes existantes, suppression des mots-clés non performants, création de groupes d\'annonces ciblés par service (dépannage, installation, entretien).',
            },
            {
                title: 'Création d\'une landing page optimisée',
                description: 'Page d\'atterrissage spécifique avec numéro de téléphone cliquable, formulaire simplifié, témoignages et badges de confiance.',
            },
            {
                title: 'Mise en place du call tracking',
                description: 'Suivi des appels téléphoniques pour mesurer précisément le coût par lead réel et optimiser les enchères.',
            },
            {
                title: 'A/B testing continu',
                description: 'Tests réguliers des titres d\'annonces, descriptions et pages de destination pour améliorer les performances.',
            },
        ],
    },
    results: {
        title: 'Les Résultats',
        description: 'En 3 mois, le coût par lead a été divisé par 2 tout en augmentant significativement le volume de leads qualifiés.',
        metrics: [
            { label: 'Réduction coût/lead', value: '52', suffix: '%', prefix: '-' },
            { label: 'Appels par semaine', value: '28' },
            { label: 'CPC moyen', value: '4,20€' },
            { label: 'Taux de conversion', value: '8', suffix: '%' },
        ],
    },
    testimonial: {
        quote: 'Avant, je payais cher pour des leads de mauvaise qualité. Maintenant, chaque lead est un vrai client potentiel qui a besoin de mes services.',
        author: 'Marc D.',
        role: 'Gérant, Plomberie Express 72',
    },
}

export const metadata = generateCaseStudyMetadata(caseStudyData)

export default function PlombierLeMansCaseStudy() {
    return <CaseStudyTemplate data={caseStudyData} />
}
