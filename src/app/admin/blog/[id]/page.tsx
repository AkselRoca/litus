'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Save, Eye, Trash2, Loader2 } from 'lucide-react'

const categories = ['SEO', 'Stratégie', 'Site Web', 'Google Ads', 'E-commerce']

// Mock data - will be replaced with DB fetch
const mockArticle = {
    id: '1',
    title: 'Guide Complet du SEO Local en 2024',
    slug: 'seo-local-guide-2024',
    excerpt: 'Tout ce que vous devez savoir pour apparaître en première page Google.',
    content: `## Qu'est-ce que le SEO Local ?\n\nLe SEO local est l'ensemble des techniques permettant d'optimiser votre visibilité sur les moteurs de recherche pour les requêtes géolocalisées.\n\n### Les 3 Piliers du SEO Local\n\n1. **Google Business Profile**\n2. **Optimisation On-Site**\n3. **Citations et Backlinks Locaux**`,
    category: 'SEO',
    metaTitle: 'Guide Complet du SEO Local en 2024 | Litus',
    metaDescription: 'Tout ce que vous devez savoir pour apparaître en première page Google dans votre zone géographique.',
    published: true,
}

export default function EditArticlePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState(mockArticle)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // TODO: Save to database via API
        console.log('Updating article:', formData)

        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/blog"
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Modifier l'article</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">ID: <span className="font-mono bg-gray-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-xs">{formData.id}</span></p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-transparent border border-red-200 dark:border-red-400/30 rounded-xl dark:hover:bg-red-400/10 transition-colors text-sm font-medium"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Supprimer</span>
                    </button>
                    <Link
                        href={`/blog/${formData.slug}`}
                        target="_blank"
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 font-medium text-sm border border-gray-200 dark:border-white/20 rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none"
                    >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Voir l'article</span>
                    </Link>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="flex items-center gap-2 px-4 sm:px-6 py-2 bg-primary text-white font-medium text-sm rounded-xl hover:bg-primary/90 disabled:opacity-50 transition-colors shadow-sm shadow-primary/20"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Enregistrer
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Titre *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm"
                            />
                        </div>

                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Extrait *</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none text-sm"
                            />
                        </div>

                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Contenu (Markdown) *
                                </label>
                                <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">Guide Markdown</a>
                            </div>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={24}
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-y font-mono text-sm leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Publication</h2>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.published}
                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        className="w-5 h-5 rounded border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors"
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Article publié</div>
                                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">Visible par tout le monde sur le site.</div>
                                </div>
                            </label>
                        </div>

                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Catégorie</h2>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-white dark:bg-gray-900">{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-white dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-white/10 p-6 shadow-sm dark:shadow-none">
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-white/5 pb-2">Optimisation SEO</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-600 dark:text-gray-400 text-xs font-medium mb-1.5">Slug URL</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors font-mono"
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1.5">
                                        <label className="block text-gray-600 dark:text-gray-400 text-xs font-medium">Meta Title</label>
                                        <span className={`text-[10px] ${formData.metaTitle.length > 60 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>{formData.metaTitle.length}/60</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                        className={`w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border ${formData.metaTitle.length > 60 ? 'border-red-300 dark:border-red-500/50' : 'border-gray-200 dark:border-white/10'} rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors`}
                                    />
                                </div>
                                <div>
                                    <div className="flex justify-between items-end mb-1.5">
                                        <label className="block text-gray-600 dark:text-gray-400 text-xs font-medium">Meta Description</label>
                                        <span className={`text-[10px] ${formData.metaDescription.length > 160 ? 'text-red-500 font-medium' : 'text-gray-400'}`}>{formData.metaDescription.length}/160</span>
                                    </div>
                                    <textarea
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                        rows={4}
                                        className={`w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border ${formData.metaDescription.length > 160 ? 'border-red-300 dark:border-red-500/50' : 'border-gray-200 dark:border-white/10'} rounded-lg text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-colors resize-none leading-snug`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
