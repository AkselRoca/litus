import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isEditor } from '@/lib/editorial/admin'
import { listItems } from '@/lib/editorial/store'
import { renderDraft } from '@/lib/editorial/core'
import { displayDate } from '@/lib/editorial/dates'
import { prepareArticle } from '@/lib/blog/prepare-article'
import { editorialAction } from './actions'
import '@/components/templates/blog-article.css'
import './editorial-admin.css'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Prévisualisation privée | Litus', robots: { index: false, follow: false } }
export default async function PreviewPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ mode?: string }> }) {
  if (!await isEditor()) notFound()
  const namespace = (await searchParams).mode === 'test' ? 'test' : 'production'
  const id = (await params).id, item = (await listItems(namespace)).find(i => i.id === id)
  if (!item) notFound()
  const article = item.draft ? prepareArticle(item.content || renderDraft(item.draft, item.links), item.images?.slice(1)) : null
  return <div className="editorial-admin editorial-preview"><nav><Link href={`/admin/editorial?mode=${namespace}`}>Retour au calendrier</Link> · <Link href={`/admin/editorial/${id}/edit?mode=${namespace}`}>Modifier</Link></nav>
    <p className="editorial-eyebrow">APERÇU PRIVÉ · {item.status === 'PUBLISHED' ? 'PUBLIÉ' : item.held || item.status === 'FAILED' ? 'BROUILLON' : 'PLANIFIÉ'}</p><h1>{item.draft?.title || item.workingTitle}</h1>
    <p><strong>Date cible :</strong> {displayDate(item.scheduledAt)} (Paris) · {item.cluster}</p><p><strong>Mot-clé principal :</strong> {item.primaryKeyword}</p>
    {item.error && <p className="editorial-error" role="alert">{item.error}</p>}
    {item.draft && article ? <><p className="editorial-preview-intro">{item.draft.excerpt}</p>{item.images?.[0] && <figure><img className="editorial-preview-cover" src={item.images[0].src} alt={item.images[0].alt} width={item.images[0].width} height={item.images[0].height} /><figcaption>{item.images[0].caption}</figcaption></figure>}
      {item.images?.length !== 3 && <p className="editorial-help">Illustrations en préparation : {item.images?.length || 0}/3. Publication bloquée tant que les trois visuels ne sont pas validés.</p>}
      <nav className="editorial-preview-toc" aria-label="Sommaire de l’article"><h2>Sommaire</h2><ol>{article.headings.filter(h => h.level === 2).map(h => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol></nav>
      <article className="blog-reading-content" dangerouslySetInnerHTML={{ __html: article.content }} />
    </> : <section className="editorial-brief-preview"><h2>Brief du prochain article</h2><p>Ce sujet est prévu au calendrier, mais le texte n’a pas encore été rédigé. Aucun faux aperçu n’est présenté.</p><h3>Le problème à résoudre</h3><p>{item.angle}</p><h3>Intention de recherche</h3><p>{item.searchIntent}</p><h3>Page à soutenir</h3><Link href={item.targetServicePage}>{item.cluster} · {item.targetServicePage}</Link><h3>Mots-clés secondaires</h3><p>{item.secondaryKeywords.join(' · ')}</p>{item.brief && <><h3>Plan préparé</h3><ol>{item.brief.outline.map(s => <li key={s}>{s}</li>)}</ol></>}<p>Prochaines étapes : recherche Google, vérification des doublons, rédaction, maillage, métadonnées et trois illustrations pertinentes.</p></section>}
    {!item.draft && <form action={editorialAction}><input type="hidden" name="namespace" value={namespace} /><input type="hidden" name="id" value={id} /><input type="hidden" name="action" value="prepare" /><button disabled={item.prepareRequested}>{item.prepareRequested ? 'Préparation demandée' : 'Préparer cet article en avance'}</button><p className="editorial-help">Préparation par étapes aux prochains passages du moteur, sans avancer sa date de publication. Le calendrier doit être actif.</p></form>}
    {item.seo && <section className="editorial-preview-seo"><h2>Aperçu SEO</h2><p>/blog/{item.seo.slug}</p><h3>{item.seo.title}</h3><p>{item.seo.description}</p></section>}
    {item.status === 'FAILED' && <form action={editorialAction}><input type="hidden" name="namespace" value={namespace} /><input type="hidden" name="id" value={id} /><input type="hidden" name="action" value="retry" /><button>Reprendre les contrôles en conservant le brouillon</button></form>}
    <details className="editorial-log"><summary>Sources, licences et contrôle qualité</summary><h2>Recherche Google</h2><p>{item.research?.searchedAt ? displayDate(item.research.searchedAt) : 'Recherche à effectuer'} · Qualité : {item.qualityScore ?? 'non évaluée'}</p><ul>{item.research?.queries.map(q => <li key={q}>{q}</li>)}</ul><h3>Sources consultées</h3><ul>{item.research?.sources.map(s => <li key={s.url}><a href={s.url} rel="noopener noreferrer" target="_blank">{s.title}</a> · {s.official ? 'Source officielle' : 'Analyse des résultats'}</li>)}</ul><h3>Trois images et droits d’utilisation</h3><ul>{item.images?.map(i => <li key={i.src}><a href={i.sourceUrl}>{i.alt}</a> · {i.credit} · <a href={i.licenseUrl}>{i.license}</a> · {i.width} × {i.height}</li>)}</ul><pre>{JSON.stringify({ brief: item.brief, review: item.review, gate: item.gate, links: item.links }, null, 2)}</pre></details>
  </div>
}
