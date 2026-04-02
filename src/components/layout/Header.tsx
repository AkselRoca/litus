'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, ChevronDown, Monitor, ShoppingBag, MapPin, BarChart, Smartphone, Sparkles, Building2, Store, Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { cn } from '@/lib/utils'

export function Header() {
    const { scrollY } = useScroll()
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50)
    })

    const services = [
        { name: 'Sites Vitrine', href: '/creation-site-internet', icon: Monitor, color: 'text-blue-500' },
        { name: 'E-commerce', href: '/creation-site-ecommerce', icon: ShoppingBag, color: 'text-purple-500' },
        { name: 'SEO Local', href: '/seo-local', icon: MapPin, color: 'text-green-500' },
        { name: 'Google Ads', href: '/google-ads', icon: BarChart, color: 'text-orange-500' },
        { name: 'Applications', href: '/creation-application-web', icon: Smartphone, color: 'text-pink-500' },
        { name: 'Automatisation', href: '/automatisation', icon: Sparkles, color: 'text-orange-500' },
    ]

    const personas = [
        { name: 'Artisans', href: '/artisans', icon: Store, color: 'text-emerald-500' },
        { name: 'PME', href: '/pme', icon: Building2, color: 'text-cyan-500' },
        { name: 'Grands Comptes', href: '/grands-comptes', icon: Users, color: 'text-indigo-500' },
        { name: 'Collectivités', href: '/collectivites', icon: MapPin, color: 'text-orange-500' },
    ]

    return (
        <>
            <motion.header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4",
                    scrolled ? "py-4" : "py-6"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    className={cn(
                        "mx-auto max-w-[85%] rounded-2xl transition-all duration-300 backdrop-blur-md border",
                        scrolled
                            ? "bg-white/80 dark:bg-black/80 border-black/5 dark:border-white/10 shadow-lg px-6 py-3"
                            : "bg-transparent border-transparent px-0 py-2"
                    )}
                >
                    <div className="relative w-full flex items-center justify-between">
                        {/* Logo & Availability Group — mirrors right side spacing */}
                        <div className="flex items-center gap-0 z-50">
                            <Link href="/" className="relative h-10 flex items-center transition-transform duration-300 hover:scale-105">
                                {/* Light Mode Logo */}
                                <img
                                    src="/logo-sans-fond.png"
                                    alt="Litus Logo"
                                    className="w-full h-full object-contain object-left dark:hidden"
                                />
                                {/* Dark Mode Logo */}
                                <img
                                    src="/logo-white.png"
                                    alt="Litus Logo"
                                    className="hidden w-full h-full object-contain object-left dark:block"
                                />
                            </Link>

                            <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden xl:block mx-4" />

                            <div className="hidden xl:block">
                                <AvailabilityBadge />
                            </div>
                        </div>

                        {/* Desktop Navigation "Island" - ABSOLUTELY CENTERED */}
                        <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 bg-white/50 dark:bg-white/5 backdrop-blur-sm px-2 py-1.5 rounded-full border border-black/5 dark:border-white/10 shadow-sm z-40 transition-all duration-300">
                            {/* Services Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('services')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className={cn(
                                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                                    activeDropdown === 'services'
                                        ? "bg-white dark:bg-white/10 text-orange-600 dark:text-orange-400 shadow-sm"
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                )}>
                                    Services
                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", activeDropdown === 'services' && "rotate-180")} />
                                </button>

                                <AnimatePresence>
                                    {activeDropdown === 'services' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64"
                                        >
                                            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-2 overflow-hidden">
                                                {services.map((service) => (
                                                    <Link
                                                        key={service.name}
                                                        href={service.href}
                                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                                    >
                                                        <div className={cn("p-2 rounded-lg bg-gray-50 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 transition-colors shadow-sm", service.color)}>
                                                            <service.icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{service.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Personas Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setActiveDropdown('personas')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className={cn(
                                    "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                                    activeDropdown === 'personas'
                                        ? "bg-white dark:bg-white/10 text-orange-600 dark:text-orange-400 shadow-sm"
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                )}>
                                    Vous êtes ?
                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", activeDropdown === 'personas' && "rotate-180")} />
                                </button>

                                <AnimatePresence>
                                    {activeDropdown === 'personas' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64"
                                        >
                                            <div className="bg-white dark:bg-[#111] rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 p-2 overflow-hidden">
                                                {personas.map((persona) => (
                                                    <Link
                                                        key={persona.name}
                                                        href={persona.href}
                                                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                                                    >
                                                        <div className={cn("p-2 rounded-lg bg-gray-50 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 transition-colors shadow-sm", persona.color)}>
                                                            <persona.icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{persona.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                href="/a-propos"
                                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
                            >
                                À Propos
                            </Link>

                            <Link
                                href="/realisations"
                                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
                            >
                                Nos Réalisations
                            </Link>

                            <Link
                                href="/tarifs"
                                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
                            >
                                Tarifs
                            </Link>

                            <Link
                                href="/blog"
                                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
                            >
                                Blog
                            </Link>

                            <Link
                                href="/contact"
                                className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors whitespace-nowrap"
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Right Actions */}
                        <div className="hidden lg:flex items-center gap-0 z-50">
                            {/* Availability Badge - Now on Right */}
                            <ThemeToggle />

                            <div className="h-6 w-px bg-gray-200 dark:bg-white/10 hidden xl:block mx-4" />

                            <Button href="/contact" size="sm" className="rounded-full px-6 shadow-lg shadow-orange-500/20">
                                Devis Gratuit
                            </Button>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="flex lg:hidden items-center gap-3">
                            <ThemeToggle />
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            >
                                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    mobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                                onClick={() => setMobileMenuOpen(false)}
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-[#111] border-l border-gray-200 dark:border-white/10 z-50 lg:hidden p-6 overflow-y-auto"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="text-xl font-bold text-gray-900 dark:text-white">Menu</span>
                                        <button
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                        >
                                            <X className="w-6 h-6 text-gray-500" />
                                        </button>
                                    </div>

                                    <div className="flex-1 space-y-8">
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Services</h3>
                                            <div className="space-y-2">
                                                {services.map((service) => (
                                                    <Link
                                                        key={service.name}
                                                        href={service.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                                    >
                                                        <div className={cn("p-2 rounded-lg bg-gray-50 dark:bg-white/5 shadow-sm", service.color)}>
                                                            <service.icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium text-gray-900 dark:text-white">{service.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Vous êtes ?</h3>
                                            <div className="space-y-2">
                                                {personas.map((persona) => (
                                                    <Link
                                                        key={persona.name}
                                                        href={persona.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                                    >
                                                        <div className={cn("p-2 rounded-lg bg-gray-50 dark:bg-white/5 shadow-sm", persona.color)}>
                                                            <persona.icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="font-medium text-gray-900 dark:text-white">{persona.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-white/10">
                                            <Link
                                                href="/a-propos"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block p-3 font-medium text-gray-900 dark:text-white hover:text-orange-500 transition-colors"
                                            >
                                                À Propos
                                            </Link>
                                            <Link
                                                href="/realisations"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block p-3 font-medium text-gray-900 dark:text-white hover:text-orange-500 transition-colors"
                                            >
                                                Nos Réalisations
                                            </Link>
                                            <Link
                                                href="/tarifs"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block p-3 font-medium text-gray-900 dark:text-white hover:text-orange-500 transition-colors"
                                            >
                                                Tarifs
                                            </Link>
                                            <Link
                                                href="/blog"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block p-3 font-medium text-gray-900 dark:text-white hover:text-orange-500 transition-colors"
                                            >
                                                Blog
                                            </Link>
                                            <Link
                                                href="/contact"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="block p-3 font-medium text-gray-900 dark:text-white hover:text-orange-500 transition-colors"
                                            >
                                                Contact
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/10">
                                        <Button href="/contact" className="w-full rounded-xl py-6 text-lg shadow-lg shadow-orange-500/20">
                                            Devis Gratuit
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )
                }
            </AnimatePresence >
        </>
    )
}
