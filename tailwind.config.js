/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
    "./data/**/*.{js,jsx}",
    "./libs/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'deep-olive': {
          DEFAULT: '#2F3B24',
          hover: '#232C1B',
          light: '#F0F3EE',
        },
        'terracotta': {
          DEFAULT: '#C65D2E',
          hover: '#AF4E23',
          light: '#FBF1EC',
        },
        'muted-terracotta': {
          DEFAULT: '#C65D2E',
          hover: '#AF4E23',
          light: '#FBF1EC',
        },
        'warm-ivory': '#F8F6F2',
        'warm-beige': '#F3EFE8',
        'soft-beige': '#F3EFE8',
        'light-beige': '#E5DFD5',
        'light-taupe': '#E5DFD5',
        'warm-gray': '#77736C',
        'secondary-gray': '#77736C',
        'charcoal': '#171717',
        'surface-white': '#FFFFFF',
        'white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        serif: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        mono: ['var(--font-montserrat)', 'Montserrat', 'monospace'],
      },
      borderRadius: {
        'card': '20px',
        'img': '16px',
        'btn': '10px',
      },
      boxShadow: {
        'subtle': '0 2px 12px -2px rgba(23, 23, 23, 0.04)',
        'hover': '0 10px 30px -4px rgba(23, 23, 23, 0.08)',
      }
    },
  },
  plugins: [],
};

