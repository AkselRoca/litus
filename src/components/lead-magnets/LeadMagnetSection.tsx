'use client'

import { LeadMagnetInline } from '@/components/lead-magnets/LeadMagnetInline'
import type { LeadMagnetId } from '@/components/lead-magnets/LeadMagnetInline'

interface LeadMagnetSectionProps {
    magnetId: LeadMagnetId
    /** Heading above the lead magnet */
    heading?: string
    subheading?: string
    /** Max width class */
    maxWidth?: string
}

export function LeadMagnetSection({ 
    magnetId, 
    heading, 
    subheading,
    maxWidth = 'max-w-2xl'
}: LeadMagnetSectionProps) {
    return (
        <section className="py-16 md:py-24">
            <div className="container-fluid">
                <div className={`${maxWidth} mx-auto`}>
                    {(heading || subheading) && (
                        <div className="text-center mb-10">
                            {heading && (
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                    {heading}
                                </h2>
                            )}
                            {subheading && (
                                <p className="text-gray-600 dark:text-gray-400">
                                    {subheading}
                                </p>
                            )}
                        </div>
                    )}
                    <LeadMagnetInline magnetId={magnetId} />
                </div>
            </div>
        </section>
    )
}
