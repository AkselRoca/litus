import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// Cleanup after each test
afterEach(() => {
    cleanup()
})

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        back: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}))

// Mock next/image
vi.mock('next/image', () => ({
    default: ({ src, alt, ...props }: { src: string; alt: string }) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={ src } alt = { alt } {...props
} />
  },
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: { children?: React.ReactNode }) => <div { ...props } > { children } </div>,
    span: ({ children, ...props }: { children?: React.ReactNode }) => <span { ...props } > { children } </span>,
    button: ({ children, ...props }: { children?: React.ReactNode }) => <button { ...props } > { children } </button>,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{ children } </>,
  useInView: () => true,
    useScroll: () => ({ scrollY: { get: () => 0 } }),
    useTransform: () => 0,
}))
