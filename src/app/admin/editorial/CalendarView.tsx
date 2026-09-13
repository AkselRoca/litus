'use client'
import Link from 'next/link'
import { useActionState, useMemo, useState } from 'react'
import { saveEditorialAction } from './actions'
import { displayDate, parisInput } from '@/lib/editorial/dates'

export type CalendarEntry = { id: string; title: string; scheduledAt: string; status: 'Brouillon' | 'Planifié' | 'Publié'; detail: string; cluster: string; pillar: string; keyword: string; preview: string; edit: string; version: string; namespace?: string }
export function DateForm({ item }: { item: CalendarEntry }) {
  const [state, action, pending] = useActionState(saveEditorialAction, { ok: false, message: '' })
  return <form action={action} className="editorial-date-form">
    <input type="hidden" name="namespace" value={item.namespace} /><input type="hidden" name="id" value={item.id} /><input type="hidden" name="version" value={item.version} /><input type="hidden" name="action" value="date" />
    <label htmlFor={`date-${item.id}`}>Date prévue (heure de Paris)</label>
    <div><input id={`date-${item.id}`} type="datetime-local" name="scheduledAt" required defaultValue={parisInput(item.scheduledAt)} /><button disabled={pending}>{pending ? 'Enregistrement…' : 'Changer la date'}</button></div>
    {state.message && <p role="status" className={state.ok ? 'editorial-success' : 'editorial-error'}>{state.message}</p>}
  </form>
}
export default function CalendarView({ entries, today }: { entries: CalendarEntry[]; today: string }) {
  const [view, setView] = useState<'month' | 'list'>('month')
  const [month, setMonth] = useState(today.slice(0, 7))
  const [query, setQuery] = useState(''), [status, setStatus] = useState(''), [group, setGroup] = useState('')
  const filtered = useMemo(() => entries.filter(e => (!status || e.status === status) && (!group || e.pillar === group) && `${e.title} ${e.keyword} ${e.cluster}`.toLocaleLowerCase('fr').includes(query.toLocaleLowerCase('fr'))), [entries, status, group, query])
  const [year, m] = month.split('-').map(Number)
  const days = new Date(Date.UTC(year, m, 0)).getUTCDate()
  const first = (new Date(Date.UTC(year, m - 1, 1)).getUTCDay() + 6) % 7
  const move = (step: number) => setMonth(new Date(Date.UTC(year, m - 1 + step, 1)).toISOString().slice(0, 7))
  const card = (item: CalendarEntry, compact = false) => <article className={`editorial-entry ${compact ? 'is-compact' : ''}`} key={item.id}>
    <div className="editorial-entry-meta"><span className={`editorial-status status-${item.status === 'Publié' ? 'published' : item.status === 'Planifié' ? 'planned' : 'draft'}`}>{item.status}</span><span>{item.pillar}</span></div>
    <h3><Link href={item.preview}>{item.title}</Link></h3>
    <p className="editorial-entry-detail">{item.detail}</p>
    <p className="editorial-entry-keyword"><strong>SEO :</strong> {item.keyword || 'Non renseigné'}</p>
    <p className="editorial-entry-detail">{item.cluster}</p>
    <time dateTime={item.scheduledAt}>{displayDate(item.scheduledAt)}</time>
    <div className="editorial-entry-actions"><Link href={item.preview}>Prévisualiser</Link><Link href={item.edit}>Modifier</Link></div>
    {item.namespace && item.status !== 'Publié' && <details><summary>Modifier la date</summary><DateForm key={item.version} item={item} /></details>}
  </article>
  return <section aria-label="Calendrier et articles" className="editorial-workspace">
    <div className="editorial-toolbar"><label>Rechercher<input type="search" placeholder="Titre, outil ou mot-clé…" value={query} onChange={e => setQuery(e.target.value)} /></label>
      <label>Statut<select value={status} onChange={e => setStatus(e.target.value)}><option value="">Tous les statuts</option>{['Brouillon', 'Planifié', 'Publié'].map(s => <option key={s}>{s}</option>)}</select></label>
      <label>Thématique<select value={group} onChange={e => setGroup(e.target.value)}><option value="">Toutes les thématiques</option>{[...new Set(entries.map(e => e.pillar))].sort().map(s => <option key={s}>{s}</option>)}</select></label>
      <div className="editorial-view-toggle"><button aria-pressed={view === 'month'} onClick={() => setView('month')}>Calendrier</button><button aria-pressed={view === 'list'} onClick={() => setView('list')}>Liste</button></div>
    </div>
    <p className="editorial-help">{filtered.length} article(s) · Toutes les heures sont affichées à Paris. « Planifié » indique une date cible, pas une validation de publication.</p>
    {view === 'month' ? <><div className="editorial-month-nav"><button aria-label="Mois précédent" onClick={() => move(-1)}>←</button><h2>{new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(Date.UTC(year, m - 1, 1)))}</h2><button aria-label="Mois suivant" onClick={() => move(1)}>→</button><button onClick={() => setMonth(today.slice(0, 7))}>Aujourd’hui</button></div>
      <div className="editorial-month"><div className="editorial-weekdays" aria-hidden="true">{['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(d => <span key={d}>{d}</span>)}</div>
        <div className="editorial-days">{Array.from({ length: first }, (_, i) => <div className="editorial-empty-day" key={`empty-${i}`} />)}{Array.from({ length: days }, (_, i) => {
          const day = `${month}-${String(i + 1).padStart(2, '0')}`
          const items = filtered.filter(e => parisInput(e.scheduledAt).slice(0, 10) === day)
          return <div className={`editorial-day ${day === today ? 'is-today' : ''} ${items.length ? 'has-entries' : ''}`} key={day}><time className="editorial-day-number" dateTime={day}>{i + 1}</time>{items.map(e => card(e, true))}</div>
        })}</div></div>
      {!filtered.some(e => parisInput(e.scheduledAt).startsWith(month)) && <p className="editorial-empty-state">Aucun article ce mois-ci avec ces filtres. Passez au mois suivant ou à la liste complète.</p>}
    </> : <div className="editorial-list">{filtered.map(e => card(e))}{!filtered.length && <p>Aucun article ne correspond à la recherche.</p>}</div>}
  </section>
}
