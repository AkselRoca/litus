import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getVisibleProjects } from '@/actions/portfolio'
import { portfolioSlug } from '@/lib/portfolio-slugs'
import { CaseStudyTemplate } from './CaseStudyTemplate'
import { genericCaseStudy, westCaseStudy, type CaseStudyData } from './case-study-data'
import { fgChronodepCaseStudy } from './fg-chronodep-case-study'
import './case-study.css'

type RouteProps = { params: Promise<{ slug: string }> }
type Project = NonNullable<Awaited<ReturnType<typeof getVisibleProjects>>['data']>[number]

function parseList(value: string) {
  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch { return [] }
}

async function allProjects() {
  const response = await getVisibleProjects()
  return response.success ? response.data ?? [] : []
}

function fallbackDemetis(): Project {
  return {
    id: 'reference-demetis', title: 'Demétis Immobilier',
    description: 'Site vitrine sur mesure pour valoriser leurs biens et renforcer leur visibilité locale sur Google.',
    categories: JSON.stringify(['Site internet', 'Référencement naturel']),
    imageUrl: '/realisations/demetis-website.webp', link: 'https://www.demetisimmo.fr/',
    stats: '[]', tags: '[]', featured: true, visible: true, order: 0,
    createdAt: new Date(0), updatedAt: new Date(0),
  }
}

function relatedProjects(projects: Project[], currentSlug: string): NonNullable<CaseStudyData['related']> {
  const available = projects.length ? projects : [fallbackDemetis()]
  return available.filter(project => portfolioSlug(project.title) !== currentSlug).slice(0, 4).map(project => ({
    title: project.title, image: project.imageUrl,
    tags: parseList(project.categories).slice(0, 2), href: `/realisations/${portfolioSlug(project.title)}`,
  }))
}

async function dataForSlug(slug: string) {
  const projects = await allProjects()
  if (slug === westCaseStudy.slug) return { ...westCaseStudy, related: relatedProjects(projects, slug) }
  if (slug === fgChronodepCaseStudy.slug) return { ...fgChronodepCaseStudy, related: relatedProjects(projects, slug) }
  const project = projects.find(item => portfolioSlug(item.title) === slug) ?? (slug === 'demetis-immo' ? fallbackDemetis() : undefined)
  if (!project) return undefined
  const year = project.createdAt.getFullYear() > 2000 ? String(project.createdAt.getFullYear()) : '2026'
  return { ...genericCaseStudy({ slug, title: project.title, description: project.description, categories: parseList(project.categories), image: project.imageUrl, link: project.link, year }), related: relatedProjects(projects, slug) }
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params
  const data = await dataForSlug(slug)
  if (!data) return {}
  const title = `${data.client} — Étude de cas`
  return {
    title, description: data.statement, alternates: { canonical: `/realisations/${slug}` },
    openGraph: { title, description: data.statement, type: 'article', url: `/realisations/${slug}`, images: [{ url: '/litus-og-social.png', width: 1200, height: 630, alt: 'Litus — Votre agence web pour développer votre activité.' }] },
    twitter: { card: 'summary_large_image', title, description: data.statement, images: ['/litus-og-social.png'] },
  }
}

export default async function CaseStudyRoute({ params }: RouteProps) {
  const { slug } = await params
  const data = await dataForSlug(slug)
  if (!data) notFound()
  const schema = { '@context': 'https://schema.org', '@type': 'CreativeWork', name: data.client, description: data.statement, url: `https://litus.fr/realisations/${slug}`, image: `https://litus.fr${data.hero.desktop}`, creator: { '@type': 'Organization', name: 'Litus', url: 'https://litus.fr' } }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /><CaseStudyTemplate data={data} /></>
}
