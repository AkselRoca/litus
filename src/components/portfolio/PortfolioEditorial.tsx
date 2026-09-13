'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Grid2X2, List, Workflow } from 'lucide-react';
import { Caveat } from 'next/font/google';
import { portfolioSlug } from '@/lib/portfolio-slugs';
import type { PortfolioStory } from '@/lib/portfolio-catalog';
import './portfolio-reference.css';
import './portfolio-original-hero.css';
import { AcquisitionResults } from './AcquisitionResults';

const handwriting = Caveat({ preload: false, subsets: ['latin'], weight: ['400', '500', '600'], display: 'swap' });
type Project = { id: string; title: string; categories: string | null; tags: string | null; imageUrl: string; description: string | null; editorial?: PortfolioStory };
function values(value: string | null): string[] {
  try { const parsed: unknown = JSON.parse(value || '[]'); return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []; } catch { return []; }
}

export default function PortfolioEditorial({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('Tous');
  const [layout, setLayout] = useState<'portfolio' | 'list'>('portfolio');
  const filters = useMemo(() => ['Tous', ...new Set(projects.flatMap((project) => project.editorial?.categories ?? values(project.categories)))], [projects]);
  const visible = useMemo(() => projects.filter((project) => filter === 'Tous' || (project.editorial?.categories ?? values(project.categories)).includes(filter)), [projects, filter]);
  return (
    <section className="portfolio-editorial has-original-hero" aria-labelledby="portfolio-title">
      <div className="portfolio-container">
        <header className="portfolio-original-hero">
          <p className="portfolio-original-eyebrow"><Workflow size={16} aria-hidden="true" /> Portfolio</p>
          <h1 id="portfolio-title">Des projets pensés<br />pour <span>convertir.</span></h1>
          <p className="portfolio-original-copy">Nous ne créons pas simplement des sites web : nous concevons des outils<br className="portfolio-original-break" /> de visibilité, d’acquisition et de conversion adaptés aux objectifs de chaque client.</p>
          <aside aria-hidden="true" className={`portfolio-original-note is-left ${handwriting.className}`}>Des entreprises<br />réelles, des résultats<br />concrets.<svg viewBox="0 0 70 54"><path d="M12 3c2 23 12 34 42 37m-10-10 11 10-13 5" /></svg></aside>
          <aside aria-hidden="true" className={`portfolio-original-note is-right ${handwriting.className}`}><span>╱ ╱</span>Plus de visibilité,<br />plus de clients</aside>
        </header>
        <div className="portfolio-toolbar">
          <div className="portfolio-filters" aria-label="Filtrer les réalisations">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'Tous' && <span>{projects.length}</span>}</button>)}</div>
          <div className="portfolio-view" aria-label="Présentation des projets"><button type="button" onClick={() => setLayout('portfolio')} aria-pressed={layout === 'portfolio'} aria-label="Composition portfolio"><Grid2X2 size={18} /></button><button type="button" onClick={() => setLayout('list')} aria-pressed={layout === 'list'} aria-label="Liste des projets"><List size={18} /></button></div>
        </div>
        <p className="portfolio-result-count" role="status">{visible.length} réalisation{visible.length > 1 ? 's' : ''}{filter !== 'Tous' ? ` · ${filter}` : ' · Une sélection de notre travail'}</p>
        <div id="portfolio-projects" className={`portfolio-mosaic${layout === 'list' ? ' is-list' : ''}`}>
          {visible.map((project, index) => {
            const story = project.editorial;
            const slug = story?.slug ?? portfolioSlug(project.title);
            const tags = story?.stack ?? values(project.tags);
            const cover = story?.cover;
            const secondary = story?.gallery.find((asset) => asset.src !== cover?.src && asset.kind !== 'mobile');
            const span = story?.performance ? 8 : [8, 4, 4, 8, 8, 4, 6, 6, 8, 4, 4, 8][index % 12];
            const layered = !story?.performance && secondary && span >= 8 && layout === 'portfolio';
            return (
              <article key={project.id} className={`portfolio-project portfolio-span-${story?.performance ? 8 : span}${story?.archived ? ' is-archive' : ''}`} style={{ '--project-accent': story?.accent ?? '#ff581c', '--project-tone': story?.tone ?? '#efebe4', '--project-delay': `${Math.min(index % 4, 3) * 75}ms` } as CSSProperties}>
                <Link href={`/realisations/${slug}`} className={`portfolio-art${story?.performance ? ' is-acquisition' : cover?.kind === 'brand' ? ' is-photographic' : ' is-interface'}${layered ? ' is-layered' : ''}`} aria-label={`Découvrir ${story?.performance ? 'le cas Google Ads' : 'le projet'} ${project.title}`}>
                  {story?.performance ? <AcquisitionResults title={story.title} results={story.performance} compact /> : <div className="portfolio-image-frame">
                    {cover?.kind !== 'brand' && <div className="portfolio-browser" aria-hidden="true"><i /><i /><i /><span>{project.title}</span></div>}
                    <Image src={cover?.src ?? project.imageUrl} alt={cover?.alt ?? `Aperçu du site ${project.title}`} width={cover?.width ?? 1440} height={cover?.height ?? 1000} sizes={layout === 'list' ? '(max-width: 760px) 90vw, 35vw' : span >= 8 ? '(max-width: 760px) 92vw, (max-width: 1100px) 60vw, 850px' : '(max-width: 760px) 92vw, 42vw'} priority={index === 0} className="portfolio-cover" />
                  </div>}
                  {layered && secondary && <div className={`portfolio-inset${secondary.kind === 'brand' ? ' is-photo' : ''}`}><Image src={secondary.src} alt={secondary.alt} width={secondary.width} height={secondary.height} sizes="(max-width: 760px) 32vw, 270px" loading="lazy" /></div>}
                  <span className="portfolio-open" aria-hidden="true"><ArrowUpRight size={23} /></span>
                  {story?.scopeOnly && <span className="portfolio-scope-tag">{slug === 'broadwhey' ? 'Conseil e-commerce' : 'Accompagnement du blog'}</span>}
                </Link>
                <div className="portfolio-project-copy">
                  <div className="portfolio-project-topline"><span>{story?.scopeOnly ? (slug === "broadwhey" ? "Conseil e-commerce" : "Contenu éditorial") : tags.slice(0, 2).join(" / ") || "Site web"}</span></div>
                  <h2><Link href={`/realisations/${slug}`}>{project.title}<ArrowUpRight size={22} aria-hidden="true" /></Link></h2>
                  <p className="portfolio-project-headline">{story?.headline ?? project.description}</p>
                  {story?.performance && <p className="portfolio-performance-note">{story.performance.note}</p>}
                  <div className="portfolio-expertise-links">{story?.links.slice(0, 3).map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight size={12} aria-hidden="true" /></Link>)}</div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="portfolio-closing-note"><span className={handwriting.className}>Des métiers différents. La même attention.</span><p>Création de site, e-commerce, acquisition ou conseil : chaque fiche précise le périmètre de notre accompagnement.</p></div>
      </div>
    </section>
  );
}
