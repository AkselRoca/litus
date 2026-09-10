'use client'

import * as React from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
    theme: Theme
    resolvedTheme: 'light' | 'dark'
    setTheme: (theme: Theme) => void
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = React.useState<Theme>('light')
    const [resolvedTheme, setResolvedTheme] = React.useState<'light' | 'dark'>('light')

    React.useEffect(() => {
        // Récupérer le thème depuis localStorage
        const savedTheme = localStorage.getItem('theme') as Theme | null
        if (savedTheme) {
            setThemeState(savedTheme)
        }
    }, [])

    React.useEffect(() => {
        const root = window.document.documentElement

        // Déterminer le thème effectif
        let effectiveTheme: 'light' | 'dark'

        if (theme === 'system') {
            // Détection du thème système
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
            effectiveTheme = systemTheme
        } else {
            effectiveTheme = theme as 'light' | 'dark'
        }

        // Appliquer le thème
        root.classList.remove('light', 'dark')
        root.classList.add(effectiveTheme)
        setResolvedTheme(effectiveTheme)

        // Écouter les changements de thème système
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
            if (theme === 'system') {
                const newTheme = mediaQuery.matches ? 'dark' : 'light'
                root.classList.remove('light', 'dark')
                root.classList.add(newTheme)
                setResolvedTheme(newTheme)
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [theme])

    const setTheme = React.useCallback((newTheme: Theme) => {
        setThemeState(newTheme)
        localStorage.setItem('theme', newTheme)
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = React.useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
