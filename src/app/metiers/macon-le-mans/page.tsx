import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const maconData = {
    name: 'Maçon',
    slug: 'macon',
    city: 'Le Mans',
    citySlug: 'le-mans',
    description:
        'Constructions neuves, extensions, rénovations... Vos fondations sont solides, votre présence web aussi devrait l\'être.',
    challenges: [
        'Les gros chantiers passent par des appels d\'offres que vous ne voyez pas',
        'Vos réalisations impressionnantes restent invisibles en ligne',
        'Les promoteurs et architectes ne connaissent pas votre entreprise',
        'Difficile de montrer votre expertise sur différents types de maçonnerie',
    ],
    solutions: [
        'Portfolio structuré : neuf, rénovation, extension, gros œuvre',
        'Page dédiée professionnels (architectes, promoteurs, entreprises)',
        'SEO B2B sur "maçon Le Mans" + "entreprise maçonnerie"',
        'Formulaire projet détaillé pour qualifier les gros chantiers',
    ],
    services: [
        {
            name: 'Site Pro',
            price: 'dès 2 690€',
            description:
                'Site B2B/B2C avec portfolio projets, équipe, matériel, certifications. Design robuste et pro.',
        },
        {
            name: 'SEO BTP',
            price: '790€/mois',
            description:
                'Référencement particuliers ET professionnels. Visibilité sur marchés publics et privés.',
        },
        {
            name: 'Pack Entreprise',
            price: 'Sur devis',
            description:
                'Site + SEO + Espace projet client. Solution complète pour structurer votre croissance.',
        },
    ],
    cta: {
        title: 'Bâtissez votre réputation en ligne',
        subtitle:
            'Un site qui attire les gros chantiers et fidélise vos partenaires pros.',
    },
}

export const metadata = generateJobMetadata(maconData)

export default function MaconLeMansPage() {
    return <JobPageTemplate job={maconData} />
}
