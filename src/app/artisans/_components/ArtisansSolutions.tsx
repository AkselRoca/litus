import Link from 'next/link'
import { ArrowUpRight, Megaphone, MapPin, PanelsTopLeft, MessagesSquare } from 'lucide-react'
import { ArtisansPhoneDemo } from './ArtisansPhoneDemo'

const solutions = [
  { icon: Megaphone, title: 'Google Ads pour les artisans', text: 'Ciblez les recherches liées à votre métier et à votre zone. Nous organisons les campagnes autour des prestations et des demandes qui vous intéressent.', href: '/google-ads' },
  { icon: MapPin, title: 'Référencement local & fiche Google', text: 'Présentez des informations complètes, vos services et vos réalisations. Le référencement local pour artisans aide vos futurs clients à trouver et comprendre votre entreprise.', href: '/seo-local' },
  { icon: PanelsTopLeft, title: 'Un site pensé pour les prises de contact', text: 'Un site clair, adapté au mobile, avec vos prestations, des photos de vos chantiers et un accès simple au téléphone ou au formulaire.', href: '/creation-site-internet' },
  { icon: MessagesSquare, title: 'Des demandes reçues directement', text: 'Les appels et les formulaires de vos outils arrivent chez vous. Vous échangez directement avec vos prospects, puis nous analysons ensemble les demandes mesurées.', href: '/contact' },
]

export function ArtisansSolutions() {
  return <section className="art-section art-solutions" id="solutions-artisans" aria-labelledby="art-solutions-title">
    <div className="art-container art-solutions-grid">
      <div className="art-solutions-phone"><ArtisansPhoneDemo /></div>
      <div className="art-solutions-copy">
        <p className="art-kicker">Notre solution</p>
        <h2 id="art-solutions-title">L’écosystème <em>Litus,</em><br />conçu pour <em>les artisans.</em></h2>
        <p className="art-solutions-intro">Une agence web pour artisans, avec des outils qui travaillent ensemble. Le bon accompagnement dépend de votre activité, de votre budget et de vos priorités.</p>
        <ul className="art-solutions-list">{solutions.map(item => <li key={item.title}>
          <span className="art-icon"><item.icon size={24} strokeWidth={1.6} aria-hidden="true" /></span>
          <div><h3><Link href={item.href}>{item.title}<ArrowUpRight size={15} aria-hidden="true" /></Link></h3><p>{item.text}</p></div>
        </li>)}</ul>
        <p className="art-local-links">À <Link href="/contact">Lorient et dans le Morbihan</Link>, au <Link href="/agence-web-le-mans">Mans et en Sarthe</Link> : un échange direct pour définir votre zone et vos objectifs.</p>
      </div>
    </div>
  </section>
}
