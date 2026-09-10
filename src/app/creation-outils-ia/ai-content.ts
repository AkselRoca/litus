export const aiContactHref = '/contact?objet=Cr%C3%A9ation%20d%E2%80%99outils%20IA'

export const aiUseCases = [
  { number: '01', icon: 'knowledge', title: 'Assistants IA internes', text: 'Retrouver une procédure, préparer une réponse ou comprendre un dossier à partir de la documentation de votre entreprise.', result: 'Des réponses avec leurs sources.' },
  { number: '02', icon: 'agent', title: 'Agents IA métier', text: 'Enchaîner des étapes définies : analyser une demande, consulter vos outils et préparer une action, avec validation là où elle compte.', result: 'Un parcours adapté à vos règles.' },
  { number: '03', icon: 'search', title: 'Recherche dans vos documents', text: 'Interroger des PDF, des comptes rendus ou une base de connaissances en langage naturel, selon les droits de chaque utilisateur.', result: 'La bonne information, dans son contexte.' },
  { number: '04', icon: 'content', title: 'Génération et traitement de contenu', text: 'Préparer des fiches produits, reformuler un texte, résumer un dossier ou adapter un contenu à partir de vos consignes éditoriales.', result: 'Des contenus prêts à être relus.' },
  { number: '05', icon: 'leads', title: 'Qualification de prospects', text: 'Structurer les demandes entrantes, repérer le besoin et les informations manquantes, puis préparer une fiche dans votre CRM.', result: 'Un premier tri utile à votre équipe.' },
  { number: '06', icon: 'mail', title: 'Analyse d’e-mails et de documents', text: 'Classer les messages par sujet, orienter une demande vers le bon service et extraire les points à traiter dans une pièce jointe.', result: 'Des demandes mieux orientées.' },
  { number: '07', icon: 'data', title: 'Extraction de données', text: 'Transformer les informations de documents en champs structurés : références, dates, coordonnées ou lignes de commande.', result: 'Des données vérifiables et réutilisables.' },
  { number: '08', icon: 'workflow', title: 'Automatisation de tâches avec IA', text: 'Relier la lecture, le classement et la rédaction à vos processus existants, avec des contrôles et un suivi des exceptions.', result: 'Moins de manipulations répétitives.' },
  { number: '09', icon: 'interface', title: 'Interfaces et outils métier sur mesure', text: 'Intégrer un modèle de langage, ou LLM, dans un espace de travail conçu pour vos utilisateurs, votre CRM, votre ERP et vos données.', result: 'Un outil qui trouve sa place au quotidien.' },
] as const

export const aiWorkflows = [
  {
    id: 'commercial', label: 'Équipe commerciale', context: 'Une demande de devis arrive par e-mail.',
    before: 'Lire le message, chercher l’historique du contact, recopier les informations et préparer une réponse.',
    sources: ['E-mail entrant', 'Catalogue de services', 'Historique CRM'],
    action: 'L’outil identifie le besoin, rapproche la demande des services proposés et prépare une fiche structurée.',
    result: 'Une fiche CRM et un brouillon de réponse. Le commercial vérifie, complète et décide de l’envoi.',
    measure: 'À suivre : temps de préparation, qualité des informations et corrections nécessaires.',
  },
  {
    id: 'connaissance', label: 'Connaissances internes', context: 'Un collaborateur cherche une procédure.',
    before: 'Parcourir plusieurs dossiers, demander à un collègue et vérifier que le document trouvé est encore à jour.',
    sources: ['Procédures validées', 'Documentation métier', 'Droits du collaborateur'],
    action: 'L’assistant recherche les passages pertinents dans les sources autorisées et construit une réponse contextualisée.',
    result: 'Une réponse accompagnée des documents utilisés. Si une information manque, l’outil le signale.',
    measure: 'À suivre : pertinence des réponses, sources retrouvées et questions sans réponse.',
  },
  {
    id: 'operations', label: 'Équipe opérations', context: 'Des documents doivent être enregistrés.',
    before: 'Ouvrir chaque fichier, repérer les champs utiles et les saisir à nouveau dans le logiciel métier.',
    sources: ['Documents reçus', 'Champs attendus', 'Référentiel interne'],
    action: 'L’outil extrait les données, contrôle les champs attendus et met de côté les éléments ambigus.',
    result: 'Un tableau prêt à vérifier et à importer. Les cas incertains restent visibles pour une revue humaine.',
    measure: 'À suivre : taux de champs corrects, temps de vérification et exceptions à traiter.',
  },
] as const

