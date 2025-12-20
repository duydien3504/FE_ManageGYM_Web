/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#C9D862",
        "moss-deep": "#0c120e",
        "moss-surface": "#151f17",
        "moss-card": "#1e2921",
        "moss-border": "#2a382d",
        "moss-text": "#e4e9e5",
        "moss-muted": "#8fa093",
      },
      fontFamily: {
        display: ["Spline Sans", "sans-serif"],
        sans: ["Spline Sans", "sans-serif"],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
