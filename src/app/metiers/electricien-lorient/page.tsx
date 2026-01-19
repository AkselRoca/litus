import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const electricienData = {
    name: 'Électricien',
    slug: 'electricien',
    city: 'Lorient',
    citySlug: 'lorient',
    description:
        'Installations électriques, dépannages, mises aux normes... Votre site doit inspirer confiance dès la première visite.',
    challenges: [
        'Les particuliers vous trouvent via Pages Jaunes (dépassé)',
        'Pas de visibilité sur les gros chantiers de rénovation',
        'Difficile de rassurer sur vos certifications et assurances',
        'Vos concurrents captent les leads avec un site professionnel',
    ],
    solutions: [
        'Site vitrine qui met en avant vos certifications (Qualifelec, RGE)',
        'Galerie de réalisations avant/après pour rassurer',
        'SEO optimisé sur "électricien Lorient" + quartiers',
        'Formulaire devis avec calcul estimation automatique',
    ],
    services: [
        {
            name: 'Site Pro',
            price: 'dès 2 290€',
            description:
                'Site complet avec présentation certifications, galerie projets, formulaire devis. Design rassurant.',
        },
        {
            name: 'SEO Local + Pro',
            price: '690€/mois',
            description:
                'Référencement particuliers ET professionnels. Optimisation Google Business + annuaires métiers.',
        },
        {
            name: 'Pack Visibilité',
            price: 'Sur devis',
            description:
                'Site + SEO + Google Ads. Solution complète pour saturer votre planning rapidement.',
        },
    ],
    cta: {
        title: 'Électrifiez votre présence en ligne',
        subtitle:
            'Un site web qui vous positionne comme l\'électricien de confiance à Lorient.',
    },
}

export const metadata = generateJobMetadata(electricienData)

export default function ElectricienLorientPage() {
    return <JobPageTemplate job={electricienData} />
}
