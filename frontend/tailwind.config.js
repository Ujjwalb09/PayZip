/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        merriweather: ["Merriweather", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        caveat: ["Caveat", "cursive"],
        kalam: ["Kalam", "cursive"],
      },
    },
  },
  plugins: [],
};
