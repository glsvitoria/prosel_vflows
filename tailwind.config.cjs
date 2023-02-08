/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.tsx', './index.html'],
   theme: {
     extend: {
      fontFamily: {
         primary: ['Inter', 'sans-serif']
      },
      colors: {
         no_black: '#030303',
         vflows_green: '#03A64D',
         background: '#EFF0E2',
         button_blue: '#2C70B9',
         button_green: '#67685A',
         table_header: '#AAAAAA',
         disabled: '#BBBBBB',
         next: '#008B47',
         previous: '#FFBE00',
         line_1: '#EEE',
         line_2: '#DDD',
         error: '#FF0000'
      }
     },
     screens: {
      'xs': '360px',
      'sm': '480px',
      'md': '640px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1280px',
      '3xl': '1440px',
   },
   },
   plugins: [],
}