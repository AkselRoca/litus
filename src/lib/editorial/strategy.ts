import { services } from './core'
import type { Topic } from './types'

export const STRATEGY_VERSION = 2
export const strategyInstruction = `Alterner outils/IA, artisans, SEO, PME, outils, associations, acquisition et conversion. Au moins 40 % des nouveaux sujets concernent les outils ou automatisations. Jamais plus de deux sujets consécutifs du même pilier. Répondre à un problème opérationnel : déclencheur, données, étapes, exceptions, contrôle humain, coût à vérifier et mesure du résultat. Aucune page de définition générique. Un article informationnel soutient une landing commerciale sans cibler sa requête de vente exacte. Ne pas inventer de volumes de recherche, de résultats clients ou d'expérience Litus. Vérifier les sujets existants ET les pages commerciales avant rédaction.`

// Editorial hypotheses. Each subject must pass a fresh Google search and the
// cannibalization gate before it can become an article, never automatic filler.
type Seed = [path: string, title: string, keyword: string, angle: string]
const seeds: Seed[] = [
  ['/expertise/n8n', 'Recevoir chaque matin un résumé des emails de son entreprise avec n8n', 'résumé quotidien emails n8n', 'Définir la fenêtre de collecte, les messages exclus, le résumé sourcé et la reprise après incident.'],
  ['/artisan/plombier', 'Plombier : comment obtenir des demandes de devis mieux qualifiées ?', 'plombier demandes devis qualifiées', 'Séparer dépannage et travaux, filtrer le secteur et préparer le rappel sans rallonger le formulaire.'],
  ['/referencement-naturel', 'Pages non indexées : quels contrôles faire avant de réécrire le contenu ?', 'diagnostic page non indexée Search Console', 'Distinguer accès, canonical, exploration et contenu utile pour choisir la bonne correction.'],
  ['/expertise/openai', 'ChatGPT en entreprise : quelles tâches déléguer sans perdre le contrôle ?', 'tâches ChatGPT entreprise validation humaine', 'Comparer dix tâches concrètes avec données minimales, exemple de consigne et validation nécessaire.'],
  ['/pme', 'PME : centraliser les demandes clients sans perdre leur origine', 'centraliser demandes clients PME', 'Relier formulaire, téléphone et email à un suivi commun avec responsable et prochaine action.'],
  ['/expertise/zapier', 'Zapier : regrouper les nouveaux leads dans un récapitulatif quotidien', 'Zapier résumé quotidien leads', 'Utiliser une collecte puis un digest, éviter les doublons et surveiller les limites du workflow.'],
  ['/association', 'Intégrer HelloAsso sur son site : dons, adhésions et parcours mobile', 'intégrer HelloAsso site association', 'Choisir widget ou intégration API selon le besoin, vérifier paiement et confirmation sans inventer de frais.'],
  ['/google-ads', 'Google Ads : mesurer les demandes commerciales plutôt que les clics', 'mesurer demandes qualifiées Google Ads', 'Distinguer clic téléphone, demande reçue et prospect qualifié ; expliquer les limites de chaque indicateur.'],
  ['/expertise/claude', 'Claude : analyser des documents métier en gardant des réponses vérifiables', 'Claude analyse documents entreprise sources', 'Construire un corpus autorisé, demander les citations et traiter les contradictions ou pièces manquantes.'],
  ['/artisan/menuisier', 'Menuisier : présenter ses réalisations pour recevoir de meilleurs projets', 'menuisier trouver clients réalisations devis', 'Relier photos autorisées, matériaux, secteur et informations nécessaires avant visite ou chiffrage.'],
  ['/expertise/codex', 'Codex : préparer un outil interne sans laisser un agent modifier la production', 'Codex développement outil interne sécurité', 'Décomposer prototype, branche isolée, tests, revue humaine et déploiement ; ne jamais donner tous les accès.'],
  ['/creation-site-internet', 'Formulaire de contact : quels champs sont vraiment utiles au premier échange ?', 'champs formulaire contact qualification prospects', 'Arbitrer qualification, effort de saisie et usage réel des informations par le commercial.'],
  ['/expertise/n8n', 'Connecter un formulaire à son CRM avec n8n sans créer de doublons', 'formulaire CRM n8n doublons', 'Suivre le webhook, valider les champs, dédupliquer, attribuer le lead et tracer les erreurs.'],
  ['/artisan/couvreur', 'Couvreur : transformer ses photos de chantiers en demandes de devis', 'couvreur photos chantiers demandes devis', 'Présenter le besoin initial, les travaux autorisés à montrer et les contraintes de zone sans promesse technique.'],
  ['/seo-local', 'Artisan : que vérifier quand la fiche Google ne génère pas d’appels ?', 'fiche Google artisan aucun appel', 'Examiner services, horaires, zone, avis et parcours téléphonique sans promettre de classement.'],
  ['/expertise/shopify', 'Shopify ou WooCommerce : qui gérera la boutique après son lancement ?', 'Shopify WooCommerce gestion quotidienne PME', 'Comparer catalogue, maintenance, paiements, connecteurs et réversibilité à partir de tâches quotidiennes.'],
  ['/pme', 'PME : quelles tâches automatiser en premier avec une petite équipe ?', 'prioriser automatisation tâches PME', 'Évaluer fréquence, stabilité, risque d’erreur et temps de reprise avant de choisir un premier processus.'],
  ['/expertise/wordpress', 'WordPress : diagnostiquer un formulaire qui n’envoie plus les demandes', 'WordPress formulaire emails non reçus', 'Séparer validation, enregistrement et délivrabilité ; tester sans exposer les données des visiteurs.'],
  ['/association', 'Adhésions en ligne : éviter la double saisie entre paiement et fichier membres', 'automatiser adhésions association double saisie', 'Organiser identifiants, confirmation de paiement, renouvellement et accès limités aux bénévoles.'],
  ['/creation-site-ecommerce', 'Paiements refusés : comment aider le client à reprendre sa commande ?', 'paiement refusé ecommerce reprise commande', 'Distinguer commande et paiement, proposer une reprise explicite et éviter la double facturation.'],
  ['/expertise/nextjs', 'Next.js : quel intérêt pour un site professionnel connecté à un CMS ?', 'Next.js site professionnel CMS autonomie', 'Comparer rendu, publication de contenus, cache et responsabilité de maintenance avec des scénarios précis.'],
  ['/artisan/electricien', 'Électricien : séparer dépannage et rénovation dans son parcours de devis', 'électricien devis dépannage rénovation site', 'Adapter appels, plages de réponse et formulaire aux urgences réelles sans inventer de disponibilité.'],
  ['/expertise/vercel', 'Vercel : vérifier une modification avant de la mettre en ligne', 'Vercel preview mise en production entreprise', 'Expliquer environnement de prévisualisation, données de test, validation métier et retour à la version précédente.'],
  ['/refonte-site-internet', 'Quand faut-il refondre son site plutôt que corriger quelques pages ?', 'refonte site ou améliorations ciblées', 'Examiner parcours, contenus et contraintes techniques avant de décider du périmètre et du budget.'],
  ['/expertise/framer', 'Framer : connecter les demandes du site à son suivi commercial', 'Framer formulaire suivi commercial CRM', 'Cartographier champs, notification, stockage, dédoublonnage et test de réception avant lancement.'],
  ['/artisan/paysagiste', 'Paysagiste : attirer des projets d’aménagement plutôt que des appels hors secteur', 'paysagiste demandes aménagement secteur', 'Montrer les types de projets, zones et budgets à préciser sans transformer le formulaire en devis automatique.'],
  ['/referencement-naturel', 'Maillage interne : retrouver les pages utiles que personne ne découvre', 'identifier pages orphelines liens internes', 'Croiser navigation, sitemap et liens contextuels pour soutenir les pages métier sans multiplier les ancres.'],
  ['/expertise/webflow', 'Webflow, WordPress ou Framer : choisir selon les mises à jour à réaliser', 'Webflow WordPress Framer autonomie contenu', 'Comparer besoins de CMS, rôles, formulaires, traduction et transfert de gestion plutôt que les effets visuels.'],
  ['/pme', 'Budget digital d’une PME : répartir les moyens entre site, acquisition et suivi', 'répartition budget digital PME acquisition', 'Partir des marges, de la capacité de réponse et des données disponibles ; utiliser un exemple hypothétique.'],
  ['/expertise/react', 'React : quand un tableau Excel mérite-t-il une véritable interface métier ?', 'React interface métier remplacer Excel', 'Comparer règles de saisie, collaboration et erreurs, puis prototyper un écran avant de développer.'],
  ['/association', 'Emails aux adhérents : automatiser les confirmations sans envoyer de doublons', 'automatiser emails adhérents association', 'Distinguer messages de gestion et communication optionnelle, gérer désinscriptions et contrôle des envois.'],
  ['/google-ads', 'Google Ads pour un plombier : construire un budget à partir des interventions possibles', 'budget Google Ads plombier interventions', 'Séparer urgence et projets, plafonner les tests et mesurer les demandes utiles sans inventer de CPC.'],
  ['/expertise/n8n', 'Relances de devis avec n8n : arrêter les envois dès que le client répond', 'n8n relances devis arrêt réponse', 'Définir statuts, délai, détection de réponse, exclusions et journal consultable par l’équipe.'],
  ['/artisan/macon', 'Entreprise du bâtiment : quelles informations demander avant un premier devis ?', 'informations formulaire devis bâtiment', 'Identifier commune, nature des travaux et calendrier ; réserver les pièces sensibles à un échange sécurisé.'],
  ['/expertise/openai', 'Transformer un rendez-vous en compte rendu exploitable avec l’IA', 'automatiser compte rendu rendez-vous IA', 'Partir de notes autorisées, extraire décisions et actions, puis faire valider le résultat avant tout envoi.'],
  ['/creation-landing-page', 'Landing page : comment distinguer beaucoup de contacts et de bons prospects ?', 'landing page qualité prospects conversion', 'Comparer messages, champs et retour commercial ; ne pas conclure à partir du seul taux de conversion.'],
  ['/expertise/claude', 'Traiter un CSV avec Claude : garder la trace des cellules et erreurs corrigées', 'Claude traitement CSV Excel vérification', 'Anonymiser l’exemple, définir les règles, comparer avant/après et refuser les valeurs inventées.'],
  ['/artisan/chauffagiste-climatisation', 'Chauffagiste : distinguer entretien, remplacement et dépannage sur son site', 'chauffagiste site entretien remplacement demandes', 'Orienter chaque demande vers le bon échange sans publier de conseils de manipulation dangereux.'],
  ['/google-business-profile', 'Artisan : choisir les photos utiles pour sa fiche Google Business Profile', 'photos fiche Google artisan visibilité', 'Privilégier activité réelle, chantiers autorisés et cohérence des informations plutôt que des visuels trompeurs.'],
  ['/expertise/codex', 'Codex : fiabiliser la maintenance d’un outil interne avec des tests de non-régression', 'Codex tests maintenance outil interne', 'Cibler un cas métier, isoler les données, vérifier les changements et garder une validation humaine.'],
  ['/pme', 'Résumé quotidien d’activité : quelles données réunir pour une PME ?', 'résumé quotidien activité entreprise IA', 'Séparer faits mesurés, alertes et commentaires IA ; relier chaque chiffre à sa source et sa date.'],
  ['/expertise/zapier', 'Zapier ou n8n : choisir selon les erreurs et les reprises à gérer', 'Zapier n8n maintenance reprise erreurs', 'Comparer exploitation, accès, diagnostic et réversibilité sur un même cas concret de synchronisation.'],
  ['/association', 'Espace membre associatif : quels accès donner aux bénévoles et adhérents ?', 'espace membre association droits accès', 'Distinguer membres, gestionnaires et intervenants ; limiter les données visibles et préparer les départs.'],
  ['/creation-site-ecommerce', 'Catalogue e-commerce : préparer ses fiches produits avant une migration', 'préparer catalogue produits migration ecommerce', 'Normaliser variantes, photos autorisées, identifiants et redirections avant de déplacer le catalogue.'],
  ['/expertise/stripe', 'Stripe : relier un paiement confirmé au CRM sans déclencher deux emails', 'Stripe webhook CRM email doublon', 'Distinguer redirection navigateur et événement serveur, dédupliquer et gérer les remboursements.'],
  ['/artisan/renovation-interieure', 'Rénovation intérieure : présenter un avant-après utile sans révéler l’adresse du client', 'avant après rénovation photos confidentialité site', 'Raconter le périmètre du projet et obtenir les autorisations photo tout en retirant les informations privées.'],
  ['/expertise/n8n', 'Dix automatisations n8n pour PME : commencer par un processus mesurable', 'automatisations n8n utiles PME', 'Présenter dix fiches avec déclencheur, résultat attendu, exception et indicateur, sans promesse de gain universel.'],
  ['/association', 'Site associatif : choisir un CMS que les prochains bénévoles pourront reprendre', 'CMS association bénévoles transmission', 'Évaluer simplicité de mise à jour, propriété des accès, sauvegardes et coût de maintenance à vérifier.'],
]

export function pillar(path: string) {
  if (path.startsWith('/expertise/') || ['/automatisation', '/creation-outils-ia', '/integrations-api'].includes(path)) return 'Outils & IA'
  if (path.startsWith('/artisan')) return 'Artisans'
  if (path === '/association') return 'Associations'
  if (path === '/pme') return 'PME'
  if (/seo|referencement|google-business/.test(path)) return 'SEO'
  if (path === '/google-ads') return 'Acquisition'
  return 'Web & conversion'
}
export function strategyTopics(): Topic[] {
  return seeds.map(([path, title, primaryKeyword, angle], index) => {
    const service = services.find(s => s.path === path)
    if (!service) throw new Error(`Page éditoriale absente de l’inventaire : ${path}`)
    return { topic: title, workingTitle: title, primaryKeyword, secondaryKeywords: [service.title, pillar(path), 'méthode et points de vigilance'], searchIntent: `Résoudre un problème précis : ${primaryKeyword}`, cluster: service.title, targetServicePage: path, angle,
      reason: `Sujet informationnel du pilier ${pillar(path)}. Soutient ${path}, sans remplacer la page commerciale. Recherche Google et vérification des doublons requises.`, priority: 95 - Math.floor(index / 6) }
  })
}
