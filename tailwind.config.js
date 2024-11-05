/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'regal-yellow': '#fec00b',
      },
      backgroundColoralt : {
        'regal-yellow': '#fec00b'

      },
      backgroundColormain : {
        'regal-green' : '#007863'
      },
      borderWidth : {
        'border-widht' : '40px'
      },
      bgcl : {
        'bg-clr' : '#09a58c'
      }  
    },
  },
  plugins: [],
}