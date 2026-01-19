import { BlogArticleTemplate, generateBlogArticleMetadata } from '@/components/templates/BlogArticleTemplate'

const articleData = {
    slug: 'seo-local-guide-2024',
    title: 'Guide Complet du SEO Local en 2024',
    excerpt: 'Tout ce que vous devez savoir pour apparaître en première page Google dans votre zone géographique et attirer plus de clients locaux.',
    category: 'SEO',
    author: {
        name: 'Arthur Litus',
        role: 'Expert SEO',
    },
    publishedAt: '10 janvier 2024',
    readTime: '8 min de lecture',
    relatedArticles: [
        { slug: 'google-ads-vs-seo', title: 'Google Ads vs SEO : Que Choisir ?' },
        { slug: 'site-vitrine-artisan', title: 'Pourquoi un Site Vitrine est Indispensable pour les Artisans' },
    ],
    content: (
        <>
            <h2>Qu'est-ce que le SEO Local ?</h2>
            <p>
                Le SEO local (Search Engine Optimization local) est l'ensemble des techniques permettant d'optimiser
                votre visibilité sur les moteurs de recherche pour les requêtes géolocalisées. Quand un utilisateur
                recherche "plombier Le Mans" ou "restaurant près de moi", Google affiche des résultats locaux.
            </p>
            <p>
                Pour les entreprises locales (artisans, commerces, professions libérales), le SEO local représente
                une opportunité majeure : <strong>46% des recherches Google ont une intention locale</strong>.
            </p>

            <h2>Les 3 Piliers du SEO Local</h2>

            <h3>1. Google Business Profile (ex-Google My Business)</h3>
            <p>
                Votre fiche Google Business Profile est le pilier central de votre stratégie SEO locale.
                Elle apparaît dans les résultats de recherche et sur Google Maps.
            </p>
            <ul>
                <li>Remplissez 100% des informations (adresse, horaires, téléphone, site web)</li>
                <li>Ajoutez des photos de qualité de votre entreprise, équipe et réalisations</li>
                <li>Choisissez les catégories les plus pertinentes</li>
                <li>Publiez régulièrement des actualités et offres</li>
                <li>Répondez à tous les avis (positifs ET négatifs)</li>
            </ul>

            <h3>2. Optimisation On-Site</h3>
            <p>
                Votre site web doit être optimisé pour le référencement local :
            </p>
            <ul>
                <li><strong>Balises title et meta</strong> incluant votre ville/région</li>
                <li><strong>Contenu géolocalisé</strong> mentionnant naturellement votre zone d'intervention</li>
                <li><strong>Pages de destination locales</strong> pour chaque ville où vous intervenez</li>
                <li><strong>Schema.org LocalBusiness</strong> pour aider Google à comprendre votre activité</li>
                <li><strong>NAP cohérent</strong> (Name, Address, Phone) identique partout</li>
            </ul>

            <h3>3. Citations et Backlinks Locaux</h3>
            <p>
                Les citations sont les mentions de votre entreprise sur d'autres sites (annuaires, sites d'avis, etc.).
                Elles renforcent votre autorité locale.
            </p>
            <ul>
                <li>Inscrivez-vous sur les annuaires pertinents (Pages Jaunes, Yelp, etc.)</li>
                <li>Obtenez des liens depuis des sites locaux (mairie, associations, presse locale)</li>
                <li>Participez aux événements locaux pour générer des mentions</li>
            </ul>

            <h2>Les Facteurs de Classement Local en 2024</h2>
            <p>Selon les études récentes, voici les facteurs les plus importants :</p>
            <ol>
                <li><strong>Pertinence</strong> : Votre activité correspond-elle à la recherche ?</li>
                <li><strong>Distance</strong> : Êtes-vous proche du lieu de recherche ?</li>
                <li><strong>Notoriété</strong> : Avis, citations, liens, ancienneté du domaine</li>
                <li><strong>Engagement</strong> : Clics, appels, demandes d'itinéraire</li>
            </ol>

            <h2>Erreurs à Éviter</h2>
            <ul>
                <li>❌ NAP incohérent entre votre site, GBP et annuaires</li>
                <li>❌ Fiche Google Business non vérifiée ou incomplète</li>
                <li>❌ Ignorer les avis clients (surtout les négatifs)</li>
                <li>❌ Contenu dupliqué entre vos pages locales</li>
                <li>❌ Site non optimisé pour mobile</li>
            </ul>

            <h2>Conclusion</h2>
            <p>
                Le SEO local est un investissement à long terme qui peut transformer votre activité.
                Avec une stratégie bien exécutée, vous pouvez apparaître en première page Google
                et générer un flux constant de clients qualifiés.
            </p>
            <p>
                <strong>Besoin d'aide pour votre SEO local ?</strong> Nos experts sont là pour vous accompagner.
            </p>
        </>
    ),
}

export const metadata = generateBlogArticleMetadata(articleData)

export default function SeoLocalGuideArticle() {
    return <BlogArticleTemplate data={articleData} />
}
