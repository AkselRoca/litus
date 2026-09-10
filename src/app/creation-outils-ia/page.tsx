import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, BookOpenText, Braces, ChartNoAxesCombined, Check,
  ChevronDown, ClipboardCheck, Clock3, Code2, Database, FileSearch, FileText,
  Fingerprint, Layers3, LockKeyhole, Mail, Network, PanelTop, PlugZap,
  Settings2, ShieldCheck, Target, UsersRound, Workflow,
} from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { AiHeroDemo } from './_components/AiHeroDemo'
import { AiReveal, AiWorkflows } from './_components/AiInteractions'
import { aiContactHref, aiFaq, aiUseCases } from './ai-content'
import './ai.css'

const title = 'Création d’outils IA sur mesure pour entreprise | Litus'
const description = 'Litus crée vos outils IA sur mesure : assistants internes, agents métier, recherche documentaire et automatisations connectées à votre CRM et à vos données.'
const url = 'https://litus.fr/creation-outils-ia'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/creation-outils-ia' },
  openGraph: { title, description, url, siteName: 'Litus', locale: 'fr_FR', type: 'website', images: [{ url: '/creation-outils-ia/opengraph-image', width: 1200, height: 630, alt: 'Litus — Des outils IA sur mesure, utiles à vos équipes' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/creation-outils-ia/opengraph-image'] },
}

const useCaseIcons = { knowledge: BookOpenText, agent: Network, search: FileSearch, content: FileText, leads: Target, mail: Mail, data: Database, workflow: Workflow, interface: PanelTop }
const benefits = [
  { icon: Clock3, title: 'Du temps pour votre métier', text: 'Réduire les recherches, les recopies et les préparations répétitives pour concentrer l’attention sur les situations qui le demandent.' },
  { icon: ClipboardCheck, title: 'Des informations exploitables', text: 'Passer de messages ou de documents dispersés à une réponse sourcée, un tableau structuré ou une action prête à vérifier.' },
  { icon: UsersRound, title: 'Une prise en main naturelle', text: 'Concevoir l’interface avec les personnes qui s’en serviront. Le fonctionnement, les limites et les validations restent compréhensibles.' },
  { icon: ChartNoAxesCombined, title: 'Une utilité qui se mesure', text: 'Comparer le temps de traitement, la qualité, les corrections et le coût par tâche avant de faire évoluer le périmètre.' },
] as const
const method = [
  { title: 'Cadrer le bon usage', text: 'Nous observons votre processus, les personnes concernées et les sources disponibles. Nous définissons un objectif mesurable et le périmètre du premier outil.', deliverable: 'Un périmètre, des critères, un devis.' },
  { title: 'Tester sur des cas réels', text: 'Un premier prototype permet d’évaluer les réponses et les limites sur des exemples représentatifs, avec les précautions nécessaires pour vos données.', deliverable: 'Un pilote et des résultats d’essai.' },
  { title: 'Développer et connecter', text: 'Nous construisons l’interface, les intégrations et les contrôles. Vos équipes testent le parcours et les exceptions avant la mise en service.', deliverable: 'Un outil adapté à votre environnement.' },
  { title: 'Accompagner et améliorer', text: 'Nous préparons la prise en main, la documentation et le suivi. Les retours d’usage guident les ajustements et les prochaines fonctionnalités.', deliverable: 'Un suivi défini, des évolutions utiles.' },
] as const

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Service', '@id': `${url}#service`, name: 'Création d’outils IA sur mesure pour entreprise', description, serviceType: 'Développement et intégration d’outils d’intelligence artificielle sur mesure', url, provider: { '@type': 'Organization', name: 'Litus', url: 'https://litus.fr' }, areaServed: { '@type': 'Country', name: 'France' }, availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://litus.fr/contact' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://litus.fr' }, { '@type': 'ListItem', position: 2, name: 'Création d’outils IA', item: url }] },
    { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: aiFaq.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ],
}

export default function AiToolsPage() {
  return <div className="ai-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <ServiceHero
      id="outils-ia-title"
      eyebrow="Intelligence artificielle · Lorient & Le Mans"
      title={'Création d’outils IA sur mesure.\nDu concret pour vos équipes.'}
      accent="Du concret pour vos équipes."
      description={'Assistants internes, agents métier, recherche documentaire : nous développons des outils IA connectés à vos données et à vos logiciels. Un usage précis, une interface simple et des résultats que vos équipes peuvent vérifier.'.replace(/ ([;:!?])/g, '\u00a0$1')}
      primaryAction={{ label: 'Parlons de votre outil IA', href: aiContactHref }}
      secondaryAction={{ label: 'Découvrir les cas d’usage', href: '#cas-usage-ia' }}
      visual={<AiHeroDemo />}
      visualBackground="/blog/photos/bureau-reunion-clair.webp"
      proof={<ul className="ai-hero-proof"><li><Target aria-hidden="true" /><span>Un besoin métier précis</span></li><li><PlugZap aria-hidden="true" /><span>Vos outils connectés</span></li><li><UsersRound aria-hidden="true" /><span>Vous gardez la main</span></li></ul>}
    />

    <div className="ai-content">
      <section className="ai-intro-band" aria-labelledby="ia-intro-title"><div className="ai-container ai-intro-layout"><div><p className="ai-kicker">Le point de départ</p><h2 id="ia-intro-title">Un outil utile commence<br />par <em>un vrai besoin.</em></h2></div><p>Chaque jour, vos équipes cherchent, trient, rédigent et ressaisissent. Notre travail consiste à comprendre ces tâches pour concevoir un outil qui s’intègre à leur quotidien. <strong>Les données, les règles et les personnes font partie du projet dès le départ.</strong></p><Link href={aiContactHref} className="ai-text-link">Identifions votre premier usage<ArrowUpRight size={17} aria-hidden="true" /></Link></div></section>

      <section className="ai-section" id="cas-usage-ia" aria-labelledby="ia-cases-title"><div className="ai-container">
        <div className="ai-heading ai-heading-split"><div><p className="ai-kicker">Les possibilités</p><h2 id="ia-cases-title">De l’intelligence artificielle,<br /><em>dans votre réalité métier.</em></h2></div><p>Une agence d’intelligence artificielle doit pouvoir relier une technologie à un usage concret. Voici les outils que nous pouvons concevoir avec vous, selon vos données et votre organisation.</p></div>
        <AiReveal className="ai-case-grid">{aiUseCases.map(item => { const Icon = useCaseIcons[item.icon]; return <article className="ai-case" key={item.number}><div className="ai-case-top"><span className="ai-icon"><Icon aria-hidden="true" /></span><span>{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p><div className="ai-case-result"><Check size={15} aria-hidden="true" /><span>{item.result}</span></div></article> })}</AiReveal>
      </div></section>

      <section className="ai-section ai-workflow-section" id="workflows-ia" aria-labelledby="ia-workflow-title"><div className="ai-container"><div className="ai-heading ai-heading-split"><div><p className="ai-kicker">Du besoin au résultat</p><h2 id="ia-workflow-title">Vos processus donnent<br /><em>le sens du parcours.</em></h2></div><p>Les scénarios ci-dessous illustrent le fonctionnement d’un outil IA en entreprise. Chaque source, chaque action et chaque validation est choisie avec votre équipe.</p></div><AiWorkflows /></div></section>

      <section className="ai-section" aria-labelledby="ia-benefits-title"><div className="ai-container"><div className="ai-heading"><p className="ai-kicker">Ce qui doit changer au quotidien</p><h2 id="ia-benefits-title">Moins de tâches répétitives.<br /><em>Plus de place pour l’essentiel.</em></h2></div><AiReveal className="ai-benefit-grid">{benefits.map(({ icon: Icon, title: benefitTitle, text }) => <article key={benefitTitle}><span className="ai-icon"><Icon aria-hidden="true" /></span><h3>{benefitTitle}</h3><p>{text}</p></article>)}</AiReveal></div></section>

      <section className="ai-section ai-integration-section" id="integrations-ia" aria-labelledby="ia-integration-title"><div className="ai-container ai-integration-layout">
        <div className="ai-integration-copy"><p className="ai-kicker">L’IA dans votre environnement</p><h2 id="ia-integration-title">Vos logiciels restent.<br /><em>Les possibilités s’étendent.</em></h2><p>L’intégration IA en entreprise relie vos documents et vos logiciels aux fonctions dont vous avez besoin. Nous étudions les API, les droits d’accès et les contraintes de votre système avant de choisir les connexions.</p><p>CRM, ERP, messagerie, base de données ou application interne : l’outil peut lire une information, préparer un contenu et proposer une mise à jour, dans le périmètre que vous définissez.</p><Link className="ai-text-link" href="/integrations-api">Découvrir les intégrations et API<ArrowRight size={17} aria-hidden="true" /></Link></div>
        <div className="ai-integration-map" aria-label="Des sources contrôlées, un outil IA et des actions validées"><div className="ai-integration-sources"><span><FileText />Documents & PDF</span><span><Mail />Messagerie</span><span><Database />Base de données</span></div><div className="ai-integration-core"><Network aria-hidden="true" /><strong>Votre outil IA</strong><span>Vos règles. Vos accès.</span></div><div className="ai-integration-targets"><span><Layers3 />CRM & ERP</span><span><Braces />API métier</span><span><PanelTop />Interface dédiée</span></div><p><ShieldCheck size={15} aria-hidden="true" />Des accès limités aux besoins du projet</p></div>
      </div></section>

      <section className="ai-section ai-custom-section" aria-labelledby="ia-custom-title"><div className="ai-container ai-custom-layout"><div><p className="ai-kicker">Du développement vraiment sur mesure</p><h2 id="ia-custom-title">L’interface fait aussi<br /><em>partie de la solution.</em></h2><p>Un outil IA peut prendre la forme d’une recherche interne, d’un tableau de traitement, d’un formulaire enrichi ou d’un espace intégré à votre application. Nous dessinons le parcours autour de vos utilisateurs et de leurs décisions.</p><p>Le modèle de langage est une composante de l’ensemble. La recherche dans vos sources, les règles métier, les connexions et les contrôles rendent le résultat exploitable. Le choix technique dépend des essais, de la confidentialité, des performances et des coûts attendus.</p><nav className="ai-related-links" aria-label="Expertises complémentaires"><Link href="/creation-application-web"><Code2 size={17} aria-hidden="true" />Application web sur mesure<ArrowUpRight size={14} aria-hidden="true" /></Link><Link href="/automatisation"><Workflow size={17} aria-hidden="true" />Automatisation de vos processus<ArrowUpRight size={14} aria-hidden="true" /></Link><Link href="/creation-site-internet"><PanelTop size={17} aria-hidden="true" />Création de site internet<ArrowUpRight size={14} aria-hidden="true" /></Link></nav></div><div className="ai-design-panel"><div><span>Conçu avec vos équipes</span><Settings2 size={19} aria-hidden="true" /></div><ul><li><Check /><strong>Une tâche à accomplir</strong><span>Un parcours clair, des actions explicites.</span></li><li><Check /><strong>Des réponses à vérifier</strong><span>Les sources, les champs et les exceptions visibles.</span></li><li><Check /><strong>Un outil à faire évoluer</strong><span>Une base documentée, des intégrations suivies.</span></li></ul><p>Une interface utile se juge à l’usage.</p></div></div></section>

      <section className="ai-section ai-method-section" id="methode-ia" aria-labelledby="ia-method-title"><div className="ai-container"><div className="ai-heading ai-heading-row"><div><p className="ai-kicker">Un projet avec Litus</p><h2 id="ia-method-title">Un premier usage bien défini.<br /><em>Puis un outil qui évolue.</em></h2></div><Link className="site-cta-secondary" href={aiContactHref}>Parlons de votre processus<ArrowRight size={17} aria-hidden="true" /></Link></div><AiReveal className="ai-method-grid">{method.map((step, index) => <article key={step.title}><span className="ai-method-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p><strong>{step.deliverable}</strong></article>)}</AiReveal><div className="ai-team-line"><div className="ai-team-portraits"><Image src="/team/portrait-clair.png" alt="Un des deux fondateurs de Litus" width={46} height={46} /><Image src="/team/portrait-brun.png" alt="Un des deux fondateurs de Litus" width={46} height={46} /></div><p><strong>Arthur & Aksel, en direct avec vous.</strong><span>Basés à Lorient et au Mans, nous accompagnons les entreprises partout en France.</span></p><Link href="/a-propos" className="ai-text-link">Rencontrer Litus<ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>

      <section className="ai-section ai-trust-section" id="confidentialite-ia" aria-labelledby="ia-trust-title"><div className="ai-container ai-trust-layout"><div><p className="ai-kicker">Un cadre clair, dès le départ</p><h2 id="ia-trust-title">Vos données comptent.<br /><em>Vos décisions aussi.</em></h2><p>La confidentialité et la fiabilité se travaillent dans la conception du système. Nous documentons les choix avec vous et testons les comportements avant de mettre l’outil entre les mains des utilisateurs.</p><Link className="ai-text-link" href={aiContactHref}>Échangeons sur vos contraintes<ArrowRight size={17} aria-hidden="true" /></Link></div><AiReveal className="ai-trust-list">{[
        { icon: LockKeyhole, title: 'Des données et des accès maîtrisés', text: 'Sources autorisées, données nécessaires, droits par rôle et durées de conservation définis selon le contexte du projet.' },
        { icon: Fingerprint, title: 'Des fournisseurs choisis avec vous', text: 'Hébergement, conditions d’utilisation des données et coûts des modèles examinés avant leur intégration.' },
        { icon: ClipboardCheck, title: 'Des résultats testés et contrôlables', text: 'Cas de test représentatifs, sources consultables, suivi des erreurs et validation humaine pour les actions importantes.' },
      ].map(({icon: Icon, title: trustTitle, text}) => <article key={trustTitle}><span className="ai-icon"><Icon aria-hidden="true" /></span><div><h3>{trustTitle}</h3><p>{text}</p></div></article>)}</AiReveal></div></section>

      <section className="ai-section ai-faq-section" id="faq" aria-labelledby="ia-faq-title"><div className="ai-container"><div className="ai-heading"><p className="ai-kicker">Vos questions</p><h2 id="ia-faq-title">Créer un outil IA,<br /><em>avec les bonnes réponses.</em></h2></div><div className="ai-faq-grid">{aiFaq.map(item => <details key={item.question}><summary>{item.question}<ChevronDown size={17} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="ai-section ai-final-section" id="contact-ia" aria-labelledby="ia-contact-title"><div className="ai-container ai-final-card"><div><p className="ai-kicker">Votre prochain outil commence ici</p><h2 id="ia-contact-title">Une tâche vous prend trop de temps ?<br /><em>Parlons-en concrètement.</em></h2><p>Décrivez votre processus, vos données et le résultat attendu. Nous verrons ensemble où l’IA peut être utile et comment construire un premier périmètre réaliste.</p></div><div className="ai-final-actions"><Link href={aiContactHref} className="site-cta-primary">Parlons de votre outil IA<ArrowRight size={18} aria-hidden="true" /></Link><span>Premier échange · Devis sur mesure</span><a href="tel:+33744985521">07 44 98 55 21</a></div></div></section>
    </div>
  </div>
}
