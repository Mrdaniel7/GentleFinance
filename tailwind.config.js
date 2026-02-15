/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#f2d00d",
        "background-light": "#f8f8f5",
        "background-dark": "#221f10",
        "surface-dark": "#2d2915",
        "neutral-dark": "#3d3820",
        "charcoal": "#0a0a05",
        "card-dark": "#2d2a16",
        "luxury-black": "#0c0b05",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
