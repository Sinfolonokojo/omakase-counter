/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rice': '#FFF0F6',
        'charcoal': '#9D174D',
        'salmon': '#FF1493',
        'border-gray': '#FFC1DC',
        'bubblegum': '#FF69B4',
        'glam-gold': '#FFD700',
        'lavender': '#F3E8FF',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        'heading': ['"Baloo 2"', 'Poppins', 'sans-serif'],
        'script': ['Pacifico', 'cursive'],
      },
      boxShadow: {
        'glam': '0 4px 20px rgba(255, 20, 147, 0.25)',
        'glam-lg': '0 8px 30px rgba(255, 20, 147, 0.35)',
      },
    },
  },
  plugins: [],
}
