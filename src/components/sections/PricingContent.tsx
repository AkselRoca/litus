'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, BarChart3, Bot, Check, ChevronDown, Code2,
  Gauge, Globe2, Headphones, Heart, Megaphone, RefreshCw, Search,
  Settings2, ShieldCheck, ShoppingCart, Sparkles, Wrench,
} from 'lucide-react'
import { ServiceReveal } from '@/components/sections/services/ServiceReveal'

type Choice = 'site' | 'seo' | 'ads' | 'complete' | 'specific'
type Situation = 'none' | 'existing' | 'refonte' | 'active'
type Support = 'simple' | 'regular' | 'delegate'
type Recommendation = { name: string; price: string; explanation: string; href: string }

const entryOffers = [
  {
    name: 'Site Essentiel', kicker: 'Votre présence en ligne', price: '99 €', suffix: '/mois',
    description: 'Un site vitrine professionnel, entretenu et prêt à transformer vos visiteurs en demandes.',
    note: 'Périmètre et durée précisés au devis.', cta: 'Créer mon site', href: '/contact?objet=site-essentiel', icon: Globe2, featured: true,
    features: ['Site vitrine responsive', 'Formulaire de contact', 'Optimisation SEO de base', 'Hébergement et maintenance', 'Reporting trimestriel', 'Petites modifications trimestrielles', 'Ajustements SEO légers trimestriels'],
  },
  {
    name: 'SEO Essentiel', kicker: 'Votre visibilité durable', price: '99 €', suffix: '/mois',
    description: 'Un suivi régulier pour améliorer progressivement la visibilité de votre site sur Google.',
    note: 'Après validation de l’état initial du site.', cta: 'Améliorer mon référencement', href: '/contact?objet=seo-essentiel', icon: Search,
    features: ['Suivi du référencement', 'Optimisations techniques', 'Amélioration des pages existantes', 'SEO local lorsque pertinent', 'Analyse des positions', 'Ajustements réguliers', 'Progression suivie dans le temps'],
  },
  {
    name: 'Gestion Google Ads', kicker: 'Vos demandes dès maintenant', price: '129 €', suffix: '/mois',
    description: 'La gestion de vos campagnes Google Ads sans vous imposer un accompagnement complet.',
    note: 'Budget publicitaire Google non inclus.', cta: 'Lancer mes campagnes', href: '/contact?objet=gestion-google-ads', icon: BarChart3,
    features: ['Mise en place de la campagne', 'Configuration du compte et des conversions', 'Sélection et organisation des mots-clés', 'Optimisation des annonces', 'Suivi et améliorations continues', 'Ajustement des enchères et du ciblage'],
  },
]

const completeOffers = [
  { name: 'Visibilité', price: '229 €', suffix: '/mois', badge: 'Le meilleur point de départ', description: 'Le bon compromis pour une entreprise qui veut un site suivi et une visibilité qui progresse.', href: '/contact?objet=visibilite', features: ['Site avec design sur mesure', 'SEO mensuel', 'Modifications mensuelles', 'Suivi mensuel', 'Hébergement et maintenance', 'Conseils personnalisés'] },
  { name: 'Growth', price: '590 €', suffix: '/mois', description: 'Pour les entreprises qui veulent accélérer leur acquisition.', href: '/contact?objet=growth', features: ['Site vitrine ou avancé selon le projet', 'Stratégie SEO et SEO local', 'Gestion Google Ads', 'Optimisation et reporting mensuels', 'Maintenance', 'Support prioritaire'] },
  { name: 'Premium', price: '890 €', suffix: '/mois', description: 'Pour déléguer davantage votre acquisition et piloter une stratégie plus ambitieuse.', href: '/contact?objet=premium', features: ['Accompagnement marketing renforcé', 'SEO avancé', 'Google Ads et Meta Ads selon le périmètre', 'Optimisation des conversions', 'Reporting avancé', 'Interlocuteur dédié'] },
  { name: 'Entreprise', price: 'Sur devis', suffix: '', description: 'Une réponse construite autour d’un projet spécifique ou d’une organisation complexe.', href: '/contact?objet=entreprise', features: ['Développement web sur mesure', 'Intégrations et automatisations', 'Outils internes et applications web', 'E-commerce avancé', 'SEO national ou international', 'Grands comptes et collectivités'] },
]

