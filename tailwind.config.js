/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1400px',
      }
    },
    extend: {
      fontFamily: {
        heading: ['"JetBrains Mono"', 'monospace'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
      },
      colors: {
        deep: '#030712',
        surface: '#0F172A',
        elevated: '#1E293B',
        accent: '#3B82F6',
        'accent-glow': 'rgba(59, 130, 246, 0.15)',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'pulse-skeleton': 'pulseSkeleton 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSkeleton: {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.05)' },
          '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.12)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
