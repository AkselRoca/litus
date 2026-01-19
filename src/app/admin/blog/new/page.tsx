'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react'

const categories = ['SEO', 'Stratégie', 'Site Web', 'Google Ads', 'E-commerce']

export default function NewArticlePage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'SEO',
        metaTitle: '',
        metaDescription: '',
        published: false,
    })

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
            metaTitle: title,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // TODO: Save to database via API
        console.log('Saving article:', formData)

        // Simulate save
        await new Promise(resolve => setTimeout(resolve, 1000))

        setIsLoading(false)
        router.push('/admin/blog')
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/blog"
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Nouvel article</h1>
                        <p className="text-gray-400">Créer un nouvel article de blog</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <Eye className="w-5 h-5" />
                        Prévisualiser
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-primary to-orange-500 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        Enregistrer
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title */}
                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <label className="block text-white font-medium mb-2">
                                Titre de l'article
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={handleTitleChange}
                                placeholder="Ex: Guide complet du SEO local en 2024"
                                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        {/* Excerpt */}
                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <label className="block text-white font-medium mb-2">
                                Extrait
                            </label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="Résumé court de l'article (affiché sur la page liste)"
                                rows={3}
                                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            />
                        </div>

                        {/* Content */}
                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <label className="block text-white font-medium mb-2">
                                Contenu (Markdown)
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="## Introduction

Écrivez votre article en Markdown...

### Section 1

Contenu de la section...

- Point 1
- Point 2
- Point 3"
                                rows={20}
                                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
                            />
                            <p className="text-gray-500 text-sm mt-2">
                                Supporte le format Markdown (titres, listes, gras, liens...)
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Publish Settings */}
                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <h2 className="text-white font-medium mb-4">Publication</h2>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/20 bg-transparent text-primary focus:ring-primary focus:ring-offset-0"
                                />
                                <span className="text-gray-300">Publier immédiatement</span>
                            </label>
                        </div>

                        {/* Category */}
                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <h2 className="text-white font-medium mb-4">Catégorie</h2>

                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-gray-900">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* SEO */}
                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <h2 className="text-white font-medium mb-4">SEO</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Slug URL</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                        className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                    <p className="text-gray-500 text-xs mt-1">{formData.metaTitle.length}/60 caractères</p>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Meta Description</label>
                                    <textarea
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                    />
                                    <p className="text-gray-500 text-xs mt-1">{formData.metaDescription.length}/160 caractères</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
