'use client'

import { useInView } from 'framer-motion'
import * as React from 'react'

interface AnimatedCounterProps {
    target: number
    duration?: number
    suffix?: string
    prefix?: string
}

/**
 * Counter animé qui s'incrémente de 0 à target
 * Démarre quand visible dans viewport (useInView)
 */
export function AnimatedCounter({
    target,
    duration = 2000,
    suffix = '',
    prefix = '',
}: AnimatedCounterProps) {
    const [count, setCount] = React.useState(0)
    const ref = React.useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    React.useEffect(() => {
        if (!isInView) return

        const startTime = Date.now()
        const endTime = startTime + duration

        const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Easing function (easeOutQuad)
            const easeProgress = 1 - Math.pow(1 - progress, 3)

            setCount(Math.floor(target * easeProgress))

            if (now < endTime) {
                requestAnimationFrame(updateCount)
            } else {
                setCount(target)
            }
        }

        requestAnimationFrame(updateCount)
    }, [isInView, target, duration])

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {count}
            {suffix}
        </span>
    )
}
