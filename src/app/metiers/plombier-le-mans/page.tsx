import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const plombierData = {
    name: 'Plombier',
    slug: 'plombier',
    city: 'Le Mans',
    citySlug: 'le-mans',
    description:
        'Dépannages, installations, rénovations... Votre expertise mérite un site web qui convertit les visiteurs en clients.',
    challenges: [
        'Les clients vous trouvent par hasard, pas par votre site web',
        'Vous perdez des interventions urgentes car invisibles en ligne',
        'Votre concurrent avec un bon site récupère tous les leads Google',
        'Impossible de montrer votre professionnalisme avant le 1er contact',
    ],
    solutions: [
        'Site rapide et mobile-first pour les recherches d\'urgence',
        'Bouton "Appel direct" visible pour les dépannages 24h/24',
        'Référencement sur "plombier urgence Le Mans" et variantes',
        'Avis clients Google automatiquement affichés sur votre site',
    ],
    services: [
        {
            name: 'Site Express',
            price: 'dès 1 490€',
            description:
                'Site optimisé mobile avec click-to-call, formulaire urgence, zones d\'intervention. Livré en 2 semaines.',
        },
        {
            name: 'SEO Urgence',
            price: '590€/mois',
            description:
                'Optimisation mots-clés urgence + Google Business. Visibilité immédiate sur recherches locales.',
        },
        {
            name: 'Google Ads',
            price: '290€/mois + budget',
            description:
                'Campagnes ciblées "plombier Le Mans". Leads qualifiés dès demain. ROI transparent.',
        },
    ],
    cta: {
        title: 'Devenez LE plombier référence au Mans',
        subtitle:
            'On vous aide à capter tous les clients qui cherchent un plombier près de chez eux.',
    },
}

export const metadata = generateJobMetadata(plombierData)

export default function PlombierLeMansPage() {
    return <JobPageTemplate job={plombierData} />
}
