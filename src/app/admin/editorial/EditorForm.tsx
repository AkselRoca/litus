'use client'
import { useActionState } from 'react'
import { saveEditorialAction } from './actions'
import { parisInput } from '@/lib/editorial/dates'
import type { Item } from '@/lib/editorial/types'

export default function EditorForm({ item, pages }: { item: Pick<Item, 'id' | 'namespace' | 'modifiedAt' | 'scheduledAt' | 'held' | 'workingTitle' | 'primaryKeyword' | 'secondaryKeywords' | 'angle' | 'targetServicePage' | 'draft' | 'seo' | 'refreshSlug'>; pages: { title: string; path: string }[] }) {
  const [state, action, pending] = useActionState(saveEditorialAction, { ok: false, message: '' })
  return <form action={action} className="editorial-edit-form">
    <input type="hidden" name="id" value={item.id} /><input type="hidden" name="namespace" value={item.namespace} /><input type="hidden" name="version" value={item.modifiedAt} /><input type="hidden" name="action" value="edit" />
    <fieldset><legend>Sujet et programmation</legend>
      <label>Titre / H1<input name="workingTitle" required minLength={15} maxLength={180} defaultValue={item.draft?.title || item.workingTitle} /></label>
      <div className="editorial-fields"><label>Date prévue (heure de Paris)<input name="scheduledAt" type="datetime-local" required defaultValue={parisInput(item.scheduledAt)} /></label><label>Préparation<select name="mode" defaultValue={item.held ? 'draft' : 'scheduled'}><option value="draft">Brouillon : garder en pause</option><option value="scheduled">Planifier : autoriser les contrôles</option></select></label></div>
      <div className="editorial-fields"><label>Mot-clé SEO principal<input name="primaryKeyword" required minLength={5} maxLength={150} defaultValue={item.primaryKeyword} /></label><label>Page commerciale à soutenir<select name="targetServicePage" defaultValue={item.targetServicePage}>{pages.map(page => <option key={page.path} value={page.path}>{page.title} · {page.path}</option>)}</select></label></div>
      <label>Mots-clés secondaires (un par ligne, 8 maximum)<textarea name="secondaryKeywords" rows={4} defaultValue={item.secondaryKeywords.join('\n')} /></label>
      <label>Angle et problème métier à résoudre<textarea name="angle" required minLength={25} maxLength={2000} rows={4} defaultValue={item.angle} /></label>
    </fieldset>
    {item.seo && <fieldset><legend>Métadonnées SEO</legend><label>Title SEO (20 à 65 caractères)<input name="seoTitle" minLength={20} maxLength={65} required defaultValue={item.seo.title} /></label><label>Meta description (80 à 165 caractères)<textarea name="seoDescription" minLength={80} maxLength={165} required rows={3} defaultValue={item.seo.description} /></label><label>Slug<input name="slug" pattern="[a-z0-9]+(-[a-z0-9]+)*" required maxLength={100} readOnly={!!item.refreshSlug} defaultValue={item.seo.slug} /></label></fieldset>}
    {item.draft ? <fieldset><legend>Contenu de l’article</legend><p>Le texte reste en français naturel, sans HTML. Vos changements seront vérifiés, mais pas réécrits automatiquement.</p><label>Introduction<textarea name="excerpt" required minLength={50} maxLength={800} rows={4} defaultValue={item.draft.excerpt} /></label>
      {item.draft.blocks.map((block, index) => <div className="editorial-block-editor" key={index}><label>Bloc {index + 1}<select name={`blockType${index}`} defaultValue={block.type}>{[['paragraph', 'Paragraphe'], ['h2', 'Titre H2'], ['h3', 'Sous-titre H3'], ['list', 'Liste'], ['table', 'Tableau'], ['quote', 'Citation']].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label>Texte du bloc<textarea name={`block${index}`} rows={block.type.startsWith('h') ? 2 : 5} required defaultValue={block.type === 'list' ? block.items.join('\n') : block.type === 'table' ? block.rows.map(r => r.join('\t')).join('\n') : block.text} /></label><small>Liste : un élément par ligne. Tableau : lignes séparées par Entrée, cellules séparées par une tabulation (collage depuis un tableur).</small></div>)}
    </fieldset> : <p className="editorial-help">Ce sujet n’a pas encore été rédigé. Le moteur préparera recherche Google, contenu, métadonnées et trois visuels avant validation.</p>}
    <div className="editorial-save-bar"><button disabled={pending}>{pending ? 'Enregistrement…' : 'Enregistrer les modifications'}</button><p>Version précédente conservée dans l’historique. Aucun article n’est publié par ce bouton.</p>{state.message && <p role="status" className={state.ok ? 'editorial-success' : 'editorial-error'}>{state.message}</p>}</div>
  </form>
}
