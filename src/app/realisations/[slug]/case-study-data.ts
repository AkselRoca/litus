export type CaseIcon = 'site' | 'search' | 'ads' | 'shop' | 'design' | 'code' | 'tracking' | 'target' | 'map' | 'users'

export type CaseStudyData = {
  slug: string
  client: string
  year: string
  statement: string
  tags: string[]
  externalLink?: string | null
  meta: { label: string; value: string; icon: CaseIcon }[]
  hero: { desktop: string; mobile?: string; alt: string; stat?: { value: string; label: string } }
  context: { intro: string; detail?: string; image?: string; challenges: { title: string; text: string; icon: CaseIcon }[] }
  objectives: { title: string; text: string }[]
  response: { intro: string; expertise: { title: string; description: string; icon: CaseIcon; actions: string[] }[] }
  showcase?: { intro: string; tabs: { label: string; image: string; alt: string; mode?: 'desktop' | 'mobile' }[] }
  system?: { title: string; text: string; icon: CaseIcon }[]
  transformation?: { before: string[]; after: string[] }
  results?: { value?: number; prefix?: string; suffix?: string; headline: string; note?: string; indicators?: { value: string; label: string; icon: CaseIcon }[] }
  testimonial?: { quote: string; name: string; role: string; company: string; photo?: string; rating?: number }
  related?: { title: string; image: string; tags: string[]; href: string }[]
}

export const westCaseStudy: CaseStudyData = {
  slug: 'west-clotures-paysage',
  client: 'West Clôtures & Paysage',
  year: '2026',
  statement: 'Un dispositif pensé pour transformer la visibilité locale en demandes de chantiers.',
  tags: ['Site internet', 'Référencement naturel', 'Google Ads'],
  meta: [
    { label: 'Client', value: 'West Clôtures & Paysage', icon: 'users' },
    { label: 'Secteur', value: 'Paysagisme & clôtures', icon: 'site' },
    { label: 'Localisation', value: 'Morbihan (56)', icon: 'map' },
    { label: 'Durée', value: '3 mois', icon: 'tracking' },
  ],
  hero: { desktop: '/realisations/west-workspace-wide.webp', mobile: '/realisations/west-case-mobile.webp', alt: 'Site West Clôtures & Paysage sur ordinateur et mobile', stat: { value: '+10', label: 'demandes de chantiers par semaine' } },
  context: {
    intro: 'West Clôtures & Paysage souhaitait augmenter sa visibilité locale et obtenir davantage de demandes de devis depuis son site.',
    detail: 'La présence existante reflétait peu la qualité du travail et reposait encore largement sur le bouche-à-oreille. Le projet devait devenir un canal d’acquisition mesurable et durable.',
    image: '/realisations/west-case-prestation.webp',
    challenges: [
      { title: 'Présence Google limitée', text: 'Peu visible sur les recherches locales stratégiques.', icon: 'search' },
      { title: 'Site peu orienté conversion', text: 'Un design daté et peu de demandes entrantes.', icon: 'target' },
      { title: 'Dépendance au bouche-à-oreille', text: 'Une acquisition instable et difficile à développer.', icon: 'users' },
    ],
  },
  objectives: [
    { title: 'Gagner en visibilité locale', text: 'Être présent sur les recherches clés dans le Morbihan.' },
    { title: 'Transformer les visites en prospects', text: 'Créer un site clair, rassurant et orienté action.' },
    { title: 'Construire une acquisition durable', text: 'Combiner SEO et Google Ads pour générer des demandes régulières.' },
  ],
  response: {
    intro: 'Trois leviers complémentaires pour développer la visibilité, générer des demandes qualifiées et soutenir la croissance sur le long terme.',
    expertise: [
      { title: 'Site internet', description: 'Un site moderne, rapide et pensé pour convertir.', icon: 'site', actions: ['Design sur mesure', 'Parcours optimisé', 'Formulaires de contact', 'Version mobile optimisée'] },
      { title: 'Référencement naturel', description: 'Un contenu structuré pour apparaître durablement sur Google.', icon: 'search', actions: ['Recherche de mots-clés locaux', 'Pages services optimisées', 'Blog et conseils', 'Maillage interne'] },
      { title: 'Google Ads', description: 'Des campagnes ciblées pour générer rapidement des demandes.', icon: 'ads', actions: ['Campagnes sur mesure', 'Ciblage local', 'Suivi des conversions', 'Optimisation continue'] },
    ],
  },
  showcase: {
    intro: 'Chaque page rapproche le visiteur d’une prise de contact, avec une lecture claire des prestations et des preuves concrètes.',
    tabs: [
      { label: 'Accueil', image: '/realisations/west-workspace.webp', alt: 'Accueil du site West Clôtures & Paysage' },
      { label: 'Services', image: '/realisations/west-case-services.webp', alt: 'Présentation des services West Clôtures & Paysage' },
      { label: 'Pages internes', image: '/realisations/west-case-prestation.webp', alt: 'Page prestation de pose de clôtures' },
      { label: 'SEO local', image: '/realisations/west-case-seo.webp', alt: 'Page locale optimisée pour le référencement' },
      { label: 'Mobile', image: '/realisations/west-case-mobile.webp', alt: 'Version mobile du site', mode: 'mobile' },
    ],
  },
  system: [
    { title: 'UX/UI', text: 'Design moderne et rassurant', icon: 'design' },
    { title: 'Développement', text: 'Site rapide et sécurisé', icon: 'code' },
    { title: 'SEO', text: 'Contenus et maillage local', icon: 'search' },
    { title: 'Acquisition', text: 'Campagnes Google Ads', icon: 'ads' },
    { title: 'Tracking', text: 'Suivi des conversions', icon: 'tracking' },
  ],
  transformation: {
    before: ['Peu de visibilité sur Google', 'Site daté et peu performant', 'Peu de demandes entrantes', 'Dépendance au bouche-à-oreille'],
    after: ['Présence forte sur les recherches locales', 'Site moderne et orienté conversion', 'Demandes de chantiers régulières', 'Acquisition pérenne grâce au SEO et aux Ads'],
  },
  results: {
    value: 10, prefix: '+', headline: 'demandes de chantiers par semaine',
    note: 'Depuis la mise en ligne et le lancement des campagnes Google Ads.',
    indicators: [
      { value: 'SEO + SEA', label: 'Deux canaux complémentaires', icon: 'search' },
      { value: 'Campagnes actives', label: 'Des demandes qualifiées', icon: 'ads' },
      { value: 'Morbihan (56)', label: 'Un ciblage local précis', icon: 'map' },
    ],
  },
}

