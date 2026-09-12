import { AiPillars, ExpertiseDirectory } from '@/components/expertise/ExpertiseDirectory'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Code2, Monitor, Search, ShoppingBag } from 'lucide-react'
import { BusinessSectionHeading, ServiceReveal } from '@/components/sections/services/BusinessService'
import { ExpertiseBreadcrumb } from '@/components/expertise/ExpertiseArticle'
import { ExpertiseExplorer } from '@/components/expertise/ExpertiseExplorer'
import { expertiseMetadata, expertiseSchema } from '@/lib/expertise/seo'

export const metadata = expertiseMetadata('Expertises web, logiciels & automatisation | Litus', 'Explorez les expertises Litus par besoin : sites, e-commerce, SEO, CRM, collaboration, applications, ChatGPT, Codex, Claude et n8n. Des outils reliés à vos usages métier.', '/expertise')
const offers = [
  { label: 'Création de site internet', text: 'Votre offre, clairement présentée.', href: '/creation-site-internet', icon: Monitor, tone: 'web' },
  { label: 'E-commerce', text: 'Une boutique pensée pour vendre.', href: '/creation-site-ecommerce', icon: ShoppingBag, tone: 'commerce' },
  { label: 'Référencement SEO', text: 'Être trouvé sur les bons sujets.', href: '/referencement-naturel', icon: Search, tone: 'seo' },
  { label: 'Google Ads', text: 'Des campagnes reliées à vos objectifs.', href: '/google-ads', icon: Search, tone: 'ads' },
]

export default function ExpertiseHub() {
  return <div className="business-service expertise-page expertise-hub">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(expertiseSchema()).replace(/</g, '\\u003c') }} />
    <ExpertiseBreadcrumb />
    <header className="business-container ex-hub-hero"><div><p className="business-kicker">Du site à l’outil métier</p><h1>Les bons outils.<br /><em>Pour les vrais sujets.</em></h1></div><div><p>Un site qui convainc. Une application qui simplifie le travail. Des données qui circulent entre vos outils.</p><p>Explorez ce que Litus peut construire, connecter ou faire évoluer, des premiers besoins web aux projets techniques plus poussés.</p><a href="#outils" className="business-text-link">Explorer par besoin<ArrowRight size={18} aria-hidden="true" /></a></div></header>
    <div className="business-container ex-hub-offers" aria-label="Nos principales offres">{offers.map(item => { const Icon = item.icon; return <Link href={item.href} key={item.href} data-offer={item.tone}><span>{item.tone === 'ads' ? <Image src="/brands/color/google-ads.png" alt="" width={27} height={27} /> : <Icon size={24} aria-hidden="true" />}</span><div><strong>{item.label}</strong><p>{item.text}</p></div><ArrowUpRight size={17} aria-hidden="true" /></Link> })}</div>
    <div className="business-content ex-content">
      <ExpertiseExplorer />
      <AiPillars />
      <ExpertiseDirectory />
      <section className="business-section ex-technical-capability" aria-labelledby="technical-capability-title"><div className="business-container ex-technical-capability-grid"><div><p className="business-kicker">Un développeur dédié aux projets techniques</p><h2 id="technical-capability-title">Le site est parfois<br />le début du sujet.</h2><p>Le vrai besoin peut être un écran pour l’atelier, une API entre deux logiciels ou un traitement de fichiers que personne ne veut refaire à la main.</p><p>Notre développeur dédié prend en charge le cadrage technique, le code et les conditions de livraison. Nous expliquons ce qui sera développé, ce qui repose sur un service tiers et ce qui demandera une validation sur votre environnement.</p><Link href="/contact?objet=Projet%20technique%20sur%20mesure" className="site-cta-primary">Présenter mon projet technique<ArrowRight size={17} aria-hidden="true" /></Link></div><ServiceReveal className="ex-technical-usecases"><span className="ex-technical-usecases-label"><Code2 size={17} aria-hidden="true" /> Ce que nous pouvons construire</span>{[
        { number: '01', title: 'Un outil interne', text: 'Dossiers, planning, rôles et historique : une application adaptée aux opérations de votre équipe.', links: [{ label: 'C#', href: '/expertise/csharp' }, { label: '.NET', href: '/expertise/dotnet' }, { label: 'React', href: '/expertise/react' }] },
        { number: '02', title: 'Des échanges automatisés', text: 'Exports, contrôles et synchronisations, avec un résultat traçable et des erreurs compréhensibles.', links: [{ label: 'Python', href: '/expertise/python' }, { label: 'Intégrations API', href: '/integrations-api' }] },
        { number: '03', title: 'Une interface de mesure', text: 'Acquisition, séquences et comptes rendus, selon les instruments et le protocole du projet.', links: [{ label: 'LabVIEW', href: '/expertise/labview' }, { label: 'Traitement de données', href: '/expertise/python' }] },
      ].map(item => <article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p><div>{item.links.map(link => <Link href={link.href} key={link.href}>{link.label}<ArrowUpRight size={12} aria-hidden="true" /></Link>)}</div></div></article>)}</ServiceReveal></div></section>
      <section className="business-section business-section-soft" aria-labelledby="hub-needs-title"><div className="business-container ex-prose-grid"><BusinessSectionHeading id="hub-needs-title" eyebrow="Le besoin avant la technologie">On peut aussi commencer par ce qui bloque.</BusinessSectionHeading><div className="ex-prose"><p>Votre site ne reçoit pas les bonnes demandes ? Nous regardons son <Link href="/referencement-naturel">référencement</Link>, vos <Link href="/google-ads">campagnes d’acquisition</Link> et le parcours de contact, pas uniquement le CMS.</p><p>Vos équipes ressaisissent les mêmes données ? Le sujet peut être une <Link href="/integrations-api">connexion entre logiciels</Link>, une <Link href="/automatisation">automatisation</Link> ou une <Link href="/creation-application-web">application métier</Link>.</p><p>Une solution existante suffit parfois. Nous comparons les options avec vos contraintes, votre autonomie et la maintenance future, sans imposer un développement sur mesure.</p><p>Nous accompagnons les entreprises à <Link href="/agence-web-lorient">Lorient</Link>, au <Link href="/agence-web-le-mans">Mans</Link> et à distance dans toute la France.</p></div></div></section>
      <section className="business-section ex-final-section"><div className="business-container business-final"><div><p className="business-kicker">Parlons du fonctionnement</p><h2>Votre outil est connu.<br />Ou le problème est encore flou.</h2><p>Montrez-nous le site, l’application ou les étapes qui prennent du temps. Nous vous aidons à définir le bon point de départ.</p></div><div className="business-final-actions"><Link className="site-cta-primary" href="/contact?objet=Projet%20digital%20et%20technique">Présenter mon besoin<ArrowRight size={18} aria-hidden="true" /></Link><a href="tel:+33744985521">07 44 98 55 21</a></div></div></section>
    </div>
  </div>
}
