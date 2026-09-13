'use client'

import { useTheme } from '@/components/providers/ThemeProvider'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    }

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "relative w-14 h-7 rounded-full transition-colors duration-300",
                resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
            )}
            role="switch"
            aria-checked={resolvedTheme === 'dark'}
            aria-label="Thème sombre"
        >
            <div
                className={cn(
                    "absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center",
                    resolvedTheme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'
                )}
            >
                {resolvedTheme === 'dark' ? (
                    <Moon className="w-4 h-4 text-gray-900" />
                ) : (
                    <Sun className="w-4 h-4 text-orange-500" />
                )}
            </div>
        </button>
    )
}
