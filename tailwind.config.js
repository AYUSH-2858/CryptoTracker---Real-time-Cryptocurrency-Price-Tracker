/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#0052FE',
        },
        green: {
          500: '#16C784',
        },
        red: {
          500: '#EA3943',
        },
      },
      animation: {
        'price-up': 'priceUp 1.5s ease',
        'price-down': 'priceDown 1.5s ease',
      },
    },
  },
  plugins: [],
};