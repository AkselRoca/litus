import type { BlogArticle, BlogImage } from './articles'
import { blogPhotos } from './photo-catalog'

type InlineSelection = { photo: string; after: number; caption?: string }
type ArticlePhotos = { cover: string; inline: [InlineSelection, InlineSelection, InlineSelection] }

/** A deliberate selection for each subject: one unique cover and three contextual photographs. */
export const articlePhotoSelections: Record<string, ArticlePhotos> = {
  'referencement-local-lorient-fiche-google': { cover: 'lorient-port-rohan', inline: [
    { photo: 'mobile-en-main', after: 1, caption: 'Vérifiez la fiche depuis un téléphone : coordonnées, horaires et lien vers le site doivent rester faciles à trouver. Photo d’illustration.' },
    { photo: 'lorient-cite-voile', after: 3 },
    { photo: 'ordinateur-saisie', after: 6, caption: 'Tenez un relevé des informations corrigées et des questions reçues, plutôt que de vous fier à une recherche isolée. Photo d’illustration.' },
  ] },
  'refonte-site-internet-le-mans': { cover: 'developpeur-travail', inline: [
    { photo: 'mobile-ordinateur', after: 2 }, { photo: 'le-mans-republique', after: 4 },
    { photo: 'carnet-projet', after: 6, caption: 'Un cahier des charges utile décrit les tâches à réussir et les éléments à conserver. Photo d’illustration.' },
  ] },
  'google-ads-lorient-zone-intervention': { cover: 'analyse-documents', inline: [
    { photo: 'lanester-blavet', after: 1 }, { photo: 'mobile-ordinateur', after: 4 },
    { photo: 'bureau-notes-analyse', after: 6, caption: 'Rapprochez les observations de campagne des demandes réellement traitées par votre équipe. Photo d’illustration.' },
  ] },
  'seo-local-le-mans-pages-services': { cover: 'le-mans-pont-yssoir', inline: [
    { photo: 'carnet-projet', after: 1 }, { photo: 'ordinateur-saisie', after: 3 }, { photo: 'le-mans-cathedrale', after: 5 },
  ] },
  'site-internet-artisan-lorient-devis': { cover: 'artisan-bois', inline: [
    { photo: 'atelier-etabli', after: 1 }, { photo: 'lorient-cite-voile', after: 3 },
    { photo: 'mobile-en-main', after: 5, caption: 'Le parcours de demande doit rester simple sur téléphone, y compris lorsque le visiteur est en déplacement. Photo d’illustration.' },
  ] },
  'seo-ou-google-ads-le-mans': { cover: 'bureau-notes-analyse', inline: [
    { photo: 'le-mans-republique', after: 1 }, { photo: 'analyse-documents', after: 4 }, { photo: 'planning-bureau', after: 6 },
  ] },
  'prix-site-internet-lorient': { cover: 'planning-bureau', inline: [
    { photo: 'lorient-port-rohan', after: 1 }, { photo: 'conception-bureau', after: 3 }, { photo: 'bureau-reunion-clair', after: 6 },
  ] },
  'choisir-agence-web-vannes': { cover: 'vannes-remparts', inline: [
    { photo: 'echange-tablette', after: 1 }, { photo: 'carnet-projet', after: 3 }, { photo: 'salle-echange', after: 5 },
  ] },
  'site-artisan-lanester': { cover: 'atelier-perceuse', inline: [
    { photo: 'lanester-blavet', after: 1 }, { photo: 'chantier-vue-dessus', after: 3 }, { photo: 'mobile-en-main', after: 5 },
  ] },
  'seo-commerce-ploemeur': { cover: 'commerce-vitrine', inline: [
    { photo: 'ploemeur-lomener', after: 1 }, { photo: 'mobile-cafe', after: 3 }, { photo: 'ordinateur-saisie', after: 5 },
  ] },
  'site-ecommerce-morbihan': { cover: 'commerce-disquaire', inline: [
    { photo: 'conception-bureau', after: 1 }, { photo: 'emballage-cadeau', after: 3 }, { photo: 'colis-cartons', after: 5 },
  ] },
  'refonte-site-hennebont': { cover: 'hennebont-blavet', inline: [
    { photo: 'carnet-projet', after: 1 }, { photo: 'code-ecran', after: 3 }, { photo: 'mobile-ordinateur', after: 5 },
  ] },
  'google-ads-auray-saisonnalite': { cover: 'auray-saint-goustan', inline: [
    { photo: 'planning-bureau', after: 1 }, { photo: 'commerce-vitrine', after: 3 }, { photo: 'analyse-documents', after: 5 },
  ] },
  'visibilite-google-larmor-plage': { cover: 'larmor-mairie', inline: [
    { photo: 'ploemeur-lomener', after: 1 }, { photo: 'mobile-cafe', after: 3 }, { photo: 'ordinateur-saisie', after: 5 },
  ] },
  'site-internet-pme-le-mans': { cover: 'bureau-reunion-clair', inline: [
    { photo: 'le-mans-republique', after: 1 }, { photo: 'carnet-projet', after: 3 }, { photo: 'echange-tablette', after: 6 },
  ] },
  'google-ads-allonnes-appels': { cover: 'mobile-ordinateur', inline: [
    { photo: 'allonnes-mairie', after: 1 }, { photo: 'bureau-notes-analyse', after: 3 }, { photo: 'salle-echange', after: 5 },
  ] },
  'seo-local-coulaines': { cover: 'coulaines-centre', inline: [
    { photo: 'mobile-en-main', after: 1 }, { photo: 'ordinateur-saisie', after: 3 }, { photo: 'planning-bureau', after: 5 },
  ] },
  'landing-page-arnage': { cover: 'ordinateur-developpement', inline: [
    { photo: 'arnage-eglise', after: 1 }, { photo: 'conception-bureau', after: 3 }, { photo: 'echange-tablette', after: 5 },
  ] },
  'ecommerce-la-chapelle-saint-aubin': { cover: 'colis-cartons', inline: [
    { photo: 'chapelle-saint-aubin-commerce', after: 1 }, { photo: 'commerce-vitrine', after: 3 }, { photo: 'emballage-cadeau', after: 5 },
  ] },
  'convertir-visiteurs-yvre-leveque': { cover: 'mobile-en-main', inline: [
    { photo: 'yvre-leveque-placette', after: 1 }, { photo: 'mobile-ordinateur', after: 3 }, { photo: 'carnet-projet', after: 5 },
  ] },
  'agence-ou-freelance-sarthe': { cover: 'echange-tablette', inline: [
    { photo: 'le-mans-pont-yssoir', after: 1 }, { photo: 'salle-echange', after: 3 }, { photo: 'planning-bureau', after: 5 },
  ] },
}

export function withArticlePhotos(article: BlogArticle): BlogArticle {
  const selection = articlePhotoSelections[article.slug]
  if (!selection) return article
  const getPhoto = (id: string) => {
    const photo = blogPhotos.find(item => item.id === id)
    if (!photo) throw new Error(`Missing licensed blog photo: ${id}`)
    return photo
  }
  const cover = getPhoto(selection.cover)
  const images: BlogImage[] = selection.inline.map(item => {
    const photo = getPhoto(item.photo)
    return { ...photo, caption: item.caption || photo.caption, afterSection: item.after }
  })
  return {
    ...article,
    coverImage: cover.src, coverImageAlt: cover.alt,
    coverImageCredit: { label: `${cover.credit} · ${cover.license}`, href: cover.sourceUrl },
    imageSource: cover.sourceUrl, imageCredit: cover.credit, imageLicense: cover.license,
    images,
  }
}
