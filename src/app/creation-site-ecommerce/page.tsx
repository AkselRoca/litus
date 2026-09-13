import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next'
import { EcommerceHero } from './_components/EcommerceHero'
import { EcommerceContent } from './_components/EcommerceContent'
import { ecommerceFaq } from './ecommerce-content'
import { ExpertiseServiceLinks } from '@/components/expertise/ExpertiseServiceLinks'

const title = 'Création de site e-commerce Shopify & WooCommerce | Litus'
const description = 'Litus conçoit votre boutique Shopify ou WooCommerce : design, catalogue, parcours d’achat, paiements et connexions. Une expertise e-commerce à Lorient et au Mans.'
const url = 'https://www.litus.fr/creation-site-ecommerce'

export const metadata: Metadata = pageMetadata("/creation-site-ecommerce", {
  title: { absolute: title }, description,
  alternates: { canonical: '/creation-site-ecommerce' },
  openGraph: { title, description, url, siteName: 'Litus', type: 'website', locale: 'fr_FR', images: [{ url: '/litus-og-social.png', width: 1200, height: 630, alt: 'Litus — Votre agence web pour développer votre activité.' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/litus-og-social.png'] },
})

const schema = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'Service', '@id': `${url}#service`, name: 'Création et refonte de boutiques Shopify et WooCommerce', description, url, serviceType: 'Conception et développement de sites e-commerce', provider: { '@type': 'Organization', name: 'Litus', url: 'https://www.litus.fr' }, areaServed: { '@type': 'Country', name: 'France' } },
  { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.litus.fr' }, { '@type': 'ListItem', position: 2, name: 'Création de site e-commerce', item: url }] },
  { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: ecommerceFaq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
] }

export default function EcommercePage() {
  return <div className="min-h-screen bg-white dark:bg-[#050505] overflow-hidden selection:bg-orange-500/30">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <EcommerceHero />
    <EcommerceContent />
    <ExpertiseServiceLinks tools={['shopify', 'wordpress', 'stripe']} title="Catalogue, paiement et exploitation : chaque outil a son rôle." description="Explorez la reprise d’une boutique Shopify, l’entretien de WooCommerce et les parcours Stripe adaptés aux sites ou applications hors Shopify Payments." />
  </div>
}
