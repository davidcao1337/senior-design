/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lyfeon-green': '#18B283'
      },
    },
  },
  plugins: [
    require("daisyui")
  ],
}
