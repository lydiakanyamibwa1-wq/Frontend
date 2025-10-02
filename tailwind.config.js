/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0d6efd', // primary accent
          dark: '#0a58ca',
          light: '#e7f1ff',
        },
      },
      boxShadow: {
        card: '0 6px 20px rgba(0,0,0,.06)',
      },
    },
  },
  plugins: [],
};
