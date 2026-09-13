import { pageMetadata } from '@/lib/seo/metadata'
import { AiPillars } from '@/components/expertise/ExpertiseDirectory'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bell, Check, ChevronDown, ClipboardCheck, Clock3, Database, FileText, FolderSync, GitBranch, ListChecks, LockKeyhole, Mail, MessageSquare, PanelTop, PlugZap, RefreshCw, Settings2, ShieldCheck, UsersRound, Workflow } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import { BusinessSectionHeading, ServiceReveal } from '@/components/sections/services/BusinessService'
import { AutomationHeroDemo } from './_components/AutomationHeroDemo'
import './automatisation.css'

const title = 'Automatisation des processus & intégrations API | Litus'
const description = 'Litus connecte vos logiciels et automatise vos tâches répétitives : formulaires, CRM, devis et notifications. Des scénarios sur mesure, documentés et suivis.'
const pageUrl = 'https://www.litus.fr/automatisation'
const contactHref = '/contact?objet=Automatisation%20%26%20int%C3%A9grations%20API'

export const metadata: Metadata = pageMetadata("/automatisation", {
  title: { absolute: title }, description,
  alternates: { canonical: '/automatisation' },
  openGraph: { title, description, url: pageUrl, siteName: 'Litus', type: 'website', locale: 'fr_FR', images: [{ url: '/litus-og-social.png', width: 1200, height: 630, alt: 'Litus — Votre agence web pour développer votre activité.' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/litus-og-social.png'] },
})

const needs = [
  { icon: FolderSync, title: 'Moins de ressaisies', text: 'Une information collectée au bon endroit peut alimenter les outils qui en ont besoin, selon vos règles.' },
  { icon: ListChecks, title: 'Un suivi plus lisible', text: 'Les dossiers, leurs statuts et les tâches à réaliser restent accessibles aux personnes concernées.' },
  { icon: UsersRound, title: 'Du temps pour vos clients', text: 'Votre équipe se concentre sur les échanges, les arbitrages et les situations qui demandent son expertise.' },
]
const scenarios = [
  { number: '01', icon: Mail, title: 'Du contact au dossier commercial', text: 'Une demande arrive sur votre site. Les champs utiles sont contrôlés, la fiche est créée ou rapprochée dans le CRM, puis le bon interlocuteur est informé.', steps: ['Formulaire', 'Fiche CRM', 'Suivi attribué'], outcome: 'Une demande retrouvable, avec son contexte.' },
  { number: '02', icon: FileText, title: 'Du besoin au devis préparé', text: 'Un dossier contient les éléments nécessaires. Un modèle est prérempli avec les prestations prévues, puis présenté à votre équipe pour vérification et validation.', steps: ['Dossier qualifié', 'Brouillon de devis', 'Validation'], outcome: 'Une base prête à relire avant de l’envoyer.' },
  { number: '03', icon: Bell, title: 'De l’échéance à la prochaine action', text: 'Une date approche ou un statut évolue. Le scénario prépare un rappel, attribue une tâche et conserve la trace de ce qui a été fait.', steps: ['Date ou statut', 'Règle métier', 'Rappel interne'], outcome: 'La bonne information, au bon interlocuteur.' },
]
const comparisons = [
  { label: 'Une nouvelle demande', before: 'Recopier les coordonnées et le besoin dans plusieurs outils.', after: 'Transmettre les champs utiles à une fiche CRM, en contrôlant les doublons.' },
  { label: 'Une proposition à préparer', before: 'Repartir d’un ancien document et remplacer chaque information.', after: 'Préremplir un modèle avec les données du dossier, puis le faire valider.' },
  { label: 'Un dossier à suivre', before: 'Chercher le dernier message et demander qui prend le relais.', after: 'Attribuer la prochaine tâche et retrouver l’historique au même endroit.' },
]
const method = [
  { title: 'Observer votre quotidien', text: 'Nous partons d’une tâche concrète : qui la réalise, avec quelles données, dans quels outils et à quelle fréquence ?', result: 'Un processus cartographié.' },
  { title: 'Définir les règles', text: 'Nous précisons le déclencheur, les champs, les exceptions et les validations. Le périmètre et les coûts sont posés avant le développement.', result: 'Un scénario et un devis clairs.' },
  { title: 'Connecter et tester', text: 'Nous construisons les connexions et testons les cas courants, les données manquantes, les doublons et les interruptions de service.', result: 'Un parcours vérifié avec vous.' },
  { title: 'Transmettre et suivre', text: 'Votre équipe prend en main le fonctionnement. La documentation et les modalités de suivi permettent d’entretenir les scénarios dans la durée.', result: 'Un fonctionnement documenté.' },
]
const faqs = [
  { question: 'Quelles tâches peut-on automatiser dans une entreprise ?', answer: 'Les tâches répétitives dont les règles sont suffisamment claires constituent un bon point de départ : transférer une demande vers un CRM, préparer un document, synchroniser un statut ou attribuer un rappel. Nous vérifions d’abord la qualité des données et les exceptions. Les décisions commerciales ou les actions sensibles peuvent rester soumises à une validation humaine.' },
  { question: 'Peut-on connecter les logiciels que nous utilisons déjà ?', answer: 'Nous examinons les connecteurs disponibles, la documentation des API, les droits de votre abonnement et les limites d’utilisation. Selon le logiciel, une connexion directe, un échange de fichiers ou une autre organisation du parcours peut être envisagé. La faisabilité est confirmée pendant le cadrage, avant de vous promettre une intégration.' },
  { question: 'Comment choisir entre Make, Zapier, n8n et du sur-mesure ?', answer: 'Le choix dépend des connexions nécessaires, du volume d’opérations, de l’hébergement, des compétences disponibles et des coûts de fonctionnement. Un outil de scénarios peut suffire pour des échanges courants. Un développement spécifique peut être plus adapté à des règles métier ou des interfaces particulières. Nous expliquons le choix retenu dans votre proposition.' },
  { question: 'Que se passe-t-il lorsqu’un scénario rencontre une erreur ?', answer: 'Nous prévoyons le comportement attendu : identifier l’étape bloquée, enregistrer un état utile, prévenir la bonne personne et décider quand une reprise est possible. Les contrôles limitent notamment le risque de créer deux fois le même dossier. Le suivi et les délais d’intervention sont définis dans l’accompagnement choisi ; ils ne sont pas implicites.' },
  { question: 'Quel budget prévoir pour une automatisation ?', answer: 'Notre offre de départ commence à 499 € pour un périmètre simple : cartographie du parcours, mise en place du scénario, synchronisation site/CRM, e-mails, tests et documentation selon les connexions retenues. Un projet comportant des API ou des règles métier spécifiques est chiffré sur mesure. La proposition distingue la mise en place, les abonnements éventuels aux outils tiers et le suivi dans la durée.' },
  { question: 'Comment sont gérés les accès et les données ?', answer: 'Nous définissons les données nécessaires, les personnes autorisées et les comptes techniques utilisés. Les accès sont limités au périmètre du scénario ; les choix d’hébergement, de conservation et de fournisseurs sont examinés avec vous. Les accès et les modalités de maintenance sont documentés pour que votre organisation garde la maîtrise de son système.' },
]
const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'Service', '@id': `${pageUrl}#service`, name: 'Automatisation des processus et intégrations API', description, url: pageUrl, serviceType: 'Automatisation de processus et intégration de logiciels', provider: { '@type': 'Organization', name: 'Litus', url: 'https://www.litus.fr' }, areaServed: { '@type': 'Country', name: 'France' } },
    { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.litus.fr' }, { '@type': 'ListItem', position: 2, name: 'Automatisation', item: pageUrl }] },
    { '@type': 'FAQPage', '@id': `${pageUrl}#faq-automatisation`, mainEntity: faqs.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })) },
  ],
}

