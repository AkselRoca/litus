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
    content: `## Qu'est-ce que le SEO Local ?

Le SEO local est l'ensemble des techniques permettant d'optimiser votre visibilité sur les moteurs de recherche pour les requêtes géolocalisées.

### Les 3 Piliers du SEO Local

1. **Google Business Profile**
2. **Optimisation On-Site**
3. **Citations et Backlinks Locaux**`,
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
                        <h1 className="text-3xl font-bold text-white">Modifier l'article</h1>
                        <p className="text-gray-400">ID: {formData.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 border border-red-400/50 rounded-xl hover:bg-red-400/10 transition-colors"
                    >
                        <Trash2 className="w-5 h-5" />
                        Supprimer
                    </button>
                    <Link
                        href={`/blog/${formData.slug}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
                    >
                        <Eye className="w-5 h-5" />
                        Voir
                    </Link>
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
                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <label className="block text-white font-medium mb-2">Titre</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <label className="block text-white font-medium mb-2">Extrait</label>
                            <textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            />
                        </div>

                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <label className="block text-white font-medium mb-2">Contenu (Markdown)</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                rows={20}
                                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
                            />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <h2 className="text-white font-medium mb-4">Publication</h2>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.published}
                                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                    className="w-5 h-5 rounded border-white/20 bg-transparent text-primary"
                                />
                                <span className="text-gray-300">Article publié</span>
                            </label>
                        </div>

                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <h2 className="text-white font-medium mb-4">Catégorie</h2>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-gray-900 rounded-2xl border border-white/10 p-6">
                            <h2 className="text-white font-medium mb-4">SEO</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Slug URL</label>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        value={formData.metaTitle}
                                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                                        className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Meta Description</label>
                                    <textarea
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-lg text-white text-sm resize-none"
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
