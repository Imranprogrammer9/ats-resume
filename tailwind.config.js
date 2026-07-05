/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#0E1F15',
          dark: '#080f0a',
          mid: '#1B3A2D',
          soft: '#2E5C42',
          50: '#EBF2ED',
        },
        brass: {
          DEFAULT: '#B5852A',
          light: '#D4A84B',
          pale: '#F5EDD0',
          accent: '#D4A84B',
        },
        sand: {
          DEFAULT: '#F7F5EF',
          dark: '#EDE9E0',
        },
        slate: {
          brand: '#5C7266',
          light: '#8FA89A',
        },
        ink: '#0E1F15',
      },
      fontFamily: {
        display: ["'Poppins'", 'system-ui', 'sans-serif'],
        body: ["'Poppins'", 'system-ui', 'sans-serif'],
        poppins: ["'Poppins'", 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(14, 31, 21, 0.06)',
        'medium': '0 8px 40px rgba(14, 31, 21, 0.10)',
        'strong': '0 16px 64px rgba(14, 31, 21, 0.14)',
        'brass': '0 4px 24px rgba(181, 133, 42, 0.22)',
        'brass-lg': '0 8px 40px rgba(181, 133, 42, 0.30)',
      },
      backgroundImage: {
        'gradient-forest': 'linear-gradient(160deg, #0E1F15 0%, #080f0a 100%)',
        'gradient-brass': 'linear-gradient(135deg, #B5852A 0%, #D4A84B 100%)',
        'gradient-sand': 'linear-gradient(160deg, #F7F5EF 0%, #EDE9E0 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.65s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-brass': 'pulseBrass 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseBrass: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(181,133,42,0.5)' },
          '50%': { boxShadow: '0 0 0 6px rgba(181,133,42,0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
