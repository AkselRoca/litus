import type { CaseStudyData } from './case-study-data'

/**
 * Source: https://www.fgchronodep.fr/, checked 9 September 2026.
 * The footer identifies Caudan and credits Litus for the website creation.
 * Only the delivered website and its visible features are described here;
 * no campaign, performance result or project date has been inferred.
 */
export const fgChronodepCaseStudy: CaseStudyData = {
  slug: 'fg-chronodep',
  client: 'FG Chronodep',
  year: 'Site en ligne',
  statement: 'Un site vitrine pour présenter une entreprise de plomberie implantée à Caudan, ses prestations et ses interventions dans le pays de Lorient.',
  tags: ['Création de site internet'],
  externalLink: 'https://www.fgchronodep.fr/',
  meta: [
    { label: 'Client', value: 'FG Chronodep', icon: 'users' },
    { label: 'Secteur', value: 'Plomberie & dépannage', icon: 'site' },
    { label: 'Localisation', value: 'Caudan · Pays de Lorient', icon: 'map' },
    { label: 'Prestation', value: 'Site vitrine', icon: 'code' },
  ],
  hero: {
    desktop: '/lorient/fg-chronodep-website.webp',
    alt: 'Capture du site FG Chronodep, plombier à Lorient et Caudan, réalisé par Litus',
  },
  context: {
    intro: 'FG Chronodep est une entreprise de plomberie basée à Caudan. Elle intervient à Lorient et dans les communes voisines pour le dépannage, la recherche de fuite et l’assainissement.',
    detail: 'Le site réunit les informations utiles pour comprendre les prestations, identifier la zone d’intervention et prendre contact avec l’entreprise.',
    challenges: [
      { title: 'Plusieurs types d’intervention', text: 'Présenter les prestations et leurs particularités dans des pages dédiées.', icon: 'site' },
      { title: 'Une activité de proximité', text: 'Rendre les communes desservies faciles à identifier.', icon: 'map' },
      { title: 'Un contact direct', text: 'Donner accès au téléphone et à une demande de rappel.', icon: 'target' },
    ],
  },
  objectives: [
    { title: 'Présenter les prestations', text: 'Expliquer les services de plomberie et de dépannage proposés par FG Chronodep.' },
    { title: 'Faciliter la prise de contact', text: 'Permettre un appel direct ou l’envoi d’une demande de rappel depuis le site.' },
    { title: 'Préciser les zones desservies', text: 'Situer l’entreprise à Caudan et présenter son secteur d’intervention autour de Lorient.' },
  ],
  response: {
    intro: 'La création du site s’articule autour de trois fonctions concrètes : présenter les services, renseigner les visiteurs et leur permettre de contacter l’entreprise.',
    expertise: [
      {
        title: 'Présentation des services',
        description: 'Des pages pour découvrir les différentes interventions.',
        icon: 'site',
        actions: ['Présentation de la plomberie et du dépannage', 'Pages dédiées aux prestations', 'Informations sur les tarifs'],
      },
      {
        title: 'Prise de contact',
        description: 'Plusieurs moyens de joindre directement l’entreprise.',
        icon: 'target',
        actions: ['Numéro de téléphone accessible', 'Formulaire de demande de rappel', 'Choix du type d’intervention et de la ville'],
      },
      {
        title: 'Ancrage local',
        description: 'Un site qui situe clairement l’activité dans le pays de Lorient.',
        icon: 'map',
        actions: ['Implantation à Caudan', 'Présentation de la zone d’intervention', 'Informations sur les communes desservies'],
      },
    ],
  },
  showcase: {
    intro: 'La page d’accueil présente l’activité et le secteur géographique, avec le numéro de téléphone et le formulaire de rappel immédiatement accessibles.',
    tabs: [{ label: 'Accueil', image: '/lorient/fg-chronodep-website.webp', alt: 'Page d’accueil actuelle de FG Chronodep' }],
  },
}
