'use server'

import { prisma } from '@/lib/database_final'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

// Schema validation
const ProjectSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    description: z.string().min(1, "La description est requise"),
    categories: z.string().min(1, "Les catégories sont requises"), // JSON array string
    imageUrl: z.string().min(1, "L'URL de l'image est requise"),
    link: z.string().optional(),
    stats: z.string().default('[]'), // JSON string
    tags: z.string().default('[]'), // JSON string
    featured: z.boolean().default(false),
})

export async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: [
                { order: 'asc' },
                { createdAt: 'desc' }
            ],
        })
        return { success: true, data: projects }
    } catch (error: any) {
        console.error('Detailed DB Error:', error)
        return { success: false, error: 'DB Error: ' + (error?.message || String(error)) }
    }
}

export async function getFeaturedProjects() {
    try {
        const projects = await prisma.project.findMany({
            where: { featured: true },
            orderBy: { createdAt: 'desc' },
            take: 6,
        })
        return { success: true, data: projects }
    } catch (error) {
        return { success: false, error: 'Erreur lors du chargement des projets mis en avant' }
    }
}

export async function getProjectById(id: string) {
    try {
        const project = await prisma.project.findUnique({
            where: { id },
        })
        return { success: true, data: project }
    } catch (error) {
        return { success: false, error: 'Erreur lors du chargement du projet' }
    }
}

export async function createProject(prevState: any, formData: FormData) {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Non autorisé' }

    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
        categories: formData.get('categories'), // JSON array string
        imageUrl: formData.get('imageUrl'),
        link: formData.get('link'),
        stats: formData.get('stats'),
        tags: formData.get('tags'),
        featured: formData.get('featured') === 'on',
    }

    try {
        const validatedData = ProjectSchema.parse(rawData)

        await prisma.project.create({
            data: validatedData,
        })

        revalidatePath('/admin/portfolio')
        revalidatePath('/realisations')
        revalidatePath('/') // Revalidate home/services if displayed there

        return { success: true, message: 'Projet créé avec succès' }
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erreur lors de la création du projet' }
    }
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Non autorisé' }

    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
        categories: formData.get('categories'), // JSON array string
        imageUrl: formData.get('imageUrl'),
        link: formData.get('link'),
        stats: formData.get('stats'),
        tags: formData.get('tags'),
        featured: formData.get('featured') === 'on',
    }

    try {
        const validatedData = ProjectSchema.parse(rawData)

        await prisma.project.update({
            where: { id },
            data: validatedData,
        })

        revalidatePath('/admin/portfolio')
        revalidatePath('/realisations')
        revalidatePath('/')

        return { success: true, message: 'Projet mis à jour avec succès' }
    } catch (error) {
        console.error(error)
        return { success: false, error: 'Erreur lors de la mise à jour' }
    }
}

export async function deleteProject(id: string) {
    const session = await auth()
    if (!session?.user) return { success: false, error: 'Non autorisé' }

    try {
        await prisma.project.delete({
            where: { id },
        })

        revalidatePath('/admin/portfolio')
        revalidatePath('/realisations')
        return { success: true, message: 'Projet supprimé' }
    } catch (error) {
        return { success: false, error: 'Erreur lors de la suppression' }
    }
}
