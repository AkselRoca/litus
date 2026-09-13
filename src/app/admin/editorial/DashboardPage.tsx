import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isEditor } from '@/lib/editorial/admin'
import { getState, listItems, recentEvents } from '@/lib/editorial/store'
import { pillar } from '@/lib/editorial/strategy'
import { displayDate, parisInput } from '@/lib/editorial/dates'
import { getBlogArticles } from '@/lib/blog/articles'
import { prisma } from '@/lib/database_final'
import { editorialAction } from './actions'
import CalendarView, { type CalendarEntry } from './CalendarView'
import './editorial-admin.css'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Calendrier éditorial | Litus', robots: { index: false, follow: false } }
export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  if (!await isEditor()) notFound()
  const namespace = (await searchParams).mode === 'test' ? 'test' : 'production'
  const data = await Promise.all([getState(namespace), listItems(namespace), recentEvents(namespace)]).then(([state, items, logs]) => ({ state, items, logs })).catch(() => null)
  if (!data) return <div className="editorial-admin"><h1>Calendrier éditorial</h1><p role="alert">Le calendrier est temporairement inaccessible. Aucun article n’a été modifié. Rechargez la page dans quelques instants.</p></div>
  const { state, items, logs } = data
  const entries: CalendarEntry[] = items.map(item => ({ id: item.id, title: item.draft?.title || item.workingTitle, scheduledAt: item.publishedAt || item.scheduledAt, status: item.status === 'PUBLISHED' ? 'Publié' : item.held || item.status === 'FAILED' ? 'Brouillon' : 'Planifié', detail: item.refreshOf ? 'Actualisation de l’article existant' : item.status === 'FAILED' ? 'Contrôle bloqué : correction nécessaire' : item.held ? 'En pause, ne sera pas publié' : item.stage === 'READY' ? 'Prêt, contrôles validés' : item.draft ? 'Article rédigé, contrôles en cours' : 'Sujet à préparer, pas encore rédigé', cluster: item.cluster, pillar: pillar(item.targetServicePage), keyword: item.primaryKeyword, preview: `/admin/editorial/${item.id}?mode=${namespace}`, edit: `/admin/editorial/${item.id}/edit?mode=${namespace}`, version: item.modifiedAt, namespace }))
  const archive = namespace === 'production' ? await getBlogArticles() : []
  const manual = namespace === 'production' ? await prisma.blogPost.findMany({ select: { id: true, slug: true, title: true, category: true, published: true, publishedAt: true, createdAt: true, updatedAt: true } }).catch(() => null) : []
  const automatedSlugs = new Set(items.map(i => i.slug))
  for (const post of manual || []) {
    if (automatedSlugs.has(post.slug)) continue
    const date = (post.publishedAt || post.createdAt).toISOString()
    entries.push({ id: `manual-${post.id}`, title: post.title, scheduledAt: date, status: post.published ? Date.parse(date) > Date.now() ? 'Planifié' : 'Publié' : 'Brouillon', detail: post.publishedAt ? 'Article du blog existant' : 'Sans date prévue : affiché à sa date de création', cluster: post.category || 'Blog', pillar: 'Archives du blog', keyword: '', preview: `/admin/blog/${post.id}/preview`, edit: `/admin/blog/${post.id}`, version: post.updatedAt.toISOString() })
  }
  entries.sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt))
  const existingSlugs = new Set([...(manual || []).map(p => p.slug), ...automatedSlugs])
  return <div className="editorial-admin"><header><p className="editorial-eyebrow">LITUS INSIDE / {namespace === 'test' ? 'TEST PRIVÉ' : 'PRODUCTION'}</p><h1>Le calendrier éditorial.</h1><p>Un nouvel article tous les <strong>3 jours</strong>. Des sujets concrets, des sources vérifiées et un aperçu privé avant publication.</p><nav><Link href="/admin/editorial">Production</Link><Link href="/admin/editorial?mode=test">Test privé</Link><Link href="/admin/blog">Tous les articles du blog</Link></nav></header>
    <section className="editorial-summary"><div><strong>{entries.filter(e => e.status === 'Planifié').length}</strong><span>articles planifiés</span></div><div><strong>{entries.filter(e => e.status === 'Brouillon').length}</strong><span>brouillons / à corriger</span></div><div><strong>{archive.length}</strong><span>articles publics conservés</span></div><div><strong>{state?.enabled ? 'Actif' : 'En pause'}</strong><span>72 h minimum entre publications automatiques</span></div></section>
    {state && <form action={editorialAction}><input type="hidden" name="namespace" value={namespace} /><input type="hidden" name="action" value={state.enabled ? 'pause' : 'resume'} /><button>{state.enabled ? 'Mettre le calendrier en pause' : 'Reprendre le calendrier'}</button></form>}
    {state?.planningError && <p role="alert" className="editorial-error">Préparation des prochains sujets : {state.planningError}</p>}
    {manual === null && <p role="alert">Les articles manuels n’ont pas pu être chargés. Le calendrier automatique reste disponible.</p>}
    <CalendarView entries={entries} today={parisInput(new Date().toISOString()).slice(0, 10)} />
    <details className="editorial-log"><summary>Articles historiques conservés ({archive.filter(a => !existingSlugs.has(a.slug)).length})</summary><ul>{archive.filter(a => !existingSlugs.has(a.slug)).map(a => <li key={a.slug}><Link href={`/blog/${a.slug}`}>{a.title}</Link> · {a.category}</li>)}</ul></details>
    <details className="editorial-log"><summary>Journal des derniers passages</summary>{logs.map(log => <details key={String(log.id)}><summary>{displayDate(String(log.at))} · {String(log.event)}</summary><pre>{String(log.detail)}</pre></details>)}</details>
  </div>
}
