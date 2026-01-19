/**
 * Calcule la date de disponibilité (+2 semaines) et formate en français
 * Format: "DÉBUT/MI/FIN MOIS ANNÉE"
 */
export function getAvailabilityDate(): string {
    const now = new Date()
    const twoWeeksLater = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)

    const monthsFr = [
        'JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN',
        'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'
    ]

    const month = monthsFr[twoWeeksLater.getMonth()]
    const year = twoWeeksLater.getFullYear()
    const day = twoWeeksLater.getDate()

    // Détermine DÉBUT/MI/FIN selon le jour du mois
    let period: string
    if (day <= 10) {
        period = 'DÉBUT'
    } else if (day <= 20) {
        period = 'MI'
    } else {
        period = 'FIN'
    }

    return `${period} ${month} ${year}`
}
