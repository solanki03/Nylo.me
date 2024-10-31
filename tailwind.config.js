/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: 'class', // Enables dark mode based on the 'dark' class
  theme: {
    extend:{
      fontFamily: {
        kumbhSans: ["Kumbh Sans", "sans-serif"],  
      },
    },
  },
  plugins: [],
}