export const aiFaq = [
  { question: 'Quel outil IA peut être utile à mon entreprise ?', answer: 'Le bon point de départ est une tâche fréquente, coûteuse en temps et assez précise pour être évaluée : rechercher une information, classer des demandes, extraire des champs ou préparer un contenu. Nous regardons les données disponibles, les outils utilisés et les contraintes de vos équipes pour choisir un premier cas concret. Certaines étapes se prêtent mieux à une automatisation classique qu’à l’IA.' },
  { question: 'Quelle différence entre un assistant IA et un agent IA sur mesure ?', answer: 'Un assistant aide une personne à trouver une information ou à produire un contenu. Un agent peut aussi coordonner plusieurs étapes et appeler des outils dans un périmètre défini. Le choix dépend du processus à améliorer. Nous précisons ses accès, les actions permises et les étapes qui doivent rester soumises à une validation humaine.' },
  { question: 'Pouvez-vous connecter l’IA à notre CRM, ERP ou base de données ?', answer: 'Oui, lorsque vos logiciels permettent les accès nécessaires, par API, connecteur ou échange de fichiers. Nous vérifions les autorisations, la qualité des données et les possibilités de lecture ou d’écriture avant de proposer l’intégration. Le développement peut s’inscrire dans un outil existant ou dans une application web sur mesure, avec un suivi des échanges et des erreurs.' },
  { question: 'Faut-il entraîner un modèle d’intelligence artificielle ?', answer: 'Pas systématiquement. Un modèle existant peut suffire, associé à vos consignes, à une recherche dans vos documents et à des connexions métier. Cette recherche documentaire contextualisée est souvent appelée RAG. L’entraînement ou l’ajustement d’un modèle se discute seulement lorsqu’un besoin précis, les données disponibles et les résultats des essais le justifient.' },
  { question: 'Comment protégez-vous nos données confidentielles ?', answer: 'Le projet commence par l’identification des données utiles et de leur sensibilité. Nous définissons les droits d’accès, les informations transmises aux modèles, la conservation et les modalités d’hébergement avec vous. Les conditions des fournisseurs sont examinées avant leur choix. Ces décisions sont documentées selon le contexte du projet ; une connexion à un modèle ne donne pas accès à toutes les données de l’entreprise.' },
  { question: 'Comment vérifier la fiabilité des réponses de l’IA ?', answer: 'Nous construisons un jeu de cas représentatifs et vérifions les réponses, les champs extraits et les actions proposées avant la mise en service. Les résultats peuvent inclure leurs sources, des contrôles de format et un signalement des informations manquantes. Les actions sensibles restent validées par une personne. Le suivi après lancement permet de repérer les erreurs et d’améliorer le dispositif.' },
  { question: 'Quel budget et quel délai prévoir pour créer un outil IA ?', answer: 'Ils dépendent du cas d’usage, du nombre de sources, des intégrations, de l’interface et du niveau de contrôle attendu. Nous proposons un périmètre et un devis après un premier cadrage. Les coûts de développement sont distingués de l’hébergement, de l’utilisation des modèles et de la maintenance. Un premier pilote permet de tester l’utilité avant d’étendre le projet.' },
  { question: 'Qui accompagne nos équipes après la mise en ligne ?', answer: 'Nous préparons la prise en main avec les personnes qui utiliseront l’outil : explications, documentation et retours sur des cas réels. Les conditions de maintenance, de suivi et d’évolution sont précisées dans l’offre. L’objectif est de garder un outil compréhensible, utilisable et adapté à vos processus lorsque vos données ou vos logiciels évoluent.' },
] as const
