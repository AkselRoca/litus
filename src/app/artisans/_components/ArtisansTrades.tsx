import Link from 'next/link';
import { ArrowRight, Droplets, Zap, Thermometer, House, DoorOpen, PaintRoller, Grid2X2, BrickWall, Leaf, Hammer } from 'lucide-react';
import { trades } from '@/lib/artisan/catalog';
import { ArtisansReveal } from './ArtisansReveal';

const icons = [Droplets, Zap, Thermometer, House, DoorOpen, PaintRoller, Grid2X2, BrickWall, Leaf, Hammer];
export default function ArtisansTrades() {
  return <section className="art-section art-trades" id="metiers-artisans" aria-labelledby="art-trades-title"><div className="art-container">
    <div className="art-section-heading"><p className="art-kicker">Vos métiers</p><h2 id="art-trades-title">Des solutions pensées <em>pour les artisans.</em></h2><p>Choisissez votre activité : contenus à prévoir, référencement, acquisition, budget et exemples de parcours adaptés à votre métier.</p></div>
    <ArtisansReveal className="art-trades-grid">{trades.map((trade, index) => {
      const Icon = icons[index];
      return <Link key={trade.slug} href={`/artisan/${trade.slug}`} className={`art-trade art-tone-${index % 4}`}><Icon size={26} aria-hidden="true" /><span>{trade.name}</span><ArrowRight size={16} aria-hidden="true" /></Link>;
    })}</ArtisansReveal>
  </div></section>;
}
