'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Project = {
    id: string
    title: string
    categories: string // JSON array string
    imageUrl: string
    link?: string | null
    stats: string // JSON
    tags: string // JSON
    description: string
    featured: boolean
}

const CATEGORIES = ['Tous', 'Site Vitrine', 'E-commerce', 'Google Ads', 'SEO', 'Application Web', 'Identité Visuelle']

export function PortfolioGrid({ projects }: { projects: Project[] }) {
    const [selectedCategory, setSelectedCategory] = useState('Tous')

    const filteredProjects = projects.filter(p => {
        if (selectedCategory === 'Tous') return true
        try {
            const projectCategories = JSON.parse(p.categories) as string[]
            return projectCategories.includes(selectedCategory)
        } catch {
            return false
        }
    })

    return (
        <div className="space-y-12">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                            selectedCategory === cat
                                ? "bg-white text-black border-white shadow-lg scale-105"
                                : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
                <AnimatePresence>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                    Aucun projet dans cette catégorie pour le moment.
                </div>
            )}
        </div>
    )
}

function ProjectCard({ project }: { project: Project }) {
    let stats = []
    let tags = []
    let categories: string[] = []
    try {
        stats = JSON.parse(project.stats)
        tags = JSON.parse(project.tags)
        categories = JSON.parse(project.categories)
    } catch (e) { }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="group relative rounded-2xl overflow-hidden bg-gray-900 border border-white/10 aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
        >
            {/* Image Background */}
            <div className="absolute inset-0">
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            </div>

            {/* Content Content (Always visible on mobile, visible on hover desktop?) 
                Let's make a modern layout where info is at bottom.
            */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                {/* Top Badges */}
                <div className="absolute top-6 left-6 flex flex-wrap gap-1">
                    {categories.slice(0, 2).map((cat, i) => (
                        <span key={i} className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-black bg-white/90 backdrop-blur rounded-full">
                            {cat}
                        </span>
                    ))}
                    {categories.length > 2 && (
                        <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white bg-primary/80 backdrop-blur rounded-full">
                            +{categories.length - 2}
                        </span>
                    )}
                </div>

                {/* Main Info */}
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                        {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base line-clamp-2 md:line-clamp-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                        {project.description}
                    </p>

                    {/* Stats Row */}
                    {stats.length > 0 && (
                        <div className="flex gap-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                            {stats.slice(0, 2).map((stat: any, i: number) => (
                                <div key={i} className="">
                                    <div className="text-lg font-bold text-primary leading-none">{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* CTA */}
                    {project.link && (
                        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                            <a
                                href={project.link}
                                target="_blank"
                                className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all"
                            >
                                Voir le projet <ArrowUpRight className="w-5 h-5 text-primary" />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
