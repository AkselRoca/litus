'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
// We might need a real Input component or just use standard HTML for admin to verify
import { Loader2, Plus, X, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createProject, updateProject } from '@/actions/portfolio'

interface ProjectFormProps {
    project?: any // Type Project properly if possible, but any is fine for MVP admin
}

const AVAILABLE_CATEGORIES = [
    'Site Vitrine',
    'Site E-commerce',
    'Google Ads',
    'Référencement Naturel (SEO)',
    'Outil Métier / Application Web',
    'Identité Visuelle',
]

export function ProjectForm({ project }: ProjectFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    // Parsing initial JSON data
    const initialStats = project?.stats ? JSON.parse(project.stats) : []
    const initialTags = project?.tags ? JSON.parse(project.tags) : []
    const initialCategories = project?.categories ? JSON.parse(project.categories) : []

    const [stats, setStats] = useState<{ label: string, value: string }[]>(initialStats)
    const [tags, setTags] = useState<string[]>(initialTags)
    const [categories, setCategories] = useState<string[]>(initialCategories)
    const [tagInput, setTagInput] = useState('')
    const [previewImage, setPreviewImage] = useState(project?.imageUrl || '')

    const handleCategoryToggle = (category: string) => {
        if (categories.includes(category)) {
            setCategories(categories.filter(c => c !== category))
        } else {
            setCategories([...categories, category])
        }
    }

    const handleAddStat = () => {
        setStats([...stats, { label: '', value: '' }])
    }

    const handleRemoveStat = (index: number) => {
        setStats(stats.filter((_, i) => i !== index))
    }

    const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
        const newStats = [...stats]
        newStats[index][field] = value
        setStats(newStats)
    }

    const handleAddTag = () => {
        if (tagInput.trim()) {
            setTags([...tags, tagInput.trim()])
            setTagInput('')
        }
    }

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        if (categories.length === 0) {
            setError('Veuillez sélectionner au moins une catégorie')
            setIsLoading(false)
            return
        }

        const formData = new FormData(e.currentTarget)
        formData.set('stats', JSON.stringify(stats))
        formData.set('tags', JSON.stringify(tags))
        formData.set('categories', JSON.stringify(categories))

        // Handle creating vs updating
        let result
        if (project) {
            result = await updateProject(project.id, null, formData)
        } else {
            result = await createProject(null, formData)
        }

        if (result.success) {
            router.push('/admin/portfolio')
            router.refresh()
        } else {
            setError(result.error || 'Une erreur est survenue')
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Main Info */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Titre du projet</label>
                        <input
                            name="title"
                            defaultValue={project?.title}
                            required
                            className="w-full bg-gray-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="Ex: Japan Hunter"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Catégories (multi-sélection)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {AVAILABLE_CATEGORIES.map((cat) => (
                                <label
                                    key={cat}
                                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${categories.includes(cat)
                                        ? 'bg-primary/20 border-primary text-white'
                                        : 'bg-gray-900 border-white/10 text-gray-400 hover:border-white/30'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={categories.includes(cat)}
                                        onChange={() => handleCategoryToggle(cat)}
                                        className="sr-only"
                                    />
                                    <span className={`w-4 h-4 rounded border flex items-center justify-center ${categories.includes(cat) ? 'bg-primary border-primary' : 'border-gray-500'
                                        }`}>
                                        {categories.includes(cat) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </span>
                                    <span className="text-sm">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Description courte</label>
                        <textarea
                            name="description"
                            defaultValue={project?.description}
                            required
                            rows={4}
                            className="w-full bg-gray-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                            placeholder="Une brève description du projet et du défi..."
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="featured"
                            id="featured"
                            defaultChecked={project?.featured}
                            className="w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
                        />
                        <label htmlFor="featured" className="text-sm font-medium text-gray-300 select-none">
                            Mettre en avant (Home / Services)
                        </label>
                    </div>
                </div>

                {/* Media & Link */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">URL de l'image</label>
                        <div className="flex gap-2">
                            <input
                                name="imageUrl"
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                                required
                                className="flex-1 bg-gray-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="/realisations/image.jpg"
                            />
                        </div>
                        {previewImage && (
                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/10 mt-2 bg-gray-800">
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Lien du site (Optionnel)</label>
                        <input
                            name="link"
                            defaultValue={project?.link || ''}
                            type="url"
                            className="w-full bg-gray-900 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                            placeholder="https://..."
                        />
                    </div>
                </div>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Stats */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-gray-300">Statistiques (ex: ROI, Traffic)</label>
                        <button
                            type="button"
                            onClick={handleAddStat}
                            className="text-xs text-primary hover:text-white flex items-center gap-1 transition-colors"
                        >
                            <Plus className="w-3 h-3" /> Ajouter
                        </button>
                    </div>

                    <div className="space-y-3">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex gap-2 items-start">
                                <input
                                    className="w-1/3 bg-gray-900 border border-white/10 rounded-lg p-2 text-sm text-white"
                                    placeholder="Label (ex: ROI)"
                                    value={stat.label}
                                    onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                                />
                                <input
                                    className="flex-1 bg-gray-900 border border-white/10 rounded-lg p-2 text-sm text-white"
                                    placeholder="Valeur (ex: +150%)"
                                    value={stat.value}
                                    onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                                />
                                <button type="button" onClick={() => handleRemoveStat(idx)} className="p-2 text-gray-500 hover:text-red-500">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                        {stats.length === 0 && <p className="text-xs text-gray-500 italic">Aucune statistique ajoutée.</p>}
                    </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-300">Tags / Technologies</label>
                    <div className="flex gap-2">
                        <input
                            className="flex-1 bg-gray-900 border border-white/10 rounded-lg p-2 text-sm text-white"
                            placeholder="Ajouter un tag..."
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleAddTag()
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 rounded-lg text-sm"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/20">
                                {tag}
                                <button type="button" onClick={() => handleRemoveTag(idx)} className="hover:text-white">
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
                <Button type="button" variant="ghost" className="mr-4" onClick={() => router.back()}>
                    Annuler
                </Button>
                <Button type="submit" isLoading={isLoading} className='text-gray-900 dark:text-white'>
                    {project ? 'Mettre à jour' : 'Créer le projet'}
                </Button>
            </div>
        </form>
    )
}
