import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, BarChart3, BriefcaseBusiness, Check, ChevronRight, CircleGauge,
  MapPin, Monitor, RefreshCw, Search, ShoppingBag, Target,
} from 'lucide-react'
import './le-mans.css'

export const metadata: Metadata = {
  title: 'Agence web Le Mans | Création de site, SEO & Google Ads',
  description: 'Litus accompagne les entreprises du Mans et de la Sarthe : création et refonte de sites internet, SEO local, Google Ads et e-commerce. Échangez avec Arthur au Mans.',
  keywords: ['agence web Le Mans', 'création site internet Le Mans', 'SEO Le Mans', 'Google Ads Le Mans', 'agence digitale Sarthe'],
  alternates: { canonical: '/agence-web-le-mans' },
  openGraph: {
    title: 'Litus, agence web au Mans et en Sarthe',
    description: 'Sites internet, référencement naturel et acquisition pour les entreprises du Mans et de toute la Sarthe.',
    url: 'https://litus.fr/agence-web-le-mans',
    images: [{ url: '/litus-og-social.png', width: 1200, height: 630, alt: 'Litus — Votre agence web pour développer votre activité.' }],
  },
  twitter: { card: 'summary_large_image', title: 'Litus, agence web au Mans et en Sarthe', description: 'Sites internet, référencement naturel et acquisition pour les entreprises du Mans et de toute la Sarthe.', images: ['/litus-og-social.png'] },
}

const services = [
  { icon: Monitor, title: 'Création de site internet', text: 'Des sites sur mesure, rapides et conçus pour transformer vos visiteurs en clients.', href: '/creation-site-internet' },
  { icon: RefreshCw, title: 'Refonte de site', text: 'Une image plus juste, une navigation plus claire et de meilleures performances.', href: '/refonte-site-internet' },
  { icon: Search, title: 'Référencement naturel', text: 'Une structure SEO solide pour être trouvé au Mans et dans toute la Sarthe.', href: '/seo-local' },
  { icon: BarChart3, title: 'Google Ads', text: 'Des campagnes suivies pour générer des demandes utiles et mesurer chaque résultat.', href: '/google-ads' },
  { icon: ShoppingBag, title: 'E-commerce', text: 'Des boutiques simples à acheter, à administrer et à faire évoluer.', href: '/creation-site-ecommerce' },
  { icon: Target, title: 'Stratégie digitale', text: 'Des priorités claires, choisies selon votre marché, votre équipe et vos objectifs.', href: '/contact?objet=strategie' },
]

const cities = [
  { name: 'Mamers', x: 70, y: 54 },
  { name: 'Le Mans', x: 49, y: 43, main: true },
  { name: 'Allonnes', x: 45, y: 50 },
  { name: 'Sablé-sur-Sarthe', x: 19, y: 66 },
  { name: 'La Flèche', x: 42, y: 82 },
]

const steps = [
  { icon: BriefcaseBusiness, title: 'On échange', text: 'Avec Arthur au Mans, autour de votre activité, de vos objectifs et des enjeux locaux qui comptent.' },
  { icon: Target, title: 'On construit', text: 'Une stratégie, un calendrier et un périmètre clairement définis.' },
  { icon: Monitor, title: 'On déploie', text: 'Création du site, SEO et acquisition avec des points réguliers.' },
  { icon: CircleGauge, title: 'On avance ensemble', text: 'Mesure, optimisations et conseils pour faire durer les résultats.' },
]

const faqs = [
  ['Intervenez-vous uniquement au Mans ?', 'Non. Nous rencontrons nos clients au Mans et accompagnons les entreprises de toute la Sarthe, ainsi que des projets partout en France.'],
  ['Peut-on organiser un rendez-vous physique ?', 'Oui. Arthur est présent au Mans et peut prévoir avec vous un premier rendez-vous pour comprendre votre activité, vos objectifs et votre organisation.'],
  ['Quels sont vos délais pour créer un site ?', 'Le calendrier dépend du périmètre. Après le premier échange, nous vous remettons un planning clair avec les étapes de validation.'],
  ['Travaillez-vous le référencement local ?', 'Oui. Nous travaillons la structure du site, les contenus locaux et la présence Google pour renforcer votre visibilité sur les recherches utiles en Sarthe.'],
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Litus — Agence web Le Mans',
  url: 'https://litus.fr/agence-web-le-mans',
  telephone: '+33744985521',
  image: 'https://litus.fr/le-mans-centre-cathedrale.webp',
  description: 'Agence web au Mans spécialisée en création de sites internet, SEO local, Google Ads et e-commerce.',
  areaServed: ['Le Mans', 'Allonnes', 'Sablé-sur-Sarthe', 'La Flèche', 'Mamers', 'Sarthe'],
  priceRange: '€€',
}

