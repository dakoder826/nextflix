/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#1B3B6F",
        "primary-light": "#114B79",
        "text-light": "#dee2e6",
        "text-dark": "#adb5bd",
        "background-dark": "#343a40",
        "background-darker": "#2b3035",
        "background-darkest": "#212529",
        "red-light": "#f03e3e",
        "red-dark": "#b21010",
        "icon-hover": "#5D93AB",
        "favorite-light": "#25A244",
        "favorite-dark": "#1A7431",
      },
    },
  },
  plugins: [],
};
