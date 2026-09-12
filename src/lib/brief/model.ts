export type Answers = Record<string, string | string[]>
export type Question = { id: string; label: string; kind: 'single' | 'multi' | 'text' | 'textarea' | 'url'; options?: string[]; required?: boolean; hint?: string; when?: (a: Answers) => boolean }
export type Step = { id: string; title: string; intro: string; questions: Question[]; when?: (a: Answers) => boolean }
const single = (id: string, label: string, options: string[], when?: Question['when']): Question => ({ id, label, options, kind: 'single', required: true, when })
const multi = (id: string, label: string, options: string[], when?: Question['when']): Question => ({ id, label, options, kind: 'multi', required: true, when })
const field = (id: string, label: string, required = false, kind: Question['kind'] = 'text', when?: Question['when']): Question => ({ id, label, required, kind, when })
export const isShop = (a: Answers) => a.type === 'Boutique e-commerce'
const isApp = (a: Answers) => a.type === 'Application web / outil métier'
const isAutomation = (a: Answers) => a.type === 'Automatisation / intégration'
const isSite = (a: Answers) => a.type === 'Site vitrine'
const has = (a: Answers, id: string, value: string) => Array.isArray(a[id]) && a[id].includes(value)
const physical = (a: Answers) => has(a, 'products', 'Produits physiques')
const redesign = (a: Answers) => a.situation === 'Faire évoluer ou refondre un existant'
export const STEPS: Step[] = [
  { id: 'project', title: 'Votre projet', intro: 'Commençons par ce que vous souhaitez construire.', questions: [
    single('type', 'Quel projet préparez-vous ?', ['Site vitrine', 'Boutique e-commerce', 'Application web / outil métier', 'Automatisation / intégration']),
    single('situation', 'Quel est votre point de départ ?', ['Créer un nouveau projet', 'Faire évoluer ou refondre un existant']),
    field('activity', 'Votre activité et votre offre', true, 'textarea'),
    field('existingUrl', 'Adresse du site ou de l’outil actuel', false, 'url', redesign),
    field('existingProblems', 'Que faut-il améliorer dans l’existant ?', true, 'textarea', redesign),
  ] },
  { id: 'objectives', title: 'Objectifs & publics', intro: 'Un cahier des charges utile commence par les usages, pas par la technologie.', questions: [
    multi('goals', 'Vos objectifs prioritaires', ['Générer des demandes qualifiées', 'Vendre en ligne', 'Présenter notre savoir-faire', 'Améliorer notre visibilité', 'Gagner du temps', 'Centraliser les données', 'Fidéliser les clients']),
    multi('audience', 'À qui le projet s’adresse-t-il ?', ['Particuliers', 'Professionnels', 'Équipe interne', 'Partenaires / revendeurs']),
    field('target', 'Décrivez vos clients ou utilisateurs cibles', true, 'textarea'),
    single('area', 'Votre périmètre géographique', ['Local / régional', 'France', 'International', 'Usage interne']),
    field('success', 'Comment saurez-vous que le projet est réussi ?', false, 'textarea'),
  ] },
  { id: 'scope', title: 'Structure & usages', intro: 'Précisons ce que vos visiteurs ou vos équipes doivent pouvoir faire.', when: a => !isShop(a), questions: [
    multi('pages', 'Les contenus à prévoir', ['Accueil', 'Services / prestations', 'À propos / équipe', 'Réalisations / références', 'Blog / ressources', 'Contact / demande de devis', 'Pages locales', 'Recrutement'], isSite),
    single('pageCount', 'Combien de pages environ ?', ['1 à 5', '6 à 15', '16 à 30', 'Plus de 30', 'À définir'], isSite),
    multi('siteFeatures', 'Les fonctionnalités utiles', ['Formulaire de contact', 'Prise de rendez-vous', 'Demande de devis détaillée', 'Espace client', 'Carte / points de vente', 'Téléchargement de ressources', 'Multilingue', 'À définir'], isSite),
    multi('roles', 'Les profils utilisateurs', ['Administrateur', 'Collaborateur', 'Client', 'Partenaire', 'Manager / validation'], isApp),
    multi('appFeatures', 'Les modules à prévoir', ['Authentification / droits', 'Tableaux de bord', 'Gestion de dossiers', 'Documents / exports', 'Paiements / abonnements', 'Notifications', 'Recherche / filtres', 'Agenda / réservation'], isApp),
    field('workflows', 'Décrivez un parcours utilisateur ou processus métier important', true, 'textarea', a => isApp(a) || isAutomation(a)),
    field('automationTools', 'Quels outils ou services doivent communiquer ?', true, 'textarea', isAutomation),
    multi('triggers', 'Ce qui déclenche le traitement', ['Réception d’un formulaire', 'Commande / paiement', 'Modification dans un outil', 'Fichier reçu', 'Horaire planifié', 'Action manuelle', 'À définir'], isAutomation),
    field('automationOutput', 'Quel résultat doit être produit et dans quel outil ?', true, 'textarea', isAutomation),
    single('volume', 'Volume d’utilisation envisagé', ['Moins de 100 opérations / utilisateurs par mois', '100 à 1 000', '1 000 à 10 000', 'Plus de 10 000', 'À définir'], a => isApp(a) || isAutomation(a)),
    multi('reliability', 'En cas d’erreur, que faut-il prévoir ?', ['Alerte à un responsable', 'Nouvelle tentative automatique', 'Validation humaine', 'Historique des traitements', 'À définir'], isAutomation),
  ] },
  { id: 'catalogue', title: 'Votre catalogue', intro: 'Les questions suivantes sont spécifiques à votre boutique.', when: isShop, questions: [
    multi('products', 'Que souhaitez-vous vendre ?', ['Produits physiques', 'Produits numériques', 'Abonnements', 'Services / réservations']),
    single('productCount', 'Taille du catalogue au lancement', ['1 à 20 produits', '21 à 100 produits', '101 à 1 000 produits', 'Plus de 1 000 produits', 'À définir']),
    multi('variants', 'Organisation des produits', ['Produits simples', 'Tailles / couleurs / variantes', 'Lots / coffrets', 'Personnalisation produit', 'Précommandes', 'À définir']),
    single('catalogueReady', 'Votre catalogue est-il prêt ?', ['Fiches et photos disponibles', 'Import CSV / Excel disponible', 'Catalogue à reprendre d’un site', 'Tout ou partie à créer']),
    single('stock', 'Comment gérez-vous les stocks ?', ['Un stock central', 'Plusieurs stocks / points de vente', 'Synchronisation ERP / fournisseur', 'Production à la demande', 'À définir'], physical),
    field('digitalDelivery', 'Formats des fichiers et règles d’accès / téléchargement', false, 'textarea', a => has(a, 'products', 'Produits numériques')),
    field('subscriptions', 'Fréquence, contenu et gestion des abonnements', true, 'textarea', a => has(a, 'products', 'Abonnements')),
    field('booking', 'Comment se réservent et se déroulent vos services ?', true, 'textarea', a => has(a, 'products', 'Services / réservations')),
  ] },
  { id: 'commerce', title: 'Vente & logistique', intro: 'Du choix d’un produit à la réception de la commande : dessinons le parcours complet.', when: isShop, questions: [
    multi('payments', 'Moyens de paiement souhaités', ['Carte bancaire', 'PayPal', 'Apple Pay / Google Pay', 'Paiement fractionné', 'Virement', 'À définir']),
    multi('shipping', 'Modes de livraison', ['Livraison à domicile', 'Point relais', 'Retrait en magasin', 'Livraison locale', 'À définir'], physical),
    field('shippingRules', 'Transporteurs, zones, tarifs et règles de livraison', false, 'textarea', physical),
    multi('salesFeatures', 'Fonctionnalités de vente', ['Codes promotionnels', 'Avis clients', 'Relance de paniers abandonnés', 'Programme de fidélité', 'Cartes cadeaux', 'Recherche / filtres avancés', 'Factures', 'Vente internationale', 'À définir']),
    multi('b2b', 'Besoins propres aux clients professionnels', ['Tarifs professionnels', 'Catalogue réservé', 'Commande minimum', 'Devis avant commande', 'Paiement différé à étudier', 'Aucun besoin particulier'], a => has(a, 'audience', 'Professionnels') || has(a, 'audience', 'Partenaires / revendeurs')),
    field('returns', 'Votre fonctionnement pour le SAV, les retours et les remboursements', false, 'textarea'),
  ] },
  { id: 'technology', title: 'Outils & connexions', intro: 'Nous conservons vos contraintes sans imposer une solution avant l’étude du besoin.', questions: [
    single('platform', 'Avez-vous une préférence technique ?', ['Aucune : être conseillé', 'Shopify', 'WordPress / WooCommerce', 'Framer', 'Next.js / React', 'Développement sur mesure', 'Conserver l’outil actuel', 'Autre']),
    field('platformOther', 'Quelle solution ?', true, 'text', a => a.platform === 'Autre'),
    multi('integrations', 'Les outils à connecter', ['CRM', 'Emailing / newsletter', 'Comptabilité / facturation', 'ERP / stocks', 'Paiement', 'Agenda', 'API métier', 'Aucun pour le moment', 'À définir']),
    field('tools', 'Noms des outils, accès API ou contraintes connus', false, 'textarea'),
    multi('migration', 'Les éléments à reprendre', ['Pages / contenus', 'Produits / variantes', 'Clients', 'Commandes', 'Articles du blog', 'Redirections SEO', 'Fichiers / documents', 'À définir'], redesign),
    field('constraints', 'Contraintes de données, de sécurité ou d’hébergement', false, 'textarea'),
  ] },
  { id: 'content', title: 'Identité & contenus', intro: 'Préparons aussi ce qui donnera du fond et de la personnalité au projet.', questions: [
    single('brand', 'Votre identité visuelle', ['Charte et logo disponibles', 'Identité à faire évoluer', 'Identité à créer', 'À définir']),
    single('content', 'Qui prépare les textes et visuels ?', ['Notre équipe', 'Litus : accompagnement souhaité', 'Travail partagé', 'À définir']),
    field('inspiration', 'Sites ou références qui vous plaisent, et pourquoi', false, 'textarea'),
    single('languages', 'Langues au lancement', ['Français', 'Français + anglais', 'Plusieurs langues à préciser', 'À définir']),
    field('languageDetails', 'Quelles langues ?', true, 'text', a => a.languages === 'Plusieurs langues à préciser'),
    multi('acquisition', 'Visibilité et mesure à prévoir', ['Référencement naturel', 'SEO local', 'Google Ads', 'Suivi des conversions', 'Tableau de bord de performance', 'Pas d’accompagnement à ce stade', 'À définir']),
  ] },
  { id: 'delivery', title: 'Budget & lancement', intro: 'Ces indications servent à cadrer le projet. Elles ne constituent pas un devis.', questions: [
    single('budget', 'Enveloppe envisagée', ['Moins de 2 000 €', '2 000 à 5 000 €', '5 000 à 10 000 €', '10 000 à 20 000 €', 'Plus de 20 000 €', 'À définir ensemble']),
    single('timing', 'Délai souhaité', ['Dès que possible', 'Sous 1 à 3 mois', 'Sous 3 à 6 mois', 'Plus de 6 mois', 'Date impérative', 'À définir']),
    field('deadline', 'Date impérative et raison de cette échéance', true, 'text', a => a.timing === 'Date impérative'),
    multi('support', 'Après la mise en ligne', ['Formation à l’administration', 'Maintenance technique', 'Évolutions régulières', 'Accompagnement acquisition', 'Autonomie complète', 'À définir']),
    field('decision', 'Qui valide le projet et les livrables ?', false),
    field('extra', 'Autres besoins ou points d’attention', false, 'textarea'),
  ] },
]

