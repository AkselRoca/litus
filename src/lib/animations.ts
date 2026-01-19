import { type Variants } from 'framer-motion'

/**
 * Variants Framer Motion réutilisables
 * Conformes à l'UX Spec - animations 7-8/10
 */

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
}

export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
}

export const slideInLeft: Variants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
}

export const slideInRight: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
}

export const staggerContainer: Variants = {
    animate: {
        transition: {
            staggerChildren: 0.1, // 100ms stagger (UX Spec)
        },
    },
}

export const staggerItem: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
}

/**
 * Constantes durées animations (UX Spec)
 */
export const ANIMATION_DURATION = {
    micro: 150, // hover, focus
    standard: 300, // modals, menus
    emphatic: 500, // reveal, count-up
} as const

/**
 * CTA pulse animation config
 */
export const CTA_PULSE = {
    interval: 3000, // 3s cycle
    opacity: [0.8, 1],
} as const

/**
 * Shake error animation keyframes
 */
export const SHAKE_ERROR = {
    keyframes: [-10, 10, -10, 10, 0], // px
    duration: 400,
} as const
