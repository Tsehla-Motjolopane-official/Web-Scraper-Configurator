/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22c55e', // green-500
          dark: '#16a34a',   // green-600
          light: '#86efac',  // green-300
        },
        accent: {
          DEFAULT: '#10b981', // emerald-500
          dark: '#059669',   // emerald-600
          light: '#6ee7b7',  // emerald-300
        },
        background: {
          DEFAULT: '#f0fdf4', // green-50
          dark: '#14532d',   // green-900
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#bbf7d0',   // green-200
        },
        text: {
          DEFAULT: '#14532d', // green-900
          light: '#4ade80',   // green-400
        },
      },
    },
  },
  plugins: [],
};
