import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BarChart3, Check, Code2, FileText, Linkedin, MapPin, Monitor, Search, ShieldCheck, ShoppingCart, Star, Zap } from 'lucide-react'

// Portrait attribution and individual LinkedIn profiles confirmed by the team.
const team = [
  {
    name: 'Arthur', role: 'SEO & création de site sur mesure', city: 'Le Mans',
    portrait: '/team/portrait-clair.png', portraitClass: 'portrait-clair',
    linkedin: 'https://www.linkedin.com/in/arthur-geveaux',
    description: 'Spécialisé dans le référencement naturel et la création de sites internet sur mesure, Arthur aide les entreprises à gagner en visibilité, à mieux se positionner sur Google et à construire des sites utiles, pensés pour durer.',
    quote: 'Des sites utiles, pensés pour durer.',
    skills: [{ label: 'Référencement naturel (SEO)', short: 'Référencement naturel', icon: Search }, { label: 'Stratégie de contenu', short: 'Stratégie de contenu', icon: FileText }, { label: 'Création de site sur mesure', short: 'Site sur mesure', icon: Code2 }],
  },
  {
    name: 'Aksel', role: 'Google, création de site & e-commerce', city: 'Lorient',
    portrait: '/team/portrait-brun.png', portraitClass: 'portrait-brun',
    linkedin: 'https://www.linkedin.com/in/akselroca/',
    description: 'Spécialisé dans l’écosystème Google, la création de sites internet et le e-commerce, Aksel accompagne les entreprises dans leur développement en ligne, de la stratégie à la mise en œuvre.',
    quote: 'Plus de visibilité, plus d’opportunités.',
    skills: [{ label: 'Expertise Google', short: 'Google', icon: BarChart3 }, { label: 'Création de site internet', short: 'Création de site', icon: Monitor }, { label: 'E-commerce', short: 'E-commerce', icon: ShoppingCart }],
  },
] as const

const values = [
  { title: 'Proximité', icon: MapPin, text: 'Une agence locale à Lorient et au Mans, toujours proche de vous, avec un accompagnement personnalisé et réactif.' },
  { title: 'Transparence', icon: ShieldCheck, text: 'Des prix clairs, des délais respectés et des conseils honnêtes. Vous restez propriétaire de votre site, toujours.' },
  { title: 'Performance', icon: Zap, text: 'Des sites rapides, bien pensés et optimisés pour convertir vos visiteurs en clients.' },
  { title: 'Visibilité', icon: BarChart3, text: 'Une stratégie SEO et Google pour attirer les bons visiteurs et développer durablement votre activité.' },
]

