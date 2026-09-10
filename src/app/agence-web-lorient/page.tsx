import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, BarChart3, CalendarDays, Check, ChevronRight, CircleGauge,
  Handshake, MapPin, MessageCircle, Monitor, RefreshCw, Search,
  ShoppingBag, Target, UsersRound,
} from 'lucide-react'
import { lorientProjects } from '@/lib/lorient-projects'
import { LorientMap } from './LorientMap'
import { LorientReveal } from './LorientReveal'
import '../agence-web-le-mans/le-mans.css'
import './lorient.css'

const title = 'Agence web Lorient : site internet, SEO & Google Ads | Litus'
const description = 'Litus accompagne les entreprises de Lorient et du Morbihan : création de sites, SEO et Google Ads. Échangez avec Aksel, présent dans le secteur.'
const contactHref = '/contact?objet=Projet%20%C3%A0%20Lorient'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: null,
  alternates: { canonical: '/agence-web-lorient' },
  openGraph: {
    title, description, url: 'https://litus.fr/agence-web-lorient',
    type: 'website', locale: 'fr_FR', siteName: 'Litus',
    images: [{ url: '/litus-og-social.png', width: 1200, height: 630, alt: 'Litus — Votre agence web pour développer votre activité.' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/litus-og-social.png'] },
}

const services = [
  { icon: Monitor, title: 'Création de site internet', text: 'Présenter votre activité avec un site vitrine clair, professionnel et pensé pour faciliter les demandes de contact.', href: '/creation-site-internet', link: 'Découvrir les sites vitrine' },
  { icon: RefreshCw, title: 'Refonte de site', text: 'Moderniser votre image, simplifier la navigation et mieux mettre en valeur vos prestations, en conservant ce qui fonctionne.', href: '/refonte-site-internet', link: 'Faire évoluer votre site' },
  { icon: Search, title: 'Référencement naturel', text: 'Travailler votre visibilité sur les recherches liées à votre métier et à votre secteur d’intervention, à Lorient et au-delà.', href: '/seo-local', link: 'Découvrir notre approche SEO' },
  { icon: BarChart3, title: 'Google Ads', text: 'Mettre en place des campagnes ciblées, suivre les demandes et ajuster les actions selon les résultats.', href: '/google-ads', link: 'Découvrir Google Ads' },
  { icon: ShoppingBag, title: 'E-commerce', text: 'Créer une boutique adaptée à vos produits, à vos clients et à votre gestion quotidienne.', href: '/creation-site-ecommerce', link: 'Découvrir le e-commerce' },
  { icon: Target, title: 'Stratégie digitale', text: 'Définir les priorités entre site, contenus, présence locale et publicité, avec un plan d’action partagé.', href: '/contact?objet=Strat%C3%A9gie%20digitale%20%C3%A0%20Lorient', link: 'Échanger sur vos priorités' },
]
const cities = ['Lorient', 'Lanester', 'Ploemeur', 'Hennebont', 'Larmor-Plage', 'Quéven', 'Guidel', 'Caudan', 'Languidic']
const steps = [
  { icon: MessageCircle, title: 'On se rencontre', text: 'Votre activité, votre clientèle et vos envies. Un premier échange à distance ou avec Aksel dans le secteur de Lorient.' },
  { icon: Target, title: 'On définit les priorités', text: 'Nous choisissons les actions utiles à votre projet, puis définissons ensemble le périmètre, les étapes et le calendrier.' },
  { icon: Monitor, title: 'On crée et on lance', text: 'Votre site et les actions de visibilité prennent forme, avec des points réguliers et votre validation avant le lancement.' },
  { icon: CircleGauge, title: 'On fait évoluer', text: 'Selon l’accompagnement choisi : maintenance, référencement naturel ou Google Ads. Nous suivons les actions et ajustons la suite.' },
]
const faqs = [
  { question: 'Peut-on vous rencontrer à Lorient ou dans les environs ?', answer: 'Oui. Aksel est présent dans le pays de Lorient et peut convenir avec vous d’un rendez-vous dans le secteur. Contactez-nous pour choisir ensemble le lieu et le créneau. Un échange à distance est également possible.' },
  { question: 'Accompagnez-vous les entreprises en dehors de Lorient ?', answer: 'Oui. Nous accompagnons les entreprises de l’agglomération lorientaise et du Morbihan, notamment autour de Caudan et de Vannes. Les échanges s’organisent selon votre projet, sur place lorsque cela est possible ou à distance.' },
  { question: 'Combien coûte la création d’un site internet ?', answer: 'Le prix dépend du type de site, des contenus à préparer, des fonctionnalités et de l’accompagnement souhaité. Nous clarifions ces besoins avec vous avant de vous proposer un devis. Vous pouvez consulter nos formules sur la page Tarifs.', href: '/tarifs', link: 'Consulter les tarifs' },
  { question: 'Pouvez-vous améliorer mon site sans le refaire entièrement ?', answer: 'Oui, lorsque sa base technique le permet. Nous examinons votre site actuel pour identifier les améliorations utiles : navigation, présentation des prestations, contenus, rapidité ou référencement. Une refonte complète n’est proposée que si elle est pertinente pour votre projet.' },
  { question: 'Proposez-vous du référencement local et Google Ads ?', answer: 'Oui. Nous travaillons le référencement naturel à Lorient et sur votre zone d’intervention : structure du site, contenus et présence locale. Nous pouvons aussi piloter vos campagnes Google Ads, avec un ciblage défini ensemble et un suivi des demandes. Les actions sont adaptées à votre situation, sans promesse de classement garanti.' },
  { question: 'Continuez-vous à nous accompagner après la mise en ligne ?', answer: 'Oui, selon les prestations convenues ensemble. L’accompagnement peut comprendre la maintenance du site, des évolutions, le suivi SEO ou la gestion de Google Ads. Le périmètre et les modalités de suivi sont précisés dans votre proposition.' },
]
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://litus.fr/#organization', name: 'Litus', url: 'https://litus.fr', telephone: '+33744985521', email: 'litusagency@gmail.com' },
    { '@type': 'WebPage', '@id': 'https://litus.fr/agence-web-lorient#webpage', url: 'https://litus.fr/agence-web-lorient', name: title, description, inLanguage: 'fr-FR', about: { '@id': 'https://litus.fr/#organization' }, breadcrumb: { '@id': 'https://litus.fr/agence-web-lorient#breadcrumb' } },
    { '@type': 'BreadcrumbList', '@id': 'https://litus.fr/agence-web-lorient#breadcrumb', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://litus.fr' },
      { '@type': 'ListItem', position: 2, name: 'Agence web Lorient', item: 'https://litus.fr/agence-web-lorient' },
    ] },
  ],
}