export default function AgenceWebLeMansPage() {
  return <div className="lemans-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

    <section className="lemans-hero" aria-labelledby="lemans-title">
      <div className="lemans-hero-photo" aria-hidden="true"><Image src="/le-mans-centre-cathedrale.webp" alt="" fill priority sizes="(max-width: 800px) 100vw, 58vw" /></div>
      <div className="lemans-hero-fade" aria-hidden="true" />
      <div className="lemans-shell lemans-hero-grid">
        <div className="lemans-hero-copy">
          <nav aria-label="Fil d’Ariane" className="lemans-breadcrumb"><Link href="/">Accueil</Link><ChevronRight size={11} aria-hidden="true" /><span aria-current="page">Agence web Le Mans</span></nav>
          <p className="lemans-eyebrow"><span />Agence web Le Mans — Sarthe</p>
          <h1 id="lemans-title">Votre agence web<br />au <span>Mans et en Sarthe.</span></h1>
          <p className="lemans-lead">Création de sites internet, référencement naturel, Google Ads et e-commerce. Arthur, présent au Mans, accompagne les entreprises sarthoises pour développer leur visibilité et générer plus de demandes.</p>
          <div className="lemans-actions"><Link href="/contact?objet=Projet%20au%20Mans" className="site-cta-primary">Parler de votre projet <ArrowRight /></Link><Link href="/realisations" className="site-cta-secondary">Voir nos réalisations</Link></div>
          <p className="lemans-hero-reassurance">Rendez-vous au Mans <span>·</span> Arthur, votre interlocuteur local <span>·</span> Accompagnement dans la durée</p>
        </div>
        <aside className="lemans-local-card" aria-label="Zone d’intervention en Sarthe">
          <p><MapPin />Sarthe <strong>72</strong></p>
          <ul>{['Le Mans', 'Allonnes', 'Sablé-sur-Sarthe', 'La Flèche', 'Mamers'].map(city => <li key={city}>{city}<Check /></li>)}</ul>
          <span>Et partout dans le département</span>
        </aside>
        <p className="lemans-handnote">Le Mans,<br />notre territoire,<br />vos opportunités.</p>
      </div>
      <a className="lemans-photo-credit" href="https://commons.wikimedia.org/wiki/File:Le_Mans_(Sarthe)_-_Cath%C3%A9drale_Saint-Julien_-_Chevet_vu_depuis_la_place_des_Jacobins.jpg" target="_blank" rel="noreferrer">Photo : Patrick Monchicourt · CC BY-SA 2.0</a>
    </section>

    <section className="lemans-intro lemans-section" aria-labelledby="lemans-local-title">
      <div className="lemans-shell">
        <div className="lemans-centered-heading"><p className="lemans-kicker">Une présence locale</p><h2 id="lemans-local-title">Une agence web proche de vous.</h2><p>Arthur est votre interlocuteur au Mans pour les rendez-vous et le suivi de votre projet. Avec Aksel, il réunit les expertises de Litus autour des réalités des artisans, commerces, PME et organisations du territoire.</p></div>
        <dl className="lemans-metrics">
          <div><dt>Proximité</dt><dd>Des rendez-vous physiques possibles au Mans</dd></div>
          <div><dt>Arthur</dt><dd>Votre interlocuteur Litus au Mans</dd></div>
          <div><dt>5/5</dt><dd>La note donnée par nos clients sur Google</dd></div>
          <div><dt>&lt; 24 h</dt><dd>Pour recevoir une première réponse claire</dd></div>
        </dl>
      </div>
    </section>

    <section className="lemans-services lemans-section" aria-labelledby="lemans-services-title">
      <div className="lemans-shell">
        <div className="lemans-section-heading"><div><p className="lemans-eyebrow"><span />Nos expertises au Mans</p><h2 id="lemans-services-title">Des solutions concrètes<br />pour <span>votre croissance.</span></h2></div><p>Une équipe unique pour concevoir votre site, travailler votre visibilité et piloter votre acquisition. Vous gardez une vision claire du projet et des résultats recherchés.</p></div>
        <div className="lemans-services-grid">{services.map(({ icon: Icon, title, text, href }) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p><Link href={href}>Découvrir <ArrowRight /></Link></article>)}</div>
      </div>
    </section>

    <section className="lemans-coverage lemans-section" aria-labelledby="lemans-coverage-title">
      <div className="lemans-shell lemans-coverage-grid">
        <div className="lemans-map" aria-label="Villes desservies en Sarthe">
          <svg viewBox="0 0 360 360" role="img" aria-label="Schéma de la zone desservie en Sarthe"><path d="M116 24l56 13 42-16 47 27 21 53 34 36-18 45 13 51-48 31-25 63-61 8-47-39-57-9-21-58 19-49-23-42 36-45 2-54z" /><text x="178" y="194">72</text></svg>
          {cities.map(city => <span key={city.name} className={city.main ? 'is-main' : ''} style={{ left: `${city.x}%`, top: `${city.y}%` }}><i /><b>{city.name}</b></span>)}
        </div>
        <div className="lemans-coverage-copy"><p className="lemans-eyebrow"><span />Notre zone d’intervention</p><h2 id="lemans-coverage-title">Au Mans, et dans<br /><span>toute la Sarthe.</span></h2><p>Nous nous déplaçons pour vous rencontrer au Mans ou dans les villes alentours : Allonnes, Coulaines, Sablé-sur-Sarthe, La Flèche, Mamers, Saint-Calais et partout dans le département.</p><ul><li><Check />Rendez-vous physiques possibles</li><li><Check />Une meilleure compréhension de votre marché local</li><li><Check />Un accompagnement de proximité dans la durée</li></ul><Link href="/contact?objet=Projet%20au%20Mans" className="site-cta-primary">Nous rencontrer <ArrowRight /></Link></div>
        <figure className="lemans-street-photo"><Image src="/le-mans-centre-cathedrale.webp" alt="Centre-ville et cathédrale Saint-Julien du Mans" fill sizes="(max-width: 800px) 100vw, 25vw" /><figcaption><MapPin /><span><strong>Une agence ancrée au Mans</strong><small>Le Mans · Sarthe · Pays de la Loire</small></span></figcaption></figure>
      </div>
    </section>

    <section className="lemans-work lemans-section" aria-labelledby="lemans-work-title"><div className="lemans-shell">
      <div className="lemans-section-heading"><div><p className="lemans-kicker">Réalisations</p><h2 id="lemans-work-title">Des entreprises locales<br />qui avancent avec nous.</h2></div><Link href="/realisations">Voir toutes les réalisations <ArrowRight /></Link></div>
      <div className="lemans-projects"><article><div><p>Immobilier · Le Mans</p><h3>Demétis Immobilier</h3><span>Un site plus clair pour valoriser les biens et renforcer la visibilité locale.</span><Link href="/realisations/demetis-immobilier">Voir le projet <ChevronRight /></Link></div><Image src="/realisations/demetis-website.webp" alt="Site internet de Demétis Immobilier" width={720} height={480} /></article><article><div><p>Transition énergétique</p><h3>Aspire Énergie</h3><span>Une présence digitale structurée pour rendre une offre technique simple à comprendre.</span><Link href="/realisations/aspire-energie">Voir le projet <ChevronRight /></Link></div><Image src="/realisations/aspire-website.webp" alt="Site internet d’Aspire Énergie" width={720} height={480} /></article></div>
      <div className="lemans-client-strip"><p>Ils nous font confiance</p>{['demetis','nos-travaux','aspire','prodis'].map(name => <Image key={name} src={`/clients/${name}.webp`} alt={name === 'demetis' ? 'Demétis Immobilier' : name === 'nos-travaux' ? 'Nos Travaux' : name === 'aspire' ? 'Aspire Énergie' : 'Prodis Environnement'} width={150} height={58} />)}</div>
    </div></section>

    <section className="lemans-method lemans-section" aria-labelledby="lemans-method-title"><div className="lemans-shell"><p className="lemans-eyebrow"><span />Notre méthode</p><h2 id="lemans-method-title">Un accompagnement clair<br /><span>et efficace.</span></h2><ol>{steps.map(({ icon: Icon, title, text }, index) => <li key={title}><span><Icon /></span><small>0{index + 1}.</small><h3>{title}</h3><p>{text}</p>{index < steps.length - 1 && <ArrowRight className="lemans-step-arrow" />}</li>)}</ol></div></section>

    <section className="lemans-conversion"><div className="lemans-shell"><div className="lemans-conversion-photo"><Image src="/le-mans-centre-cathedrale.webp" alt="" fill sizes="100vw" /><div><p>Votre projet au Mans</p><h2>Prêt à développer votre activité en Sarthe ?</h2><span>Échangez avec Arthur sur votre projet, votre marché et la prochaine étape utile.</span></div><Link href="/contact?objet=Projet%20au%20Mans" className="site-cta-primary">Échanger avec Arthur <ArrowRight /></Link></div></div></section>

    <section className="lemans-faq lemans-section" aria-labelledby="lemans-faq-title"><div className="lemans-shell"><div className="lemans-section-heading"><div><p className="lemans-kicker">Questions fréquentes</p><h2 id="lemans-faq-title">Vos questions, nos réponses.</h2></div><p>Un premier échange suffit souvent pour clarifier le bon point de départ.</p></div><div className="lemans-faq-grid">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></div></section>
  </div>
}
