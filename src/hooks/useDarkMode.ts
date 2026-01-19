'use client'

import * as React from 'react'

/**
 * Hook dark mode avec localStorage persist
 * Toggle class sur <html> pour activer CSS variables
 */
export function useDarkMode() {
    const [isDark, setIsDark] = React.useState(false)

    React.useEffect(() => {
        // Charger depuis localStorage ou system preference
        const stored = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

        const shouldBeDark = stored === 'dark' || (!stored && prefersDark)
        setIsDark(shouldBeDark)

        if (shouldBeDark) {
            document.documentElement.classList.add('dark')
        }
    }, [])

    const toggle = React.useCallback(() => {
        setIsDark(prev => {
            const newValue = !prev

            if (newValue) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }

            return newValue
        })
    }, [])

    return { isDark, toggle }
}
