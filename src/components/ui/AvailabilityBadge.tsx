'use client'
import { useEffect, useState } from 'react'
interface AvailabilityData {
  dispo: boolean
  nextAvailableDate: string | null
}
export function AvailabilityBadge() {
  const [data, setData] = useState<AvailabilityData | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/config', { signal: controller.signal })
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) setData(json.data)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])
  if (!data) return null
  const date = data.nextAvailableDate ? new Date(data.nextAvailableDate) : null
  const dateLabel =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : null
  return (
    <p className="text-xs leading-snug whitespace-normal text-green-700 dark:text-green-400">
      {data.dispo
        ? 'Disponible pour projet'
        : dateLabel
          ? 'Prochain projet dès le ' + dateLabel
          : 'Prochainement disponible'}
    </p>
  )
}
