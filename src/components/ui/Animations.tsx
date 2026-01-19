'use client'

import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, ReactNode } from 'react'

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
interface ScrollRevealProps {
    children: ReactNode
    className?: string
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    duration?: number
    once?: boolean
}

export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.6,
    once = true,
}: ScrollRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-100px' })

    const directionOffset = {
        up: { y: 40, x: 0 },
        down: { y: -40, x: 0 },
        left: { x: 40, y: 0 },
        right: { x: -40, y: 0 },
        none: { x: 0, y: 0 },
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                ...directionOffset[direction],
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
            } : {}}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// STAGGER CONTAINER
// ============================================
interface StaggerContainerProps {
    children: ReactNode
    className?: string
    staggerDelay?: number
    once?: boolean
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.1,
    once = true,
}: StaggerContainerProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once, margin: '-50px' })

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    )
}

import type { Variants } from 'framer-motion'

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
    },
}

// ============================================
// ANIMATED COUNTER
// ============================================
interface AnimatedCounterProps {
    value: number
    prefix?: string
    suffix?: string
    duration?: number
    className?: string
}

export function AnimatedCounter({
    value,
    prefix = '',
    suffix = '',
    duration = 2,
    className = '',
}: AnimatedCounterProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 50,
        stiffness: 100,
    })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [isInView, value, motionValue])

    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const unsubscribe = springValue.on('change', (latest) => {
            setDisplayValue(Math.round(latest))
        })
        return unsubscribe
    }, [springValue])

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue}{suffix}
        </span>
    )
}

// Need useState import
import { useState } from 'react'

// ============================================
// FLOATING ANIMATION
// ============================================
interface FloatingProps {
    children: ReactNode
    className?: string
    duration?: number
    distance?: number
}

export function Floating({
    children,
    className = '',
    duration = 3,
    distance = 10,
}: FloatingProps) {
    return (
        <motion.div
            className={className}
            animate={{
                y: [-distance, distance, -distance],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// GRADIENT TEXT ANIMATION
// ============================================
interface AnimatedGradientTextProps {
    children: ReactNode
    className?: string
}

export function AnimatedGradientText({
    children,
    className = '',
}: AnimatedGradientTextProps) {
    return (
        <motion.span
            className={`bg-gradient-to-r from-primary via-orange-500 to-primary bg-[length:200%_auto] bg-clip-text text-transparent ${className}`}
            animate={{
                backgroundPosition: ['0%', '200%'],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            {children}
        </motion.span>
    )
}

// ============================================
// PULSE ANIMATION
// ============================================
interface PulseProps {
    children: ReactNode
    className?: string
}

export function Pulse({ children, className = '' }: PulseProps) {
    return (
        <motion.div
            className={className}
            animate={{
                scale: [1, 1.05, 1],
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// PARALLAX SCROLL
// ============================================
interface ParallaxProps {
    children: ReactNode
    className?: string
    speed?: number
}

export function Parallax({
    children,
    className = '',
    speed = 0.5,
}: ParallaxProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    })
    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

    return (
        <motion.div ref={ref} className={className} style={{ y }}>
            {children}
        </motion.div>
    )
}

import { useScroll, useTransform } from 'framer-motion'

// ============================================
// MAGNETIC BUTTON (Hover Effect)
// ============================================
interface MagneticProps {
    children: ReactNode
    className?: string
    strength?: number
}

export function Magnetic({
    children,
    className = '',
    strength = 0.3,
}: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * strength)
        y.set((e.clientY - centerY) * strength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x, y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        >
            {children}
        </motion.div>
    )
}

// ============================================
// TEXT REVEAL CHARACTER BY CHARACTER
// ============================================
interface TextRevealProps {
    text: string
    className?: string
    delay?: number
}

export function TextReveal({
    text,
    className = '',
    delay = 0,
}: TextRevealProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const characters = text.split('')

    return (
        <span ref={ref} className={className}>
            {characters.map((char, idx) => (
                <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.3,
                        delay: delay + idx * 0.03,
                        ease: 'easeOut',
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    )
}
