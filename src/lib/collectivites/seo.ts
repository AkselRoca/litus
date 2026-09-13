import type { Metadata } from 'next'
import { generateOrganizationSchema } from '@/lib/schema'
import type { CivicFaq } from './content'

const base = 'https://www.litus.fr'
export function civicMetadata(title: string, description: string, path = '/collectivites', image = '/collectivites/place-publique-hotel-de-ville.webp', alt = 'Place publique et hôtel de ville en France'): Metadata {
  return { title: { absolute: title }, description, alternates: { canonical: base + path }, robots: { index: true, follow: true }, openGraph: { type: 'website', locale: 'fr_FR', siteName: 'Litus', title, description, url: base + path, images: [{ url: base + image, alt }] }, twitter: { card: 'summary_large_image', title, description, images: [base + image] } }
}
export function civicSchema(title: string, description: string, path: string, faq: CivicFaq[], image: string) {
  const url = base + path
  const organization = { ...generateOrganizationSchema(), '@context': undefined, '@id': 'https://www.litus.fr/#organization' }
  const breadcrumb = [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: base + '/' }, { '@type': 'ListItem', position: 2, name: 'Collectivités', item: base + '/collectivites' }]
  if (path !== '/collectivites') breadcrumb.push({ '@type': 'ListItem', position: 3, name: title, item: url })
  return { '@context': 'https://schema.org', '@graph': [organization,
    { '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description, inLanguage: 'fr-FR', primaryImageOfPage: { '@type': 'ImageObject', url: base + image }, breadcrumb: { '@id': url + '#breadcrumb' }, about: { '@id': url + '#service' } },
    { '@type': 'Service', '@id': url + '#service', name: title, description, provider: { '@id': organization['@id'] }, areaServed: { '@type': 'Country', name: 'France' }, url },
    { '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: breadcrumb },
    { '@type': 'FAQPage', '@id': url + '#faq', mainEntity: faq.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ] }
}
