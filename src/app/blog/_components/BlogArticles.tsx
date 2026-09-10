'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, ChevronDown, MapPin, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import type { BlogArticle } from '@/lib/blog/articles'

const categories = ['Tous', 'SEO', 'Stratégie', 'Site Web', 'Google Ads']

export type BlogCardArticle = Pick<BlogArticle, 'slug' | 'title' | 'excerpt' | 'category' | 'city' | 'publishedAt' | 'readTimeMinutes' | 'coverImage' | 'coverImageAlt' | 'authorName'>

function filterHref(category: string, city: string) {
  const query = new URLSearchParams()
  if (category !== 'Tous') query.set('category', category)
  if (city !== 'Toutes les villes') query.set('city', city)
  return query.size ? `/blog?${query}` : '/blog'
}

function publicationDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Paris' }).format(new Date(value))
}

export function BlogArticles({ articles, category: requestedCategory = 'Tous', city: requestedCity = 'Toutes les villes' }: { articles: BlogCardArticle[]; category?: string; city?: string }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const cities = ['Toutes les villes', ...Array.from(new Set(articles.map(article => article.city).filter((city): city is NonNullable<BlogArticle['city']> => Boolean(city)))).sort((a, b) => a.localeCompare(b, 'fr'))]
  const category = categories.includes(requestedCategory) ? requestedCategory : 'Tous'
  const city = cities.includes(requestedCity) ? requestedCity : 'Toutes les villes'
  const filtered = articles.filter(article => (category === 'Tous' || article.category === category) && (city === 'Toutes les villes' || article.city === city))

  return <section id="articles" className="blog-list" aria-label="Nos articles et conseils">
    <div className="blog-container">
      <div className="blog-filters">
        <nav className="blog-categories" aria-label="Filtrer les articles par thématique">
          {categories.map(item => <Link href={filterHref(item, city)} scroll={false} key={item} aria-current={category === item ? 'true' : undefined} className={category === item ? 'is-active' : ''}>{item}</Link>)}
        </nav>
        <div className="blog-city-filter"><MapPin size={15} aria-hidden="true" /><label htmlFor="blog-city" className="sr-only">Localisation des articles</label><select id="blog-city" value={city} onChange={event => { const next = event.target.value; startTransition(() => router.push(filterHref(category, next), { scroll: false })) }}>{cities.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={13} aria-hidden="true" /></div>
      </div>
      <p className="blog-results-count" role="status" aria-live="polite">{filtered.length} article{filtered.length > 1 ? 's' : ''}{city !== 'Toutes les villes' ? ` · ${city}` : ' · Lorient, Le Mans et vos projets web'}</p>
      <div aria-busy={isPending}>
        {filtered.length ? <div className="blog-articles-grid">{filtered.map(article => <article className="blog-article-card" key={article.slug}>
          <Link href={`/blog/${article.slug}`} className="blog-card-link">
            <div className="blog-card-image">{article.coverImage ? <Image src={article.coverImage} alt={article.coverImageAlt || article.title} width={840} height={440} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" unoptimized={!article.coverImage.startsWith('/')} /> : <div className="blog-card-placeholder"><BookOpen size={34} aria-hidden="true" /><span>Litus Inside</span></div>}</div>
            <div className="blog-card-copy"><div className="blog-card-labels"><span className="blog-category-badge">{article.category}</span>{article.city && <span className="blog-card-city"><MapPin size={11} aria-hidden="true" />{article.city}</span>}</div><h2>{article.title}</h2><p className="blog-card-excerpt">{article.excerpt}</p><div className="blog-card-meta"><div><span>Par {article.authorName}</span><span className="blog-card-date"><time dateTime={article.publishedAt}>{publicationDate(article.publishedAt)}</time><i aria-hidden="true">·</i>{article.readTimeMinutes} min de lecture</span></div><ArrowRight size={17} aria-hidden="true" /></div></div>
          </Link>
        </article>)}</div> : <div className="blog-empty"><BookOpen size={30} strokeWidth={1.5} aria-hidden="true" /><h2>Aucun article ne correspond à ces filtres</h2><p>Essayez une autre thématique ou explorez les conseils pour un autre secteur.</p><Link href="/blog" scroll={false} className="site-cta-secondary"><RotateCcw size={15} aria-hidden="true" />Réinitialiser les filtres</Link></div>}
      </div>
    </div>
  </section>
}
