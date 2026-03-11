/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff41',
        'neon-green-dim': '#00cc33',
        'neon-green-glow': '#00ff4133',
        'cyber-dark': '#0a0a0a',
        'cyber-darker': '#050505',
        'cyber-card': '#111111',
        'cyber-border': '#1a2a1a',
        'cyber-text': '#ccffcc',
        'cyber-muted': '#4a7c4a',
      },
      fontFamily: {
        mono: ['Roboto Mono', 'monospace'],
        sans: ['Roboto Mono', 'monospace'],
      },
      animation: {
        'matrix-fall': 'matrixFall 20s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'type-cursor': 'typeCursor 1s step-end infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        matrixFall: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px #00ff41)' },
          '50%': { filter: 'drop-shadow(0 0 20px #00ff41)' },
        },
        typeCursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanLine: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        neon: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41',
        'neon-sm': '0 0 5px #00ff41, 0 0 10px #00ff41',
        'neon-subtle': '0 0 5px rgba(0,255,65,0.3)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [],
};