const comparisonRows = [
  ['Site internet', 'Vitrine', '—', '—', 'Sur mesure', 'Selon projet', 'Selon projet', 'Selon projet'],
  ['Nombre de pages', 'Essentiel', '—', '—', 'Selon besoin', 'Selon besoin', 'Selon besoin', 'Sur mesure'],
  ['Design sur mesure', '—', '—', '—', 'Inclus', 'Inclus', 'Inclus', 'Inclus'],
  ['SEO', 'Bases', 'Essentiel', '—', 'Mensuel', 'Avancé', 'Avancé', 'National / international'],
  ['Fréquence du suivi', 'Trimestrielle', 'Régulière', 'Régulière', 'Mensuelle', 'Mensuelle', 'Renforcée', 'Sur mesure'],
  ['Modifications', 'Trimestrielles', 'SEO', 'Campagnes', 'Mensuelles', 'Mensuelles', 'Selon périmètre', 'Selon périmètre'],
  ['Google Ads', '—', '—', 'Gestion', 'En option', 'Inclus', 'Inclus', 'Selon stratégie'],
  ['Meta Ads', '—', '—', '—', '—', 'En option', 'Selon périmètre', 'Selon stratégie'],
  ['Reporting', 'Trimestriel', 'Positions', 'Campagnes', 'Mensuel', 'Mensuel', 'Avancé', 'Sur mesure'],
  ['Maintenance', 'Incluse', '—', '—', 'Incluse', 'Incluse', 'Incluse', 'Selon périmètre'],
  ['Accompagnement stratégique', 'Essentiel', 'SEO', 'Ads', 'Régulier', 'Régulier', 'Renforcé', 'Dédié'],
]

const specificServices = [
  { name: 'Création de site', detail: 'Vitrine, refonte ou landing page', icon: Globe2, href: '/creation-site-internet' },
  { name: 'E-commerce', detail: 'Shopify et WooCommerce', icon: ShoppingCart, href: '/creation-site-ecommerce' },
  { name: 'Référencement SEO', detail: 'Technique, contenu et local', icon: Search, href: '/seo-local' },
  { name: 'Google Ads', detail: 'Campagnes et suivi SEA', icon: Megaphone, href: '/google-ads' },
  { name: 'Développement spécifique', detail: 'Applications et outils métier', icon: Code2, href: '/creation-application-web' },
  { name: 'Automatisation', detail: 'Processus et connexions', icon: RefreshCw, href: '/automatisation' },
  { name: 'Outils IA', detail: 'Solutions IA utiles et sur mesure', icon: Bot, href: '/creation-outils-ia' },
  { name: 'Maintenance', detail: 'Suivi, sécurité et évolutions', icon: Wrench, href: '/contact?objet=maintenance' },
  { name: 'Audit', detail: 'Technique, SEO ou acquisition', icon: Gauge, href: '/contact?objet=audit' },
]

const trustItems = [
  { icon: ShieldCheck, title: 'Un périmètre clair', detail: 'Chaque prestation est cadrée' },
  { icon: Heart, title: 'Un accompagnement humain', detail: 'Vous échangez avec notre équipe' },
  { icon: BarChart3, title: 'Des résultats suivis', detail: 'Des indicateurs compréhensibles' },
  { icon: Headphones, title: 'Une montée en gamme libre', detail: 'Vous avancez à votre rythme' },
]