export default function AutomatisationPage() {
  return <div className="business-service automation-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <ServiceHero id="automatisation-title" eyebrow="Automatisation · Lorient & Le Mans"
      title={'Automatisez les tâches répétitives.\nGardez du temps pour l’essentiel.'} accent="Gardez du temps pour l’essentiel."
      description="Formulaires, CRM, devis, notifications : nous connectons vos logiciels pour simplifier votre quotidien. Des scénarios adaptés à vos règles, des informations qui circulent et une équipe qui garde la main."
      primaryAction={{ label: 'Parlons de votre projet', href: contactHref }} secondaryAction={{ label: 'Voir les scénarios', href: '#scenarios-automatisation' }}
      visual={<AutomationHeroDemo />} visualBackground="/blog/photos/bureau-notes-analyse.webp"
      proof={<ul className="business-hero-proof"><li><Clock3 aria-hidden="true" /><span>Moins de tâches répétitives</span></li><li><PlugZap aria-hidden="true" /><span>Vos logiciels connectés</span></li><li><ClipboardCheck aria-hidden="true" /><span>Vous gardez le contrôle</span></li></ul>}
    />
    <div className="business-content">
      <AiPillars />
      <section className="business-section auto-needs" aria-labelledby="auto-needs-title"><div className="business-container">
        <BusinessSectionHeading eyebrow="Vos outils doivent vous aider" id="auto-needs-title" description="Nous relions les logiciels que vous utilisez pour faire circuler l’information. Chaque échange suit vos règles et s’inscrit dans un fonctionnement clair pour votre équipe.">Moins de copier-coller.<br /><em>Plus de continuité.</em></BusinessSectionHeading>
        <ServiceReveal className="auto-needs-grid">{needs.map(({ icon: Icon, title: itemTitle, text }) => <article key={itemTitle}><span className="business-icon"><Icon aria-hidden="true" /></span><div><h3>{itemTitle}</h3><p>{text}</p></div></article>)}</ServiceReveal>
      </div></section>
      <section className="business-section business-section-soft" id="scenarios-automatisation" aria-labelledby="auto-scenarios-title"><div className="business-container">
        <BusinessSectionHeading eyebrow="Des usages concrets" id="auto-scenarios-title" description="Trois exemples de parcours que nous pouvons construire autour de votre activité. Le déclencheur, les outils et les étapes de validation sont définis avec vous.">Des scénarios simples à lire.<br /><em>Utiles tous les jours.</em></BusinessSectionHeading>
        <ServiceReveal className="business-grid">{scenarios.map(item => { const Icon = item.icon; return <article className="business-card auto-scenario" key={item.number}><div className="auto-scenario-top"><span className="business-icon"><Icon aria-hidden="true" /></span><span>{item.number}</span></div><h3>{item.title}</h3><p>{item.text}</p><ol className="auto-scenario-path">{item.steps.map((step, index) => <li key={step}><span>{step}</span>{index < item.steps.length - 1 && <ArrowRight aria-hidden="true" />}</li>)}</ol><div className="auto-scenario-outcome"><Check aria-hidden="true" /><span>{item.outcome}</span></div></article> })}</ServiceReveal>
        <p className="auto-illustration-note">Parcours illustratifs : les actions dépendent de vos outils et des accès disponibles.</p>
      </div></section>
      <section className="business-section" id="integrations-api" aria-labelledby="auto-api-title"><div className="business-container business-split">
        <div className="business-copy"><p className="business-kicker">Intégrations & API</p><h2 id="auto-api-title">Vos logiciels restent.<br /><em>Ils travaillent ensemble.</em></h2><p>Votre site, votre CRM et vos outils métier détiennent chacun une partie de l’information. Nous concevons les connexions qui permettent de la retrouver, de la mettre à jour et de l’utiliser au bon moment.</p><p>Connecteurs existants, API ou échanges de fichiers : nous vérifions les possibilités, les droits et les limites de chaque outil. Le choix entre <strong>Make, Zapier, n8n et un développement sur mesure</strong> vient ensuite, en fonction du besoin.</p><ul className="business-check-list"><li><Check aria-hidden="true" /><span>Une source définie pour chaque information.</span></li><li><Check aria-hidden="true" /><span>Des champs et des règles de mise à jour documentés.</span></li><li><Check aria-hidden="true" /><span>Des accès limités aux actions nécessaires.</span></li></ul><Link className="business-text-link" href={contactHref}>Vérifions vos possibilités de connexion<ArrowUpRight size={17} aria-hidden="true" /></Link></div>
        <div className="auto-integration" aria-label="Votre site, votre CRM et vos outils métier reliés par des règles d’automatisation"><div className="auto-integration-heading"><span><PlugZap aria-hidden="true" />Votre environnement</span><small>Connexions à définir</small></div><div className="auto-integration-network"><div className="auto-integration-sources"><span><PanelTop aria-hidden="true" />Site internet</span><span><Database aria-hidden="true" />CRM & ERP</span><span><Mail aria-hidden="true" />Messagerie</span></div><div className="auto-integration-hub"><Workflow aria-hidden="true" /><strong>Vos règles métier</strong><span>Contrôler · Relier · Transmettre</span></div><div className="auto-integration-targets"><span><FileText aria-hidden="true" />Documents</span><span><Bell aria-hidden="true" />Notifications</span></div></div><div className="auto-integration-bottom"><ShieldCheck aria-hidden="true" /><p>Les connexions sont testées dans le périmètre autorisé.<br /><strong>La faisabilité se confirme avec vos outils.</strong></p></div></div>
      </div></section>
      <section className="business-section business-section-warm" aria-labelledby="auto-comparison-title"><div className="business-container">
        <BusinessSectionHeading eyebrow="Un quotidien mieux organisé" id="auto-comparison-title" description="L’automatisation accompagne le travail de votre équipe. Elle prépare les étapes répétitives et rend visibles les actions qui demandent encore une décision.">Le même travail de fond.<br /><em>Moins de manipulations.</em></BusinessSectionHeading>
        <div className="auto-comparison"><div className="auto-comparison-head" aria-hidden="true"><span>Dans votre quotidien</span><span>Aujourd’hui, à la main</span><span>Avec un scénario adapté</span></div>{comparisons.map(row => <article className="auto-comparison-row" key={row.label}><h3>{row.label}</h3><p><span className="auto-comparison-mobile-label">À la main</span>{row.before}</p><p><span className="auto-comparison-mobile-label">Avec un scénario adapté</span><Check aria-hidden="true" />{row.after}</p></article>)}</div>
      </div></section>
      <section className="business-section" aria-labelledby="auto-human-title"><div className="business-container business-split">
        <figure className="auto-human-photo"><div className="business-photo"><Image src="/blog/photos/analyse-documents-v2.webp" alt="Une professionnelle travaille sur ordinateur dans un bureau lumineux" fill sizes="(max-width: 850px) 100vw, 48vw" /><div className="business-photo-note"><strong>Les tâches avancent. Vous décidez.</strong><span>Des points de contrôle prévus avec votre équipe.</span></div></div><figcaption>Photographie d’illustration — <a href="https://www.pexels.com/photo/woman-sitting-in-front-of-computer-monitor-1181635/" target="_blank" rel="noreferrer">Christina Morillo / Pexels</a></figcaption></figure>
        <div className="business-copy"><p className="business-kicker">Le bon niveau d’automatisation</p><h2 id="auto-human-title">L’humain garde<br /><em>le dernier mot.</em></h2><p>Préparer un devis ne signifie pas l’envoyer sans contrôle. Un message, une modification importante ou une donnée incomplète peuvent passer par une validation avant la suite du scénario.</p><p>Nous distinguons ce qui peut être exécuté selon une règle claire, ce qui doit être préparé et ce qui mérite une intervention. Vous connaissez le rôle de chaque étape.</p><div className="auto-human-decisions"><span><Settings2 aria-hidden="true" /><strong>Exécuter</strong><small>Une règle connue</small></span><span><FileText aria-hidden="true" /><strong>Préparer</strong><small>Un contenu à relire</small></span><span><UsersRound aria-hidden="true" /><strong>Valider</strong><small>Une décision d’équipe</small></span></div><Link className="business-text-link" href="/creation-outils-ia">Un besoin d’analyse ou de recherche ? Découvrir l’IA<ArrowRight size={17} aria-hidden="true" /></Link></div>
      </div></section>
      <section className="business-section business-section-dark" aria-labelledby="auto-reliability-title"><div className="business-container business-split">
        <div className="business-copy"><p className="business-kicker">Prévoir aussi les exceptions</p><h2 id="auto-reliability-title">Un scénario doit rester<br /><em>compréhensible et suivi.</em></h2><p>Un logiciel tiers peut changer, un accès expirer ou un champ manquer. Nous prévoyons les points de contrôle et les modalités d’intervention dans le fonctionnement du projet.</p><Link href={contactHref} className="business-text-link">Parlons de vos contraintes<ArrowRight size={17} aria-hidden="true" /></Link></div>
        <ServiceReveal className="auto-reliability-list">{[
          { icon: GitBranch, heading: 'Des erreurs identifiables', text: 'L’étape concernée et un contexte utile sont conservés pour comprendre le blocage et organiser la reprise.' },
          { icon: LockKeyhole, heading: 'Des droits maîtrisés', text: 'Les comptes, les permissions et les données nécessaires sont définis avec votre organisation.' },
          { icon: RefreshCw, heading: 'Un suivi convenu', text: 'La maintenance, les alertes, les coûts tiers et les évolutions sont précisés dans votre accompagnement.' },
        ].map(({ icon: Icon, heading, text }) => <article key={heading}><span><Icon aria-hidden="true" /></span><div><h3>{heading}</h3><p>{text}</p></div></article>)}</ServiceReveal>
      </div></section>
      <section className="business-section" id="methode-automatisation" aria-labelledby="auto-method-title"><div className="business-container">
        <BusinessSectionHeading eyebrow="Notre méthode" id="auto-method-title" description="On commence par un parcours utile et un périmètre réaliste. Votre équipe participe aux essais avant de faire évoluer l’ensemble.">Du processus observé<br /><em>au scénario en service.</em></BusinessSectionHeading>
        <ServiceReveal className="auto-method">{method.map((item, index) => <article key={item.title}><span className="auto-method-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><strong>{item.result}</strong></article>)}</ServiceReveal>
        <div className="auto-scope-line"><MessageSquare aria-hidden="true" /><p><strong>Un premier parcours, à partir de 499 €.</strong><span>Cartographie, scénario simple, synchronisation site/CRM, e-mails, tests et documentation. Périmètre confirmé sur devis ; abonnements tiers et suivi précisés séparément.</span></p><Link href={contactHref} className="business-text-link">Parlons de votre processus<ArrowUpRight size={16} aria-hidden="true" /></Link></div>
      </div></section>
      <section className="business-section business-section-soft" id="faq-automatisation" aria-labelledby="auto-faq-title"><div className="business-container">
        <BusinessSectionHeading eyebrow="Vos questions" id="auto-faq-title">Automatiser avec<br /><em>les bonnes réponses.</em></BusinessSectionHeading>
        <div className="business-faq">{faqs.map(item => <details key={item.question}><summary>{item.question}<ChevronDown aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>
      </div></section>
      <section className="business-section" aria-labelledby="auto-contact-title"><div className="business-container business-final"><div><p className="business-kicker">Votre prochain scénario</p><h2 id="auto-contact-title">Une tâche revient sans cesse ?<br /><em>Faisons le point ensemble.</em></h2><p>Montrez-nous votre parcours actuel, les logiciels utilisés et ce que vous souhaitez simplifier. Nous verrons ensemble les connexions utiles et les premières étapes.</p></div><div className="business-final-actions"><Link href={contactHref} className="site-cta-primary">Parlons de votre projet<ArrowRight size={18} aria-hidden="true" /></Link><span>Premier échange · Devis sur mesure</span><a href="tel:+33744985521">07 44 98 55 21</a></div></div><nav className="business-container auto-related" aria-label="Expertises complémentaires"><Link href="/creation-application-web">Application web sur mesure<ArrowUpRight aria-hidden="true" /></Link><Link href="/creation-outils-ia">Création d’outils IA<ArrowUpRight aria-hidden="true" /></Link><Link href="/creation-site-internet">Création de site internet<ArrowUpRight aria-hidden="true" /></Link></nav></section>
    </div>
  </div>
}
