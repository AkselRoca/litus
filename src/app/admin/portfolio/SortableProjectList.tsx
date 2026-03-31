'use client'

import { useState } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Pencil, Trash2, Loader2, Star, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Project = {
    id: string
    title: string
    categories?: string // JSON field
    imageUrl: string
    order?: number
    featured?: boolean
    visible?: boolean
}

export function SortableProjectList({ projects }: { projects: Project[] }) {
    const [items, setItems] = useState(projects)
    const [isSaving, setIsSaving] = useState(false)
    const router = useRouter()

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over?.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    async function saveOrder() {
        setIsSaving(true)
        const updates = items.map((project, index) => ({
            id: project.id,
            order: index
        }))

        try {
            const res = await fetch('/api/admin/portfolio/reorder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            })
            if (res.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return
        try {
            const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
            if (res.ok) {
                setItems(items.filter(item => item.id !== id))
                router.refresh()
            }
        } catch (error) {
            console.error('Delete error', error)
        }
    }

    async function handleToggleVisibility(id: string, currentVisible: boolean) {
        try {
            const res = await fetch(`/api/admin/portfolio/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ visible: !currentVisible })
            })
            if (res.ok) {
                setItems(items.map(item =>
                    item.id === id ? { ...item, visible: !currentVisible } : item
                ))
                router.refresh()
            }
        } catch (error) {
            console.error('Toggle visibility error', error)
        }
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400 text-sm">
                Aucun projet pour le moment.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <button
                    onClick={saveOrder}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {isSaving ? 'Sauvegarde...' : 'Sauvegarder l\'ordre'}
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-2">
                        {items.map((project) => (
                            <SortableItem
                                key={project.id}
                                id={project.id}
                                project={project}
                                onDelete={handleDelete}
                                onToggleVisibility={handleToggleVisibility}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}

function SortableItem({ id, project, onDelete, onToggleVisibility }: { id: string, project: Project, onDelete: (id: string) => void, onToggleVisibility: (id: string, visible: boolean) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const getFirstCategory = () => {
        try {
            return JSON.parse(project.categories || '[]')[0] || 'Sans catégorie'
        } catch {
            return 'Sans catégorie'
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`flex items-center gap-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3 rounded-xl hover:border-gray-300 dark:hover:border-white/20 transition-colors group ${project.visible === false ? 'opacity-50' : ''}`}
        >
            <div {...attributes} {...listeners} className="cursor-grab hover:text-gray-900 dark:hover:text-white text-gray-400 p-2">
                <GripVertical className="w-4 h-4" />
            </div>

            <div className="w-16 h-12 relative rounded-lg overflow-hidden bg-gray-200 dark:bg-white/10 shrink-0">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-white text-sm truncate">{project.title}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-white dark:bg-white/10 border border-gray-200 dark:border-transparent">{getFirstCategory()}</span>
                    {project.featured && <span className="text-green-600 dark:text-green-400 flex items-center gap-1 font-medium"><Star className="w-3 h-3 fill-current" /> Mis en avant</span>}
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                <button
                    onClick={() => onToggleVisibility(project.id, project.visible !== false)}
                    className={`p-2 rounded-lg transition-colors ${
                        project.visible !== false
                            ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10'
                            : 'text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                    }`}
                    title={project.visible !== false ? 'Visible — cliquer pour masquer' : 'Masqué — cliquer pour afficher'}
                >
                    {project.visible !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <Link
                    href={`/admin/portfolio/${project.id}`}
                    className="p-2 text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
                    title="Éditer"
                >
                    <Pencil className="w-4 h-4" />
                </Link>
                <button
                    onClick={() => onDelete(project.id)}
                    className="p-2 text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                    title="Supprimer"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
