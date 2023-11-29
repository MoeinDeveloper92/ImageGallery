/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '300px',
        md: '600px',
        xl: "1220px",
        bg: "960px"
      }
    },
  },
  plugins: [require("daisyui")],
}