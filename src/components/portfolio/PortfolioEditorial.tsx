'use client'

import { useRef, useMemo, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sparkles, LayoutList, Grid3x3 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Project = {
    id: string
    title: string
    categories: string
    imageUrl: string
    link?: string | null
    stats: string
    tags: string
    description: string
    featured: boolean
    order?: number
}

const ALL_CATEGORY = "Tous"

export function PortfolioEditorial({ projects }: { projects: Project[] }) {
    const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
    const [viewMode, setViewMode] = useState<'editorial' | 'grid'>('editorial')


    // Specific order requested by user
    const ORDERED_CATEGORIES = [
        "Tous",
        "Site Vitrine",
        "Site E-commerce",
        "Google Ads",
        "Référencement Naturel (SEO)",
        "Outil Métier / Application Web",
        "Identité Visuelle"
    ]

    // Extract unique categories from all projects and sort them
    const allCategories = useMemo(() => {
        const cats = new Set<string>()
        projects.forEach(p => {
            try {
                const projectCats = JSON.parse(p.categories) as string[]
                projectCats.forEach(c => cats.add(c))
            } catch { }
        })

        // Filter out any categories not in the official list if we want to be strict, 
        // or just append them at the end. Here we'll just sort based on the index.
        const foundCats = Array.from(cats)

        return [ALL_CATEGORY, ...foundCats].sort((a, b) => {
            const indexA = ORDERED_CATEGORIES.indexOf(a)
            const indexB = ORDERED_CATEGORIES.indexOf(b)

            // If both are in the list, sort by index
            if (indexA !== -1 && indexB !== -1) return indexA - indexB
            // If A is in list but B is not, A comes first
            if (indexA !== -1) return -1
            // If B is in list but A is not, B comes first
            if (indexB !== -1) return 1
            // If neither, sort alphabetically
            return a.localeCompare(b)
        })
    }, [projects])

    // Filter projects based on active category
    const filteredProjects = useMemo(() => {
        if (activeCategory === ALL_CATEGORY) return projects
        return projects.filter(p => {
            try {
                const cats = JSON.parse(p.categories) as string[]
                return cats.includes(activeCategory)
            } catch { return false }
        })
    }, [projects, activeCategory])

    return (
        <div className="flex flex-col gap-0 bg-snow dark:bg-dark transition-colors duration-700 min-h-screen">

            {/* Cinematic Hero (Moved from page.tsx) */}
            <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-0">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-orange-100/50 via-purple-50/30 to-transparent dark:from-orange-500/10 dark:via-purple-900/10 dark:to-transparent blur-[120px]" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] dark:opacity-[0.05]" />
                </div>

                <div className="container px-6 relative z-10 text-center flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100/50 to-white/50 dark:from-white/5 dark:to-white/5 border border-orange-200/50 dark:border-white/10 rounded-full mb-8 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">Portfolio</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.05]">
                        L'Art de la<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600 dark:to-orange-400">Conversion.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-0 max-w-3xl mx-auto leading-relaxed">
                        Nous ne créons pas juste des sites web. Nous façonnons des outils de croissance sur-mesure pour les leaders de demain.
                    </p>

                    {/* Sticky Filter Bar & View Toggle */}
                    <div className="sticky top-24 z-40 bg-transparent w-full flex flex-col md:flex-row justify-center items-center gap-4 pt-12 pb-16">

                        {/* Categories */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full p-1.5 shadow-xl pointer-events-auto flex items-center gap-1 overflow-x-auto max-w-[90vw] no-scrollbar">
                            {allCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={cn(
                                        "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                                        activeCategory === cat
                                            ? "bg-primary text-white shadow-md"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* View Toggle */}
                        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full p-1.5 shadow-xl pointer-events-auto flex items-center gap-1">
                            <button
                                onClick={() => setViewMode('editorial')}
                                className={cn(
                                    "p-2 rounded-full transition-all",
                                    viewMode === 'editorial'
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                                )}
                                aria-label="Vue Éditoriale"
                            >
                                <LayoutList className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "p-2 rounded-full transition-all",
                                    viewMode === 'grid'
                                        ? "bg-primary text-white shadow-sm"
                                        : "text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                                )}
                                aria-label="Vue Grille"
                            >
                                <Grid3x3 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* Project Render */}
            <div className="flex flex-col">
                <AnimatePresence mode="wait">
                    {viewMode === 'editorial' ? (
                        <div className="flex flex-col space-y-0">
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={`editorial-${project.id}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <ProjectSection project={project} index={index} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32"
                        >
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={`grid-${project.id}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <ProjectGridCard project={project} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {filteredProjects.length === 0 && (
                    <div className="py-32 text-center text-gray-500">
                        Aucun projet trouvé pour cette catégorie.
                    </div>
                )}
            </div>
        </div>
    )
}

function ProjectSection({ project, index }: { project: Project; index: number }) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

    // Parse JSON data safely
    const categories = useMemo(() => {
        try { return JSON.parse(project.categories) as string[] } catch { return [] }
    }, [project.categories])

    const stats = useMemo(() => {
        try { return JSON.parse(project.stats) as any[] } catch { return [] }
    }, [project.stats])

    const tags = useMemo(() => {
        try { return JSON.parse(project.tags) as string[] } catch { return [] }
    }, [project.tags])

    // Alternate layout for variety
    const isEven = index % 2 === 0

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[80vh] flex items-center py-20 overflow-hidden"
        >
            {/* Background Ambient Glow */}
            <div className={`absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none transition-colors duration-700
                ${index % 3 === 0 ? 'bg-gradient-to-br from-primary/20 via-transparent to-transparent' : ''}
                ${index % 3 === 1 ? 'bg-gradient-to-bl from-blue-500/20 via-transparent to-transparent' : ''}
                ${index % 3 === 2 ? 'bg-gradient-to-tr from-purple-500/20 via-transparent to-transparent' : ''}
            `} />

            <div className="container mx-auto px-6 relative z-10">
                <div className={cn(
                    "flex flex-col lg:flex-row gap-12 lg:gap-24 items-center",
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}>

                    {/* INFO SIDE */}
                    <motion.div
                        style={{ opacity, x: isEven ? -50 : 50 }}
                        whileInView={{ x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex-1 space-y-8 w-full min-w-0"
                    >
                        {/* Categories (No Ranking Number) */}
                        <div className="flex items-center gap-4 w-full">
                            <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-2 md:pb-0 mask-image-scroll min-w-0">
                                {categories.map(cat => (
                                    <span key={cat} className="text-xs font-bold uppercase tracking-wider text-primary border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-5xl md:text-7xl font-heading font-bold text-gray-900 dark:text-white leading-tight">
                            {project.title}
                        </h2>

                        {/* MOBILE IMAGE (Visible on mobile only, between Title and Desc) */}
                        <div className="block lg:hidden w-full relative group perspective-[1000px] isolate my-8">
                            <motion.div
                                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50 border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-gray-800 transform-style-3d will-change-transform backface-visibility-hidden [transform:translateZ(0)]"
                            >
                                {/* Browser Header Mockup */}
                                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-white/5 flex items-center px-4 gap-2 z-20">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20" />
                                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20" />
                                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20" />
                                    </div>
                                    <div className="ml-4 flex-1 h-5 bg-white dark:bg-white/5 rounded text-[10px] flex items-center px-3 text-gray-400 font-mono overflow-hidden whitespace-nowrap text-ellipsis">
                                        {(() => {
                                            try {
                                                return project.link ? new URL(project.link).hostname : 'localhost:3000'
                                            } catch {
                                                return project.link || 'litus.io'
                                            }
                                        })()}
                                    </div>
                                </div>
                                {/* Image */}
                                <div className="absolute inset-0 pt-8 bg-white dark:bg-black">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top backface-visibility-hidden [transform:translateZ(0)]"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                            {project.description}
                        </p>



                        {/* Tags & Tech */}
                        <div className="flex flex-wrap gap-2 pt-2">
                            {tags.map(tag => (
                                <span key={tag} className="text-xs text-gray-500 dark:text-gray-500 font-bold uppercase tracking-wide bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>



                        {/* CTA */}
                        {project.link && (
                            <div className="pt-8">
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener"
                                    className="group inline-flex items-center gap-3 text-lg font-bold text-gray-900 dark:text-white hover:text-primary transition-colors"
                                >
                                    <span>Voir le projet en live</span>
                                    <span className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-200 dark:border-white/20 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                                        <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                                    </span>
                                </a>
                            </div>
                        )}
                    </motion.div>

                    {/* IMAGE SIDE (Mise en Lumière 3D - Desktop Only) */}
                    <div className="hidden lg:block flex-1 w-full">
                        <motion.div
                            style={{ y, scale }}
                            className="relative group perspective-[1000px] isolate"
                        >

                            {/* 3D Glow Effect Behind */}
                            <div className="absolute inset-4 bg-primary/30 rounded-2xl blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 group-hover:inset-0" />

                            <motion.div
                                whileHover={{
                                    scale: 1.02,
                                    rotateX: 2,
                                    rotateY: -2,
                                    transition: { duration: 0.4, ease: "easeOut" }
                                }}
                                className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl dark:shadow-black/50 border border-gray-100 dark:border-white/5 bg-gray-100 dark:bg-gray-800 transform-style-3d transition-shadow duration-500 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] dark:group-hover:shadow-[0_20px_50px_-12px_rgba(255,255,255,0.1)] will-change-transform backface-visibility-hidden [transform:translateZ(0)]"
                            >
                                {/* Browser Header Mockup - Active on Hover */}
                                <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-white/5 flex items-center px-4 gap-2 z-20">
                                    {/* Animated Dots */}
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-[#FF5F56] transition-colors duration-300 shadow-sm" />
                                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-[#FFBD2E] transition-colors duration-300 delay-75 shadow-sm" />
                                        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-white/20 group-hover:bg-[#27C93F] transition-colors duration-300 delay-150 shadow-sm" />
                                    </div>

                                    {/* URL Bar - Lighting up */}
                                    <div className="ml-4 flex-1 h-5 bg-white dark:bg-white/5 rounded text-[10px] flex items-center px-3 text-gray-400 font-mono overflow-hidden whitespace-nowrap text-ellipsis group-hover:bg-white/80 dark:group-hover:bg-white/10 group-hover:text-primary transition-colors duration-300">
                                        <div className="w-2 h-2 rounded-full bg-primary/0 group-hover:bg-green-500 mr-2 transition-all duration-300" />
                                        {(() => {
                                            try {
                                                return project.link ? new URL(project.link).hostname : 'localhost:3000'
                                            } catch {
                                                return project.link || 'litus.io'
                                            }
                                        })()}
                                    </div>
                                </div>

                                {/* Image with slight zoom on hover */}
                                <div className="absolute inset-0 pt-8 bg-white dark:bg-black">
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] will-change-transform backface-visibility-hidden [transform:translateZ(0)]"
                                    />
                                </div>

                                {/* Reflection/Shine Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 z-30 mix-blend-overlay" />
                            </motion.div>
                        </motion.div>


                    </div>

                </div>
            </div>
        </section>
    )
}

function ProjectGridCard({ project }: { project: Project }) {
    // Parse categories safely
    const categories = useMemo(() => {
        try { return JSON.parse(project.categories) as string[] } catch { return [] }
    }, [project.categories])

    return (
        <a
            href={project.link || '#'}
            target={project.link ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="group flex flex-col gap-4"
        >
            {/* Image Container - Independent Card */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm transition-all duration-500 group-hover:shadow-2xl dark:group-hover:shadow-primary/5 group-hover:border-primary/20">
                <div className="absolute inset-0 bg-gray-200 dark:bg-white/10 animate-pulse -z-10" />
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                />

                {/* Overlay with CTA */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-5 py-2.5 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                        <span>Voir le projet</span>
                        <ArrowUpRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Typography Content - Outside the card */}
            <div className="flex flex-col gap-1 px-1">
                <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-widest text-primary/90">
                    {categories.slice(0, 3).map((cat, i) => (
                        <span key={cat}>
                            {cat}
                            {i < Math.min(categories.length, 3) - 1 && <span className="text-gray-300 dark:text-gray-700 ml-2">•</span>}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary transition-colors duration-300">
                    {project.title}
                </h3>
            </div>
        </a>
    )
}
