import type { Metadata } from 'next'

export const SITE_ORIGIN = 'https://www.litus.fr'
const titles: Record<string, string> = {
  '/': 'Agence web Lorient & Le Mans : sites, SEO & Google Ads | Litus',
  '/a-propos': 'Notre agence web à Lorient et au Mans | Litus',
  '/contact': 'Contact : parlons de votre projet web | Litus',
  '/pme': 'Agence web pour PME : site, SEO & acquisition | Litus',
  '/grands-comptes': 'Agence web grands comptes & ETI : refonte et SEO | Litus',
  '/realisations': 'Réalisations web, e-commerce & acquisition | Litus',
  '/tarifs': 'Tarifs création de site, SEO & Google Ads | Litus',
  '/blog': 'Blog : SEO, sites web & stratégies digitales | Litus',
  '/ressources/checklist-gmb': 'Checklist Google Business Profile gratuite | Litus',
  '/ressources/audit-productivite': 'Audit de productivité : votre diagnostic gratuit | Litus',
  '/ressources/cahier-des-charges': 'Générateur de cahier des charges gratuit | Litus',
  '/seo-local': 'SEO local : visibilité Google à Lorient & au Mans | Litus',
}
const descriptions: Record<string, string> = {
  '/realisations/noventis-conseil': 'Noventis Conseil : un site de courtage en énergie et un parcours d’analyse de facture pour transformer les visites en demandes qualifiées.',
  '/realisations/sarl-pean-j': 'SARL Péan J : des campagnes Google Ads pilotées par Litus, plus de 30 leads par mois et environ 15 € par conversion pour une acquisition locale rentable.',
  '/': 'Litus accompagne vos projets à Lorient et au Mans : création de sites, e-commerce, SEO, Google Ads et outils métier. Échangeons sur vos objectifs.',
  '/seo-local': 'Améliorez votre visibilité sur Google et Maps : fiche établissement, pages locales et suivi des demandes. Un accompagnement SEO local à Lorient et au Mans.',
}

export function brandedTitle(value: Metadata['title']): string {
  let title = typeof value === 'string' ? value : value && 'absolute' in value ? value.absolute : value && 'default' in value ? value.default : 'Agence web'
  title = (title || 'Agence web').replace(/(?:\s*[|–—-]\s*Litus)+\s*$/gi, '').trim()
  return /\bLitus\b/i.test(title) ? title : `${title} | Litus`
}

/** All page metadata uses a self-canonical URL and a single explicit brand suffix. */
export function pageMetadata(path: string, metadata: Metadata): Metadata {
  const canonical = new URL(path === '/' ? '/' : path.replace(/\/$/, ''), SITE_ORIGIN).href
  const title = titles[path] || brandedTitle(metadata.title)
  const description = descriptions[path] || metadata.description || ''
  const openGraph = metadata.openGraph || {}
  const images = openGraph.images || [{ url: '/litus-og-social.png', width: 1200, height: 630, alt: 'Litus, agence web à Lorient et au Mans' }]
  const robots = typeof metadata.robots === 'object' && metadata.robots?.index === false
    ? { ...metadata.robots, googleBot: { index: false, follow: metadata.robots.follow !== false } }
    : metadata.robots
  return {
    ...metadata, title: { absolute: title }, description, keywords: null,
    metadataBase: new URL(SITE_ORIGIN),
    alternates: { ...metadata.alternates, canonical },
    openGraph: { ...openGraph, type: 'type' in openGraph ? openGraph.type : 'website', title, description, url: canonical, siteName: 'Litus', locale: 'fr_FR', images },
    twitter: { ...metadata.twitter, card: 'summary_large_image', title, description, images: metadata.twitter?.images || ['/litus-og-social.png'] },
    ...(robots ? { robots } : {}),
  }
}

export const siteIdentitySchema = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', '@id': `${SITE_ORIGIN}/#organization`, name: 'Litus', url: SITE_ORIGIN, logo: `${SITE_ORIGIN}/brand/litus-mark.webp`, telephone: '+33744985521', email: 'litusagency@gmail.com', sameAs: ['https://fr.linkedin.com/company/litus-agency', 'https://www.facebook.com/litusagence'] },
    { '@type': 'WebSite', '@id': `${SITE_ORIGIN}/#website`, name: 'Litus', url: SITE_ORIGIN, inLanguage: 'fr-FR', publisher: { '@id': `${SITE_ORIGIN}/#organization` } },
  ],
}
