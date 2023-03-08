/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-mono': ["'Roboto Mono'", 'monospace'],
        'montserrat': ["'Montserrat'", 'sans-serif'],
        'coding': ["'Nanum Gothic Coding'", 'monospace'],
        // 'josefin': `"Josefin Slab", serif`,
      },
    },
  },
  plugins: [],
}
