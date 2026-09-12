import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { getBlogArticles } from '@/lib/blog/articles'

// Only public titles and excerpts are exposed. Search terms stay in the browser.
const publicArticles = unstable_cache(async () => (await getBlogArticles()).map(article => ({
  title: article.title,
  href: `/blog/${article.slug}`,
  description: article.excerpt,
  kind: 'Article',
})), ['litus-404-public-article-index'], { revalidate: 300 })

export async function GET() {
  try {
    return NextResponse.json({ articles: await publicArticles() }, {
      headers: { 'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600' },
    })
  } catch {
    return NextResponse.json({ articles: [] }, { status: 503 })
  }
}
