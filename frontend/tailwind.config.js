/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Manrope', 'Quicksand', 'Roboto', 'SN Pro', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}