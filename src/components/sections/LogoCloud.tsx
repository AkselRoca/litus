'use client'

import { motion } from 'framer-motion'

const logos = [
    { name: 'Next.js', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Framer', icon: '✨' },
    { name: 'Vercel', icon: '▲' },
    { name: 'Stripe', icon: '💳' },
    { name: 'Google', icon: '🔍' },
]

export function LogoCloud() {
    return (
        <section className="py-10 bg-white dark:bg-dark border-y border-gray-100 dark:border-white/5 overflow-hidden">
            <div className="container-fluid mb-6 text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Technologies & Partenaires de confiance
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white dark:from-dark to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white dark:from-dark to-transparent z-10" />

                <motion.div
                    className="flex gap-16 items-center whitespace-nowrap"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear",
                    }}
                >
                    {/* Double the array for seamless loop */}
                    {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
                        <div key={i} className="flex items-center gap-2 text-xl font-bold text-gray-400 dark:text-gray-600 grayscale hover:grayscale-0 transition-all duration-300 cursor-default hover:text-gray-900 dark:hover:text-white hover:scale-110">
                            <span className="text-2xl">{logo.icon}</span>
                            <span>{logo.name}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
