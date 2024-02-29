/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      screens:{
        'mb':{'min':'320px','max':'480px'}
      }
    },
  },
  plugins: [],
}

