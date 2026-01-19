'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
    valid?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, valid, ...props }, ref) => {
        return (
            <div className="w-full">
                <input
                    type={type}
                    className={cn(
                        'flex h-12 w-full px-4 py-3 rounded-lg',
                        'border-2 transition-colors',
                        'bg-[var(--bg-primary)] text-[var(--text-primary)]',
                        'text-fluid-base',
                        'file:border-0 file:bg-transparent file:text-sm file:font-medium',
                        'placeholder:text-[var(--text-muted)]',
                        'focus:outline-none focus:border-primary',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        error && 'border-red-500 focus:border-red-500',
                        valid && 'border-success focus:border-success',
                        !error && !valid && 'border-[var(--border)]',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="text-red-500 text-fluid-xs mt-1">{error}</p>
                )}
            </div>
        )
    }
)
Input.displayName = 'Input'

export { Input }
