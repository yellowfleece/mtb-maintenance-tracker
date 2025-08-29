/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'powder-blue': '#0072CE',
        'sunshine-gold': '#FFB81C',
        'navy-blue': '#0C2340',
        'powder-blue-light': '#4A9AE1',
        'powder-blue-dark': '#005A9F',
        'sunshine-gold-light': '#FFD65C',
        'sunshine-gold-dark': '#E6A500',
        'navy-blue-light': '#1B3A5F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}