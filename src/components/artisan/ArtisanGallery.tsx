import Image from 'next/image';
import photos from '@/lib/artisan/photos.json';
import { ArtisansReveal } from '@/app/artisans/_components/ArtisansReveal';

export default function ArtisanGallery({ slug }: { slug: string }) {
  const images = photos[slug as keyof typeof photos];
  if (!images) return null;
  return <section className="art-section trade-gallery" aria-labelledby="trade-gallery-title"><div className="art-container">
    <div className="trade-heading-row"><div><p className="art-kicker">Le métier en images</p><h2 id="trade-gallery-title">Des gestes précis.<br /><em>Des projets concrets.</em></h2></div><p className="trade-heading-aside">Des photographies d’illustration pour montrer les gestes, les équipements et les lieux de votre activité. Elles ne représentent pas des réalisations clients de Litus.</p></div>
    <ArtisansReveal className="trade-gallery-grid">{images.map(photo => <figure key={photo.src}>
      <div className="trade-gallery-image"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 760px) 100vw, 50vw" loading="lazy" /></div>
      <figcaption><strong>{photo.caption}</strong><a href={photo.source} target="_blank" rel="noopener noreferrer">Photo : {photo.author} / Pexels<span className="sr-only"> (nouvel onglet)</span></a></figcaption>
    </figure>)}</ArtisansReveal>
    <p className="trade-small trade-gallery-license">Photos utilisées sous <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">licence Pexels</a>.</p>
  </div></section>;
}
