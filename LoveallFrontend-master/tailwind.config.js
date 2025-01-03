/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#71012D',
          secondary: '#971132',
          accent: '#FF6B98',
        },
      },
    },
    plugins: [],
  }