export function activeSteps(answers: Answers) { return STEPS.filter(step => !step.when || step.when(answers)) }
export function activeQuestions(step: Step, answers: Answers) { return step.questions.filter(q => !q.when || q.when(answers)) }
export function cleanAnswers(input: Answers, trim = true): Answers {
  const output: Answers = {}
  for (const step of activeSteps(input)) for (const q of activeQuestions(step, input)) {
    const value = input[q.id]
    if (q.kind === 'multi' && Array.isArray(value)) output[q.id] = (q.options || []).filter(option => value.includes(option))
    else if (typeof value === 'string' && (q.kind !== 'single' || q.options?.includes(value))) output[q.id] = trim ? value.trim() : value
  }
  return output
}
export function questionError(q: Question, value: Answers[string] | undefined): string | null {
  if (q.required && (!value || (Array.isArray(value) ? !value.length : !value.trim()))) return 'Merci de renseigner ce point.'
  if (typeof value === 'string' && value.length > (q.kind === 'textarea' ? 2000 : 400)) return 'Votre réponse est trop longue.'
  if (q.kind === 'url' && typeof value === 'string' && value.trim()) {
    try { if (!['http:', 'https:'].includes(new URL(value).protocol)) return 'Utilisez une adresse commençant par https://.' } catch { return 'Utilisez une adresse complète, par exemple https://votre-site.fr.' }
  }
  if (Array.isArray(value) && value.length > 1 && value.some(v => ['À définir', 'Aucun pour le moment', 'Aucun besoin particulier', 'Pas d’accompagnement à ce stade'].includes(v))) return 'Choisissez une option neutre seule, ou sélectionnez vos besoins.'
  return null
}
export type BriefContact = { fullName: string; email: string; company?: string; phone?: string }
export type BriefDocument = { reference: string; createdAt: string; title: string; contact: BriefContact; sections: { title: string; rows: { label: string; value: string }[]; bullets: string[] }[] }
export function createDocument(answers: Answers, contact: BriefContact, reference: string, createdAt: string): BriefDocument {
  const a = cleanAnswers(answers)
  const sections = activeSteps(a).map(step => ({ title: step.title, rows: activeQuestions(step, a).flatMap(q => {
    const v = a[q.id]; const value = Array.isArray(v) ? v.join(', ') : v
    return value ? [{ label: q.label, value }] : []
  }), bullets: [] as string[] }))
  const deliverables = ['Cadrage fonctionnel à valider ensemble et liste des éléments inclus dans le projet.', 'Conception et réalisation adaptées aux utilisateurs et aux contraintes exprimées.', 'Recette sur les parcours prioritaires, préparation de la mise en production et transmission des accès convenus.']
  const acceptance = ['Valider les contenus, les parcours principaux et les droits d’accès avec le responsable du projet.', 'Contrôler les affichages sur mobile et ordinateur, les états d’erreur et l’accessibilité des parcours clés.', 'Documenter les traitements de données, les responsabilités et les éventuels consentements nécessaires avant publication.']
  if (isShop(a)) {
    deliverables.push('Configuration du catalogue, des variantes retenues et du parcours panier / commande / paiement.', 'Préparation des messages transactionnels, de la gestion des commandes et des règles de SAV à fournir par le client.')
    acceptance.push('Tester une commande complète en environnement de test, les totaux, les taxes à configurer et la confirmation reçue.', 'Vérifier les paiements acceptés, refusés et abandonnés ainsi que le traitement d’un remboursement.')
    if (physical(a)) { deliverables.push('Paramétrage des stocks et modes de livraison sélectionnés.'); acceptance.push('Vérifier les frais de livraison, les zones desservies et la mise à jour du stock après commande.') }
    if (has(a, 'shipping', 'Retrait en magasin')) acceptance.push('Valider la sélection du point de retrait et les consignes reçues par le client.')
    if (has(a, 'products', 'Produits numériques')) acceptance.push('Valider que l’accès au téléchargement dépend bien du statut de paiement et des règles définies.')
    if (has(a, 'products', 'Abonnements')) acceptance.push('Préciser et tester le renouvellement, la résiliation et la gestion d’un paiement récurrent en échec.')
    if (has(a, 'audience', 'Professionnels')) acceptance.push('Valider les règles B2B retenues, les droits de consultation et les éventuels tarifs réservés.')
  }
  if (isApp(a)) { deliverables.push('Spécification des rôles, modules et flux métier sélectionnés, avec règles de validation.'); acceptance.push('Tester les permissions de chaque rôle et un parcours complet pour chacun des usages prioritaires.') }
  if (isAutomation(a)) { deliverables.push('Description des déclencheurs, des données échangées, des traitements et des sorties attendues.', 'Documentation des connexions et du traitement des erreurs selon les options retenues.'); acceptance.push('Exécuter un scénario nominal, un cas de données invalides et un cas de service tiers indisponible.', 'Définir le comportement en cas de doublon, les alertes et les possibilités de reprise.') }
  if (isSite(a)) { deliverables.push('Arborescence des pages retenues, maquettes des gabarits utiles et intégration des contenus disponibles.'); acceptance.push('Vérifier l’envoi et la réception des formulaires, ainsi que les liens et appels à l’action.') }
  if (redesign(a)) { deliverables.push('Plan de reprise de l’existant, sauvegarde préalable et procédure de bascule à définir.'); acceptance.push('Contrôler un échantillon des données migrées et les redirections des anciennes URL concernées.') }
  if (has(a, 'acquisition', 'Référencement naturel') || has(a, 'acquisition', 'SEO local')) deliverables.push('Cadrage des pages à cibler et des fondamentaux SEO : titres, structure, indexation et maillage interne, selon le périmètre convenu.')
  if (has(a, 'support', 'Formation à l’administration')) deliverables.push('Session de prise en main et documentation des opérations courantes.')
  const unresolved = activeSteps(a).flatMap(s => activeQuestions(s, a).flatMap(q => {
    const v = a[q.id]; const text = Array.isArray(v) ? v.join(', ') : v || ''
    return !text || /À définir|être conseillé|à préciser/i.test(text) ? [q.label] : []
  }))
  unresolved.push('Périmètre définitif, chiffrage et calendrier après échange avec Litus.', 'Coûts récurrents éventuels : hébergement, licences, services tiers et maintenance.', 'Exigences mesurables de performance, sécurité et accessibilité à convenir selon les usages.')
  sections.push({ title: 'Livrables à cadrer avec Litus', rows: [], bullets: deliverables }, { title: 'Critères de recette proposés', rows: [], bullets: acceptance }, { title: 'Points à préciser ensemble', rows: [], bullets: unresolved })
  return { reference, createdAt, title: `${a.type || 'Projet digital'}${contact.company ? ` · ${contact.company}` : ''}`, contact, sections }
}
export function documentMarkdown(doc: BriefDocument): string {
  return [`# Cahier des charges · ${doc.title}`, `Référence : ${doc.reference}`, `Date : ${new Date(doc.createdAt).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })} (Paris)`, `Contact : ${doc.contact.fullName} <${doc.contact.email}>`, doc.contact.phone ? `Téléphone : ${doc.contact.phone}` : '', 'Document de cadrage établi à partir de vos réponses. À valider ensemble ; il ne constitue ni un devis ni un engagement contractuel.', ...doc.sections.flatMap(s => [`\n## ${s.title}`, ...s.rows.map(r => `- **${r.label}** : ${r.value}`), ...s.bullets.map(b => `- ${b}`)]), '\nLitus · Stratégie digitale & acquisition', 'Lorient · Le Mans | 07 44 98 55 21 | https://www.litus.fr'].filter(Boolean).join('\n\n')
}
