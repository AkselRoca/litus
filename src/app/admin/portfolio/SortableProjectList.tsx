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
import { GripVertical, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { deleteProject } from '@/actions/portfolio'
import { useRouter } from 'next/navigation'

type Project = {
    id: string
    title: string
    categories?: string // JSON field
    imageUrl: string
    order?: number
    featured?: boolean
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
                alert('Ordre sauvegardé !')
                router.refresh()
            } else {
                alert('Erreur lors de la sauvegarde.')
            }
        } catch (error) {
            console.error(error)
            alert('Erreur lors de la sauvegarde.')
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return
        await deleteProject(id)
        setItems(items.filter(item => item.id !== id))
        router.refresh()
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                Aucun projet pour le moment.
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <button
                    onClick={saveOrder}
                    disabled={isSaving}
                    className="bg-primary hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
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
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}

function SortableItem({ id, project, onDelete }: { id: string, project: Project, onDelete: (id: string) => void }) {
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
            className="flex items-center gap-4 bg-gray-800 border border-white/10 p-4 rounded-xl hover:border-white/20 transition-colors group"
        >
            <div {...attributes} {...listeners} className="cursor-grab hover:text-white text-gray-500">
                <GripVertical className="w-5 h-5" />
            </div>

            <div className="w-16 h-12 relative rounded overflow-hidden bg-gray-700 shrink-0">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
                <div className="font-medium text-white">{project.title}</div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/10">{getFirstCategory()}</span>
                    {project.featured && <span className="text-green-400">★ Mis en avant</span>}
                </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                    href={`/admin/portfolio/${project.id}`}
                    className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                >
                    <Pencil className="w-4 h-4" />
                </Link>
                <button
                    onClick={() => onDelete(project.id)}
                    className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

