
import { prisma } from '@/lib/database_final'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        // Clean existing projects
        await prisma.project.deleteMany({})

        const projects = [
            {
                title: 'West Clôtures & Paysage',
                categories: JSON.stringify(["Site Vitrine", "Google Ads", "Outil Métier / Application Web", "Référencement Naturel (SEO)", "Identité Visuelle"]),
                description: 'Transformation digitale complète : Site WordPress Elementor Pro, campagnes Google Ads performantes et CRM métier. Visibilité locale maximale et flux constant de devis qualifiés.',
                imageUrl: '/realisations/west clotures  site internet crée par litus agence web.jpg',
                link: 'https://www.westclotures.fr',
                featured: true,
                order: 0,
                stats: JSON.stringify([{ "label": "Croissance", "value": "+650% de traffic" }, { "label": "Devis", "value": "30+ par mois" }, { "label": "ROAS", "value": "109" }, { "label": "Positionnement", "value": "N°1 sur Clôture Morbihan" }]),
                tags: JSON.stringify(['Wordpress', 'Google Ads', 'CRM', 'Elementor', 'SEO Local'])
            },
            {
                title: 'Femmes des Territoires',
                categories: JSON.stringify(["Site Vitrine"]),
                description: "Refonte complète du site WordPress de l'association. Structure optimisée, navigation fluide et SEO technique pour une meilleure mise en avant des offres et événements.",
                imageUrl: '/realisations/femme des territoires site internet crée par litus agence web.JPG',
                link: 'https://www.femmesdesterritoires.fr/',
                featured: true,
                order: 1,
                stats: JSON.stringify([{ "label": "Fluidité", "value": "Optimisée" }, { "label": "SEO", "value": "Renforcé" }]),
                tags: JSON.stringify(['Wordpress', 'Refonte', 'Elementor', 'Web Performance'])
            },
            {
                title: 'Japan Hunter',
                categories: JSON.stringify(["Site E-commerce"]),
                description: "Boutique Shopify sur-mesure pour l'import français. UX mobile optimisée, tracking GA4 précis et structure SEO solide pour scaler les ventes.",
                imageUrl: '/realisations/japan hunter boutique en ligne crée par litus agence web.jpg',
                link: 'https://japanhunter.fr/',
                featured: true,
                order: 2,
                stats: JSON.stringify([{ "label": "Conversion", "value": "Optimisée" }, { "label": "Tracking", "value": "100%" }]),
                tags: JSON.stringify(['Shopify', 'Liquid', 'UX Mobile', 'GA4', 'E-commerce'])
            },
            {
                title: 'Loumor Débarras',
                categories: JSON.stringify(["Site Vitrine", "Référencement Naturel (SEO)"]),
                description: 'Site vitrine professionnel pour services de débarras. Stratégie SEO local sur Vannes et optimisation technique pour générer des demandes entrantes rapides.',
                imageUrl: '/realisations/loumor débarras site internet crée par litus agence web.png',
                link: 'https://www.loumor.com/',
                featured: false,
                order: 3,
                stats: JSON.stringify([{ "label": "Démarrage", "value": "Rapide" }, { "label": "Visibilité", "value": "Locale" }]),
                tags: JSON.stringify(['Wordpress', 'SEO Local', 'Elementor', 'Lead Gen'])
            },
            {
                title: 'Azra Photographie',
                categories: JSON.stringify(["Site Vitrine", "Identité Visuelle"]),
                description: 'Portfolio WordPress épuré et performant. Mise en valeur haute qualité des galeries photo avec une optimisation SEO local sur Lorient.',
                imageUrl: '/realisations/azra photographie site internet crée par litus agence web.jpeg',
                link: 'https://www.azraphotographie.fr/',
                featured: false,
                order: 4,
                stats: JSON.stringify([]),
                tags: JSON.stringify(['Wordpress', 'Portfolio', 'Design', 'Elementor'])
            },
            {
                title: 'Murasaki Team',
                categories: JSON.stringify(["Site Vitrine", "Identité Visuelle"]),
                description: "Site d'agence moderne pour studios d'enregistrement. Pages équipes, module de réservation et design immersif pour une navigation fluide.",
                imageUrl: '/realisations/murasaki team site internet crée par litus agence web.png',
                link: 'https://murasaki.team/',
                featured: true,
                order: 5,
                stats: JSON.stringify([{ "label": "Navigation", "value": "Fluide" }]),
                tags: JSON.stringify(['Wordpress', 'Réservation', 'Elementor', 'Design'])
            },
            {
                title: 'Geoproxio',
                categories: JSON.stringify(["Site Vitrine"]),
                description: 'Site vitrine multilingue (FR/PT/EN) pour le secteur géotechnique. SEO technique avancé et tracking conversions pour une portée internationale.',
                imageUrl: '/realisations/geoproxio site internet crée par litus agence web.jpeg',
                link: 'https://www.geoproxio.fr/',
                featured: false,
                order: 6,
                stats: JSON.stringify([{ "label": "Langues", "value": "FR/PT/EN" }]),
                tags: JSON.stringify(['Wordpress', 'Multilingue', 'GTM', 'BTP'])
            },
            {
                title: 'Aspire Marketing',
                categories: JSON.stringify(["Site Vitrine"]),
                description: "Site vitrine corporate pour cabinet de conseil. Design moderne et clarté de l'offre pour améliorer l'image professionnelle et le recrutement.",
                imageUrl: '/realisations/aspire marketing site internet crée par litus agence web.jpeg',
                link: 'https://www.aspire-marketing.fr/',
                featured: false,
                order: 7,
                stats: JSON.stringify([{ "label": "Image", "value": "Pro" }]),
                tags: JSON.stringify(['Wordpress', 'Corporate', 'Elementor', 'Performance'])
            },
            {
                title: 'Menuiserie Jérôme Rio',
                categories: JSON.stringify(["Site Vitrine"]),
                description: 'Showcase digital pour artisan menuisier. Galerie de réalisations sur-mesure et SEO local pour renforcer la présence et capter des devis.',
                imageUrl: '/realisations/menuiserie jerome rio site internet crée par litus agence web.png',
                link: 'https://www.menuiserie-jeromerio.fr/',
                featured: false,
                order: 8,
                stats: JSON.stringify([{ "label": "Devis", "value": "Entrants" }]),
                tags: JSON.stringify(['Wordpress', 'Artisan', 'BTP', 'SEO Local'])
            },
            {
                title: 'Réflexologie Lorient',
                categories: JSON.stringify(["Site Vitrine", "Référencement Naturel (SEO)"]),
                description: 'Site vitrine apaisant avec réservation en ligne. Positionné N°1 sur "Réflexologie Lorient" grâce à une stratégie SEO efficace.',
                imageUrl: '/realisations/reflexologie lorient site internet crée par litus agence web.jpg',
                link: 'https://www.reflexologielorient.fr/',
                featured: false,
                order: 9,
                stats: JSON.stringify([{ "label": "Position", "value": "N°1" }]),
                tags: JSON.stringify(['Wordpress', 'SEO N°1', 'Réservation', 'Santé'])
            },
            {
                title: 'Aire des Îles',
                categories: JSON.stringify(["Site Vitrine"]),
                description: "Refonte UX/UI complète pour une aire de camping-car. Structure modernisée, blog SEO et optimisation technique pour booster la visibilité.",
                imageUrl: '/realisations/aire des iles site internet crée par litus agence web.jpeg',
                link: 'https://www.airedesiles.fr/',
                featured: false,
                order: 10,
                stats: JSON.stringify([{ "label": "Visibilité", "value": "+45%" }]),
                tags: JSON.stringify(['Wordpress', 'Refonte', 'Tourisme', 'UX/UI'])
            },
            {
                title: "BR'Z Couverture",
                categories: JSON.stringify(["Site Vitrine", "Référencement Naturel (SEO)"]),
                description: 'Site artisan moderne pour entreprise de couverture. Mise en avant des expertises (zinguerie, toiture) et SEO local pour générer des chantiers.',
                imageUrl: '/realisations/brz couverture site internet crée par litus agence web.png',
                link: 'https://www.brzcouverture.fr/',
                featured: false,
                order: 11,
                stats: JSON.stringify([]),
                tags: JSON.stringify(['Wordpress', 'BTP', 'Artisan', 'SEO Local'])
            },
            {
                title: 'Carnac Immobilier',
                categories: JSON.stringify(["Site Vitrine"]),
                description: "Site vitrine pour agence immobilière locale. Présentation élégante des biens d'exception et optimisation pour le référencement local.",
                imageUrl: '/realisations/carnac immobilier site internet crée par litus agence web.png',
                link: 'https://www.carnacimmobilier.fr/',
                featured: false,
                order: 12,
                stats: JSON.stringify([]),
                tags: JSON.stringify(['Wordpress', 'Immobilier', 'SEO Local', 'Design'])
            },
            {
                title: 'Del Rio Pizzeria',
                categories: JSON.stringify(["Site Vitrine", "Identité Visuelle"]),
                description: 'Identité visuelle complète et site web pour restaurant. Création logo, menus et plateforme digitale mobile-friendly pour une image pro.',
                imageUrl: '/realisations/del rio pizzeria site internet crée par litus agence web.png',
                link: 'https://www.delriopizzeria.fr/',
                featured: false,
                order: 13,
                stats: JSON.stringify([]),
                tags: JSON.stringify(['Branding', 'Wordpress', 'Food', 'Design'])
            },
            {
                title: 'Maïiana LG',
                categories: JSON.stringify(["Site Vitrine", "Identité Visuelle"]),
                description: 'Site vitrine zen pour praticienne bien-être. Vectorisation logo, design esthétique et optimisation mobile pour une présentation douce et claire.',
                imageUrl: '/realisations/maiiana lg site internet crée par litus agence web.png',
                link: 'https://www.maiiana.fr/',
                featured: false,
                order: 14,
                stats: JSON.stringify([]),
                tags: JSON.stringify(['Wordpress', 'Bien-être', 'Logo', 'Mobile'])
            },
            {
                title: 'Gîte des Oiseaux',
                categories: JSON.stringify(["Site Vitrine"]),
                description: "Modernisation d'un site de gîte touristique. Nouveau design attractif et optimisation technique pour transformer les visiteurs en résidents.",
                imageUrl: '/realisations/gite des oiseaux site internet crée par litus agence web.png',
                link: 'https://www.gitesdesoiseaux.com/',
                featured: false,
                order: 15,
                stats: JSON.stringify([]),
                tags: JSON.stringify(['Wordpress', 'Tourisme', 'Refonte', 'Conversion'])
            },
            {
                title: 'Plomberie 84',
                categories: JSON.stringify(["Site Vitrine"]),
                description: "Site vitrine d'urgence pour artisan plombier. Focus sur la rapidité de contact, formulaire optimisé et présence locale immédiate.",
                imageUrl: '/realisations/plomberie84 site internet crée par litus agence web.png',
                link: 'https://www.plomberie84.fr/',
                featured: false,
                order: 16,
                stats: JSON.stringify([]),
                tags: JSON.stringify(['Wordpress', 'Artisan', 'Urgence', 'SEO Local'])
            },
            {
                title: 'Concept Coiffure',
                categories: JSON.stringify(["Site Vitrine"]),
                description: 'Site vitrine pour salon de coiffure. Stratégie de visibilité locale et design responsive pour présenter efficacement les prestations.',
                imageUrl: '/realisations/concept coiffure site internet crée par litus agence web.png',
                link: 'https://www.conceptcoiffure.com/',
                featured: false,
                order: 17,
                stats: JSON.stringify([{ "label": "Visibilité", "value": "Locale" }]),
                tags: JSON.stringify(['Wordpress', 'Beauté', 'Local', 'SEO'])
            },
            {
                title: 'Le Bolay Paysagiste',
                categories: JSON.stringify(["Site Vitrine", "Référencement Naturel (SEO)"]),
                description: 'Site vitrine performant pour paysagiste. Intégration vidéo et SEO local pour valoriser les chantiers et capter une clientèle de proximité.',
                imageUrl: '/realisations/le bolay paysagiste site internet crée par litus agence web.jpg',
                link: 'http://lebolaypaysagiste.fr/',
                featured: false,
                order: 18,
                stats: JSON.stringify([{ "label": "Devis", "value": "Entrants" }]),
                tags: JSON.stringify(['Wordpress', 'Paysagiste', 'Vidéo', 'SEO Local'])
            }
        ]

        for (const project of projects) {
            await prisma.project.create({
                data: project
            })
        }

        return NextResponse.json({ success: true, message: `Synced ${projects.length} projects with updated links.` })

    } catch (error) {
        console.error("Seed Error:", error)
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
    }
}
