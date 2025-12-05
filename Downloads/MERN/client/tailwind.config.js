/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        noteYellow: '#FEF68A',
        noteBlue: '#AECBFA',
        noteGreen: '#CCF2F4',
        notePink: '#F8BBD0',
        noteGrey: '#E8EAED',
      },
    },
  },
  plugins: [],
}

