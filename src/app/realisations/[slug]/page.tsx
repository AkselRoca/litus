import { pageMetadata } from '@/lib/seo/metadata'
import type { Metadata } from 'next';
import { cache } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import { getVisibleProjects } from '@/actions/portfolio';
import { portfolioSlug } from '@/lib/portfolio-slugs';
import type { PortfolioStory } from '@/lib/portfolio-catalog';
import PortfolioCaseStudy from '@/components/portfolio/PortfolioCaseStudy';
import { CaseStudyTemplate } from './CaseStudyTemplate';
import { westCaseStudy, type CaseStudyData } from './case-study-data';
import { fgChronodepCaseStudy } from './fg-chronodep-case-study'
import './case-study.css';

export const revalidate = 300;
const allProjects = cache(async () => {
  const result = await getVisibleProjects();
  return result.success ? result.data ?? [] : [];
});
function list(value: string | null): string[] {
  try { const parsed: unknown = JSON.parse(value || '[]'); return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []; } catch { return []; }
}
async function projectData(slug: string): Promise<{ story?: PortfolioStory; legacy?: CaseStudyData; related: PortfolioStory[] } | null> {
  const projects = await allProjects();
  const project = projects.find((item) => portfolioSlug(item.title) === slug);
  const stories = projects.flatMap((item) => item.editorial ? [item.editorial] : []);
  const related = stories.filter((item) => item.slug !== slug).sort((a, b) => {
    const categories = project?.editorial?.categories ?? [];
    return b.categories.filter((item) => categories.includes(item)).length - a.categories.filter((item) => categories.includes(item)).length;
  }).slice(0, 3);
  const legacyRelated = related.map((item) => ({ title: item.title, image: item.cover.src, tags: item.stack, href: `/realisations/${item.slug}` }));
  if (slug === 'fg-chronodep') return { legacy: { ...fgChronodepCaseStudy, related: legacyRelated }, related };
  if (!project) return null;
  if (slug === 'west-clotures-paysage') {
    const story = project.editorial;
    const actualScreens = story?.gallery.filter((asset) => asset.kind === 'screen') ?? [];
    const desktop = actualScreens[0] ?? story?.cover;
    return { story, related, legacy: {
      ...westCaseStudy,
      related: legacyRelated,
      hero: { ...westCaseStudy.hero, desktop: desktop?.src ?? westCaseStudy.hero.desktop, alt: desktop?.alt ?? westCaseStudy.hero.alt, mobile: undefined },
      ...(story ? { showcase: { intro: 'Les interfaces et l’univers visuel du site West Clôtures & Paysage.', tabs: story.gallery.map((asset) => ({ label: asset.kind === 'brand' ? 'Univers visuel' : asset.caption, image: asset.src, alt: asset.alt, mode: 'desktop' as const })) } } : {}),
    } };
  }
  if (project.editorial) return { story: project.editorial, related };
  const description = project.description || 'Découvrez ce projet accompagné par Litus.';
  const cover = { src: project.imageUrl, width: 1440, height: 1000, alt: `Aperçu du projet ${project.title}`, caption: project.title, kind: 'archive' as const };
  return { related, story: { slug, title: project.title, sourceUrl: project.link, sector: list(project.categories)[0] || 'Projet web', categories: list(project.categories), stack: list(project.tags), headline: description, summary: description, scope: description, focus: [], links: [], cover, gallery: [cover], accent: '#f45420', tone: '#eee9e2', order: project.order, scopeOnly: false, archived: true } };
}

async function resolvePageMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await projectData(slug === 'demetis-immobilier' ? 'demetis-immo' : slug);
  if (!data) return { title: 'Projet introuvable | Litus', robots: { index: false, follow: false } };
  const title = data.story?.title ?? data.legacy!.client;
  const description = data.story?.summary ?? data.legacy!.statement;
  const image = data.story?.cover;
  const url = `https://www.litus.fr/realisations/${data.story?.slug ?? data.legacy!.slug}`;
  const imageUrl = image?.src ?? data.legacy!.hero.desktop;
  return {
    title: data.story?.performance ? { absolute: `${title} : résultats Google Ads & acquisition | Litus` } : `${title} : projet & accompagnement | Litus`, description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Réalisation Litus`, description, type: 'article', url, images: [{ url: imageUrl, ...(image ? { width: image.width, height: image.height, alt: image.alt } : { alt: title }) }] },
    twitter: { card: 'summary_large_image', title: `${title} | Litus`, description, images: [imageUrl] },
  };
}

export default async function RealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'demetis-immobilier') permanentRedirect('/realisations/demetis-immo');
  const data = await projectData(slug);
  if (!data) notFound();
  const title = data.story?.title ?? data.legacy!.client;
  const description = data.story?.summary ?? data.legacy!.statement;
  const asset = data.story?.cover.src ?? data.legacy!.hero.desktop;
  const image = asset.startsWith('/') ? `https://www.litus.fr${asset}` : asset;
  // This describes Litus's case-study article, not authorship of the entire client website.
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: `${title} : notre accompagnement`, description, image, mainEntityOfPage: `https://www.litus.fr/realisations/${slug}`, author: { '@type': 'Organization', name: 'Litus', url: 'https://www.litus.fr' }, about: { '@type': 'Organization', name: title, ...(data.story?.sourceUrl ? { url: data.story.sourceUrl } : {}) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />{data.legacy ? <CaseStudyTemplate data={data.legacy} /> : <PortfolioCaseStudy story={data.story!} related={data.related} />}</>;
}

export async function generateMetadata(props: Parameters<typeof resolvePageMetadata>[0]) {
  const params = await props.params
  return pageMetadata("/realisations/" + params.slug, await resolvePageMetadata(props))
}
