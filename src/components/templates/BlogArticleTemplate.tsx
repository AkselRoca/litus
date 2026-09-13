import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, List, MapPin } from 'lucide-react'
import type { ArticleHeading } from '@/lib/blog/prepare-article'
import './blog-article.css'

export interface BlogArticleData {
  slug: string
  title: string
  excerpt: string
  metaTitle?: string
  metaDescription?: string
  content: React.ReactNode
  author: { name: string; role: string; avatar?: string | null }
  publishedAt: string
  publishedAtIso?: string
  updatedAt?: string
  updatedAtIso?: string
  readTime: string
  category: string
  city?: string | null
  coverImage?: string | null
  coverImageAlt?: string
  coverImageCredit?: { label: string; href: string }
  tableOfContents?: ArticleHeading[]
  relatedArticles?: { slug: string; title: string; coverImage?: string | null; excerpt?: string }[]
  cta?: { label: string; text: string; href: string }
}

export function generateBlogArticleMetadata(data: BlogArticleData): Metadata {
  return {
    title: { absolute: data.metaTitle || `${data.title} | Litus` },
    description: data.metaDescription || data.excerpt, keywords: null,
    alternates: { canonical: `/blog/${data.slug}` },
    openGraph: { title: data.metaTitle || data.title, description: data.metaDescription || data.excerpt, type: 'article', url: `https://www.litus.fr/blog/${data.slug}`, publishedTime: data.publishedAtIso, modifiedTime: data.updatedAtIso || data.publishedAtIso, authors: [data.author.name], images: data.coverImage ? [{ url: data.coverImage, alt: data.coverImageAlt || data.title }] : [] },
    twitter: { card: 'summary_large_image', title: data.metaTitle || data.title, description: data.metaDescription || data.excerpt, images: data.coverImage ? [data.coverImage] : [] },
  }
}

export function BlogArticleTemplate({ data }: { data: BlogArticleData }) {
  const isSarthe = ['Le Mans', 'Allonnes', 'Coulaines', 'Arnage', 'La Chapelle-Saint-Aubin', 'Yvré-l’Évêque', 'Sarthe'].includes(data.city || '')
  const localHref = isSarthe ? '/agence-web-le-mans' : '/agence-web-lorient'
  return <div className="blog-reading-page">
    <div className="blog-reading-container">
      <header className="blog-reading-header">
        <nav aria-label="Fil d’Ariane"><Link href="/">Accueil</Link><span aria-hidden="true">/</span><Link href="/blog">Litus Inside</Link><span aria-hidden="true">/</span><span aria-current="page">{data.title}</span></nav>
        <div className="blog-reading-tags"><span>{data.category}</span>{data.city && <span><MapPin size={12} aria-hidden="true" />{data.city}</span>}</div>
        <h1>{data.title}</h1><p className="blog-reading-intro">{data.excerpt}</p>
        <div className="blog-reading-meta"><span>Par {data.author.name}</span><span><CalendarDays size={14} aria-hidden="true" />Publié le <time dateTime={data.publishedAtIso}>{data.publishedAt}</time></span>{data.updatedAt && data.updatedAtIso?.slice(0, 10) !== data.publishedAtIso?.slice(0, 10) && <span>Mis à jour le <time dateTime={data.updatedAtIso}>{data.updatedAt}</time></span>}<span><Clock3 size={14} aria-hidden="true" />{data.readTime} de lecture</span></div>
      </header>
      <div className="blog-reading-layout">
        <div>
          {data.coverImage && <figure className="blog-reading-cover"><Image src={data.coverImage} alt={data.coverImageAlt || data.title} width={1200} height={630} priority sizes="(max-width: 1000px) 100vw, 70vw" unoptimized={!data.coverImage.startsWith('/')} />{data.coverImageCredit && <figcaption><a href={data.coverImageCredit.href} target="_blank" rel="noopener noreferrer">{data.coverImageCredit.label}</a></figcaption>}</figure>}
          {data.tableOfContents && data.tableOfContents.length > 0 && <nav className="blog-reading-contents" aria-label="Sommaire de l’article"><div><List size={19} strokeWidth={1.6} aria-hidden="true" /><h2>Dans cet article</h2></div><ol>{data.tableOfContents.map(heading => <li key={heading.id} className={heading.level === 3 ? 'blog-reading-contents-sub' : undefined}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></nav>}
          <article className="blog-reading-content">{data.content}</article>
          <div className="blog-reading-back"><Link href="/blog"><ArrowLeft size={16} aria-hidden="true" />Tous les conseils Litus</Link></div>
        </div>
        <aside className="blog-reading-sidebar" aria-label="Pour aller plus loin"><div className="blog-reading-sidebar-inner">
          <div className="blog-reading-contact"><span className="blog-reading-kicker">Votre projet, concrètement</span><h2>Et pour<br /><em>votre entreprise ?</em></h2><p>{data.cta?.text || 'Parlons de votre activité, de votre site et des actions qui pourraient vous être utiles.'}</p><Link href={data.cta?.href || `/contact?objet=${encodeURIComponent(`Suite à l’article : ${data.title}`)}`} className="site-cta-primary">{data.cta?.label || 'Échanger avec nous'} <ArrowRight size={16} aria-hidden="true" /></Link></div>
          {data.city && <Link href={localHref} className="blog-reading-local"><MapPin size={18} aria-hidden="true" /><span><strong>Une équipe proche de vous</strong><small>Découvrir Litus {isSarthe ? 'au Mans' : 'à Lorient'}</small></span><ArrowRight size={15} aria-hidden="true" /></Link>}
          <div className="blog-reading-expertises"><h2>Nos expertises</h2><Link href="/seo-local">Référencement local <ArrowRight size={14} aria-hidden="true" /></Link><Link href="/creation-site-internet">Création de site internet <ArrowRight size={14} aria-hidden="true" /></Link><Link href="/google-ads">Google Ads <ArrowRight size={14} aria-hidden="true" /></Link></div>
        </div></aside>
      </div>
      {data.relatedArticles && data.relatedArticles.length > 0 && <section className="blog-reading-related" aria-labelledby="related-articles-title"><div className="blog-reading-related-heading"><h2 id="related-articles-title">Pour poursuivre votre lecture.</h2><Link href="/blog">Tous les articles <ArrowRight size={16} aria-hidden="true" /></Link></div><div>{data.relatedArticles.map(article => <Link key={article.slug} href={`/blog/${article.slug}`} className="blog-reading-related-card">{article.coverImage && <Image src={article.coverImage} alt="" width={650} height={330} sizes="(max-width: 639px) 100vw, 33vw" unoptimized={!article.coverImage.startsWith('/')} />}<h3>{article.title}</h3>{article.excerpt && <p>{article.excerpt}</p>}<span>Lire l’article <ArrowRight size={15} aria-hidden="true" /></span></Link>)}</div></section>}
    </div>
  </div>
}
