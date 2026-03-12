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
        'neon-green': '#4ade80',
        'neon-green-dim': '#22c55e',
        'neon-green-glow': 'rgba(74, 222, 128, 0.25)',
        'cyber-dark': '#0d1110',
        'cyber-darker': '#080a09',
        'cyber-card': '#121814',
        'cyber-border': '#1d2a20',
        'cyber-text': '#dcfce7',
        'cyber-muted': '#248c46' /* Brightened from #166534 */,
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
          '0%, 100%': { filter: 'drop-shadow(0 0 8px #4ade80)' },
          '50%': { filter: 'drop-shadow(0 0 20px #4ade80)' },
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
        neon: '0 0 10px #4ade80, 0 0 20px #4ade80, 0 0 40px #4ade80',
        'neon-sm': '0 0 5px #4ade80, 0 0 10px #4ade80',
        'neon-subtle': '0 0 5px rgba(74, 222, 128, 0.3)',
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
