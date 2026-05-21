/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#050505',
          card: '#0d0d0d',
          cardHover: '#121212',
          border: '#1a1a1a',
          borderActive: '#333333',
          green: '#00ff66', // pure technical vibrant green, perfect for dark themes
          greenDim: '#00cc52',
          greenMuted: 'rgba(0, 255, 102, 0.1)',
          white: '#ffffff',
          whiteMuted: '#a3a3a3',
          grayDark: '#121212',
          grayLight: '#f3f4f6',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