export default function AgenceWebLorientPage() {
  return <div className="lemans-page lorient-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="lemans-hero lorient-hero" aria-labelledby="lorient-title">
      <div className="lemans-hero-photo lorient-hero-photo"><Image src="/territories/lorient-port.webp" alt="Les voiliers du port de plaisance de Lorient, au cœur de la ville" fill priority sizes="(max-width: 800px) 100vw, 60vw" /></div>
      <div className="lemans-hero-fade" aria-hidden="true" />
      <div className="lemans-shell lemans-hero-grid">
        <div className="lemans-hero-copy">
          <nav aria-label="Fil d’Ariane" className="lorient-breadcrumb"><Link href="/">Accueil</Link><ChevronRight size={11} aria-hidden="true" /><span aria-current="page">Agence web Lorient</span></nav>
          <p className="lemans-eyebrow"><span aria-hidden="true" />Agence web Lorient — Morbihan</p>
          <h1 id="lorient-title">Votre agence web<br />à <span>Lorient et dans<br />le Morbihan.</span></h1>
          <p className="lemans-lead">Un site qui présente votre savoir-faire. Une visibilité qui vous apporte des opportunités. Litus accompagne les entreprises de Lorient et du Morbihan en création de sites internet, référencement naturel et Google Ads. Avec Aksel présent dans le secteur, échangeons directement sur votre projet, à distance ou autour d’un rendez-vous.</p>
          <div className="lemans-actions"><Link href={contactHref} className="site-cta-primary">Parlons de votre projet <ArrowRight aria-hidden="true" /></Link><Link href="#realisations-locales" className="site-cta-secondary">Voir nos réalisations locales</Link></div>
          <p className="lorient-hero-reassurance">Rendez-vous dans le secteur <span>·</span> Échanges directs avec l’équipe <span>·</span> Accompagnement dans la durée</p>
        </div>
        <aside className="lemans-local-card lorient-local-card" aria-label="Notre zone d’intervention dans le Morbihan">
          <p><MapPin aria-hidden="true" />Morbihan <strong>56</strong></p>
          <ul>{['Lorient', 'Lanester', 'Ploemeur', 'Hennebont', 'Guidel', 'Caudan'].map(city => <li key={city}>{city}<Check aria-hidden="true" /></li>)}</ul>
          <span>Une présence dans le pays de Lorient</span>
        </aside>
      </div>
      <div className="lorient-photo-caption"><span>Le port de Lorient</span><small>Bretagne Sud · Morbihan</small></div>
      <a className="lemans-photo-credit" href="/territories/credits.html" target="_blank" rel="noreferrer">Photo : Taratata · CC BY 3.0</a>
    </section>

    <section className="lemans-intro lemans-section lorient-proximity" aria-labelledby="lorient-proximity-title"><div className="lemans-shell">
      <div className="lorient-proximity-grid">
        <div className="lorient-proximity-copy"><p className="lemans-eyebrow"><span aria-hidden="true" />L’équipe, tout simplement</p><h2 id="lorient-proximity-title">Une agence proche de vous.<br /><span>Et quelqu’un sur place.</span></h2><p>Votre projet ne se résume pas à un formulaire et quelques échanges par mail. Présent dans le pays de Lorient, Aksel peut vous rencontrer pour comprendre votre activité, vos priorités et votre clientèle. Avec Arthur, nous associons création de sites, référencement et acquisition pour construire un accompagnement adapté à votre entreprise.</p><Link href={contactHref} className="site-cta-primary">Rencontrer Aksel <ArrowRight aria-hidden="true" /></Link></div>
        <aside className="lorient-team-card" aria-label="Aksel à Lorient et Arthur au Mans, l’équipe Litus"><figure className="lorient-team-portraits"><div><Image src="/team/portrait-brun.png" alt="Portrait d’Aksel" width={400} height={400} sizes="160px" /><Image src="/team/portrait-clair.png" alt="Portrait d’Arthur" width={800} height={800} sizes="160px" /></div><figcaption>Aksel & Arthur · L’équipe Litus</figcaption></figure><div className="lorient-team-person"><p className="lorient-person-name">Aksel <span><MapPin size={13} aria-hidden="true" />Pays de Lorient</span></p><h3>Votre interlocuteur dans le pays de Lorient</h3><p>Création de sites internet, e-commerce et Google Ads.</p></div><div className="lorient-team-person lorient-team-complement"><p className="lorient-person-name">Arthur <span><MapPin size={13} aria-hidden="true" />Le Mans</span></p><p>Référencement naturel et création sur mesure.</p></div></aside>
      </div>
      <ul className="lorient-proximity-proofs">{[
        { icon: CalendarDays, title: 'On peut se rencontrer', text: 'Un rendez-vous convenu dans le secteur.' },
        { icon: UsersRound, title: 'On se parle directement', text: 'Vous échangez avec ceux qui font le projet.' },
        { icon: MapPin, title: 'Des références d’ici', text: 'Des projets à Caudan et dans le Morbihan.' },
        { icon: Handshake, title: 'On reste à vos côtés', text: 'Un suivi défini selon votre accompagnement.' },
      ].map(({ icon: Icon, title: itemTitle, text }) => <li key={itemTitle}><Icon aria-hidden="true" /><div><h3>{itemTitle}</h3><p>{text}</p></div></li>)}</ul>
    </div></section>

    <section className="lemans-services lemans-section" aria-labelledby="lorient-services-title"><div className="lemans-shell">
      <div className="lemans-section-heading"><div><p className="lemans-eyebrow"><span aria-hidden="true" />Vos projets, nos expertises</p><h2 id="lorient-services-title">Des solutions web pour<br /><span>développer votre activité.</span></h2></div><p>Création de site internet à Lorient, refonte, référencement ou campagnes Google Ads : nous vous aidons à choisir les actions adaptées à votre situation, plutôt qu’à multiplier les outils sans objectif.</p></div>
      <LorientReveal className="lemans-services-grid">{services.map(({ icon: Icon, title: serviceTitle, text, href, link }, index) => <article key={serviceTitle} data-lorient-reveal><div className="lorient-service-top"><Icon aria-hidden="true" /><span>0{index + 1}</span></div><h3>{serviceTitle}</h3><p>{text}</p><Link href={href}>{link} <ArrowRight aria-hidden="true" /></Link></article>)}</LorientReveal>
      <p className="lorient-services-note">Artisans, commerçants, indépendants ou PME : le bon point de départ dépend de votre activité, de vos clients et de vos objectifs.</p>
    </div></section>

    <section className="lemans-coverage lemans-section" aria-labelledby="lorient-coverage-title"><div className="lemans-shell lorient-coverage-grid">
      <LorientMap />
      <div className="lemans-coverage-copy lorient-coverage-copy"><p className="lemans-eyebrow"><span aria-hidden="true" />Ancrés en Bretagne Sud</p><h2 id="lorient-coverage-title">À Lorient, dans son agglomération<br /><span>et dans le Morbihan.</span></h2><p>Vous êtes installé à Lorient, Lanester, Ploemeur, Hennebont ou dans une commune voisine ? Aksel est présent dans le secteur pour échanger sur votre projet. Nous accompagnons également des entreprises ailleurs dans le Morbihan, avec la même proximité dans les échanges.</p><ul className="lorient-cities" aria-label="Principales communes accompagnées">{cities.map(city => <li key={city}>{city}</li>)}</ul><p className="lorient-coverage-further">Et plus largement dans le département, notamment autour d’Auray et de Vannes.</p><Link href={contactHref} className="site-cta-secondary">Organiser un premier échange <ArrowRight aria-hidden="true" /></Link></div>
    </div></section>

    <section id="realisations-locales" className="lemans-work lemans-section" aria-labelledby="lorient-work-title"><div className="lemans-shell">
      <div className="lemans-section-heading"><div><p className="lemans-eyebrow"><span aria-hidden="true" />Réalisations dans le Morbihan</p><h2 id="lorient-work-title">Des entreprises d’ici<br /><span>qui nous font confiance.</span></h2></div><p>Nous accompagnons déjà plusieurs entreprises du pays de Lorient et du Morbihan. Découvrez leurs projets et le travail réalisé pour mieux présenter leur activité et développer leur présence en ligne.</p></div>
      <div className="lorient-projects">{lorientProjects.map(project => <article key={project.href}>
        <Link href={project.href} className="lorient-project-image" tabIndex={-1} aria-hidden="true"><Image src={project.image} alt="" width={1440} height={1000} sizes="(max-width: 560px) 100vw, 50vw" /><span><ArrowRight aria-hidden="true" /></span></Link>
        <div className="lorient-project-copy"><p className="lorient-project-location"><MapPin size={14} aria-hidden="true" />{project.location}</p><div className="lorient-project-name"><h3>{project.name}</h3><Image src={project.logo} alt={`Logo ${project.name}`} width={100} height={52} /></div><p>{project.description}</p><ul>{project.services.map(service => <li key={service}>{service}</li>)}</ul><Link href={project.href}>Voir le projet <ArrowRight aria-hidden="true" /></Link></div>
      </article>)}</div>
      <div className="lorient-work-footer"><p>Des activités différentes. La même attention portée à chaque projet.</p><Link href="/realisations">Toutes nos réalisations <ArrowRight size={16} aria-hidden="true" /></Link></div>
    </div></section>

    <section className="lemans-method lemans-section lorient-method" aria-labelledby="lorient-method-title"><div className="lemans-shell"><p className="lemans-eyebrow"><span aria-hidden="true" />Une relation qui se construit</p><h2 id="lorient-method-title">On se rencontre.<br /><span>On construit. On fait évoluer.</span></h2><LorientReveal><ol>{steps.map(({ icon: Icon, title: stepTitle, text }, index) => <li key={stepTitle} data-lorient-reveal><span><Icon aria-hidden="true" /></span><small>0{index + 1}.</small><h3>{stepTitle}</h3><p>{text}</p><i className="lorient-method-line" aria-hidden="true" />{index < 3 && <ArrowRight className="lemans-step-arrow" aria-hidden="true" />}</li>)}</ol></LorientReveal></div></section>

    <section className="lemans-conversion"><div className="lemans-shell"><div className="lemans-conversion-photo"><Image src="/territories/lorient-port.webp" alt="" fill sizes="100vw" /><div><p>Votre projet à Lorient</p><h2>Votre prochain projet web<br />commence par une rencontre.</h2><span>Vous êtes à Lorient ou dans le Morbihan ? Parlons de votre activité, de votre site actuel et de ce que vous souhaitez développer.</span></div><Link href={contactHref} className="site-cta-primary">Échanger avec Aksel <ArrowRight aria-hidden="true" /></Link></div></div></section>

    <section className="lemans-faq lemans-section" aria-labelledby="lorient-faq-title"><div className="lemans-shell"><div className="lemans-section-heading"><div><p className="lemans-kicker">Questions fréquentes</p><h2 id="lorient-faq-title">Votre projet web à Lorient :<br /><span>les réponses à vos questions.</span></h2></div><p>Un premier échange pour comprendre votre situation et vous proposer une suite adaptée.</p></div><div className="lemans-faq-grid">{faqs.map(({ question, answer, href, link }) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><div><p>{answer}</p>{href && <Link href={href}>{link} <ArrowRight size={14} aria-hidden="true" /></Link>}</div></details>)}</div></div></section>
  </div>
}

