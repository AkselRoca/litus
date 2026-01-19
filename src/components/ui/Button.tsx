'use client'

import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

import { motion } from 'framer-motion'

/**
 * Button variants selon UX Spec
 * - primary: Orange glow (conversion)
 * - secondary: Outline orange
 * - ghost: Texte seul
 */
const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary text-snow hover-glow shadow-md', // Removed active:scale because Motion handles it
                secondary:
                    'border-2 border-primary text-primary hover:bg-primary hover:text-snow',
                outline:
                    'border-2 border-primary bg-transparent text-primary hover:bg-primary/10',
                ghost: 'text-primary hover:underline underline-offset-4',
                danger: 'bg-red-600 text-snow hover:bg-red-700',
            },
            size: {
                sm: 'h-9 px-fluid-sm text-fluid-sm',
                md: 'h-11 px-fluid-md text-fluid-base',
                lg: 'h-14 px-fluid-lg text-fluid-lg',
                xl: 'h-16 px-10 text-xl',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean
    href?: string
    target?: string
    rel?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, isLoading, href, children, ...props }, ref) => {
        const buttonClass = cn(buttonVariants({ variant, size, className }))
        const isGhost = variant === 'ghost'

        // Motion variants for consistent feel
        const motionProps = isGhost ? {} : {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            transition: { type: 'spring' as const, stiffness: 400, damping: 10 }
        }


        if (href) {
            return (
                <motion.a
                    href={href}
                    className={buttonClass}
                    ref={ref as any}
                    {...motionProps}
                    {...props as any}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Chargement...
                        </>
                    ) : (
                        children
                    )}
                </motion.a>
            )
        }

        return (
            <motion.button
                className={buttonClass}
                ref={ref as any}
                disabled={isLoading || props.disabled}
                {...motionProps}
                {...props as any} // Cast necessary for motion props compatibility
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Chargement...
                    </>
                ) : (
                    children
                )}
            </motion.button>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

