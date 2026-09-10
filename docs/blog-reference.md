# Blog / Ressources — intégration du 9 septembre 2026

## Présentation

La page `/blog` reprend le composant `ServiceHero` et ses dimensions communes : grille, famille Inter, largeur du texte, H1, interligne et rythme vertical. Deux options facultatives permettent de masquer les CTA et d'afficher un badge, sans changer les autres pages services. Le titre utilise l'accent `#C7431B` et les actions gardent l'orange Litus.

Le visuel de droite est un véritable lien vers l'article mis à la une, avec une photographie existante, un fond de bureau discret et les encarts Lorient/Morbihan, Le Mans/Sarthe et expertises. L'apparition se joue une fois ; le contenu reste lisible sans animation et avec la préférence de réduction des mouvements.

La grille affiche trois colonnes sur ordinateur, deux sur tablette et une sur mobile. Chaque carte constitue un seul lien accessible au clavier. Les filtres par thème et par localisation se combinent dans les paramètres d'URL ; les communes et départements présents dans les articles alimentent le sélecteur. Les liens directs, la remise à zéro et le retour navigateur conservent ce comportement. Le contenu est rendu côté serveur. Le header et le footer existants sont conservés. Le popup générique de capture de leads est désactivé pendant la lecture du blog et de ses articles.

## Articles, photographies et référencement

Les six articles initiaux sont enrichis et conservent leurs slugs. Quinze articles originaux supplémentaires sont décrits dans `blog-articles-2026-a.md` et `blog-articles-2026-b.md`. Leurs intentions couvrent budget, choix de prestataire, contenus pour artisans/PME, référencement, campagnes, e-commerce et parcours de contact, dans le Morbihan et la Sarthe. Les contenus publiés en base restent disponibles et prioritaires en cas de collision de slug. Aucun contenu d'administration ou résultat client fictif n'est utilisé.

Chaque article possède une couverture photographique distincte et trois photographies supplémentaires, intégrées entre des sections complètes : **84 emplacements pour 21 articles**. `article-photos.ts` définit les choix éditoriaux ; `photo-catalog.ts` conserve la source, la licence, l'auteur, la date de prise de vue disponible, le texte alternatif et les dimensions. Les images sont téléchargées en WebP dans `public/blog/photos/`. Les crédits et légendes sont visibles. Les scènes d'illustration ne sont pas présentées comme des clients ou collaborateurs de Litus. Les sources sont documentées dans `blog-photo-sources.md`.

Le sommaire est généré depuis les H2/H3 par `prepareArticle`, avec ancres uniques, conservées si elles existaient déjà. Les photos sont chargées progressivement ; la couverture bénéficie du chargement prioritaire. Les pages comprennent des liens internes pertinents, des articles associés et un CTA contact. Les métadonnées canoniques et les données structurées BlogPosting et BreadcrumbList correspondent à chaque page. Aucun balisage FAQ n'est ajouté : les textes ne contiennent pas de FAQ dédiée. Le sitemap comprend `/blog` et les 21 URL d'articles.

### Calendrier éditorial

Les quinze dates de publication, irrégulièrement réparties du 7 avril au 5 septembre 2026, sont le calendrier éditorial demandé par le propriétaire du site. Ces dates ne proviennent pas d'archives ou de preuves de publication antérieures. La rédaction/intégration de cette version a lieu le 9 septembre 2026, date conservée dans `updatedAt` et présentée comme mise à jour. Les six articles initiaux conservent leur date du 9 septembre. Les dates des contenus déjà publiés en base ne sont pas modifiées.

## Abonnements

Le formulaire envoie une requête à `POST /api/newsletter`. L'adresse est normalisée et validée ; l'accord explicite est requis. Les abonnements sont enregistrés comme leads `newsletter` dans le CRM existant, avec la source, le texte et la version du consentement, ainsi que sa date.

L'identifiant déterministe évite les doublons. Une erreur de validation, de réseau ou de base ne produit pas de faux message de succès. Le retrait de l'accord se demande via le lien email présenté sous le formulaire.

Cette intégration collecte réellement les abonnements. Elle ne configure pas de campagne d'envoi ni de diffusion automatique : celles-ci devront utiliser le registre des abonnés et respecter les retraits d'accord traités par Litus.

## Vérifications

- Compilation de production Next.js et génération du sitemap réussies.
- 13 tests du formulaire et de l'API : validation, accord, attente, succès accessible, erreurs, persistance dans une base temporaire, doublons et concurrence.
- Tests du catalogue et de la préparation HTML : 21 sujets et couvertures distincts, quatre photos par article, fichiers et crédits présents, calendrier, ancres uniques, liens du sommaire et placement entre sections.
- ESLint sur les fichiers concernés : aucune erreur.
- Vérification navigateur de 320 à 1920 px : grille adaptée, aucun débordement horizontal.
- Filtres combinés, URL directe, remise à zéro, historique navigateur et état vide vérifiés.
- 21 pages article en HTTP 200, un H1 par page, 84 photographies, sommaires, canoniques, dates et données structurées vérifiés.
- Thème sombre, réduction des mouvements, liens au clavier et newsletter centrée vérifiés.
- Aucun email envoyé et aucune inscription réelle créée pendant les tests.
