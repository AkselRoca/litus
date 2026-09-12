import type { BlogArticle } from './articles'

/** Estimate from readable words, excluding HTML, scripts, styles and entity syntax. */
export function calculateReadTime(html: string): number {
  const text = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ').replace(/&(?:#\d+|#x[\da-f]+|\w+);/gi, ' ')
  return Math.max(1, Math.ceil((text.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0) / 200))
}

const lorientCredit = { label: 'Taratata · CC BY 3.0', href: '/territories/credits.html' }
const leMansCredit = { label: 'Patrick Monchicourt · CC BY-SA 2.0', href: '/territories/credits.html' }
const publishedAt = '2026-09-09'
const authorName = 'L’équipe Litus'

const articles: Omit<BlogArticle, 'readTimeMinutes'>[] = [
  {
    slug: 'referencement-local-lorient-fiche-google',
    title: "SEO local à Lorient : rendez votre fiche Google vraiment utile",
    metaTitle: "SEO local à Lorient : vérifier sa fiche Google | Litus",
    metaDescription: "Nom, catégorie, horaires, photos et avis : vérifiez votre fiche Google à Lorient et facilitez les prises de contact avec votre entreprise.",
    updatedAt: '2026-09-09',
    excerpt: 'Nom, catégorie, zone desservie, photos et avis : une méthode simple pour vérifier que votre fiche présente correctement votre entreprise.',
    category: 'SEO', city: 'Lorient', publishedAt, authorName,
    coverImage: '/territories/lorient-port.webp', coverImageAlt: 'Le quai de Rohan et le port de plaisance de Lorient après la pluie', coverImageCredit: lorientCredit,
    content: `
<p>Un artisan de Caudan qui intervient à Lorient et un commerce qui reçoit ses clients en centre-ville n’utilisent pas leur fiche Google de la même manière. Avant de chercher à gagner des positions, vérifiez que les informations affichées correspondent à votre fonctionnement. Une fiche utile doit permettre de comprendre votre activité, de savoir si vous pouvez répondre au besoin et de vous contacter.</p>
<h2>Commencez par regarder votre fiche comme un client</h2>
<p>Ouvrez la fiche sur votre téléphone, puis sur un ordinateur. Le nom est-il reconnaissable ? Le lien mène-t-il à une page qui fonctionne ? Les horaires indiquent-ils quand vous êtes réellement disponible ? Notez les incohérences avant de les corriger. Un numéro ancien ou une fermeture exceptionnelle oubliée peut créer un problème très concret, même si la fiche apparaît dans les résultats.</p>
<p>Demandez également à une personne extérieure à l’entreprise ce qu’elle comprend de votre offre. Si elle hésite entre dépannage, vente de matériel et travaux de rénovation, la présentation mérite d’être précisée.</p>
<h2>Vérifiez le nom, la catégorie et vos accès</h2>
<p>Google demande d’utiliser le nom réel de l’entreprise. Ajouter une succession de prestations et de communes dans ce champ n’est pas une bonne manière de présenter votre activité. Choisissez une catégorie principale qui décrit votre métier, puis des catégories complémentaires uniquement lorsqu’elles correspondent à ce que vous faites.</p>
<p>Conservez un accès propriétaire maîtrisé par l’entreprise. Si une agence intervient, attribuez-lui les droits nécessaires plutôt que de partager votre mot de passe. Identifiez la personne qui pourra mettre à jour les informations pendant les congés ou après un changement d’équipe.</p>
<h2>Distinguez l’adresse d’accueil de la zone d’intervention</h2>
<p>Vous accueillez des clients dans un local ? L’adresse et les modalités d’accès doivent être précises. Vous travaillez chez les clients sans les recevoir à votre adresse ? Le fonctionnement d’entreprise de services avec une zone desservie est plus approprié ; Google prévoit alors de masquer l’adresse au public. N’inventez pas un bureau à Lorient pour apparaître dans la ville.</p>
<p>Préparez une liste réaliste de communes, par exemple Lorient, Lanester ou Ploemeur si vous y intervenez effectivement. Cette liste doit rester cohérente avec votre organisation. Pouvoir se déplacer exceptionnellement dans tout le département ne signifie pas que chaque demande éloignée sera adaptée.</p>
<h2>Montrez ce qu’un prospect a besoin de voir</h2>
<p>Des photographies récentes peuvent montrer une devanture, un atelier, une équipe ou une prestation terminée. Choisissez des images dont vous pouvez autoriser la publication et qui renseignent vraiment sur l’entreprise. Une série cohérente de photos de vos propres interventions sera plus utile qu’un ensemble d’images de banque sans rapport avec votre quotidien.</p>
<p>La description peut préciser les services proposés, les personnes auxquelles ils s’adressent et votre manière de travailler. Réservez les explications détaillées aux pages de votre site. Le lien depuis la fiche doit prolonger naturellement ce que le visiteur vient de lire.</p>
<h2>Traitez les avis comme des échanges avec vos clients</h2>
<p>Invitez vos clients à partager leur expérience réelle, sans écrire à leur place ni promettre de contrepartie. Répondez avec des éléments utiles et sans exposer de renseignements personnels. Face à une insatisfaction, proposez une prise de contact directe pour comprendre la situation ; une réponse publique n’a pas besoin de reprendre tout le dossier.</p>
<h2>Mesurez ce qui compte, sans chercher une position unique</h2>
<p>Les résultats locaux varient notamment selon la pertinence, la distance et la notoriété. Une recherche depuis votre bureau ne résume donc pas ce que tous vos prospects voient. Google précise qu’une meilleure place ne s’achète pas dans le classement local.</p>
<p>Comparez plutôt les informations de performance de la fiche avec vos appels et demandes réels. Gardez un relevé des changements : horaires corrigés, nouvelles photos, page de destination améliorée. Vous pourrez discuter de leur utilité sur une base plus solide qu’une capture isolée des résultats.</p>
<p>Pour compléter ce travail, découvrez notre approche du <a href="/seo-local">référencement local</a> ou échangez avec notre <a href="/agence-web-lorient">équipe présente dans le pays de Lorient</a>.</p>
<h2>Votre plan de vérification en trois étapes</h2>
<h3>Aujourd’hui : corrigez ce qui empêche de vous joindre</h3>
<p>Contrôlez le téléphone, les horaires et la page liée à la fiche. Pour un dépannage autour de Lorient, un numéro erroné mérite de passer avant la rédaction d’une nouvelle publication. Testez le lien sur un téléphone et demandez à un collègue de suivre le même parcours sans lui donner d’indication.</p>
<h3>Cette semaine : rassemblez des preuves de votre activité</h3>
<p>Choisissez des photos récentes dont l’entreprise dispose des droits : façade reconnaissable, atelier, intervention terminée. Donnez à chaque image une fonction précise. Une façade aide à vous trouver ; un chantier explique ce que vous savez faire. Notre guide du <a href="/blog/site-internet-artisan-lorient-devis">site pour artisan à Lorient</a> prolonge cette logique sur vos pages.</p>
<h3>Au prochain suivi : rapprochez visibilité et demandes</h3>
<p>Notez les corrections et comparez les demandes reçues, sans attribuer automatiquement chaque variation à la dernière modification. Vous avez besoin d’un regard extérieur ? <a href="/contact?objet=Fiche%20Google%20Lorient">Envoyez-nous votre fiche et votre site</a> : nous pourrons cadrer les points à examiner avec vous.</p>
<h2>Sources et lectures utiles</h2><ul>
<li><a href="https://support.google.com/business/answer/7091?hl=fr">Google — Comprendre et améliorer le classement local</a></li>
<li><a href="https://support.google.com/business/answer/3038177?hl=fr">Google — Consignes de représentation d’un établissement</a></li>
</ul>`,
  },
  {
    slug: 'refonte-site-internet-le-mans',
    title: "Refonte de site au Mans : que faut-il vraiment améliorer ?",
    metaTitle: "Refonte de site au Mans : les points à diagnostiquer | Litus",
    metaDescription: "Offre, mobile, formulaires, contenus et référencement : découvrez comment décider entre corriger votre site et engager une refonte au Mans.",
    updatedAt: '2026-09-09',
    excerpt: 'Identifiez ce qui freine vos visiteurs et distinguez les corrections ciblées d’une refonte complète, en préservant ce qui fonctionne déjà.',
    category: 'Site Web', city: 'Le Mans', publishedAt, authorName,
    coverImage: '/realisations/Demetis-website.webp', coverImageAlt: 'Capture de la page d’accueil du site Demetis Immo, agence immobilière au Mans',
    coverImageCredit: { label: 'Capture du site Demetis Immo · Illustration de site web', href: '/realisations/Demetis-immo' },
    content: `
<p>Un site ancien n’est pas automatiquement un mauvais site. À l’inverse, une apparence récente peut cacher un formulaire défaillant ou des pages difficiles à comprendre. Pour une entreprise du Mans, la bonne question est de savoir si le site présente encore l’offre actuelle et aide les visiteurs à passer à l’étape suivante.</p>

<h2>Votre offre a changé, mais les pages racontent autre chose</h2>
<p>Vous avez développé une nouvelle prestation, changé de clientèle ou réorganisé votre zone d’intervention en Sarthe. Pourtant, la page d’accueil met toujours en avant une ancienne activité. Ce décalage complique les échanges : les prospects vous contactent pour des demandes que vous ne traitez plus, tandis que vos nouvelles compétences restent invisibles.</p>
<p>Listez les prestations que vous souhaitez développer et associez chacune à une page existante. Une case vide signale un contenu à créer ; plusieurs pages très proches peuvent indiquer une navigation à simplifier. Cette étape permet de définir le besoin avant de discuter des couleurs ou d’un nouveau logiciel.</p>
<h2>Le parcours mobile demande trop d’efforts</h2>
<p>Testez les tâches importantes avec un téléphone : trouver une prestation, comprendre où vous intervenez, appeler et envoyer une demande. Observez les obstacles concrets. Un bouton masqué par une bannière, un texte trop petit ou un champ impossible à remplir constituent des problèmes à traiter, indépendamment de l’âge du site.</p>
<p>Refaites le test sans être connecté à l’administration. Utilisez aussi une connexion ordinaire : des images lourdes peuvent être moins perceptibles sur le réseau rapide du bureau. Les outils de mesure aident au diagnostic, mais ils ne remplacent pas l’observation du parcours complet.</p>
<h2>Les demandes arrivent mal, ou ne sont pas exploitables</h2>
<p>Envoyez un message de test clairement identifié et vérifiez sa réception. Regardez la confirmation affichée au visiteur, le classement du message dans votre boîte et les informations reçues. Un formulaire peut sembler fonctionner à l’écran alors que son message n’arrive jamais à la bonne personne.</p>
<p>Si les demandes sont trop vagues, ajoutez une consigne utile plutôt qu’une longue liste de champs obligatoires. Pour un chantier, la commune et la nature du besoin peuvent être plus utiles qu’une série de détails prématurés. Prévoyez également un moyen de contact alternatif.</p>
<h2>Votre équipe ne peut plus faire les mises à jour courantes</h2>
<p>Changer un horaire ou publier une réalisation ne devrait pas dépendre d’un accès perdu. Recensez les accès au domaine, à l’hébergement et à l’administration. Vérifiez qui s’occupe des mises à jour techniques et des sauvegardes. Ces questions d’organisation comptent autant que l’interface visible.</p>
<p>Une amélioration ciblée peut suffire : nouvelle page de service, navigation revue, formulaire réparé. Une refonte plus large devient pertinente lorsque les problèmes se cumulent et que la structure actuelle empêche de les résoudre proprement.</p>
<h2>Préservez les pages qui apportent déjà des visites</h2>
<p>Avant toute modification, consultez les pages et recherches visibles dans Search Console. Une page peu valorisée graphiquement peut déjà être utile aux internautes. Conservez son adresse lorsque c’est possible et améliorez son contenu sans supprimer arbitrairement les informations recherchées.</p>
<p>Si des URL doivent changer, préparez une correspondance entre anciennes et nouvelles pages, puis des redirections vers leurs équivalents pertinents. Évitez de renvoyer toutes les anciennes adresses vers l’accueil. Après la mise en ligne, vérifiez les liens internes, l’indexation et les pages qui recevaient des visites. La documentation de Google décrit cette préparation pour limiter les difficultés liées à une migration.</p>
<h2>Transformez le diagnostic en cahier des charges court</h2>
<p>Pour chaque problème, écrivez la tâche concernée, ce qui bloque aujourd’hui et le résultat attendu. « Permettre de demander un devis depuis un téléphone » est plus exploitable que « rendre le site moderne ». Classez ensuite les demandes entre corrections nécessaires, amélioration du contenu et évolution de l’identité visuelle.</p>
<p>Notre page <a href="/creation-site-internet">création de site internet</a> présente cette logique de conception. Pour cadrer un projet local, vous pouvez aussi contacter notre <a href="/agence-web-le-mans">agence web au Mans</a>.</p>
<h2>Préparez une décision, pas seulement une liste d’envies</h2>
<h3>Rassemblez les informations utiles avant le rendez-vous</h3>
<p>Préparez les accès disponibles, vos principales prestations, les demandes que vous souhaitez recevoir et les pages qui apportent déjà des visiteurs. Si vous ne connaissez pas un chiffre, notez-le comme une information à vérifier. Cela évite de construire tout le projet autour d’une impression ou d’une estimation reprise d’année en année.</p>
<h3>Distinguez correction, évolution et refonte</h3>
<p>Un formulaire défaillant peut être réparé rapidement. Une offre devenue plus large peut demander de nouvelles pages. Un site dont les contenus, la technique et la navigation bloquent ensemble réclame un travail plus profond. Le <a href="/blog/site-internet-pme-le-mans">cahier des charges d’une PME au Mans</a> aide à exprimer ces besoins sans imposer trop tôt une solution.</p>
<h3>Définissez la recette avant de lancer le chantier</h3>
<p>Écrivez les actions à vérifier le jour de la livraison : demander un devis sur mobile, retrouver les anciennes pages importantes, modifier un contenu et recevoir une notification de contact. <a href="/contact?objet=Refonte%20site%20Le%20Mans">Présentez-nous votre site actuel</a> pour déterminer ce qu’il faut conserver et ce qui mérite d’être revu.</p>
<h2>Sources et lectures utiles</h2><ul>
<li><a href="https://developers.google.com/search/docs/monitor-debug/search-console-start?hl=fr">Google — Utiliser Search Console</a></li>
<li><a href="https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=fr">Google — Préparer un changement d’URL</a></li>
<li><a href="https://developers.google.com/search/docs/appearance/page-experience?hl=fr">Google — Comprendre l’expérience sur la page</a></li>
</ul>`,
  },
  {
    slug: 'google-ads-lorient-zone-intervention',
    title: "Google Ads à Lorient : ciblez les demandes dans votre secteur",
    metaTitle: "Google Ads Lorient : cibler sa zone d’intervention | Litus",
    metaDescription: "Délimitez vos zones, reliez les annonces aux prestations et suivez les contacts utiles : une méthode pour cadrer vos campagnes Google Ads à Lorient.",
    updatedAt: '2026-09-09',
    excerpt: 'Périmètre réel, options de présence, annonces et demandes qualifiées : les décisions à prendre avant d’élargir une campagne locale.',
    category: 'Google Ads', city: 'Lorient', publishedAt, authorName,
    coverImage: '/lorient/fg-chronodep-website.webp', coverImageAlt: 'Exemple de présentation d’une zone d’intervention sur le site FG Chronodep à Caudan',
    coverImageCredit: { label: 'Capture du site FG Chronodep · Réalisation Litus', href: '/realisations/fg-chronodep' },
    content: `
<p>Une campagne locale doit tenir compte de la manière dont vous travaillez. Pour une entreprise qui se déplace autour de Lorient, attirer une demande éloignée n’a pas la même valeur qu’un chantier réalisable dans sa tournée habituelle. Le ciblage géographique est donc une décision commerciale avant d’être un réglage publicitaire.</p>
<h2>Dessinez votre périmètre réel avant d’ouvrir la campagne</h2>
<p>Classez les communes selon vos possibilités d’intervention. Distinguez les secteurs habituels, les déplacements possibles sous conditions et les zones que vous ne prenez pas en charge. Une entreprise peut accepter un projet important à distance tout en réservant ses dépannages à proximité. Cette différence doit se retrouver dans les offres et les annonces.</p>
<p>Autour de la rade, un périmètre circulaire ne traduit pas toujours le trajet à effectuer. Comparez une sélection de communes avec un rayon, en tenant compte de votre point de départ et de votre organisation. Ne choisissez pas tout le Morbihan simplement parce que le département semble être une limite facile à saisir.</p>
<h2>Comprenez ce que signifie l’option de localisation</h2>
<p>Google Ads distingue notamment les personnes présentes dans une zone, ou qui y sont régulièrement, de celles qui manifestent un intérêt pour cette zone. Le réglage par défaut peut inclure cet intérêt. Pour une prestation réservée aux clients effectivement situés dans un secteur, l’option de présence mérite donc d’être examinée.</p>
<p>Ce choix n’est pas universel : une personne qui prépare un déménagement à Lorient peut rechercher un service avant d’y vivre. Décidez en fonction de votre offre. Le ciblage repose sur des signaux et des estimations ; il ne garantit pas la localisation exacte de chaque personne. Vérifiez aussi la disponibilité des zones choisies dans votre compte.</p>
<h2>Reliez le lieu à une intention de recherche précise</h2>
<p>Le ciblage ne remplace pas le choix des recherches visées. Une personne qui cherche une formation, un emploi ou du matériel peut utiliser les mêmes mots qu’un futur client. Organisez la campagne autour des prestations que vous souhaitez vendre et rédigez des annonces qui les nomment clairement.</p>
<p>Examinez les termes de recherche accessibles dans les rapports et écartez les intentions sans rapport avec votre offre lorsque c’est pertinent. Ces rapports ne montrent pas nécessairement toutes les requêtes. Évitez donc d’en tirer une conclusion exhaustive à partir de quelques lignes.</p>
<h2>Annoncez un service que la page permet réellement de demander</h2>
<p>Si l’annonce présente une intervention dans le pays de Lorient, la page d’arrivée doit préciser la prestation et les communes desservies. Un visiteur ne devrait pas avoir à explorer tout le site pour savoir si sa demande entre dans votre périmètre.</p>
<p>Indiquez les modalités de contact et les informations nécessaires au premier échange. N’affichez pas une disponibilité immédiate si votre planning ne la permet pas. Le contenu peut aussi distinguer les demandes urgentes des projets planifiés, lorsque cette distinction correspond à votre activité.</p>
<h2>Évaluez les demandes, pas seulement les clics</h2>
<p>Définissez ce qui représente une action utile : formulaire réellement envoyé, appel ou autre étape pertinente. Google Ads propose plusieurs types de conversions. Configurez-les selon le parcours réel, puis vérifiez leur fonctionnement. Un clic sur le téléphone reste un clic ; il ne prouve pas à lui seul qu’une conversation ou une vente a eu lieu.</p>
<p>Dans votre suivi commercial, notez simplement la commune, le besoin et la suite donnée aux contacts. Cette lecture permet de repérer une zone qui génère des demandes hors périmètre ou une annonce qui attire le mauvais type de projet. Gardez la distinction entre données publicitaires et résultat commercial.</p>
<h2>Élargissez à partir de ce que vous pouvez traiter</h2>
<p>Commencez par un ensemble de prestations et de secteurs compréhensible. Revoyez ensuite les réglages à partir des demandes observées et de votre capacité à répondre. Le bon périmètre peut évoluer avec l’équipe, les déplacements et les saisons ; il n’est pas nécessaire de modifier tous les paramètres en même temps.</p>
<p>Notre accompagnement <a href="/google-ads">Google Ads</a> permet de cadrer ces choix. Pour préparer les éléments à nous transmettre, rassemblez vos services prioritaires, vos communes d’intervention et le fonctionnement actuel des demandes de contact.</p>
<h2>Construisez une feuille de route lisible avec votre équipe</h2>
<h3>Une ligne par prestation, une zone réellement desservie</h3>
<p>Indiquez pour chaque service les communes habituelles, les exceptions acceptées et la personne qui traite les demandes. Une entreprise peut vendre un projet de rénovation dans tout son secteur tout en réservant le dépannage à une tournée plus courte. Une campagne unique ne doit pas effacer cette différence commerciale.</p>
<h3>Un contact qualifié, une définition partagée</h3>
<p>Décidez ensemble ce qui rend une demande exploitable : bon métier, secteur couvert, besoin réel et possibilité de rappeler. Les messages hors zone doivent rester visibles dans le suivi, même lorsqu’ils ne deviennent pas des devis. Notre article sur les <a href="/blog/google-ads-allonnes-appels">appels issus de Google Ads</a> détaille cette distinction entre interaction et opportunité.</p>
<h3>Un point de suivi consacré aux décisions</h3>
<p>À chaque échange, choisissez les actions à mener : clarifier une annonce, exclure une intention ou revoir une page. Conservez les observations qui motivent ce choix. Pour démarrer, <a href="/contact?objet=Campagne%20Google%20Ads%20Lorient">transmettez-nous votre offre et vos zones d’intervention</a>, plutôt qu’un objectif de clics isolé.</p>
<h2>Sources et lectures utiles</h2><ul>
<li><a href="https://support.google.com/google-ads/answer/1722038?hl=fr">Google Ads — Options avancées de ciblage géographique</a></li>
<li><a href="https://support.google.com/google-ads/answer/1722043?hl=fr">Google Ads — Cibler des zones géographiques</a></li>
<li><a href="https://support.google.com/google-ads/answer/2472708?hl=fr">Google Ads — Rapport sur les termes de recherche</a></li>
<li><a href="https://support.google.com/google-ads/answer/1722054?hl=fr">Google Ads — Configurer le suivi des conversions</a></li>
</ul>`,
  },
  {
    slug: 'seo-local-le-mans-pages-services',
    title: "SEO au Mans : quelles pages créer pour vos services ?",
    metaTitle: "SEO local au Mans : structurer ses pages services | Litus",
    metaDescription: "Services, secteurs et contenus utiles : organisez votre site au Mans sans multiplier des pages de villes presque identiques.",
    updatedAt: '2026-09-09',
    excerpt: 'Une architecture utile pour expliquer votre offre en Sarthe, sans multiplier des pages identiques au nom de chaque commune.',
    category: 'SEO', city: 'Le Mans', publishedAt, authorName,
    coverImage: '/le-mans-centre-cathedrale.webp', coverImageAlt: 'Le Mans et la cathédrale Saint-Julien', coverImageCredit: leMansCredit,
    content: `
<p>Faut-il créer une page pour chaque prestation, chaque commune et chaque combinaison des deux ? Pour une petite entreprise du Mans, cette approche devient vite difficile à entretenir. Une structure plus utile part des questions que les clients posent : ce que vous faites, pour qui, dans quel secteur et comment démarrer.</p>
<h2>Attribuez un rôle clair à la page d’accueil</h2>
<p>L’accueil donne une vue d’ensemble : métier, principales prestations, territoire et prochaine étape. Il oriente vers les pages détaillées. Il n’a pas besoin de contenir toutes vos explications techniques, ni une longue liste de communes répétée dans chaque bloc.</p>
<p>Imaginez, à titre d’exemple, un atelier qui réalise des aménagements intérieurs au Mans et dans les environs. L’accueil peut présenter l’activité et les principales familles de projets. Les pages suivantes expliquent comment se déroule un agencement, quels éléments sont réalisables et quelles informations préparer pour un devis.</p>
<h2>Créez une page de service lorsqu’il existe un vrai sujet</h2>
<p>Une page dédiée est pertinente si le visiteur a besoin d’informations spécifiques. Décrivez le problème traité, le contenu de la prestation, ses limites et les étapes du projet. Ajoutez des réponses aux questions que vous entendez réellement lors des premiers échanges.</p>
<p>Des variantes proches peuvent rester sur une même page. À l’inverse, une prestation qui s’adresse à un autre public ou suit un processus différent peut mériter son propre espace. La décision dépend de ce que vous avez à expliquer, pas d’un nombre de pages à atteindre.</p>
<h2>Présentez le secteur d’intervention sans inventer d’implantations</h2>
<p>Une page consacrée à votre présence au Mans peut préciser où se trouve l’entreprise, si elle reçoit sur rendez-vous et comment elle intervient dans la Sarthe. Distinguez le lieu d’implantation de la zone desservie. Intervenir à Allonnes ou à La Flèche ne signifie pas que vous disposez d’un établissement dans ces communes.</p>
<p>Expliquez les conditions utiles : déplacement préalable, travail à distance possible, périmètre habituel ou organisation d’une visite. Le lecteur doit pouvoir déterminer si vous êtes un interlocuteur adapté, sans déduire des informations que la page n’a pas confirmées.</p>
<h2>Évitez les pages locales interchangeables</h2>
<p>Google vise les pages satellites créées pour capter des requêtes proches sans apporter une destination réellement utile. Remplacer uniquement le nom du Mans par celui d’une autre commune dans un même texte n’améliore pas l’information fournie au lecteur.</p>
<p>Une page locale supplémentaire peut avoir du sens lorsqu’elle apporte un contenu distinct et vérifiable : une implantation réelle, des modalités propres au secteur ou un projet documenté. Si vous n’avez rien de spécifique à ajouter, une bonne page de zone d’intervention sera souvent plus simple à comprendre et à maintenir.</p>
<h2>Donnez une place aux réalisations et aux questions fréquentes</h2>
<p>Présentez les projets pour lesquels vous disposez d’informations publiables : besoin initial, prestation réalisée, images autorisées et détails concrets. Vous pouvez expliquer un choix ou une contrainte sans annoncer un résultat commercial que vous n’avez pas mesuré. Ne transformez pas une photographie illustrative en référence client.</p>
<p>Les questions fréquentes servent à lever les hésitations. Pour un service sur devis, elles peuvent traiter du premier rendez-vous, des documents à préparer ou du déroulement d’une intervention. Une réponse honnête sur les conditions du projet est plus utile qu’une promesse générale de rapidité.</p>
<h2>Reliez les pages selon le parcours du visiteur</h2>
<p>Depuis une prestation, proposez une réalisation pertinente et un moyen de contact. Depuis une page locale, orientez vers les services réellement disponibles. Utilisez des intitulés de liens explicites et gardez une navigation lisible. Cette organisation aide les visiteurs et les moteurs à comprendre les relations entre les contenus.</p>
<p>Avant de publier une nouvelle page, vérifiez qu’elle a un rôle distinct, qu’elle contient des informations propres et qu’on peut y accéder depuis le reste du site. Puis entretenez l’ensemble : une page complète mais obsolète peut induire un futur client en erreur.</p>
<p>Découvrez notre démarche de <a href="/seo-local">SEO local</a> et la présentation de notre <a href="/agence-web-le-mans">agence au Mans</a> pour voir comment les services et l’ancrage territorial peuvent se compléter.</p>
<h2>Testez votre arborescence avec trois demandes réelles</h2>
<h3>Le prospect qui connaît sa prestation</h3>
<p>Choisissez une question que l’entreprise reçoit souvent, puis cherchez la page qui y répond. Le visiteur doit pouvoir identifier l’offre, comprendre ses limites et trouver le moyen de vous contacter. Si la réponse est répartie entre quatre pages, commencez par clarifier leur rôle avant d’en ajouter une cinquième.</p>
<h3>Le prospect qui vérifie votre secteur</h3>
<p>Une entreprise implantée au Mans peut intervenir à Allonnes ou à Coulaines sans disposer d’un établissement dans chaque commune. La page doit expliquer ce fonctionnement. Une information de déplacement, d’accès ou d’intervention est utile ; une adresse inventée ne l’est pas. Le guide de <a href="/blog/seo-local-coulaines">cohérence entre fiche Google et site à Coulaines</a> approfondit ce point.</p>
<h3>Le prospect qui hésite entre deux solutions</h3>
<p>Prévoyez une comparaison lorsque les options répondent à une vraie question de clientèle : entretien ou remplacement, accompagnement ponctuel ou suivi. Appuyez-vous sur vos échanges commerciaux. <a href="/contact?objet=Structure%20SEO%20Le%20Mans">Partagez votre liste de services avec Litus</a> pour construire une organisation compréhensible et des contenus qui méritent leur place.</p>
<h2>Sources et lectures utiles</h2><ul>
<li><a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr">Google — Organisation du site et contenus utiles</a></li>
<li><a href="https://developers.google.com/search/docs/essentials/spam-policies?hl=fr#doorway-abuse">Google — Règles concernant les pages satellites</a></li>
</ul>`,
  },
  {
    slug: 'site-internet-artisan-lorient-devis',
    title: "Artisan à Lorient : un site qui facilite les demandes de devis",
    metaTitle: "Site artisan Lorient : faciliter les demandes de devis | Litus",
    metaDescription: "Prestations, photos de chantiers, zone d’intervention et formulaire : préparez un site d’artisan à Lorient qui aide vos futurs clients à vous contacter.",
    updatedAt: '2026-09-09',
    excerpt: 'Prestations compréhensibles, réalisations authentiques et formulaire pratique : concevez un parcours qui aide le client à expliquer son besoin.',
    category: 'Site Web', city: 'Lorient', publishedAt, authorName,
    coverImage: '/artisans/atelier-bois.webp', coverImageAlt: 'Outils et établi dans un atelier de menuiserie, photographie d’illustration',
    coverImageCredit: { label: 'Photographie d’atelier · CC0 · Crédits', href: '/artisans/CREDITS.txt' },
    content: `
<p>Un particulier qui prépare des travaux cherche d’abord à savoir si vous réalisez le type de projet dont il a besoin. Il veut ensuite comprendre où vous intervenez et comment obtenir un premier échange. Pour un artisan du pays de Lorient, le site doit répondre à ces questions aussi clairement qu’une conversation au téléphone.</p>
<h2>Nommez les prestations avec les mots de vos clients</h2>
<p>« Une expertise à votre service » ne dit pas si vous posez des fenêtres, rénovez une salle de bains ou entretenez des installations. Présentez vos prestations dès le début de la page, puis expliquez ce qui est compris et ce qui nécessite une étude particulière.</p>
<p>Si certaines demandes ne correspondent pas à votre métier, précisez-le avec tact. Un électricien qui travaille surtout sur des rénovations complètes n’a pas forcément la même organisation qu’un service de dépannage. Cette clarté facilite le tri des contacts et évite de créer une attente que vous ne pourrez pas satisfaire.</p>
<h2>Indiquez le secteur dans lequel vous pouvez vous déplacer</h2>
<p>Votre entreprise intervient à Lorient, Lanester ou Hennebont ? Donnez les communes ou le périmètre réellement desservis, ainsi que les conditions particulières éventuelles. Si les déplacements plus éloignés dépendent du projet, dites-le simplement.</p>
<p>Le formulaire peut demander la commune du chantier. Cette information vous aide à vérifier la faisabilité avant de rappeler. Ne présentez pas une zone d’intervention comme une adresse d’accueil, et indiquez comment se passe une éventuelle visite sur place.</p>
<h2>Montrez des réalisations que vous pouvez expliquer</h2>
<p>Une photographie de votre propre travail gagne en intérêt lorsqu’elle est accompagnée d’un contexte : demande du client, nature de l’intervention et choix réalisés. Publiez uniquement les images et informations que vous êtes autorisé à montrer. Il n’est pas nécessaire de révéler le nom du client ou son adresse exacte pour présenter votre savoir-faire.</p>
<p>Évitez les galeries sans légende où l’on ne comprend pas ce qui a été réalisé. Une courte explication permet aussi de montrer les différences entre vos prestations. Les photographies d’illustration, comme l’atelier en couverture de cet article, doivent rester présentées comme telles.</p>
<h2>Demandez les informations utiles au premier échange</h2>
<p>Un formulaire de départ peut recueillir le nom, un moyen de contact, la commune et une description du besoin. Si une photo aide réellement à comprendre le projet, proposez-la sans rendre cette étape indispensable. Les dimensions, matériaux et contraintes détaillées pourront être précisés lors de la discussion.</p>
<p>Le W3C recommande des formulaires simples, des libellés identifiables et des messages qui expliquent les erreurs. Affichez donc un vrai intitulé pour chaque champ, signalez ce qui est obligatoire et gardez les informations déjà saisies lorsqu’une correction est nécessaire. Une confirmation claire doit apparaître après un envoi réussi.</p>
<h2>Prévoyez l’alternative au formulaire</h2>
<p>Certains prospects préfèrent appeler, d’autres écrivent en dehors de vos heures de disponibilité. Un numéro cliquable sur mobile et un formulaire court répondent à ces deux usages. Indiquez quand vous pouvez être joint, sans annoncer un délai garanti que votre activité ne permet pas de tenir.</p>
<p>À l’écran, nommez l’action : « Décrire mon projet » ou « Demander un devis » aide à comprendre la suite. Placez cet accès après les informations importantes, puis en fin de page. Multiplier les boutons à chaque paragraphe n’est pas nécessaire.</p>
<h2>Vérifiez ce qui se passe après l’envoi</h2>
<p>Un parcours se termine dans votre organisation, pas sur le bouton du site. Qui reçoit les messages ? Qui rappelle en cas d’absence ? Les demandes peuvent-elles être retrouvées facilement ? Faites un test depuis un téléphone et assurez-vous que le message arrive au bon endroit.</p>
<p>Relisez quelques demandes reçues et identifiez l’information qui manque le plus souvent. Vous pourrez ajuster une consigne ou une page de prestation à partir d’un besoin concret. Cette amélioration progressive est plus utile qu’un formulaire complexe conçu pour anticiper toutes les situations.</p>
<p>Notre accompagnement pour les <a href="/artisans">artisans</a> et notre service de <a href="/creation-site-internet">création de site internet</a> reposent sur cette continuité entre présentation de l’activité et prise de contact.</p>
<h2>Préparez le contenu à partir d’un chantier que vous connaissez</h2>
<h3>Expliquez le besoin et ce que vous avez réalisé</h3>
<p>Choisissez un exemple que vous pouvez présenter avec l’accord nécessaire. Décrivez le point de départ, la prestation et les contraintes traitées. Une photo seule ne dit pas si vous avez conçu, posé, réparé ou entretenu. Quelques phrases précises aident le visiteur à reconnaître une situation proche de la sienne, sans exposer l’identité du client.</p>
<h3>Demandez seulement les informations utiles au premier échange</h3>
<p>Pour une demande de chantier, le type de travaux et la commune peuvent suffire à orienter un rappel. Les dimensions exactes et les détails techniques pourront venir ensuite. Notre guide du <a href="/blog/site-artisan-lanester">site pour artisan à Lanester</a> explique comment présenter vos prestations en filtrant mieux les demandes inadaptées.</p>
<h3>Organisez la réception pendant les interventions</h3>
<p>Qui lit les messages quand vous êtes sur le terrain ? Où retrouver les coordonnées et les pièces utiles ? Un site efficace s’inscrit dans cette organisation quotidienne. <a href="/contact?objet=Site%20artisan%20Lorient">Échangeons sur votre métier et votre manière de travailler</a> pour définir un parcours simple, du premier clic au rendez-vous.</p>
<h2>Sources et lectures utiles</h2><ul>
<li><a href="https://www.w3.org/WAI/tutorials/forms/">W3C WAI — Concevoir des formulaires accessibles</a></li>
<li><a href="https://developers.google.com/search/docs/appearance/page-experience?hl=fr">Google — Comprendre l’expérience sur la page</a></li>
</ul>`,
  },
  {
    slug: 'seo-ou-google-ads-le-mans',
    title: "SEO ou Google Ads au Mans : par quoi commencer ?",
    metaTitle: "SEO ou Google Ads au Mans : choisir ses priorités | Litus",
    metaDescription: "Comparez SEO et Google Ads selon votre offre, votre site, vos moyens et votre capacité à traiter les demandes. Une méthode pour choisir au Mans.",
    updatedAt: '2026-09-09',
    excerpt: 'Choisissez vos premières actions selon votre offre, votre site et votre capacité à traiter les demandes, plutôt qu’en opposant deux canaux.',
    category: 'Stratégie', city: 'Le Mans', publishedAt, authorName,
    coverImage: '/blog/seo-google-ads-comparaison.svg', coverImageAlt: 'SEO et Google Ads : présence organique et diffusion publicitaire, deux leviers complémentaires',
    coverImageCredit: { label: 'Illustration éditoriale originale · Litus', href: '/blog/seo-google-ads-comparaison.svg' },
    content: `
<p>Pour une entreprise du Mans, choisir entre référencement naturel et Google Ads dépend d’abord de ce qu’il faut résoudre. Un site que personne ne trouve, une offre mal expliquée et un planning déjà rempli ne demandent pas la même réponse. Avant de sélectionner un canal, clarifiez la prestation à développer et la façon dont vous pourrez accueillir de nouvelles demandes.</p>
<h2>Définissez une demande utile pour votre entreprise</h2>
<p>Une visite ne vaut pas une demande de devis, et une demande ne devient pas automatiquement un client. Décrivez le contact recherché : type de projet, secteur d’intervention, contraintes de planning et prochaine étape. Une entreprise du bâtiment qui veut développer une prestation précise n’a pas le même besoin qu’un commerce qui souhaite mieux faire connaître son point de vente.</p>
<p>Appuyez-vous sur vos échanges réels. Quelles questions précèdent généralement un projet adapté ? Quels contacts sont hors périmètre ? Ces éléments aideront autant à rédiger une page qu’à choisir une annonce.</p>
<h2>Vérifiez les bases avant d’envoyer davantage de visiteurs</h2>
<p>Le service est-il présenté clairement ? Le site fonctionne-t-il sur téléphone ? Les demandes arrivent-elles au bon destinataire ? Si ces points bloquent, corrigez-les avant d’augmenter la diffusion. Un canal d’acquisition ne remplace pas une page capable d’expliquer ce que vous proposez.</p>
<p>Pour une activité locale, vérifiez aussi la cohérence entre le site et votre fiche d’établissement : métier, coordonnées, horaires et secteur. Il ne s’agit pas de tout refaire, mais de lever les obstacles évidents avant de chercher une audience plus large.</p>
<h2>Le SEO travaille la présence organique dans la durée</h2>
<p>Le référencement naturel consiste notamment à rendre le site compréhensible, accessible aux moteurs et utile sur les sujets liés à votre offre. Vous développez des contenus de service, une structure cohérente et des informations qui répondent aux recherches de vos clients.</p>
<p>Il n’existe pas de délai universel ni de garantie de première place. Google indique que l’effet des modifications peut prendre des durées variables. Cette démarche demande un suivi et une capacité à enrichir les contenus au fil de l’activité. Elle est pertinente lorsque vous souhaitez construire une présence durable et disposez d’informations réellement utiles à partager.</p>
<h2>Google Ads permet de diffuser une offre dans un cadre piloté</h2>
<p>Avec une campagne, vous choisissez une offre, des zones et des paramètres de diffusion. La publicité peut servir à présenter une prestation prioritaire sans attendre que la page gagne sa place dans les résultats naturels. La diffusion dépend toutefois des conditions de la campagne ; la création d’une annonce ne garantit ni son affichage à chaque recherche ni l’obtention de clients.</p>
<p>Il faut prévoir le budget publicitaire et le travail de préparation, de suivi et d’ajustement. La page d’arrivée, la pertinence des recherches et le traitement des contacts restent déterminants. Acheter de la publicité ne donne pas une meilleure position dans les résultats naturels.</p>
<h2>Choisissez un point de départ selon votre situation</h2>
<ul><li><strong>Votre offre est claire, mais les pages sont pauvres :</strong> commencez par les contenus et le parcours de contact. Ils serviront ensuite aux deux canaux.</li><li><strong>Vous voulez développer une prestation bien définie :</strong> une campagne limitée à cette offre peut être étudiée, avec une page adaptée et un suivi des demandes.</li><li><strong>Vous recevez des recherches variées sur votre métier :</strong> structurez les pages de service et les réponses utiles pour renforcer votre présence organique.</li><li><strong>Vous ne savez pas ce qui apporte les contacts :</strong> mettez d’abord au clair la mesure et le suivi commercial.</li></ul>
<p>Ces situations sont des exemples de raisonnement, pas des diagnostics clients. Le bon ordre dépend de vos moyens, du site existant et de la réalité des demandes dans votre secteur.</p>
<h2>Faites dialoguer les observations sans confondre les résultats</h2>
<p>Search Console renseigne sur les recherches et les pages dans la recherche Google ; les rapports publicitaires décrivent la diffusion des campagnes. Complétez-les avec les demandes effectivement reçues et leur suite commerciale. Définissez les actions mesurées et évitez de compter plusieurs fois le même contact dans votre bilan.</p>
<p>Prévoyez un rendez-vous de suivi pour décider quoi conserver, améliorer ou arrêter. SEO et Google Ads peuvent se compléter, mais les lancer ensemble n’est pas une obligation. Notre <a href="/agence-web-le-mans">équipe au Mans</a> peut vous aider à choisir les premières actions entre <a href="/seo-local">référencement local</a> et <a href="/google-ads">campagnes Google Ads</a>.</p>
<h2>Formulez votre décision en une page</h2>
<h3>Décrivez l’offre à développer</h3>
<p>« Obtenir plus de visibilité » reste trop large pour décider. Nommez la prestation, les clients recherchés, le secteur couvert et la suite attendue : appel, demande de devis ou rendez-vous. Une PME qui présente une offre nouvelle n’a pas les mêmes besoins qu’un commerce dont les clients cherchent déjà le nom.</p>
<h3>Listez les ressources réellement disponibles</h3>
<p>Prévoyez qui répond aux contacts, qui peut fournir des contenus et comment seront suivies les demandes. Un budget publicitaire ne compense pas une offre mal expliquée ; du temps de rédaction ne remplace pas la disponibilité commerciale. Le <a href="/blog/site-internet-pme-le-mans">cadrage d’un site pour PME</a> aide à poser ces responsabilités avant de lancer l’acquisition.</p>
<h3>Fixez une prochaine décision et ses critères</h3>
<p>À la date choisie, examinez les éléments observables : pages améliorées, demandes pertinentes, points de blocage et capacité à poursuivre. Le but n’est pas de déclarer un canal gagnant après quelques jours, mais de savoir quoi faire ensuite. <a href="/contact?objet=Strategie%20SEO%20Ads%20Le%20Mans">Présentez votre situation à Litus</a> pour construire cet ordre de priorité avec une équipe locale.</p>
<h2>Sources et lectures utiles</h2><ul>
<li><a href="https://developers.google.com/search/docs/fundamentals/seo-starter-guide?hl=fr">Google — Principes du référencement naturel</a></li>
<li><a href="https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=fr">Google — Choisir un accompagnement SEO et distinguer publicité et résultats naturels</a></li>
<li><a href="https://support.google.com/google-ads/answer/1722054?hl=fr">Google Ads — Définir et suivre les conversions</a></li>
</ul>`,
  },
]

export const localArticles: BlogArticle[] = articles.map(article => ({ ...article, readTimeMinutes: calculateReadTime(article.content) }))
