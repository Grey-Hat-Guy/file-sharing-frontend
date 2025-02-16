/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#1E3A8A',
        },
        mint: {
          DEFAULT: '#3EB489',
        },
      },
    },
  },
  plugins: [],
}