const expertiseLibrary: Record<string, CaseStudyData['response']['expertise'][number]> = {
  site: { title: 'Site internet', description: 'Une expérience claire, rapide et cohérente.', icon: 'site', actions: ['Architecture des pages', 'Design responsive', 'Parcours de conversion', 'Optimisation technique'] },
  seo: { title: 'Référencement naturel', description: 'Une base saine pour renforcer la visibilité organique.', icon: 'search', actions: ['Structure SEO', 'Contenus optimisés', 'Maillage interne', 'Suivi des positions'] },
  ads: { title: 'Google Ads', description: 'Une acquisition pilotée selon les objectifs du projet.', icon: 'ads', actions: ['Choix des campagnes', 'Ciblage des requêtes', 'Suivi des conversions', 'Optimisations'] },
  shop: { title: 'E-commerce', description: 'Une boutique fluide du produit jusqu’à la commande.', icon: 'shop', actions: ['Catalogue produits', 'Parcours d’achat', 'Paiement sécurisé', 'Expérience mobile'] },
  design: { title: 'Identité visuelle', description: 'Un langage graphique cohérent sur tous les supports.', icon: 'design', actions: ['Direction artistique', 'Système de couleurs', 'Typographies', 'Déclinaisons'] },
  code: { title: 'Développement sur mesure', description: 'Une solution construite autour du fonctionnement métier.', icon: 'code', actions: ['Cadrage fonctionnel', 'Développement', 'Tests', 'Mise en production'] },
}

function expertiseKey(category: string) {
  const value = category.toLowerCase()
  if (value.includes('commerce') || value.includes('shop')) return 'shop'
  if (value.includes('seo') || value.includes('référencement')) return 'seo'
  if (value.includes('ads')) return 'ads'
  if (value.includes('identité') || value.includes('design')) return 'design'
  if (value.includes('application') || value.includes('outil')) return 'code'
  return 'site'
}

export function genericCaseStudy(input: { slug: string; title: string; description: string; categories: string[]; image: string; link?: string | null; year?: string }): CaseStudyData {
  const keys = [...new Set(input.categories.map(expertiseKey))]
  const expertise = (keys.length ? keys : ['site']).map(key => expertiseLibrary[key])
  return {
    slug: input.slug, client: input.title, year: input.year ?? '2026', statement: input.description,
    tags: input.categories, externalLink: input.link,
    meta: [{ label: 'Client', value: input.title, icon: 'users' }, { label: 'Expertises', value: input.categories.slice(0, 2).join(' · ') || 'Projet digital', icon: 'target' }, { label: 'Accompagnement', value: 'Sur mesure', icon: 'tracking' }],
    hero: { desktop: input.image, alt: `Réalisation digitale pour ${input.title}` },
    context: { intro: input.description, detail: 'Le projet a été cadré autour des usages réels, des priorités de l’entreprise et de la qualité de l’expérience proposée.', challenges: [{ title: 'Présence à clarifier', text: 'Présenter l’activité avec plus de précision.', icon: 'design' }, { title: 'Parcours à simplifier', text: 'Faciliter l’accès aux informations importantes.', icon: 'site' }, { title: 'Visibilité à développer', text: 'Construire une présence plus durable.', icon: 'search' }] },
    objectives: [{ title: 'Clarifier le positionnement', text: 'Faire comprendre rapidement l’offre et sa valeur.' }, { title: 'Améliorer l’expérience', text: 'Créer un parcours fluide sur tous les écrans.' }, { title: 'Soutenir le développement', text: 'Donner à l’équipe un outil utile et évolutif.' }],
    response: { intro: 'Les expertises ont été choisies selon les besoins réels du projet.', expertise },
    showcase: { intro: 'Une réalisation conçue pour porter l’activité avec clarté.', tabs: [{ label: 'Vue du projet', image: input.image, alt: `Aperçu du projet ${input.title}` }] },
    system: expertise.map(item => ({ title: item.title, text: item.description, icon: item.icon })),
    transformation: { before: ['Une présence digitale à faire évoluer', 'Un parcours perfectible', 'Des contenus à mieux structurer'], after: ['Une image plus cohérente', 'Une expérience plus claire', 'Une base conçue pour durer'] },
    results: { headline: 'Une présence digitale plus claire, cohérente et facile à faire évoluer.', note: 'Les résultats chiffrés restent confidentiels ou ne sont pas encore publiés.' },
  }
}
