import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/__tests__/setup.tsx'],
        include: ['src/**/*.{test,spec}.{ts,tsx}'],
        coverage: {
            reporter: ['text', 'html'],
            exclude: ['node_modules/', 'src/__tests__/'],
        },
    },
    resolve: {
        alias: {
            'server-only': path.resolve(__dirname, './src/__tests__/server-only.ts'),
            '@': path.resolve(__dirname, './src'),
        },
    },
})
