import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isEditor } from '@/lib/editorial/admin'
import { getState, listItems, recentEvents } from '@/lib/editorial/store'
import { editorialAction } from './actions'
import './editorial-admin.css'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Calendrier éditorial | Litus', robots: { index: false, follow: false } }
const format = (date: string) => new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Paris' }).format(new Date(date))
export default async function EditorialAdmin({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  if (!await isEditor()) notFound()
  const namespace = (await searchParams).mode === 'test' ? 'test' : 'production'
  const [state, items, logs] = await Promise.all([getState(namespace), listItems(namespace), recentEvents(namespace)]).catch(() => [null, [], []] as const)
  return <div className="editorial-admin"><header><p className="editorial-eyebrow">LITUS INSIDE / {namespace === 'test' ? 'TEST PRIVÉ' : 'PRODUCTION'}</p><h1>Le calendrier éditorial.</h1><p>Un créneau tous les 4 jours. Recherche, rédaction et illustrations préparées en avance. La qualité garde le dernier mot.</p><nav><Link href="/admin/editorial">Production</Link><Link href="/admin/editorial?mode=test">Cycle de test privé</Link></nav></header>
    <section className="editorial-summary"><div><strong>{items.length}</strong><span>sujets au calendrier</span></div><div><strong>{items.filter(i => i.status === 'PUBLISHED').length}</strong><span>articles publiés</span></div><div><strong>{items.filter(i => i.status === 'FAILED').length}</strong><span>brouillons à reprendre</span></div><div><strong>{state?.enabled ? 'Actif' : 'En pause'}</strong><span>{state ? `Première date : ${format(state.anchor)}` : 'En attente du premier passage sécurisé'}</span></div></section>
    {state && <form action={editorialAction}><input type="hidden" name="namespace" value={namespace} /><input type="hidden" name="action" value={state.enabled ? 'pause' : 'resume'} /><button>{state.enabled ? 'Mettre en pause' : 'Reprendre le calendrier'}</button></form>}
    {state?.planningError && <p role="alert">Renouvellement du calendrier : {state.planningError}</p>}
    <section aria-label="Sujets programmés" className="editorial-calendar">{items.map(item => <article key={item.id}><div className="editorial-item-top"><span>{item.cluster}</span><time dateTime={item.scheduledAt}>{format(item.scheduledAt)}</time></div><h2>{item.workingTitle}</h2><p>{item.angle}</p><dl><dt>Requête</dt><dd>{item.primaryKeyword}</dd><dt>Intention</dt><dd>{item.searchIntent}</dd><dt>Page soutenue</dt><dd><Link href={item.targetServicePage}>{item.targetServicePage}</Link></dd><dt>Priorité éditoriale</dt><dd>{item.priority}/100</dd><dt>Étape</dt><dd>{item.stage} · {item.status}</dd><dt>Qualité</dt><dd>{item.qualityScore === undefined ? 'Pas encore évaluée' : `${item.qualityScore}/100`}</dd></dl><p className="editorial-reason">{item.reason}</p>{item.error && <p className="editorial-error">{item.error}</p>}
      {item.draft && <Link href={`/admin/editorial/${item.id}?mode=${namespace}`}>Ouvrir le brouillon et ses sources</Link>}
      {item.status === 'PUBLISHED' && <Link href={`/blog/${item.refreshSlug || item.slug}`}>Lire l’article publié</Link>}
      {item.status === 'PUBLISHED' && !item.refreshOf && <form action={editorialAction}><input type="hidden" name="namespace" value={namespace} /><input type="hidden" name="action" value="refresh" /><input type="hidden" name="id" value={item.id} /><button>Actualiser après une nouvelle recherche</button></form>}
      {item.status === 'FAILED' && <form action={editorialAction}><input type="hidden" name="namespace" value={namespace} /><input type="hidden" name="action" value="retry" /><input type="hidden" name="id" value={item.id} /><button>Reprendre depuis une recherche fraîche</button></form>}
    </article>)}</section>
    <section className="editorial-log"><h2>Journal des derniers passages</h2>{logs.length ? logs.map(log => <details key={String(log.id)}><summary><time>{format(String(log.at))}</time> · {String(log.event)}</summary><pre>{String(log.detail)}</pre></details>) : <p>Aucune opération enregistrée.</p>}</section>
  </div>
}
