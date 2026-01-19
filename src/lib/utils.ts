import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function pour merger les classes Tailwind
 * Pattern obligatoire de l'ADD
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Formatte une date en français
 * @param date - Date à formater
 * @param format - Format souhaité (default: 'long')
 */
export function formatDate(
    date: Date | string,
    format: 'short' | 'long' | 'full' = 'long'
): string {
    const d = typeof date === 'string' ? new Date(date) : date

    const optionsMap: Record<string, Intl.DateTimeFormatOptions> = {
        short: { day: 'numeric', month: 'short', year: 'numeric' },
        long: { day: 'numeric', month: 'long', year: 'numeric' },
        full: {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        },
    }

    return d.toLocaleDateString('fr-FR', optionsMap[format])
}

/**
 * Formatte un numéro de téléphone français
 * @param phone - Numéro brut (ex: "0612345678")
 * @returns Numéro formaté (ex: "06 12 34 56 78")
 */
export function formatPhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length !== 10) return phone

    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
}

/**
 * Valide un numéro de téléphone français
 */
export function isValidFrenchPhone(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, '')
    return /^0[1-9]\d{8}$/.test(cleaned)
}

/**
 * Valide une email (RFC 5322 simplifié)
 */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Truncate un texte avec ellipsis
 */
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text
    return text.slice(0, length).trim() + '...'
}

/**
 * Génère un slug URL-friendly à partir d'un texte
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove accents
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

/**
 * Formatte un nombre avec espaces (format français)
 * @example formatNumber(1234567) // "1 234 567"
 */
export function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
