/** Small, cancellable number tween; no DOM measurements or animation engine. */
export function animateNumber(from: number, to: number, options: {
  duration?: number
  onUpdate: (value: number) => void
  onComplete?: () => void
  ease?: unknown
}) {
  const duration = Math.max(0, (options.duration ?? 0.9) * 1000)
  let frame = 0
  let stopped = false
  let start: number | undefined
  const stop = () => { stopped = true; cancelAnimationFrame(frame) }

  if (!duration || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    options.onUpdate(to)
    options.onComplete?.()
    return { stop }
  }

  const tick = (now: number) => {
    if (stopped) return
    start ??= now
    const progress = Math.min(1, (now - start) / duration)
    options.onUpdate(progress === 1 ? to : from + (to - from) * (1 - (1 - progress) ** 3))
    if (progress < 1) frame = requestAnimationFrame(tick)
    else options.onComplete?.()
  }
  frame = requestAnimationFrame(tick)
  return { stop }
}
