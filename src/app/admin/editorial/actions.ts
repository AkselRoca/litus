'use server'
import { revalidatePath } from 'next/cache'
import { control, isEditor } from '@/lib/editorial/admin'

export async function editorialAction(form: FormData) {
  if (!await isEditor()) throw new Error('Accès refusé')
  await control(String(form.get('namespace') || 'production'), String(form.get('action')), String(form.get('id') || ''))
  revalidatePath('/admin/editorial')
}
