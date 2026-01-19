import { CaseStudyTemplate, generateCaseStudyMetadata } from '@/components/templates/CaseStudyTemplate'

const caseStudyData = {
    slug: 'paysagiste-lorient',
    clientName: 'Jardins du Morbihan',
    industry: 'Paysagiste',
    location: 'Lorient',
    services: ['Site Vitrine', 'SEO Local'],
    duration: '4 mois',
    challenge: {
        title: 'Le Défi',
        description: 'Jardins du Morbihan, entreprise de paysagisme familiale depuis 15 ans, dépendait uniquement du bouche-à-oreille. Avec la concurrence croissante et le départ à la retraite de clients historiques, le carnet de commandes se vidait dangereusement.',
        painPoints: [
            'Aucune présence en ligne (pas de site web)',
            'Invisible sur Google pour les recherches locales',
            'Dépendance totale au bouche-à-oreille',
            'Perte de 30% du chiffre d\'affaires en 2 ans',
            'Concurrents mieux positionnés sur le digital',
        ],
    },
    solution: {
        title: 'Notre Solution',
        description: 'Nous avons déployé une stratégie digitale complète axée sur la visibilité locale et la génération de leads qualifiés.',
        steps: [
            {
                title: 'Création du site vitrine',
                description: 'Un site moderne présentant les réalisations avec galerie photos, témoignages clients et formulaire de demande de devis.',
            },
            {
                title: 'Optimisation SEO Local',
                description: 'Création et optimisation de la fiche Google Business Profile, stratégie de mots-clés locaux (paysagiste Lorient, jardinier Morbihan...).',
            },
            {
                title: 'Contenu géolocalisé',
                description: 'Rédaction de pages dédiées aux villes environnantes (Lanester, Hennebont, Ploemeur) pour capturer le trafic local.',
            },
            {
                title: 'Collecte d\'avis Google',
                description: 'Mise en place d\'un système automatisé de demande d\'avis clients pour booster la réputation en ligne.',
            },
        ],
    },
    results: {
        title: 'Les Résultats',
        description: 'En 4 mois, Jardins du Morbihan est passé de l\'invisibilité totale à la première page Google sur ses mots-clés principaux.',
        metrics: [
            { label: 'Augmentation du trafic', value: '340', suffix: '%', prefix: '+' },
            { label: 'Leads par mois', value: '45' },
            { label: 'Retour sur investissement', value: '8', prefix: 'x' },
            { label: 'Position Google', value: '3', prefix: 'Top ' },
        ],
    },
    testimonial: {
        quote: 'Je ne pensais pas qu\'un simple site web pouvait autant changer mon activité. Aujourd\'hui, je refuse des chantiers tellement j\'ai de demandes !',
        author: 'Jean-Pierre M.',
        role: 'Gérant, Jardins du Morbihan',
    },
}

export const metadata = generateCaseStudyMetadata(caseStudyData)

export default function PaysagisteLorientCaseStudy() {
    return <CaseStudyTemplate data={caseStudyData} />
}
