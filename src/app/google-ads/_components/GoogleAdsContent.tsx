import Link from 'next/link'
import { ArrowRight, ArrowUpRight, BarChart3, CheckCheck, Compass, MapPin, MousePointerClick, Search, SlidersHorizontal, Target, UsersRound, Zap } from 'lucide-react'
import { GoogleAdsReveal } from './GoogleAdsReveal'
import { GoogleAdsMethod } from './GoogleAdsMethod'
import { GoogleAdsLocal } from './GoogleAdsLocal'
import { GoogleAdsConversion } from './GoogleAdsConversion'
import { GoogleAdsClientCase } from './GoogleAdsClientCase'

const benefits = [
  { title: 'Résultats rapides', icon: Zap, color: 'orange', text: 'Le référencement payant permet de lancer votre visibilité sans attendre le travail du SEO. Les premiers enseignements guident les ajustements.' },
  { title: 'Des prospects qualifiés', icon: UsersRound, color: 'blue', text: 'Nous ciblons les recherches liées à vos services, dans les zones où vous intervenez, avec un message adapté au besoin de vos futurs clients.' },
  { title: 'Un budget maîtrisé', icon: BarChart3, color: 'sage', text: 'Vous gardez la visibilité sur les dépenses. Nous suivons les demandes et ajustons les campagnes selon vos priorités et les données recueillies.' },
  { title: 'Une stratégie sur mesure', icon: Target, color: 'rose', text: 'Mots-clés, annonces, zone de diffusion et page de destination : chaque choix part de votre activité et des objectifs définis ensemble.' },
]

export function GoogleAdsContent() {
  return <div className="gad-content">
    <section className="gad-pilot-section" aria-labelledby="gad-pilot-title"><div className="gad-container gad-pilot-layout"><div><h2 id="gad-pilot-title">Des campagnes pilotées,<br />pas simplement lancées.</h2><p>Un suivi concret, du ciblage aux prises de contact.</p></div><GoogleAdsReveal className="gad-pilot-grid">{[
      { icon: MapPin, title: 'Ciblage local', text: 'Là où sont vos clients', tone: 'orange' },
      { icon: MousePointerClick, title: 'Suivi des contacts', text: 'Appels & formulaires', tone: 'blue' },
      { icon: SlidersHorizontal, title: 'Optimisation', text: 'Des ajustements réguliers', tone: 'sage' },
    ].map(({icon: Icon, title, text, tone}) => <div className={`gad-pilot-item gad-tone-${tone}`} key={title}><Icon aria-hidden="true" /><p><strong>{title}</strong><small>{text}</small></p></div>)}</GoogleAdsReveal></div></section>

    <section className="gad-section gad-benefits-section" aria-labelledby="gad-benefits-title"><div className="gad-container"><div className="gad-section-heading gad-heading-split"><div><p className="gad-kicker"><span />Pourquoi investir dans Google Ads ?</p><h2 id="gad-benefits-title">Soyez visible au bon moment,<br /><em>auprès des bonnes personnes.</em></h2></div><p>Vos futurs clients cherchent déjà une solution sur Google. Le référencement payant, aussi appelé SEA, permet de présenter vos services sur des recherches pertinentes. Notre rôle d’agence SEA : relier cette visibilité à des prises de contact utiles pour votre entreprise.</p></div><GoogleAdsReveal className="gad-benefits-grid">{benefits.map(({title, icon: Icon, color, text}) => <article className={`gad-benefit-card gad-tone-${color}`} key={title}><span className="gad-benefit-icon"><Icon size={25} strokeWidth={1.65} aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p></article>)}</GoogleAdsReveal></div></section>

    <section id="google-ads-methode" className="gad-section gad-method-section" aria-labelledby="gad-method-title"><div className="gad-container"><div className="gad-section-heading gad-heading-row"><div><p className="gad-kicker"><span />Notre méthode</p><h2 id="gad-method-title">La gestion de vos<br /><em>campagnes Google Ads.</em></h2></div><Link href="#google-ads-contact" className="site-cta-secondary">Parlons de vos objectifs<ArrowRight size={17} aria-hidden="true" /></Link></div><GoogleAdsMethod /></div></section>

    <GoogleAdsClientCase />

    <GoogleAdsLocal />

    <section className="gad-projects-section" aria-label="Des expertises et des projets complémentaires"><div className="gad-container gad-projects-grid"><div><span className="gad-small-icon"><CheckCheck size={20} aria-hidden="true" /></span><p><strong>Une annonce, une page, un même objectif.</strong><span>La page d’arrivée compte autant que le ciblage. Nous relions la campagne à une expérience claire qui facilite la demande.</span></p></div><nav aria-label="Approfondir votre projet"><Link href="/creation-landing-page"><Compass size={17} />Landing pages de campagne<ArrowUpRight size={14} /></Link><Link href="/seo-local"><Search size={17} />Référencement naturel<ArrowUpRight size={14} /></Link><Link href="/realisations/west-clotures-paysage"><Target size={17} />Le projet West Clôtures<ArrowUpRight size={14} /></Link></nav></div></section>

    <GoogleAdsConversion />
  </div>
}
