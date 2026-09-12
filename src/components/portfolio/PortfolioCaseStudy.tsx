import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { PortfolioStory } from '@/lib/portfolio-catalog';
import './portfolio-reference.css';

export default function PortfolioCaseStudy({ story, related }: { story: PortfolioStory; related: PortfolioStory[] }) {
  const images = story.gallery.slice(1);
  return (
    <article className="portfolio-case" style={{ '--project-tone': story.tone, '--project-accent': story.accent } as CSSProperties}>
      <div className="portfolio-container">
        <Link href="/realisations" className="portfolio-case-back"><ArrowLeft size={15} aria-hidden="true" /> Toutes les réalisations</Link>
        <header className="portfolio-case-heading">
          <div><p className="portfolio-eyebrow"><span /> {story.sector}</p><h1>{story.title}</h1><p className="portfolio-case-statement">{story.headline}</p></div>
          <div><p className="portfolio-case-summary">{story.summary}</p><dl className="portfolio-case-facts"><div><dt>Accompagnement</dt><dd>{story.categories.join(' · ')}</dd></div>{story.stack.length > 0 && <div><dt>Technologies</dt><dd>{story.stack.join(' · ')}</dd></div>}</dl></div>
        </header>
        <figure className={`portfolio-case-hero${story.cover.kind === 'brand' ? ' is-brand' : ''}`}>
          <Image src={story.cover.src} alt={story.cover.alt} width={story.cover.width} height={story.cover.height} sizes="(max-width: 760px) 92vw, (max-width: 1500px) 90vw, 1400px" priority />
        </figure>
        <p className="portfolio-case-caption">{story.cover.caption}{story.archived ? ' · Archive du projet, conservée lorsque le site actuel ne peut pas être consulté.' : ''}</p>
        <section className="portfolio-case-scope" aria-labelledby="project-scope">
          <div><p className="portfolio-eyebrow"><span /> LE PÉRIMÈTRE</p><h2 id="project-scope">Notre rôle<br />sur ce projet.</h2></div>
          <div className="portfolio-case-scope-copy"><p>{story.scope}</p>{story.sourceUrl && <a href={story.sourceUrl} target="_blank" rel="noopener noreferrer" className="portfolio-explore">Explorer le site client <ArrowUpRight size={17} aria-hidden="true" /><span className="sr-only"> (nouvel onglet)</span></a>}</div>
        </section>
        {story.focus.length > 0 && <section className="portfolio-case-focus" aria-label="Les particularités du projet">{story.focus.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</section>}
        {images.length > 0 && <section aria-labelledby="project-gallery"><div className="portfolio-case-section-heading"><div><p className="portfolio-eyebrow"><span /> DANS LE DÉTAIL</p><h2 id="project-gallery">Un aperçu, vraiment concret.</h2></div><p>Interfaces et visuels issus du site {story.title}, sélectionnés pour découvrir son univers.</p></div><div className="portfolio-case-gallery">{images.map((asset) => <figure key={asset.src}><div className={`portfolio-case-gallery-frame is-${asset.kind}`}><Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height} sizes="(max-width: 760px) 90vw, 65vw" loading="lazy" /></div><figcaption className="portfolio-case-caption">{asset.caption}</figcaption></figure>)}</div></section>}
        {story.links.length > 0 && <section className="portfolio-case-expertise"><div><h2>Les expertises à explorer</h2><p>Pour aller plus loin sur les sujets de ce projet.</p></div><div className="portfolio-expertise-links">{story.links.map((link) => <Link key={link.href} href={link.href}>{link.label}<ArrowUpRight size={14} aria-hidden="true" /></Link>)}</div></section>}
        <section className="portfolio-outro-inner"><div><h2>Et votre prochain projet ?</h2><p>Parlons de votre activité, de vos besoins et de la bonne prochaine étape.</p></div><Link href="/contact" className="portfolio-cta">Parlons de votre projet <ArrowUpRight size={18} aria-hidden="true" /></Link></section>
        {related.length > 0 && <section className="portfolio-case-related"><div className="portfolio-case-section-heading"><h2>D’autres univers à découvrir.</h2><Link href="/realisations" className="portfolio-explore">Toutes nos réalisations <ArrowUpRight size={15} aria-hidden="true" /></Link></div><div className="portfolio-case-related-grid">{related.slice(0, 3).map((project) => <Link key={project.slug} href={`/realisations/${project.slug}`}><Image src={project.cover.src} alt={project.cover.alt} width={project.cover.width} height={project.cover.height} sizes="(max-width: 760px) 90vw, 30vw" loading="lazy" /><h3>{project.title}<ArrowUpRight size={19} aria-hidden="true" /></h3><p>{project.headline}</p></Link>)}</div></section>}
      </div>
    </article>
  );
}