function getRecommendation(choice: Choice, situation: Situation, support: Support): Recommendation {
  if (choice === 'specific') return { name: 'Entreprise', price: 'sur devis', explanation: 'Votre besoin mérite un cadrage dédié avant de définir la solution et son budget.', href: '/contact?objet=entreprise' }
  if (support === 'delegate') {
    if (choice === 'complete' || choice === 'ads') return { name: 'Premium', price: '890 €/mois', explanation: 'Vous souhaitez déléguer une part importante de l’acquisition avec un pilotage renforcé.', href: '/contact?objet=premium' }
    return { name: 'Growth', price: '590 €/mois', explanation: 'Le pack réunit site, référencement et acquisition pour accélérer avec un suivi régulier.', href: '/contact?objet=growth' }
  }
  if (choice === 'complete') return support === 'regular'
    ? { name: 'Growth', price: '590 €/mois', explanation: 'Vous avez besoin de plusieurs leviers pilotés ensemble chaque mois.', href: '/contact?objet=growth' }
    : { name: 'Visibilité', price: '229 €/mois', explanation: 'Cette formule pose une base solide avec un site suivi et un travail SEO mensuel.', href: '/contact?objet=visibilite' }
  if (choice === 'site') return support === 'regular' || situation === 'refonte'
    ? { name: 'Visibilité', price: '229 €/mois', explanation: 'Votre site bénéficie d’un design sur mesure, de modifications et d’un suivi SEO mensuel.', href: '/contact?objet=visibilite' }
    : { name: 'Site Essentiel', price: '99 €/mois', explanation: 'Vous obtenez une présence professionnelle avec l’essentiel du suivi technique inclus.', href: '/contact?objet=site-essentiel' }
  if (choice === 'seo') return support === 'regular' && situation === 'active'
    ? { name: 'Visibilité', price: '229 €/mois', explanation: 'Votre base existe déjà : la formule Visibilité permet un suivi mensuel plus complet.', href: '/contact?objet=visibilite' }
    : { name: 'SEO Essentiel', price: 'à partir de 99 €/mois', explanation: 'Vous commencez par les optimisations qui comptent et mesurez la progression dans le temps.', href: '/contact?objet=seo-essentiel' }
  return support === 'regular'
    ? { name: 'Growth', price: '590 €/mois', explanation: 'Le pack associe campagnes, optimisation continue et les leviers nécessaires autour de votre acquisition.', href: '/contact?objet=growth' }
    : { name: 'Gestion Google Ads', price: '129 €/mois', explanation: 'Vous nous confiez vos campagnes sans devoir souscrire un pack complet.', href: '/contact?objet=gestion-google-ads' }
}

