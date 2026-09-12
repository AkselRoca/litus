import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isEditor } from '@/lib/editorial/admin'
import { listItems } from '@/lib/editorial/store'
import { renderDraft } from '@/lib/editorial/core'
import { prepareArticle } from '@/lib/blog/prepare-article'
import '@/components/templates/blog-article.css'
import '../editorial-admin.css'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Brouillon privé | Litus', robots: { index: false, follow: false } }
export default async function DraftPreview({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ mode?: string }> }) {
  if (!await isEditor()) notFound()
  const namespace = (await searchParams).mode === 'test' ? 'test' : 'production'
  const id = (await params).id
  const draft = (await listItems(namespace)).find(i => i.id === id)
  if (!draft?.draft) notFound()
  const content = prepareArticle(draft.content || renderDraft(draft.draft), draft.images?.slice(1))
  return <div className="editorial-admin"><Link href={`/admin/editorial?mode=${namespace}`}>Retour au calendrier</Link><p className="editorial-eyebrow">APERÇU PRIVÉ · {draft.status} · {draft.stage}</p><h1>{draft.draft.title}</h1><p>{draft.draft.excerpt}</p>{draft.images?.[0] && <img className="editorial-preview-cover" src={draft.images[0].src} alt={draft.images[0].alt} width={draft.images[0].width} height={draft.images[0].height} />}<article className="blog-reading-content" dangerouslySetInnerHTML={{ __html: content.content }} /><section className="editorial-log"><h2>Recherche et contrôle qualité</h2><p>{draft.research?.searchedAt} · {draft.qualityScore ?? 'Non évalué'}/100</p><h3>Requêtes Google</h3><ul>{draft.research?.queries.map(q => <li key={q}>{q}</li>)}</ul><h3>Sources réellement consultées</h3><ul>{draft.research?.sources.map(s => <li key={s.url}><a href={s.url} rel="noreferrer" target="_blank">{s.title}</a> · {s.official ? 'Documentation officielle' : 'Analyse SERP'} · {s.fetchedAt}</li>)}</ul><h3>Images et licences</h3><ul>{draft.images?.map(i => <li key={i.src}><a href={i.sourceUrl}>{i.alt}</a> · {i.credit} · <a href={i.licenseUrl}>{i.license}</a></li>)}</ul><h3>Revue finale</h3><pre>{JSON.stringify({ brief: draft.brief, review: draft.review, gate: draft.gate, links: draft.links }, null, 2)}</pre></section></div>
}
