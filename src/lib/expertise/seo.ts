import type { Metadata } from 'next'
import { expertisePath, expertiseTool, expertiseTools } from './catalog'
import type { ExpertisePage } from './types'

export function expertiseMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: { absolute: title }, description, alternates: { canonical: path },
    openGraph: { title, description, url: `https://www.litus.fr${path}`, type: 'website', siteName: 'Litus', locale: 'fr_FR', images: [{ url: '/litus-og-social.png', width: 1200, height: 630, alt: 'Litus : acquisition et infrastructure digitale' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/litus-og-social.png'] },
    robots: { index: true, follow: true },
  }
}

export function expertiseSchema(page?: ExpertisePage) {
  const url = `https://www.litus.fr${page ? expertisePath(page.slug) : '/expertise'}`
  const name = page ? `Expertise ${expertiseTool(page.slug).name}` : 'Expertises technologiques'
  return { '@context': 'https://schema.org', '@graph': [
    { '@type': page ? 'WebPage' : 'CollectionPage', '@id': `${url}#page`, url, name: page?.title ?? name, description: page?.description ?? 'Les technologies utilisées par Litus pour votre acquisition et votre infrastructure digitale.', inLanguage: 'fr-FR', breadcrumb: { '@id': `${url}#breadcrumb` }, ...(page ? { mainEntity: { '@id': `${url}#service` } } : {}) },
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.litus.fr' },
      { '@type': 'ListItem', position: 2, name: 'Expertises technologiques', item: 'https://www.litus.fr/expertise' },
      ...(page ? [{ '@type': 'ListItem', position: 3, name, item: url }] : []),
    ] },
    ...(!page ? [{ '@type': 'ItemList', '@id': `${url}#technologies`, itemListElement: expertiseTools.map((tool, index) => ({ '@type': 'ListItem', position: index + 1, name: tool.name, url: `https://www.litus.fr${expertisePath(tool.slug)}` })) }] : []),
    ...(page ? [{ '@type': 'FAQPage', '@id': `${url}#questions`, mainEntity: page.faq.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) }] : []),
    ...(page ? [{ '@type': 'Service', '@id': `${url}#service`, name, description: page.description, url, serviceType: page.headline.replace(/\n/g, ' '), provider: { '@type': 'Organization', name: 'Litus', url: 'https://www.litus.fr' }, areaServed: { '@type': 'Country', name: 'France' }, mainEntityOfPage: { '@id': `${url}#page` } }] : []),
  ] }
}
