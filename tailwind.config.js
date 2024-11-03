/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: 'class', // Enable dark mode using 'class'
  theme: {
      extend: {
          fontFamily: {
              kumbhSans: ["Kumbh Sans", "sans-serif"],
          },
      },
  },
  plugins: [],
};