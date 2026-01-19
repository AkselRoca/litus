import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const peintreData = {
    name: 'Peintre',
    slug: 'peintre',
    city: 'Lorient',
    citySlug: 'lorient',
    description:
        'Intérieur, extérieur, déco... Vos finitions sont impeccables. Votre site web devrait l\'être aussi pour attirer les clients exigeants.',
    challenges: [
        'Impossible de montrer la qualité de vos finitions sans photos pro',
        'Les clients ne voient pas votre palette de services (déco, ravalement...)',
        'Vous êtes noyé parmi les peintres bas de gamme sur Google',
        'Pas de différenciation avec vos concurrents "low cost"',
    ],
    solutions: [
        'Galerie avant/après qui prouve votre expertise finitions',
        'Page dédiée peinture décorative pour clients haut de gamme',
        'SEO ciblé "peintre professionnel" + "peinture décorative"',
        'Simulateur couleurs interactif pour engager les visiteurs',
    ],
    services: [
        {
            name: 'Site Artisan Peintre',
            price: 'dès 1 990€',
            description:
                'Site avec galerie réalisations, services détaillés, nuancier, formulaire devis. Design coloré et moderne.',
        },
        {
            name: 'SEO Qualité',
            price: '490€/mois',
            description:
                'Référencement positionné "qualité premium". Attirer les clients qui paient le juste prix.',
        },
        {
            name: 'Pack Déco',
            price: 'Sur devis',
            description:
                'Site + Blog tendances + SEO. Positionnement expert conseil en couleurs et déco.',
        },
    ],
    cta: {
        title: 'Donnez des couleurs à votre business',
        subtitle:
            'Un site qui attire les clients qui apprécient le travail bien fait.',
    },
}

export const metadata = generateJobMetadata(peintreData)

export default function PeintreLorientPage() {
    return <JobPageTemplate job={peintreData} />
}
