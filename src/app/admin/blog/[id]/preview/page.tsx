import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/database_final'
import { isEditor } from '@/lib/editorial/admin'
import { escape } from '@/lib/editorial/core'
import { prepareArticle } from '@/lib/blog/prepare-article'
export const dynamic = 'force-dynamic'
export const metadata = { title: 'Aperçu privé du blog | Litus', robots: { index: false, follow: false } }
export default async function ManualPreview({ params }: { params: Promise<{ id: string }> }) {
  if (!await isEditor()) notFound()
  const post = await prisma.blogPost.findUnique({ where: { id: (await params).id } })
  if (!post) notFound()
  const content = prepareArticle(post.content).content
  // Sandbox isolates legacy rich HTML from the authenticated admin session.
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline';"><style>body{font:18px/1.8 Georgia,serif;color:#193044;background:#fcfaf7;margin:32px}h1{font:700 38px/1.15 sans-serif}img{max-width:100%;height:auto}table{max-width:100%}a{color:#b84922}</style></head><body><h1>${escape(post.title)}</h1><p>${escape(post.excerpt)}</p>${post.coverImage ? `<img src="${escape(post.coverImage)}" alt="${escape(post.title)}">` : ''}${content}</body></html>`
  return <div><p><Link href="/admin/editorial">Calendrier</Link> · <Link href={`/admin/blog/${post.id}`}>Modifier cet article</Link></p><h1 className="text-2xl font-bold my-6">Prévisualisation privée</h1><iframe title={`Aperçu : ${post.title}`} sandbox="" srcDoc={html} style={{ width: '100%', minHeight: '80vh', border: '1px solid #dce2e7', borderRadius: 16, background: '#fcfaf7' }} /></div>
}
