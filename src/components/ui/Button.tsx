'use client'

import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'

/**
 * Boutons d'action partagés sur le site public.
 */
const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary:
                    'bg-primary text-white',
                secondary:
                    'border border-slate-400 bg-[#F7F6F2] text-[#1F2937] dark:border-slate-500 dark:bg-slate-800 dark:text-[#F7F6F2]',
                outline:
                    'border border-slate-400 bg-transparent text-[#1F2937] dark:border-slate-500 dark:text-[#F7F6F2]',
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
        const resolvedVariant = variant ?? 'primary'
        const resolvedSize = size ?? 'md'
        const actionClass =
            resolvedVariant === 'primary'
                ? 'site-cta-primary'
                : ['secondary', 'outline'].includes(resolvedVariant)
                  ? 'site-cta-secondary'
                  : undefined
        const buttonClass = cn(
            buttonVariants({ variant, size, className }),
            actionClass,
            'litus-button'
        )

        if (href) {
            const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
            return (
                <a
                    {...anchorProps}
                    href={href}
                    className={buttonClass}
                    ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                    data-variant={resolvedVariant}
                    data-size={resolvedSize}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Chargement...
                        </>
                    ) : (
                        children
                    )}
                </a>
            )
        }

        return (
            <button
                {...props}
                className={buttonClass}
                ref={ref}
                disabled={isLoading || props.disabled}
                data-variant={resolvedVariant}
                data-size={resolvedSize}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Chargement...
                    </>
                ) : (
                    children
                )}
            </button>
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

