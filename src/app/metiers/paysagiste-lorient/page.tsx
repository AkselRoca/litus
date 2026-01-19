import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const paysagisteData = {
    name: 'Paysagiste',
    slug: 'paysagiste',
    city: 'Lorient',
    citySlug: 'lorient',
    description:
        'Vous créez des jardins magnifiques, mais votre site web ne reflète pas votre savoir-faire ? On change ça dès aujourd\'hui.',
    challenges: [
        'Votre site actuel est vieillot et ne met pas en valeur vos réalisations',
        'Vous n\'apparaissez pas quand on cherche "paysagiste Lorient" sur Google',
        'Vos concurrents récupèrent les clients grâce à leur présence en ligne',
        'Vous passez trop de temps à répondre aux mêmes questions par téléphone',
    ],
    solutions: [
        'Un site moderne avec galerie photo qui sublime vos créations',
        'Référencement local optimisé pour être #1 sur "paysagiste + ville"',
        'Google Business Profile optimisé pour capter les recherches locales',
        'Formulaire intelligent qui qualifie vos prospects automatiquement',
    ],
    services: [
        {
            name: 'Site Vitrine Pro',
            price: 'dès 1 990€',
            description:
                'Site responsive avec galerie photos HD, présentation services, formulaire de devis. Livré en 3 semaines.',
        },
        {
            name: 'SEO Local',
            price: '490€/mois',
            description:
                'Optimisation Google Business + mots-clés locaux. Résultats visibles en 3-6 mois. Sans engagement.',
        },
        {
            name: 'Pack Complet',
            price: 'Sur devis',
            description:
                'Site + SEO + Google Ads. Solution clé en main pour dominer votre marché local rapidement.',
        },
    ],
    cta: {
        title: 'Prêt à attirer plus de clients ?',
        subtitle:
            'Discutons de votre projet. Devis gratuit sous 24h, sans engagement.',
    },
}

export const metadata = generateJobMetadata(paysagisteData)

export default function PaysagisteLorientPage() {
    return <JobPageTemplate job={paysagisteData} />
}
