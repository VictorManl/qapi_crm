/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.jsx'],
  theme: {
    extend: {
      fontFamily:{
        'Montserrat': ['Montserrat','sans-serif']
      }
    },
  },
  plugins: [require("daisyui")],
}
