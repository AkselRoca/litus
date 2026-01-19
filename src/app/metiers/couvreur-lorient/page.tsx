import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const couvreurData = {
    name: 'Couvreur',
    slug: 'couvreur',
    city: 'Lorient',
    citySlug: 'lorient',
    description:
        'Rénovation, étanchéité, zinguerie... Les clients cherchent un couvreur de confiance. Soyez celui qu\'ils trouvent en premier.',
    challenges: [
        'Les particuliers ont peur des arnaques et cherchent LA bonne entreprise',
        'Vos assurances et garanties décennales ne sont pas visibles en ligne',
        'Vous manquez les gros chantiers de copropriétés',
        'Votre zone d\'intervention n\'est pas claire pour les prospects',
    ],
    solutions: [
        'Site qui rassure : certifications, assurances, garanties mises en avant',
        'Carte interactive de votre zone d\'intervention (30km autour)',
        'Témoignages clients et photos avant/après pour convaincre',
        'SEO local sur "couvreur + ville" pour capter toute votre zone',
    ],
    services: [
        {
            name: 'Site Confiance',
            price: 'dès 2 290€',
            description:
                'Site avec présentation garanties, galerie réalisations, zone intervention, formulaire devis détaillé.',
        },
        {
            name: 'SEO Zone Étendue',
            price: '690€/mois',
            description:
                'Référencement multi-villes dans rayon 30km. Optimisation Google Business + annuaires pros.',
        },
        {
            name: 'Pack Notoriété',
            price: 'Sur devis',
            description:
                'Site + SEO + Avis clients automatisés. Devenez LE couvreur référence dans votre zone.',
        },
    ],
    cta: {
        title: 'Couvrez votre zone de prospects qualifiés',
        subtitle:
            'Un site qui inspire confiance et convertit les visiteurs en chantiers.',
    },
}

export const metadata = generateJobMetadata(couvreurData)

export default function CouvreurLorientPage() {
    return <JobPageTemplate job={couvreurData} />
}
