'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 'default' | 'narrow' | 'wide'
}

/**
 * Container responsive fluide (amélioration Amelia ADD)
 * ZERO breakpoints - fluid sizing avec clamp
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, size = 'default', ...props }, ref) => {
        const maxWidths = {
            narrow: '800px',
            default: '1400px',
            wide: '1800px',
        }

        return (
            <div
                ref={ref}
                className={cn('container-fluid', className)}
                style={{
                    width: `min(100% - 2rem, ${maxWidths[size]})`,
                    marginInline: 'auto',
                    paddingInline: 'clamp(1rem, 4vw, 2rem)',
                }}
                {...props}
            />
        )
    }
)
Container.displayName = 'Container'