function HandArrow({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 75 66" fill="none" aria-hidden="true"><path d="M17 4C12 34 30 53 62 52m0 0L50 42m12 10-15 4" /></svg>
}

export function AboutContent() {
  return <div className="about-reference">
    <section className="about-hero" aria-labelledby="about-title">
      <div className="about-hero-grid">
        <div className="about-hero-copy about-enter">
          <p className="about-eyebrow"><span />LITUS · LORIENT & LE MANS</p>
          <h1 id="about-title">Deux experts.<br />Une vision claire du web.</h1>
          <p className="about-hero-intro">Litus est une agence web à taille humaine, basée à Lorient et au Mans, qui accompagne les entreprises dans la création de sites internet clairs, efficaces et performants.</p>
          <div className="about-hero-actions"><Link href="/contact" className="site-cta-primary">Parlons de votre projet<ArrowRight size={17} /></Link><Link href="/realisations" className="site-cta-secondary">Voir nos réalisations</Link></div>
          <div className="about-social-proof"><span className="about-proof-people" aria-hidden="true"><Image src="/team/portrait-clair.png" width={41} height={41} alt="" /><Image src="/team/portrait-brun.png" width={41} height={41} alt="" /></span><div><strong className="about-google-rating"><Star size={13} fill="currentColor" />5/5 sur Google</strong><span>Une relation de confiance</span></div><div><strong>Des projets qui vous ressemblent</strong><span>Artisans, commerçants, PME…</span></div></div>
        </div>
        <div className="about-hero-scene about-enter">
          <div className="about-team-photo"><Image src="/blog/photos/developpeur-travail.webp" alt="Photo d’illustration : des mains au clavier d’un ordinateur portable sur une table en bois" fill sizes="(max-width: 1000px) 100vw, 55vw" priority /></div>
          <div className="about-scene-note about-handwriting" aria-hidden="true">Des sites<br />qui font grandir<br />votre activité<HandArrow /></div>
          <div className="about-search-preview about-float" aria-hidden="true"><span className="about-google-wordmark"><b>G</b><b>o</b><b>o</b><b>g</b><b>l</b><b>e</b></span><div>votre entreprise ici<Search size={10} /></div><span className="about-search-result" /><span /><span /></div>
          <div className="about-shop-preview about-float" aria-hidden="true"><span>Votre site e-commerce</span><div><Image src="/shop-demo-lamp.webp" alt="" fill sizes="100px" /></div><span>Une boutique à votre image<ShoppingCart size={12} /></span></div>
          <div className="about-scene-note-right about-handwriting" aria-hidden="true">Plus de visibilité<br />Plus de clients<br />Plus d’opportunités<HandArrow /></div>
          <div className="about-hero-expertise">{team.map(person => <div key={person.name} className="about-expertise-card about-float"><strong>{person.name === 'Arthur' ? <Search size={19} /> : <BarChart3 size={19} />}{person.name === 'Arthur' ? 'SEO & sur-mesure' : 'Google & e-commerce'}</strong><ul>{person.skills.filter(skill => skill.short !== 'Stratégie de contenu').map(({short,icon: Icon}) => <li key={short}><Icon size={12} />{short}</li>)}</ul></div>)}</div>
          <div className="about-scene-benefits"><div><BarChart3 size={24} /><span><strong>Une visibilité travaillée</strong><small>Pour attirer les bons clients</small></span></div><div><span className="about-performance-check"><Check size={23} /></span><span><strong>Pensés pour performer</strong><small>Rapidité · SEO · Sur-mesure</small></span></div></div>
        </div>
      </div>
    </section>
    <section className="about-values" aria-labelledby="about-values-title"><div className="about-container"><div className="about-section-heading"><h2 id="about-values-title">Expertise & savoir-faire</h2><p>Nous mettons nos compétences complémentaires au service des artisans, commerçants et PME pour créer des sites internet qui apportent de vrais résultats.</p></div><div className="about-values-grid">{values.map(({title,icon: Icon,text}) => <article className="about-value-card" key={title}><span><Icon size={25} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="about-team-section" aria-labelledby="about-team-title"><div className="about-container"><div className="about-team-heading"><div><p className="about-eyebrow"><span />NOTRE ÉQUIPE</p><h2 id="about-team-title">Une équipe complémentaire</h2><p>Deux parcours, une même ambition : mettre le web au service des entrepreneurs locaux.<br />Nous combinons nos expertises pour vous offrir un accompagnement complet et efficace.</p></div><span className="about-handwriting">Deux villes, <br />une même passion : <br />le web</span></div><div className="about-team-grid">{team.map(person => <article key={person.name} className="about-person-card"><div className={`about-person-photo ${person.portraitClass}`}><Image src={person.portrait} alt={`Portrait de ${person.name}, cofondateur de Litus`} fill sizes="(max-width: 600px) 100px, 190px" /><a className="about-person-linkedin" href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Voir le profil LinkedIn d’${person.name} (nouvel onglet)`} title={`LinkedIn d’${person.name}`}><Linkedin aria-hidden="true" /></a></div><div className="about-person-info"><div className="about-person-heading"><div><h3>{person.name}</h3><p>{person.role}</p></div><q className="about-handwriting">{person.quote}</q></div><span className="about-person-city"><MapPin size={13} />Basé {person.city === 'Lorient' ? 'à Lorient' : 'au Mans'}</span><p className="about-person-description">{person.description}</p><strong className="about-person-skills-title">Ses expertises</strong><ul className="about-person-skills">{person.skills.map(({label,icon: Icon}) => <li key={label}><Icon size={13} />{label}</li>)}</ul></div></article>)}</div></div></section>
    <section className="about-final-cta"><div className="about-container"><div><p>UN PROJET ?</p><h2>On construit des sites beaux, utiles et trouvables.</h2><span>Échangeons sur votre projet et voyons ensemble comment Litus peut vous aider à franchir un cap.</span></div><div><Link href="/contact" className="site-cta-primary">Parlons de votre projet<ArrowRight size={17} /></Link><small>Appel gratuit · Sans engagement</small></div><span className="about-handwriting">Des idées<br />aux résultats<HandArrow /></span></div></section>
  </div>
}
