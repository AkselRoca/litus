import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const chauffagisteData = {
    name: 'Chauffagiste',
    slug: 'chauffagiste',
    city: 'Le Mans',
    citySlug: 'le-mans',
    description:
        'Installations, dépannages, entretiens... Hiver comme été, soyez visible quand vos clients cherchent un pro du chauffage.',
    challenges: [
        'Les clients ne vous trouvent pas lors des pannes urgentes',
        'Difficile de valoriser vos certifications RGE et aides d\'État',
        'Vous manquez les remplacements de chaudières (gros CA)',
        'Pas de visibilité sur les contrats d\'entretien annuels',
    ],
    solutions: [
        'Site avec section urgence + section projets (pompe à chaleur, etc.)',
        'Calculateur aides d\'État (MaPrimeRénov\') pour convaincre',
        'SEO sur "chauffagiste" + "pompe à chaleur" + "dépannage urgence"',
        'Formulaire entretien annuel avec rappel automatique',
    ],
    services: [
        {
            name: 'Site Chauffagiste',
            price: 'dès 2 490€',
            description:
                'Site double focus : urgence + projets. Calculateur aides, certifications RGE, formulaires dédiés.',
        },
        {
            name: 'SEO Énergie',
            price: '690€/mois',
            description:
                'Référencement urgence + projets rénovation énergétique. Capter tous les segments de marché.',
        },
        {
            name: 'Pack Réno Énergétique',
            price: 'Sur devis',
            description:
                'Site + SEO + Landing pages aides État. Positionnement expert transition énergétique.',
        },
    ],
    cta: {
        title: 'Chauffez votre génération de leads',
        subtitle:
            'Un site qui convertit les urgences ET les gros projets rénovation.',
    },
}

export const metadata = generateJobMetadata(chauffagisteData)

export default function ChauffagisteLeMansPage() {
    return <JobPageTemplate job={chauffagisteData} />
}
