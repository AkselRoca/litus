import { JobPageTemplate, generateJobMetadata } from '@/components/templates/JobPageTemplate'

const serrurierData = {
    name: 'Serrurier',
    slug: 'serrurier',
    city: 'Le Mans',
    citySlug: 'le-mans',
    description:
        'Dépannages urgents, blindages, contrôle d\'accès... Soyez visible 24h/24 pour les clients qui ont besoin de vous MAINTENANT.',
    challenges: [
        'Les gens en urgence trouvent vos concurrents en premier sur Google',
        'Votre numéro n\'apparaît pas sur mobile lors des recherches urgentes',
        'Impossible de rassurer sur vos tarifs et délais d\'intervention',
        'Vous perdez des chantiers sécurité faute de site professionnel',
    ],
    solutions: [
        'Site ultra-rapide optimisé pour recherches mobiles urgentes',
        'Bouton appel direct avec géolocalisation visible immédiatement',
        'Grille tarifaire transparente pour rassurer les clients',
        'SEO optimisé "serrurier urgence Le Mans" + tous quartiers',
    ],
    services: [
        {
            name: 'Site Urgence',
            price: 'dès 1 790€',
            description:
                'Site mobile-first avec click-to-call géolocalisé, grille tarifaire, zones intervention. Livré en 10 jours.',
        },
        {
            name: 'Google Ads Urgence',
            price: '390€/mois + budget',
            description:
                'Campagnes ciblées recherches urgentes. Apparaissez en #1 dès ce soir. Leads qualifiés garantis.',
        },
        {
            name: 'Pack Visibilité 24h',
            price: 'Sur devis',
            description:
                'Site + SEO + Ads. Solution complète pour saturer votre planning d\'interventions.',
        },
    ],
    cta: {
        title: 'Devenez LE serrurier qu\'on appelle en urgence',
        subtitle:
            'Soyez visible quand vos clients ont le plus besoin de vous : maintenant.',
    },
}

export const metadata = generateJobMetadata(serrurierData)

export default function SerrurierLeMansPage() {
    return <JobPageTemplate job={serrurierData} />
}
