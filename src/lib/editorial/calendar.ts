import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { INTERVAL, nextSlot, services, similarity } from './core'
import { model, officialQuery, research } from './providers'
import { topicSchema, type Item, type State, type Topic } from './types'

// Launch hypotheses, not fabricated keyword volumes. Each is re-researched before writing.
const seeds: Record<string, [string, string, string][]> = {
  '/referencement-naturel': [
    ['Page explorée mais non indexée : quoi vérifier avant de réécrire ?', 'page explorée non indexée Search Console', 'Distinguer exploration, canonical et valeur du contenu dans un diagnostic décisionnel.'],
    ['Core Web Vitals : quelle correction traiter en premier sur un site de PME ?', 'priorité corrections Core Web Vitals PME', 'Arbitrer données terrain et laboratoire, sans promettre un gain de position.'],
    ['Maillage interne : comment trouver les pages importantes laissées de côté ?', 'identifier pages orphelines maillage interne', 'Croiser navigation et URLs découvertes pour choisir les liens vraiment utiles.'],
  ],
  '/google-ads': [
    ['Google Ads facture-t-il les clics de concurrents ?', 'clics concurrents Google Ads facturation', 'Expliquer les clics incorrects et les limites des preuves accessibles à un annonceur.'],
    ['Petit budget Google Ads : combien de services lancer en même temps ?', 'répartir petit budget Google Ads services', 'Construire un arbitrage à partir des marges et du suivi, sans inventer de CPC local.'],
    ['Performance Max ou Search pour une entreprise qui recherche des devis ?', 'Performance Max Search génération prospects', 'Comparer contrôle, données de conversion et contraintes de qualification.'],
  ],
  '/creation-site-internet': [
    ['WordPress ou Next.js : qui pourra mettre le site à jour après livraison ?', 'WordPress Next.js autonomie PME', 'Comparer les responsabilités concrètes et le coût organisationnel de la maintenance.'],
    ['Formulaire de devis : quels champs garder pour qualifier sans décourager ?', 'champs formulaire devis qualification', 'Relier chaque question à une décision commerciale et à l’accessibilité.'],
    ['Nom de domaine et hébergement : quels accès une entreprise doit-elle conserver ?', 'propriété nom domaine accès hébergement entreprise', 'Liste pratique de contrôle des accès et des responsabilités lors de la livraison.'],
  ],
  '/creation-site-ecommerce': [
    ['Stocks en boutique et en ligne : comment éviter la double vente ?', 'synchronisation stock boutique ecommerce double vente', 'Décrire les réservations, annulations et délais de synchronisation avec des cas hypothétiques.'],
    ['Paiement refusé : que doit montrer une boutique sans perdre la commande ?', 'paiement refusé ecommerce commande', 'Distinguer état de paiement, commande et reprise du parcours.'],
    ['Filtres e-commerce : quelles URLs laisser indexer par Google ?', 'indexation filtres navigation facettes ecommerce', 'Relier intention de recherche, catalogue et maîtrise de l’exploration.'],
  ],
  '/creation-landing-page': [
    ['Landing page Google Ads : faut-il supprimer le menu de navigation ?', 'landing page Google Ads supprimer menu', 'Choisir selon le niveau d’engagement demandé et les informations nécessaires pour décider.'],
    ['Une landing page par offre ou par audience : comment trancher ?', 'landing page offre audience choix', 'Définir quand une différence de besoin mérite une page réellement distincte.'],
    ['Test A/B avec peu de trafic : que peut-on raisonnablement apprendre ?', 'test AB landing page faible trafic', 'Expliquer les limites des conclusions et les observations alternatives utiles.'],
  ],
  '/refonte-site-internet': [
    ['Refonte : combien de temps Google met-il à comprendre les nouvelles URLs ?', 'refonte nouvelles URL délai Google', 'Distinguer redirections, réexploration et signaux sans annoncer un délai garanti.'],
    ['Changer de CMS : comment préparer la correspondance des anciennes URLs ?', 'migration CMS tableau redirections URL', 'Construire une table de correspondance à partir de besoins et contenus équivalents.'],
    ['Refondre un site sans perdre les demandes : quoi contrôler le jour de mise en ligne ?', 'recette refonte site suivi conversions', 'Tester formulaires, appels, consentement et événements de conversion de bout en bout.'],
  ],
  '/seo-local': [
    ['Premier sur Maps, absent des résultats classiques : pourquoi ?', 'premier Google Maps absent résultats naturels', 'Expliquer deux surfaces de recherche avec des diagnostics séparés.'],
    ['Pages par commune autour de Lorient : quand apportent-elles une vraie valeur ?', 'pages communes autour Lorient SEO local', 'S’appuyer sur une SERP locale vérifiée et distinguer page utile et page satellite.'],
    ['Deux établissements proches : comment éviter qu’ils ciblent la même recherche ?', 'SEO local deux établissements proches', 'Clarifier implantation, offre et parcours sans fabriquer des variations de ville.'],
  ],
  '/google-business-profile': [
    ['Fiche Google suspendue : quelles preuves préparer avant de faire appel ?', 'Google Business Profile suspension preuves appel', 'S’appuyer sur les procédures officielles actuelles et prévenir les demandes répétées.'],
    ['Changer l’adresse de sa fiche Google : quelles vérifications prévoir ?', 'changer adresse fiche Google vérification', 'Préparer les informations cohérentes et les étapes possibles sans garantir leur durée.'],
    ['Avis négatif sans client identifiable : répondre, signaler ou attendre ?', 'avis Google négatif client inconnu signaler', 'Distinguer désaccord et violation de règles à partir des critères officiels.'],
  ],
  '/creation-application-web': [
    ['Une PME a-t-elle besoin d’un CRM sur mesure ou d’un outil existant ?', 'CRM sur mesure PME critères choix', 'Identifier les écarts de processus qui justifient réellement une application.'],
    ['Espace client : quelles données afficher sans multiplier les droits d’accès ?', 'espace client droits accès données', 'Construire des rôles et des parcours avec des exemples explicitement hypothétiques.'],
    ['Application métier : que faut-il prototyper avant de développer ?', 'prototype application métier validation', 'Tester les décisions et les exceptions du processus plutôt que seulement les écrans.'],
  ],
  '/developpement-web-sur-mesure': [
    ['SaaS ou développement sur mesure : comment comparer le coût sur trois ans ?', 'SaaS sur mesure coût total comparaison', 'Proposer une grille de calcul sans prix ou résultats présentés comme observés.'],
    ['Application interne : que se passe-t-il si le développeur change ?', 'réversibilité application sur mesure documentation', 'Clarifier propriété, accès, dépendances, sauvegardes et transfert de connaissances.'],
    ['Import Excel dans un outil métier : comment traiter les données incohérentes ?', 'import Excel application validation données', 'Prévisualiser, expliquer les rejets et rendre les importations répétables.'],
  ],
  '/integrations-api': [
    ['Webhook reçu deux fois : comment empêcher deux commandes identiques ?', 'webhook doublon idempotence commande', 'Expliquer les identifiants, contraintes uniques et reprises sur incident.'],
    ['API indisponible : comment éviter de perdre les demandes de prospects ?', 'API indisponible reprise leads', 'Présenter file d’attente, tentatives bornées et visibilité des erreurs.'],
    ['Connecter son CRM à son site : quelles données synchroniser et dans quel sens ?', 'synchronisation CRM site sens données', 'Définir la source de vérité, les corrections et la gestion des conflits.'],
  ],
  '/automatisation': [
    ['Automatiser les relances de devis : comment éviter les envois inadaptés ?', 'automatiser relances devis règles arrêt', 'Prévoir statuts, arrêt après réponse et exceptions avant de choisir un outil.'],
    ['Make ou n8n : que change vraiment le choix pour une petite équipe ?', 'Make n8n petite équipe maintenance', 'Comparer exploitation, accès et diagnostic plutôt qu’un catalogue de fonctions.'],
    ['Une automatisation échoue en silence : quels contrôles installer ?', 'surveiller automatisation échecs silencieux', 'Définir attentes métier, traces et alertes actionnables.'],
  ],
  '/creation-outils-ia': [
    ['Assistant IA interne : comment éviter de répondre avec un document périmé ?', 'assistant IA documents périmés RAG', 'Relier version des sources, citations et refus de réponse non fondée.'],
    ['Peut-on utiliser ses devis et contrats dans un assistant IA d’entreprise ?', 'assistant IA entreprise devis contrats données', 'Distinguer accès, confidentialité et minimisation en s’appuyant sur la CNIL.'],
    ['Agent IA ou automatisation classique : quel choix pour une tâche répétitive ?', 'agent IA automatisation classique différence', 'Identifier incertitude, coût d’erreur et étapes à garder déterministes.'],
  ],
}
export function initialTopics(): Topic[] {
  return [0, 1, 2].flatMap(round => services.map((service, index) => {
    const [topic, primaryKeyword, angle] = seeds[service.path][round]
    return { topic, primaryKeyword, secondaryKeywords: [], searchIntent: `Comprendre et décider : ${primaryKeyword}`, cluster: service.title, targetServicePage: service.path, workingTitle: topic, angle,
      reason: `Question préalable à un projet ${service.title.toLowerCase()}. ${angle}`, priority: Math.max(60, 95 - round * 7 - index) }
  }))
}
export function makeItems(topics: Topic[], state: State, start: string): Item[] {
  return topics.map((topic, i) => ({ ...topic, id: randomUUID(), namespace: state.namespace, status: 'IDEA', stage: 'RESEARCH', scheduledAt: new Date(Date.parse(start) + i * INTERVAL).toISOString(),
    publishedAt: null, slug: null, articleId: null, createdAt: new Date().toISOString(), modifiedAt: new Date().toISOString(), attempts: 0, corrections: 0, nextAttemptAt: null, error: null }))
}
export async function replenish(state: State, existing: Item[], archive: { slug: string; title: string; excerpt: string }[]) {
  const counts = services.map(service => ({ service, count: existing.filter(i => i.targetServicePage === service.path).length }))
    .sort((a, b) => a.count - b.count)
  const selected = counts[state.plannedAfterCount % counts.length].service
  const evidence = await research([`${selected.title} problèmes entreprise questions`, `${selected.title} nouveautés ${new Date().getUTCFullYear()}`, officialQuery(selected.path, selected.title)])
  const planned = await model('Renouvelle le calendrier avec 12 sujets informationnels précis. Utilise les opportunités observées dans la recherche et les offres existantes. Alterne les clusters. Aucun doublon d’intention avec le catalogue. Ne prétends pas connaître volume ou concurrence chiffrés. Les priorités sont des estimations éditoriales. Chaque reason explique potentiel, pertinence commerciale, angle complémentaire et concurrence qualitativement observée ou encore inconnue.',
    { services, research: evidence, existing: [...existing.map(i => ({ title: i.workingTitle, keyword: i.primaryKeyword, intent: i.searchIntent })), ...archive] }, z.object({ topics: z.array(topicSchema).min(10).max(16) }))
  const accepted: Topic[] = []
  for (const topic of planned.topics) {
    if (!services.some(s => s.path === topic.targetServicePage)) continue
    if ([...existing.map(i => i.primaryKeyword), ...archive.map(a => a.title), ...accepted.map(t => t.primaryKeyword)].some(t => similarity(t, topic.primaryKeyword) > 0.82)) continue
    if (accepted.at(-1)?.targetServicePage === topic.targetServicePage) continue
    accepted.push(topic)
  }
  if (accepted.length < 5) throw new Error('Planning yielded too few distinct topics')
  const last = existing.reduce((max, i) => i.scheduledAt > max ? i.scheduledAt : max, state.anchor)
  const start = nextSlot(state.anchor, new Date(Math.max(Date.parse(last), Date.now())))
  return { items: makeItems(accepted, state, start), evidence }
}
