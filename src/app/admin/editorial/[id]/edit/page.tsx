import Link from 'next/link'
import { notFound } from 'next/navigation'
import { isEditor } from '@/lib/editorial/admin'
import { listItems } from '@/lib/editorial/store'
import { services } from '@/lib/editorial/core'
import EditorForm from '../../EditorForm'
import { editorialAction } from '../../actions'
import '../../editorial-admin.css'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Modifier un article | Litus', robots: { index: false, follow: false } }
export default async function EditPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ mode?: string }> }) {
  if (!await isEditor()) notFound()
  const namespace = (await searchParams).mode === 'test' ? 'test' : 'production'
  const id = (await params).id
  return <EditContent id={id} namespace={namespace} />
}
async function EditContent({ id, namespace }: { id: string; namespace: string }) {
  const items = await listItems(namespace), item = items.find(i => i.id === id)
  if (!item) notFound()
  const revision = items.find(i => i.refreshOf === id && i.status !== 'PUBLISHED')
  const { research: _research, review: _review, brief: _brief, images: _images, content: _content, gate: _gate, ...editable } = item
  return <div className="editorial-admin"><nav><Link href={`/admin/editorial?mode=${namespace}`}>Calendrier</Link> · <Link href={`/admin/editorial/${id}?mode=${namespace}`}>Prévisualiser</Link></nav><h1>Modifier l’article.</h1>
    {item.status === 'PUBLISHED' ? <section><p>La version publique reste en ligne. Préparez une actualisation privée avant remplacement.</p>{revision ? <Link href={`/admin/editorial/${revision.id}/edit?mode=${namespace}`}>Modifier l’actualisation en cours</Link> : <form action={editorialAction}><input type="hidden" name="namespace" value={namespace} /><input type="hidden" name="id" value={id} /><input type="hidden" name="action" value="refresh" /><button>Créer une actualisation privée</button></form>}</section> : <EditorForm key={item.modifiedAt} item={editable} pages={services.map(({ title, path }) => ({ title, path }))} />}
  </div>
}
