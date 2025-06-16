/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#EF4444',
        dark: '#1A202C',
        light: '#F7FAFC',
      },
    },
  },
  plugins: [],
} 