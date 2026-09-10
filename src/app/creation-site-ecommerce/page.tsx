import type { Metadata } from 'next'
import { EcommerceHero } from './_components/EcommerceHero'
import { EcommerceContent } from './_components/EcommerceContent'
import { ecommerceFaq } from './ecommerce-content'

const title = 'Création de site e-commerce Shopify & WooCommerce | Litus'
const description = 'Litus conçoit votre boutique Shopify ou WooCommerce : design, catalogue, parcours d’achat, paiements et connexions. Une expertise e-commerce à Lorient et au Mans.'
const url = 'https://litus.fr/creation-site-ecommerce'

export const metadata: Metadata = {
  title: { absolute: title }, description,
  alternates: { canonical: '/creation-site-ecommerce' },
  openGraph: { title, description, url, siteName: 'Litus', type: 'website', locale: 'fr_FR', images: [{ url: '/ecommerce/shopify-commerce.png', alt: 'Interface de pilotage d’une boutique Shopify' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/ecommerce/shopify-commerce.png'] },
}

const schema = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'Service', '@id': `${url}#service`, name: 'Création et refonte de boutiques Shopify et WooCommerce', description, url, serviceType: 'Conception et développement de sites e-commerce', provider: { '@type': 'Organization', name: 'Litus', url: 'https://litus.fr' }, areaServed: { '@type': 'Country', name: 'France' } },
  { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://litus.fr' }, { '@type': 'ListItem', position: 2, name: 'Création de site e-commerce', item: url }] },
  { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: ecommerceFaq.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
] }

export default function EcommercePage() {
  return <div className="min-h-screen bg-white dark:bg-[#050505] overflow-hidden selection:bg-orange-500/30">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <EcommerceHero />
    <EcommerceContent />
  </div>
}
