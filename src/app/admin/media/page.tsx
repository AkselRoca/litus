'use client'

import { useState, useEffect, useCallback } from 'react'
import { Upload, Trash2, Copy, Check, X, Image as ImageIcon, Loader2, RefreshCw, Edit3 } from 'lucide-react'

interface Media {
    id: string
    publicId: string
    url: string
    filename: string
    alt: string | null
    width: number | null
    height: number | null
    format: string | null
    bytes: number | null
    folder: string
    createdAt: string
}

export default function MediaPage() {
    const [media, setMedia] = useState<Media[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [dragOver, setDragOver] = useState(false)
    const [migrating, setMigrating] = useState(false)
    const [editingFilename, setEditingFilename] = useState<string | null>(null)
    const [newFilename, setNewFilename] = useState('')

    // Charger les médias
    const loadMedia = useCallback(async () => {
        try {
            const res = await fetch('/api/admin/media')
            const data = await res.json()
            if (data.success) {
                setMedia(data.data)
            }
        } catch (error) {
            console.error('Error loading media:', error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadMedia()
    }, [loadMedia])

    // Upload de fichier
    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return

        setUploading(true)
        try {
            for (const file of Array.from(files)) {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('folder', 'litus')

                const res = await fetch('/api/admin/media', {
                    method: 'POST',
                    body: formData,
                })
                const data = await res.json()
                if (data.success) {
                    setMedia(prev => [data.data, ...prev])
                }
            }
        } catch (error) {
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }

    // Supprimer un média
    const handleDelete = async (id: string) => {
        if (!confirm('Supprimer cette image ?')) return

        try {
            const res = await fetch(`/api/admin/media/${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                setMedia(prev => prev.filter(m => m.id !== id))
                if (selectedMedia?.id === id) setSelectedMedia(null)
            }
        } catch (error) {
            console.error('Delete error:', error)
        }
    }

    // Mettre à jour le alt text
    const handleUpdateAlt = async (id: string, alt: string) => {
        try {
            const res = await fetch(`/api/admin/media/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ alt }),
            })
            const data = await res.json()
            if (data.success) {
                setMedia(prev => prev.map(m => m.id === id ? { ...m, alt } : m))
                if (selectedMedia?.id === id) setSelectedMedia({ ...selectedMedia, alt })
            }
        } catch (error) {
            console.error('Update error:', error)
        }
    }

    // Renommer un fichier
    const handleRename = async (id: string, newName: string) => {
        try {
            const res = await fetch(`/api/admin/media/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: newName }),
            })
            const data = await res.json()
            if (data.success) {
                setMedia(prev => prev.map(m => m.id === id ? { ...m, filename: newName } : m))
                if (selectedMedia?.id === id) setSelectedMedia({ ...selectedMedia, filename: newName })
                setEditingFilename(null)
            }
        } catch (error) {
            console.error('Rename error:', error)
        }
    }

    // Migrer les images du portfolio
    const handleMigrate = async () => {
        if (!confirm('Migrer toutes les images du portfolio vers Cloudinary ?')) return

        setMigrating(true)
        try {
            const res = await fetch('/api/admin/media/migrate-portfolio', { method: 'POST' })
            const data = await res.json()
            if (data.success) {
                alert(data.message)
                loadMedia() // Recharger les médias
            }
        } catch (error) {
            console.error('Migration error:', error)
            alert('Erreur lors de la migration')
        } finally {
            setMigrating(false)
        }
    }

    // Générer l'URL optimisée (avec f_auto, q_auto)
    const getOptimizedUrl = (url: string) => {
        return url.replace('/upload/', '/upload/f_auto,q_auto/')
    }

    // Copier l'URL
    const copyUrl = (url: string, id: string) => {
        navigator.clipboard.writeText(getOptimizedUrl(url))
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    // Formater la taille
    const formatBytes = (bytes: number | null) => {
        if (!bytes) return '-'
        if (bytes < 1024) return `${bytes} B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    }

    // Drag & Drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(true)
    }

    const handleDragLeave = () => {
        setDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        handleUpload(e.dataTransfer.files)
    }

    return (
        <div className="relative min-h-[calc(100vh-200px)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Médias</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {media.length} image{media.length > 1 ? 's' : ''} •
                        Cloudinary (AVIF/WebP auto, compression)
                    </p>
                </div>
                <button
                    onClick={handleMigrate}
                    disabled={migrating}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 rounded-xl text-white font-medium text-sm transition-colors w-full sm:w-auto"
                >
                    {migrating ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <RefreshCw className="w-4 h-4" />
                    )}
                    Migrer Portfolio
                </button>
            </div>

            {/* Zone d'upload */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    border-2 border-dashed rounded-2xl p-8 mb-8 text-center transition-all cursor-pointer bg-white dark:bg-[#111]
                    ${dragOver
                        ? 'border-primary bg-primary/5 dark:bg-primary/5'
                        : 'border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5'
                    }
                `}
            >
                <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleUpload(e.target.files)}
                    className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                    {uploading ? (
                        <div className="flex flex-col items-center gap-3 py-4">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Upload en cours...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 py-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                <Upload className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-gray-600 dark:text-gray-300 font-medium">
                                Glissez vos images ici ou <span className="text-primary hover:underline">cliquez pour upload</span>
                            </span>
                            <span className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                                JPG, PNG, WebP • Max 10MB
                            </span>
                        </div>
                    )}
                </label>
            </div>

            {/* Grille des médias */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : media.length === 0 ? (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-8 h-8 opacity-30" />
                    </div>
                    <p className="text-sm">Aucun média uploadé</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {media.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedMedia(item)}
                            className={`
                                relative group rounded-xl overflow-hidden bg-white dark:bg-[#111] border cursor-pointer
                                transition-all hover:border-primary/50
                                ${selectedMedia?.id === item.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200 dark:border-white/10'}
                            `}
                        >
                            <div className="aspect-square bg-gray-100 dark:bg-black/50">
                                <img
                                    src={item.url}
                                    alt={item.alt || item.filename}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-white text-xs font-medium truncate mb-0.5">{item.filename}</p>
                                    <p className="text-gray-300 text-[11px]">{formatBytes(item.bytes)}</p>
                                </div>
                            </div>
                            {/* Actions rapides */}
                            <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        copyUrl(item.url, item.id)
                                    }}
                                    className="p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-lg hover:bg-gray-900 transition-colors"
                                    title="Copier l'URL"
                                >
                                    {copiedId === item.id ? (
                                        <Check className="w-3.5 h-3.5 text-green-400" />
                                    ) : (
                                        <Copy className="w-3.5 h-3.5 text-white" />
                                    )}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(item.id)
                                    }}
                                    className="p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-lg hover:bg-red-500/90 transition-colors border border-transparent hover:border-red-500"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-3.5 h-3.5 text-white" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Panel de détails - Overlay en mobile/tablet, Side panel en desktop */}
            {selectedMedia && (
                <>
                    {/* Overlay cliquable mobile */}
                    <div 
                        className="fixed inset-0 bg-gray-900/20 dark:bg-black/40 backdrop-blur-sm z-40 xl:hidden"
                        onClick={() => setSelectedMedia(null)}
                    />
                    
                    <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-white dark:bg-[#111] border-l border-gray-200 dark:border-white/10 p-6 overflow-y-auto z-50 shadow-2xl xl:shadow-none transition-transform duration-300">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Détails de l'image</h2>
                            <button
                                onClick={() => setSelectedMedia(null)}
                                className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Preview */}
                            <div className="rounded-xl overflow-hidden bg-gray-100 dark:bg-black/50 border border-gray-200 dark:border-white/10 aspect-square flex items-center justify-center">
                                <img
                                    src={selectedMedia.url}
                                    alt={selectedMedia.alt || selectedMedia.filename}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            {/* Infos */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1">Nom du fichier</label>
                                    {editingFilename === selectedMedia.id ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={newFilename}
                                                onChange={(e) => setNewFilename(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') handleRename(selectedMedia.id, newFilename)
                                                    if (e.key === 'Escape') setEditingFilename(null)
                                                }}
                                                onBlur={() => {
                                                    if (newFilename.trim() && newFilename !== selectedMedia.filename) {
                                                        handleRename(selectedMedia.id, newFilename)
                                                    } else {
                                                        setEditingFilename(null)
                                                    }
                                                }}
                                                autoFocus
                                                className="flex-1 px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-primary rounded-lg text-gray-900 dark:text-white text-sm focus:ring-1 focus:ring-primary outline-none"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 group/filename">
                                            <p className="text-gray-900 dark:text-white text-sm font-medium truncate flex-1">{selectedMedia.filename}</p>
                                            <button
                                                onClick={() => {
                                                    setEditingFilename(selectedMedia.id)
                                                    setNewFilename(selectedMedia.filename)
                                                }}
                                                className="p-1 rounded-md text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-white/10 opacity-0 group-hover/filename:opacity-100 transition-all"
                                                title="Renommer"
                                            >
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                                        <label className="block text-gray-500 dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">Dimensions</label>
                                        <p className="text-gray-900 dark:text-white text-sm font-semibold">
                                            {selectedMedia.width} × {selectedMedia.height} <span className="text-xs font-normal text-gray-500">px</span>
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/5">
                                        <label className="block text-gray-500 dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-1">Poids & Format</label>
                                        <p className="text-gray-900 dark:text-white text-sm font-semibold">
                                            {formatBytes(selectedMedia.bytes)}
                                        </p>
                                        <p className="text-[10px] text-green-600 dark:text-green-400 mt-0.5">Servi en WebP/AVIF auto</p>
                                    </div>
                                </div>

                                {/* Alt text editable */}
                                <div>
                                    <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">Texte alternatif (SEO)</label>
                                    <input
                                        type="text"
                                        value={selectedMedia.alt || ''}
                                        onChange={(e) => handleUpdateAlt(selectedMedia.id, e.target.value)}
                                        placeholder="Description de l'image pour le SEO..."
                                        className="w-full px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
                                    />
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">Indispensable pour l'accessibilité et le référencement naturel.</p>
                                </div>

                                {/* URL à copier */}
                                <div className="pt-2">
                                    <label className="block text-gray-500 dark:text-gray-400 text-xs font-medium mb-1.5">URL optimisée (WebP/AVIF auto)</label>
                                    <div className="flex gap-2 relative">
                                        <input
                                            type="text"
                                            value={getOptimizedUrl(selectedMedia.url)}
                                            readOnly
                                            className="w-full pl-3 pr-10 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white text-xs font-mono focus:outline-none"
                                        />
                                        <button
                                            onClick={() => copyUrl(selectedMedia.url, selectedMedia.id)}
                                            className={`absolute right-1 top-1 bottom-1 px-3 rounded-lg flex items-center justify-center transition-colors ${copiedId === selectedMedia.id ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-primary text-white hover:bg-primary/90'}`}
                                            title="Copier l'URL"
                                        >
                                            {copiedId === selectedMedia.id ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Supprimer */}
                                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/10">
                                    <button
                                        onClick={() => handleDelete(selectedMedia.id)}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 font-medium rounded-xl transition-colors text-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Supprimer ce média
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
