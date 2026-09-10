'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, CheckCheck, MapPin, Search } from 'lucide-react'
import { ServiceHero } from '@/components/sections/services/ServiceHero'
import './blog-hero.css'

export interface BlogHeroArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  coverImage: string
  readTimeMinutes: number
}

export function BlogHero({ article }: { article?: BlogHeroArticle }) {
  const sceneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = sceneRef.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!scene || motion.matches || !('IntersectionObserver' in window)) return

    // The server render stays readable; animation is an optional, one-time enhancement.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      scene.dataset.entered = 'true'
      observer.disconnect()
    }, { threshold: 0.25 })
    observer.observe(scene)

    const onMotionChange = () => {
      if (motion.matches) {
        delete scene.dataset.entered
        observer.disconnect()
      }
    }
    motion.addEventListener('change', onMotionChange)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', onMotionChange)
    }
  }, [])

  return (
    <div className="blog-hero">
      <ServiceHero
        id="blog-hero-title"
        eyebrow="Litus Inside"
        eyebrowBadge
        title={'Explorez nos\nstratégies digitales.'}
        accent="stratégies digitales."
        description="SEO local, création de sites internet et Google Ads : nos conseils pour développer la visibilité de votre entreprise à Lorient et au Mans. Des explications concrètes pour faire les bons choix et avancer dans votre projet."
        showActions={false}
        proof={<div className="service-hero-assurances">
          <span><CheckCheck aria-hidden="true" />Conseils concrets</span>
          <span><MapPin aria-hidden="true" />Expertise locale</span>
          <span><BookOpen aria-hidden="true" />Méthodes expliquées</span>
        </div>}
        visualBackground="/hero-studio-editorial.webp"
        visual={<div className="blog-hero-scene" ref={sceneRef}>
          {article ? <Link className="blog-hero-article" href={`/blog/${article.slug}`} aria-labelledby="blog-featured-title">
            <div className="blog-hero-cover">
              <Image src={article.coverImage} alt="" fill priority unoptimized={article.coverImage.startsWith('http')} sizes="(max-width: 560px) calc(100vw - 56px), (max-width: 850px) 500px, 36vw" />
              <span className="blog-hero-category">{article.category}</span>
            </div>
            <div className="blog-hero-article-copy">
              <p className="blog-hero-article-meta">À la une <span aria-hidden="true">·</span> {article.readTimeMinutes} min de lecture</p>
              <h2 id="blog-featured-title">{article.title}</h2>
              <p className="blog-hero-excerpt">{article.excerpt}</p>
              <span className="blog-hero-read">Lire l’article <ArrowUpRight size={17} aria-hidden="true" /></span>
            </div>
          </Link> : <div className="blog-hero-article blog-hero-unavailable">
            <BookOpen size={32} strokeWidth={1.5} aria-hidden="true" />
            <p className="blog-hero-article-meta">Litus Inside</p>
            <h2>Nos conseils pour vos projets web</h2>
            <p>Nos articles sont momentanément indisponibles. Revenez un peu plus tard pour découvrir nos conseils sur la visibilité de votre entreprise.</p>
          </div>}
          <div className="blog-hero-local blog-hero-lorient">
            <span className="blog-hero-local-icon"><MapPin size={17} aria-hidden="true" /></span>
            <p><strong>Lorient</strong><span>Morbihan</span></p>
          </div>
          <div className="blog-hero-local blog-hero-lemans">
            <span className="blog-hero-local-icon"><MapPin size={17} aria-hidden="true" /></span>
            <p><strong>Le Mans</strong><span>Sarthe</span></p>
          </div>
          <div className="blog-hero-topics">
            <Search size={22} strokeWidth={1.65} aria-hidden="true" />
            <p><span>Des clés pour votre activité</span><strong>SEO local, sites web<br /> et Google Ads</strong></p>
          </div>
        </div>}
      />
    </div>
  )
}
