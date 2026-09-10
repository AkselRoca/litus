'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChartNoAxesCombined, Grid2X2, List, Workflow } from 'lucide-react'
import { Caveat } from 'next/font/google'
import { portfolioSlug } from '@/lib/portfolio-slugs'
import './portfolio-reference.css'

const handwriting = Caveat({ subsets: ['latin'], weight: '400', display: 'swap' })
type Project = {
  id: string; title: string; categories: string; imageUrl: string; link?: string | null
  stats: string; tags: string; description: string; featured: boolean; order?: number
}
const categories = [
  ['Tous', 'Tous'], ['Site Vitrine', 'Site vitrine'], ['Site E-commerce', 'Site e-commerce'],
  ['Google Ads', 'Google Ads'], ['Référencement Naturel (SEO)', 'Référencement naturel (SEO)'],
  ['Outil Métier / Application Web', 'Outil métier / Application web'], ['Identité Visuelle', 'Identité visuelle'],
]
function projectCategories(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch { return [] }
}
// Opening selection requested in the brief; remaining visible projects stay managed by the CMS.
function prepareProjects(projects: Project[]) {
  const west = projects.find(p => /west cl[oô]tures/i.test(p.title))
  const aspire = projects.find(p => /aspire/i.test(p.title))
  const demetis = projects.find(p => /dem[eé]tis/i.test(p.title))
  const common = { stats: '[]', tags: '[]', featured: true }
  const opening: Project[] = [
    { ...common, ...west, id: west?.id ?? 'reference-west', title: 'West Clôtures & Paysage',
      description: 'Refonte du site pour une meilleure visibilité locale, une optimisation SEO complète et une stratégie d’acquisition de clients via Google Ads.',
      categories: JSON.stringify([...new Set(['Site Vitrine', 'Google Ads', 'Référencement Naturel (SEO)', ...projectCategories(west?.categories ?? '[]')])]),
      imageUrl: '/realisations/west-workspace-wide.webp', link: west?.link || 'https://www.westclotures.fr/' },
    { ...common, ...demetis, id: demetis?.id ?? 'reference-demetis', title: 'Demétis Immobilier',
      description: 'Site vitrine sur-mesure pour valoriser leurs biens et renforcer leur visibilité locale sur Google.',
      categories: JSON.stringify(['Site Vitrine', 'Référencement Naturel (SEO)']),
      imageUrl: '/realisations/demetis-website.webp', link: 'https://www.demetisimmo.fr/' },
    { ...common, ...aspire, id: aspire?.id ?? 'reference-aspire', title: 'Aspire Énergie',
      description: 'Refonte du site et campagnes Google Ads pour développer leur acquisition de leads dans toute la région.',
      categories: JSON.stringify(['Site Vitrine', 'Google Ads']),
      imageUrl: '/realisations/aspire-website.webp', link: 'https://www.aspire-energie.com/' },
  ]
  return [...opening, ...projects.filter(p => ![west?.id, demetis?.id, aspire?.id].includes(p.id))]
}
export function PortfolioEditorial({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const selection = useMemo(() => prepareProjects(projects), [projects])
  const filtered = selection.filter(p => activeCategory === 'Tous' || projectCategories(p.categories).includes(activeCategory))
  return <div className="portfolio-reference">
    <header className="portfolio-intro">
      <p className="portfolio-eyebrow"><Workflow size={16} aria-hidden="true" /> Portfolio</p>
      <h1>Des projets pensés<br />pour <span>convertir.</span></h1>
      <p className="portfolio-intro-copy">Nous ne créons pas simplement des sites web : nous concevons des outils<br className="portfolio-desktop-break" /> de visibilité, d’acquisition et de conversion adaptés aux objectifs de chaque client.</p>
      <aside aria-hidden="true" className={`portfolio-note portfolio-note-left ${handwriting.className}`}>Des entreprises<br />réelles, des résultats<br />concrets.<svg viewBox="0 0 70 54"><path d="M12 3c2 23 12 34 42 37m-10-10 11 10-13 5" /></svg></aside>
      <aside aria-hidden="true" className={`portfolio-note portfolio-note-right ${handwriting.className}`}><span>╱ ╱</span>Plus de visibilité,<br />plus de clients</aside>
    </header>
    <div className="portfolio-toolbar">
      <div className="portfolio-filters" role="group" aria-label="Filtrer les réalisations">{categories.map(([value, label]) => <button key={value} type="button" aria-pressed={activeCategory === value} aria-controls="portfolio-projects" onClick={() => setActiveCategory(value)}>{label}</button>)}</div>
      <div className="portfolio-view" role="group" aria-label="Affichage des réalisations">
        <button type="button" aria-label="Vue grille" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><Grid2X2 size={18} aria-hidden="true" /></button>
        <button type="button" aria-label="Vue liste" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={20} aria-hidden="true" /></button>
      </div>
    </div>
    <p className="sr-only" role="status">{filtered.length} réalisation{filtered.length > 1 ? 's' : ''} affichée{filtered.length > 1 ? 's' : ''}</p>
    <div id="portfolio-projects" className={`portfolio-projects portfolio-view-${view}`} key={`${activeCategory}-${view}`}>
      {filtered.map((project, index) => {
        const isWest = project.id === selection[0].id
        const featured = isWest && view === 'grid'
        const browser = /dem[eé]tis|aspire/i.test(project.title)
        return <article key={project.id} className={`portfolio-project ${featured ? 'portfolio-project-featured' : ''} ${isWest ? 'portfolio-project-west' : ''}`}>
          <div className="portfolio-project-copy">
            <div className="portfolio-tags">{projectCategories(project.categories).slice(0, 3).map(category => <span key={category}>{category}</span>)}</div>
            <h2>{project.title}</h2><p>{project.description}</p>
            <div className="portfolio-project-actions">
              <Link href={`/realisations/${portfolioSlug(project.title)}`} className={featured ? 'site-cta-primary' : 'portfolio-project-link'} aria-label={`Voir l’étude de cas ${project.title}`}>Voir le projet <ArrowRight size={18} aria-hidden="true" /></Link>
              {featured && <span className="portfolio-project-proof"><ChartNoAxesCombined size={24} aria-hidden="true" /><span>Résultats concrets<br />et clients au rendez-vous</span></span>}
            </div>
          </div>
          <div className={`portfolio-project-visual ${browser ? 'portfolio-browser' : ''}`}>
            {browser && <div className="portfolio-browser-bar" aria-hidden="true"><i /><i /><i /></div>}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.imageUrl} alt={`Aperçu du site ${project.title}`} width={browser ? 1440 : 1536} height={browser ? 950 : 1024} loading={index < 3 ? 'eager' : 'lazy'} />
          </div>
          {featured && <span aria-hidden="true" className={`portfolio-project-note ${handwriting.className}`}>Un site performant<br />au service du terrain<svg viewBox="0 0 70 54"><path d="M58 3c-2 23-12 34-42 37m10-10-11 10 13 5" /></svg></span>}
        </article>
      })}
      {filtered.length === 0 && <p className="portfolio-empty">Les projets de cette catégorie seront bientôt présentés ici.</p>}
    </div>
  </div>
}
