'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import * as React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'hover-3d' | 'outline'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', ...props }, ref) => {
        const is3D = variant === 'hover-3d'

        return (
            <motion.div
                ref={ref as any}
                className={cn(
                    'rounded-lg p-fluid-card transition-colors', // transition-colors only, motion handles transform
                    variant === 'default' &&
                    'bg-[var(--bg-secondary)] border border-[var(--border)] shadow-sm',
                    variant === 'outline' && 'border-2 border-[var(--border)]',
                    variant === 'hover-3d' &&
                    'bg-[var(--bg-secondary)] border border-[var(--border)] shadow-md cursor-pointer',
                    className
                )}
                whileHover={is3D ? { y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                {...props as any}
            />
        )
    }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col gap-fluid-xs', className)}
        {...props}
    />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn('font-heading font-semibold text-fluid-xl', className)}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-fluid-sm text-[var(--text-secondary)]', className)}
        {...props}
    />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-fluid-sm', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center pt-fluid-sm', className)}
        {...props}
    />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
