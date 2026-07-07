/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // 自然、沉穩的色調：溫米白底 + 灰綠強調色
        sand: {
          50: '#FAF8F3',
          100: '#F2EEE3',
          200: '#E6DFCC',
          300: '#D3C7A8',
        },
        stone: {
          600: '#6B6558',
          700: '#524E44',
          800: '#3A3730',
          900: '#26241F',
        },
        sage: {
          100: '#E4E9DE',
          300: '#B7C4A8',
          500: '#7C9068',
          600: '#617248',
          700: '#4A5637',
        },
      },
      fontFamily: {
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