export function PricingContent() {
  const [step, setStep] = useState(0)
  const [choice, setChoice] = useState<Choice | null>(null)
  const [situation, setSituation] = useState<Situation | null>(null)
  const [support, setSupport] = useState<Support | null>(null)
  const [comparisonOpen, setComparisonOpen] = useState(false)
  const recommendation = useMemo(() => choice && situation && support ? getRecommendation(choice, situation, support) : null, [choice, situation, support])
  const resetAdvisor = () => { setStep(0); setChoice(null); setSituation(null); setSupport(null) }

  return <div className="pricing-content">
    <section className="pricing-entry" aria-labelledby="pricing-entry-title"><ServiceReveal className="pricing-shell">
      <header className="pricing-section-heading"><p className="pricing-section-label">COMMENCER SIMPLEMENT</p><h2 id="pricing-entry-title">Choisissez uniquement ce dont <span>vous avez besoin.</span></h2><p>Des solutions simples pour démarrer, puis des accompagnements plus complets quand votre activité grandit.</p></header>
      <div className="pricing-entry-grid">{entryOffers.map(offer => { const Icon = offer.icon; return <article className={`pricing-entry-card${offer.featured ? ' is-featured' : ''}`} key={offer.name}>
        <div className="pricing-entry-topline"><span><Icon aria-hidden="true" /></span><small>{offer.kicker}</small></div><h3>{offer.name}</h3><div className="pricing-entry-price"><strong>{offer.price}</strong><span>{offer.suffix}</span></div><p>{offer.description}</p>
        <ul>{offer.features.map(feature => <li key={feature}><Check aria-hidden="true" />{feature}</li>)}</ul><small className="pricing-entry-note">{offer.note}</small><Link href={offer.href}>{offer.cta}<ArrowRight aria-hidden="true" /></Link>
      </article> })}</div>
      <ol className="pricing-ladder" aria-label="Progression des offres">{['Site 99 €', 'SEO 99 €', 'Google Ads 129 €', 'Visibilité 229 €', 'Growth 590 €', 'Premium 890 €', 'Sur devis'].map((label, index) => <li key={label}><span>{String(index + 1).padStart(2, '0')}</span>{label}</li>)}</ol>
    </ServiceReveal></section>

    <section className="pricing-advisor" aria-labelledby="pricing-advisor-title"><ServiceReveal className="pricing-shell pricing-advisor-grid">
      <div className="pricing-advisor-copy"><p className="pricing-section-label">VOTRE POINT DE DÉPART</p><h2 id="pricing-advisor-title">Quelle offre correspond à <span>votre situation&nbsp;?</span></h2><p>Trois réponses suffisent. Le résultat s’appuie sur votre besoin, votre situation actuelle et le niveau de suivi souhaité.</p><ul><li><Check />Une recommandation immédiate</li><li><Check />Aucune donnée personnelle demandée</li><li><Check />Vous pouvez modifier vos réponses</li></ul></div>
      <div className="pricing-advisor-panel" aria-live="polite"><div className="pricing-advisor-progress" aria-label={`Étape ${Math.min(step + 1, 4)} sur 4`}>{[0, 1, 2, 3].map(index => <span key={index} className={step >= index ? 'is-active' : ''} />)}</div>
        {step === 0 && <fieldset className="pricing-question"><legend>Quel est votre objectif principal&nbsp;?</legend><p>Choisissez le besoin le plus urgent aujourd’hui.</p><div>{([['site', 'Créer ou refaire mon site'], ['seo', 'Être mieux visible sur Google'], ['ads', 'Générer des demandes rapidement'], ['complete', 'Obtenir un accompagnement complet'], ['specific', 'Réaliser un projet spécifique']] as [Choice, string][]).map(([value, label]) => <button type="button" key={value} className={choice === value ? 'is-selected' : ''} onClick={() => { setChoice(value); setStep(1) }}>{label}<ArrowRight /></button>)}</div></fieldset>}
        {step === 1 && <fieldset className="pricing-question"><legend>Où en êtes-vous aujourd’hui&nbsp;?</legend><p>Cette information nous aide à estimer le niveau de départ.</p><div>{([['none', 'Je n’ai pas encore de site'], ['existing', 'J’ai déjà un site'], ['refonte', 'Mon site doit être refait'], ['active', 'J’ai déjà du SEO ou des campagnes']] as [Situation, string][]).map(([value, label]) => <button type="button" key={value} className={situation === value ? 'is-selected' : ''} onClick={() => { setSituation(value); setStep(2) }}>{label}<ArrowRight /></button>)}</div><button type="button" className="pricing-advisor-back" onClick={() => setStep(0)}><ArrowLeft />Retour</button></fieldset>}
        {step === 2 && <fieldset className="pricing-question"><legend>Quel niveau d’accompagnement souhaitez-vous&nbsp;?</legend><p>Vous pourrez toujours faire évoluer la formule ensuite.</p><div>{([['simple', 'Quelque chose de simple'], ['regular', 'Un suivi régulier'], ['delegate', 'Déléguer une grande partie de mon acquisition']] as [Support, string][]).map(([value, label]) => <button type="button" key={value} className={support === value ? 'is-selected' : ''} onClick={() => { setSupport(value); setStep(3) }}>{label}<ArrowRight /></button>)}</div><button type="button" className="pricing-advisor-back" onClick={() => setStep(1)}><ArrowLeft />Retour</button></fieldset>}
        {step === 3 && recommendation && <div className="pricing-recommendation"><span className="pricing-recommendation-icon"><Sparkles aria-hidden="true" /></span><p>Nous vous recommandons</p><h3>{recommendation.name}</h3><strong>{recommendation.price}</strong><p>{recommendation.explanation}</p><Link href={recommendation.href}>Découvrir cette solution<ArrowRight /></Link><button type="button" onClick={resetAdvisor}><RefreshCw />Recommencer</button></div>}
      </div>
    </ServiceReveal></section>

    <section className="pricing-complete" aria-labelledby="pricing-complete-title"><ServiceReveal className="pricing-shell">
      <header className="pricing-section-heading"><p className="pricing-section-label">ALLER PLUS LOIN</p><h2 id="pricing-complete-title">Des accompagnements qui évoluent avec <span>votre activité.</span></h2><p>Une montée en gamme lisible, du suivi mensuel à la stratégie digitale construite sur mesure.</p></header>
      <div className="pricing-complete-grid">{completeOffers.map(plan => <article key={plan.name} className={`pricing-complete-card${plan.badge ? ' is-highlighted' : ''}`}>{plan.badge && <span className="pricing-plan-badge">{plan.badge}</span>}<div><h3>{plan.name}</h3><div className="pricing-complete-price"><strong>{plan.price}</strong><span>{plan.suffix}</span></div><p>{plan.description}</p></div><ul>{plan.features.map(feature => <li key={feature}><Check />{feature}</li>)}</ul><Link href={plan.href}>{plan.name === 'Entreprise' ? 'Discuter de mon projet' : `Choisir ${plan.name}`}<ArrowRight /></Link></article>)}</div>
      <div className="pricing-comparison"><div><span><Settings2 /></span><div><h3>Comparer les offres en détail</h3><p>Ouvrez le tableau uniquement si vous souhaitez vérifier chaque niveau de service.</p></div></div><button type="button" aria-expanded={comparisonOpen} aria-controls="pricing-comparison-table" onClick={() => setComparisonOpen(open => !open)}>Comparer les offres<ChevronDown className={comparisonOpen ? 'is-open' : ''} /></button></div>
      <div id="pricing-comparison-table" className={`pricing-comparison-table-wrap${comparisonOpen ? ' is-open' : ''}`} hidden={!comparisonOpen}><table><caption>Comparaison des formules Litus</caption><thead><tr><th>Comprend</th><th>Site Essentiel</th><th>SEO Essentiel</th><th>Google Ads</th><th>Visibilité</th><th>Growth</th><th>Premium</th><th>Entreprise</th></tr></thead><tbody>{comparisonRows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={cell}>{cell}</th> : <td key={`${row[0]}-${cell}-${index}`}>{cell === '—' ? cell : <><Check aria-hidden="true" />{cell}</>}</td>)}</tr>)}</tbody></table></div>
      <ul className="pricing-trust-band">{trustItems.map(item => { const Icon = item.icon; return <li key={item.title}><Icon aria-hidden="true" /><span><strong>{item.title}</strong><small>{item.detail}</small></span></li> })}</ul>
    </ServiceReveal></section>

    <section className="pricing-specific" aria-labelledby="pricing-specific-title"><ServiceReveal className="pricing-shell pricing-specific-grid">
      <header className="pricing-section-heading pricing-section-heading-left"><p className="pricing-section-label">BESOINS PONCTUELS OU SPÉCIFIQUES</p><h2 id="pricing-specific-title">Un besoin précis mérite une réponse <span>bien cadrée.</span></h2><p>Vous pouvez aussi nous confier une seule mission. Nous définissons son périmètre, ses livrables et son prix avant de commencer.</p><Link href="/contact?objet=prestation" className="site-cta-secondary">Parler de mon besoin<ArrowRight /></Link></header>
      <div className="pricing-specific-list">{specificServices.map(({ name, detail, icon: Icon, href }) => <Link href={href} key={name}><span><Icon /></span><div><strong>{name}</strong><small>{detail}</small></div><ArrowRight /></Link>)}</div>
    </ServiceReveal></section>
  </div>
}
