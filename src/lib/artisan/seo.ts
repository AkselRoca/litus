import type { Metadata } from 'next';
import { generateOrganizationSchema } from '@/lib/schema';
import type { Trade } from './catalog';

export const artisanOrigin = 'https://www.litus.fr';
const organizationId = 'https://litus.fr/#organization';

export function artisanMetadata(title: string, description: string, path: string, image: string, alt: string): Metadata {
  const url = `${artisanOrigin}${path}`;
  return {
    title: { absolute: `${title} | Litus` }, description,
    alternates: { canonical: url }, robots: { index: true, follow: true },
    openGraph: { type: 'website', locale: 'fr_FR', siteName: 'Litus', title, description, url,
      images: [{ url: `${artisanOrigin}${image}`, width: 1280, height: 960, alt }] },
    twitter: { card: 'summary_large_image', title, description, images: [`${artisanOrigin}${image}`] },
  };
}

export function artisanSchema(trade?: Trade) {
  const path = trade ? `/artisan/${trade.slug}` : '/artisan';
  const url = `${artisanOrigin}${path}`;
  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: artisanOrigin },
    { '@type': 'ListItem', position: 2, name: 'Artisans', item: `${artisanOrigin}/artisan` },
    ...(trade ? [{ '@type': 'ListItem', position: 3, name: trade.name, item: url }] : []),
  ];
  const organization = generateOrganizationSchema();
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { ...organization, '@context': undefined, '@id': organizationId },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: breadcrumbs },
      { '@type': 'Service', '@id': `${url}#service`, url,
        name: trade?.title ?? 'Création de sites internet pour artisans',
        description: trade?.description ?? 'Sites internet, référencement local et acquisition pour les entreprises artisanales.',
        serviceType: 'Création de site internet et acquisition digitale',
        provider: { '@id': organizationId }, areaServed: { '@type': 'Country', name: 'France' } },
      ...(trade ? [{ '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: trade.faq.map(item => ({
        '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })) }] : []),
    ],
  };
}

export function JsonLd({ data }: { data: unknown }) {
  // Escaping '<' prevents content from terminating the script element.
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
