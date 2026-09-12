import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getVisibleProjects } from '@/actions/portfolio';
import PortfolioEditorial from '@/components/portfolio/PortfolioEditorial';
import { portfolioSlug } from '@/lib/portfolio-slugs';

export const metadata: Metadata = {
  title: 'Réalisations web & e-commerce | Portfolio Litus',
  description: 'Découvrez les projets clients de Litus : sites web, boutiques Shopify, contenus, SEO et conseil e-commerce. De vraies interfaces et un accompagnement expliqué projet par projet.',
  alternates: { canonical: 'https://www.litus.fr/realisations' },
  openGraph: { title: 'Les réalisations Litus : des projets, des univers, du concret', description: 'Sites internet, e-commerce et accompagnement digital : explorez nos projets clients.', url: 'https://www.litus.fr/realisations', type: 'website', images: [{ url: '/realisations/clients/demetis-immo/hero-agence-immobiliere.webp', width: 1440, height: 1000, alt: 'Le site de Murasaki Team, projet du portfolio Litus' }] },
};
export const revalidate = 300;
export default async function RealisationsPage() {
  const result = await getVisibleProjects();
  if (!result.success || !result.data) return <section className="portfolio-case"><div className="portfolio-container"><h1>Nos réalisations</h1><p>La sélection est momentanément indisponible. Vous pouvez nous contacter pour découvrir nos projets.</p><Link href="/contact" className="portfolio-cta">Contacter Litus</Link></div></section>;
  const projects = result.data;
  const schema = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'Réalisations Litus', url: 'https://www.litus.fr/realisations', mainEntity: { '@type': 'ItemList', itemListElement: projects.map((project, index) => ({ '@type': 'ListItem', position: index + 1, name: project.title, url: `https://www.litus.fr/realisations/${project.editorial?.slug ?? portfolioSlug(project.title)}` })) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><PortfolioEditorial projects={projects} /><section className="portfolio-outro"><div className="portfolio-container"><div className="portfolio-outro-inner"><div><h2>Votre activité mérite<br />son propre chapitre.</h2><p>Un projet en tête ? Commençons par en parler, simplement.</p></div><Link href="/contact" className="portfolio-cta">Contacter Litus <ArrowUpRight size={18} aria-hidden="true" /></Link></div></div></section></>;
}
