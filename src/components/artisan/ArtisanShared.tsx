import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { portfolioCatalog } from '@/lib/portfolio-catalog';

export function ArtisanPricing({ context }: { context?: string }) {
  const offers = [
    { name: 'Site Essentiel', price: '99', purpose: 'Poser une base professionnelle', items: ['Site vitrine responsive', 'Formulaire de contact et bases SEO', 'Hébergement et maintenance'] },
    { name: 'Visibilité', price: '229', purpose: 'Développer votre présence locale', items: ['Site personnalisé', 'Référencement suivi chaque mois', 'Une présence qui évolue avec votre activité'] },
    { name: 'Growth', price: '590', purpose: 'Structurer votre acquisition', items: ['Une offre plus complète', 'Site, SEO et accompagnement acquisition', 'Périmètre défini avec votre entreprise'] },
  ];
  return <section className="art-section trade-pricing" id="budget" aria-labelledby="trade-budget-title">
    <div className="art-container">
      <p className="art-kicker">Un budget lisible</p>
      <h2 id="trade-budget-title">Combien coûte <em>votre présence en ligne ?</em></h2>
      <p className="trade-section-lead">{context ?? 'Une première vitrine et un dispositif d’acquisition complet n’ont pas le même périmètre. Voici les repères publics Litus pour préparer la discussion, pas un devis automatique.'}</p>
      <div className="trade-price-grid">{offers.map((offer, i) => <article className={`trade-price-card${i === 1 ? ' trade-price-featured' : ''}`} key={offer.name}>
        <p className="trade-price-purpose">{offer.purpose}</p><h3>{offer.name}</h3>
        <p className="trade-price"><strong>{offer.price} €</strong><span>/ mois</span></p>
        <ul>{offer.items.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
        <Link href="/tarifs" className="trade-text-link">Consulter l’offre <ArrowRight size={16} aria-hidden="true" /></Link>
      </article>)}</div>
      <p className="trade-price-note">Périmètre et durée précisés au devis. Le SEO Essentiel est proposé à 99 €/mois après validation de l’état initial du site. La gestion Google Ads commence à 129 €/mois, <strong>hors budget publicitaire versé à Google</strong>. Les options, contenus et fonctionnalités spécifiques sont à cadrer ensemble.</p>
    </div>
  </section>;
}

export function ArtisanCases({ slugs }: { slugs: string[] }) {
  const stories = slugs.flatMap(slug => {
    const story = portfolioCatalog.find(item => item.slug === slug);
    return story ? [story] : [];
  });
  if (!stories.length) return null;
  return <section className="art-section" id="realisations" aria-labelledby="trade-cases-title"><div className="art-container">
    <div className="trade-heading-row"><div><p className="art-kicker">Du concret</p><h2 id="trade-cases-title">Des projets <em>déjà accompagnés.</em></h2></div><Link href="/realisations" className="trade-text-link">Toutes nos réalisations <ArrowRight size={18} /></Link></div>
    <div className="trade-case-grid">{stories.map(story => <article className="trade-case" key={story.slug}>
      <div className="trade-browser"><span aria-hidden="true">•••</span><span>{story.title}</span></div>
      <Image src={story.cover.src} alt={story.cover.alt} width={story.cover.width} height={story.cover.height} sizes="(max-width: 760px) 100vw, 50vw" className="trade-case-image" />
      <div className="trade-case-copy"><h3>{story.title}</h3><p>{story.scope}</p>
        {story.slug === 'sarl-pean-j' && <><div className="trade-result"><strong>+30 <small>leads / mois</small></strong><strong>≈ 15 € <small>par conversion</small></strong></div><p>Un accompagnement Google Ads, pas une création de site. Ces résultats propres à ce client ne constituent pas une promesse de performance pour un autre projet.</p></>}
        <Link href="/realisations" className="trade-text-link">Explorer le portfolio Litus <ArrowRight size={16} /></Link>
      </div>
    </article>)}</div>
  </div></section>;
}

export function ArtisanFaq({ items }: { items: { question: string; answer: string }[] }) {
  return <section className="art-section trade-faq-section" id="questions" aria-labelledby="trade-faq-title"><div className="art-container trade-faq-layout">
    <div><p className="art-kicker">Avant de se lancer</p><h2 id="trade-faq-title">Vos questions,<br /><em>nos réponses.</em></h2><p>Un point reste à préciser ? Parlons de votre métier, de vos contraintes et de vos priorités.</p><Link href="/contact" className="trade-text-link">Poser votre question <ArrowRight size={18} /></Link></div>
    <div className="trade-faq">{items.map(item => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
  </div></section>;
}

export function ArtisanCta({ title = 'Un site qui travaille pour votre entreprise.' }: { title?: string }) {
  return <section className="art-section trade-final"><div className="art-container"><div className="trade-final-inner">
    <div><p className="art-kicker">Litus · Lorient & Le Mans</p><h2>{title}</h2><p>Vos prestations, votre secteur, vos prochains chantiers : prenons le temps de construire un projet utile.</p></div>
    <div className="trade-final-actions"><Link href="/contact" className="trade-button">Parlons de votre projet <ArrowRight size={19} /></Link><a href="tel:+33744985521" className="trade-text-link"><Phone size={17} />07 44 98 55 21</a></div>
  </div></div></section>;
}
