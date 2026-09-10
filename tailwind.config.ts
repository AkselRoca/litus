import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class'], // Toggle dark mode avec class strategy

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },

    extend: {
      colors: {
        white: '#F7F6F2',
        ink: '#1F2937',
        // Design System Litus (UX Spec)
        primary: '#E95E2A', // Orange Litus
        snow: '#F7F6F2',    // Fond clair
        dark: '#1F2937',    // Fond sombre
        muted: '#5F6874',   // Deep Nuance
        success: '#23CE6B', // Validation/checkmarks

        // Semantic colors (CSS variables pour dark mode)
        background: 'var(--bg-primary)',
        foreground: 'var(--text-primary)',
      },

      fontFamily: {
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Borel', 'cursive'],
      },

      // Typography fluide (clamp)
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 1.2vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 1.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 2.5vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 3vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 4vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 5vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 6vw, 3rem)',
        'fluid-hero': 'clamp(2.5rem, 8vw, 5rem)',
      },

      // Spacing fluide (clamp)
      spacing: {
        'fluid-xs': 'clamp(0.25rem, 0.5vw, 0.5rem)',
        'fluid-sm': 'clamp(0.5rem, 1vw, 0.75rem)',
        'fluid-md': 'clamp(1rem, 2vw, 1.5rem)',
        'fluid-lg': 'clamp(1.5rem, 4vw, 3rem)',
        'fluid-xl': 'clamp(2rem, 6vw, 4rem)',
        'fluid-section': 'clamp(3rem, 8vw, 6rem)',
      },

      // Animations (UX Spec patterns)
      transitionDuration: {
        micro: '150ms',
        standard: '300ms',
        emphatic: '500ms',
      },

      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '50%': { transform: 'translateX(10px)' },
          '75%': { transform: 'translateX(-10px)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shake': 'shake 400ms ease-in-out',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 60s linear infinite",
      },
    },
  },

  plugins: [
    require('@tailwindcss/container-queries'),
  ],
};

export default config;
