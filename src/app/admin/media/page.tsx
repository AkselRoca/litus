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

    // Copier l'URL
    const copyUrl = (url: string, id: string) => {
        navigator.clipboard.writeText(url)
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
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Médias</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        {media.length} image{media.length > 1 ? 's' : ''} •
                        Cloudinary (AVIF/WebP auto, compression)
                    </p>
                </div>
                <button
                    onClick={handleMigrate}
                    disabled={migrating}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 rounded-lg text-white transition-colors"
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
                    border-2 border-dashed rounded-xl p-8 mb-8 text-center transition-all cursor-pointer
                    ${dragOver
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
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
                <label htmlFor="file-upload" className="cursor-pointer">
                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                            <span className="text-gray-400">Upload en cours...</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <Upload className="w-10 h-10 text-gray-500" />
                            <span className="text-gray-400">
                                Glissez vos images ici ou <span className="text-orange-500">cliquez pour upload</span>
                            </span>
                            <span className="text-gray-600 text-xs">
                                JPG, PNG, WebP • Max 10MB
                            </span>
                        </div>
                    )}
                </label>
            </div>

            {/* Grille des médias */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
            ) : media.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p>Aucun média uploadé</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {media.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedMedia(item)}
                            className={`
                                relative group rounded-xl overflow-hidden bg-gray-900 border cursor-pointer
                                transition-all hover:border-orange-500/50
                                ${selectedMedia?.id === item.id ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-gray-800'}
                            `}
                        >
                            <div className="aspect-square">
                                <img
                                    src={item.url}
                                    alt={item.alt || item.filename}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                    <p className="text-white text-xs truncate">{item.filename}</p>
                                    <p className="text-gray-400 text-xs">{formatBytes(item.bytes)}</p>
                                </div>
                            </div>
                            {/* Actions rapides */}
                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        copyUrl(item.url, item.id)
                                    }}
                                    className="p-1.5 bg-black/70 rounded-lg hover:bg-black transition-colors"
                                    title="Copier l'URL"
                                >
                                    {copiedId === item.id ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4 text-white" />
                                    )}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleDelete(item.id)
                                    }}
                                    className="p-1.5 bg-black/70 rounded-lg hover:bg-red-500/50 transition-colors"
                                    title="Supprimer"
                                >
                                    <Trash2 className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Panel de détails */}
            {selectedMedia && (
                <div className="fixed inset-y-0 right-0 w-96 bg-gray-950 border-l border-gray-800 p-6 overflow-y-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Détails</h2>
                        <button
                            onClick={() => setSelectedMedia(null)}
                            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Preview */}
                        <div className="rounded-xl overflow-hidden bg-gray-900">
                            <img
                                src={selectedMedia.url}
                                alt={selectedMedia.alt || selectedMedia.filename}
                                className="w-full"
                            />
                        </div>

                        {/* Infos */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Nom du fichier</label>
                                <p className="text-white text-sm">{selectedMedia.filename}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Dimensions</label>
                                <p className="text-white text-sm">
                                    {selectedMedia.width} × {selectedMedia.height} px
                                </p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Taille</label>
                                <p className="text-white text-sm">{formatBytes(selectedMedia.bytes)}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Format</label>
                                <p className="text-white text-sm uppercase">{selectedMedia.format}</p>
                            </div>

                            {/* Alt text editable */}
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">Texte alternatif (Alt)</label>
                                <input
                                    type="text"
                                    value={selectedMedia.alt || ''}
                                    onChange={(e) => handleUpdateAlt(selectedMedia.id, e.target.value)}
                                    placeholder="Description de l'image..."
                                    className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-sm focus:border-orange-500 focus:outline-none"
                                />
                            </div>

                            {/* URL à copier */}
                            <div>
                                <label className="block text-gray-400 text-xs mb-1">URL de l'image</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={selectedMedia.url}
                                        readOnly
                                        className="flex-1 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white text-xs focus:outline-none"
                                    />
                                    <button
                                        onClick={() => copyUrl(selectedMedia.url, selectedMedia.id)}
                                        className="px-3 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
                                    >
                                        {copiedId === selectedMedia.id ? (
                                            <Check className="w-4 h-4 text-white" />
                                        ) : (
                                            <Copy className="w-4 h-4 text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Supprimer */}
                            <button
                                onClick={() => handleDelete(selectedMedia.id)}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
