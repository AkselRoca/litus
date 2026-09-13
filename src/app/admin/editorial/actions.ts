'use server'
import { revalidatePath } from 'next/cache'
import { control, isEditor } from '@/lib/editorial/admin'
import { saveEditorial } from '@/lib/editorial/edit'
import { z } from 'zod'

export async function editorialAction(form: FormData) {
  if (!await isEditor()) throw new Error('Accès refusé')
  await control(String(form.get('namespace') || 'production'), String(form.get('action')), String(form.get('id') || ''))
  revalidatePath('/admin/editorial')
}

export async function saveEditorialAction(_previous: { ok: boolean; message: string }, form: FormData) {
  if (!await isEditor()) return { ok: false, message: 'Connexion requise.' }
  try {
    const item = await saveEditorial(String(form.get('namespace')), String(form.get('id')), form)
    revalidatePath('/admin/editorial')
    revalidatePath(`/admin/editorial/${item.id}`)
    revalidatePath(`/admin/editorial/${item.id}/edit`)
    return { ok: true, message: 'Modifications enregistrées. Les contrôles restent obligatoires avant publication.' }
  } catch (error) {
    return { ok: false, message: error instanceof z.ZodError ? 'Vérifiez les champs : titre, mots-clés, contenu ou métadonnées incomplets.' : error instanceof Error && !/SQL|database|lease|UNIQUE/i.test(error.message) ? error.message : 'Enregistrement impossible. Réessayez sans fermer votre brouillon.' }
  }
}
