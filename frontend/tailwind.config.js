/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("tailwindcss-debug-screens")],
  theme: {
    debugScreens: {
      position: ["bottom", "left"],
      style: {
        backgroundColor: "#C0FFEE",
        color: "black",
        // ...
      },
    },
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        merriweather: ["Merriweather", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        caveat: ["Caveat", "cursive"],
        kalam: ["Kalam", "cursive"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        // Custom breakpoint for width >= 640px and height >= 500px
        "lg-h700": { raw: "(min-width: 1024px) and (max-height: 700px)" },
        belowSm: { raw: "(max-width: 640px)" },
        "lg-h600": { raw: "(min-width: 1024px) and (max-height: 600px)" },
        "xl-minh700": { raw: "(min-width: 1280px) and (min-height: 700px)" },
        "md-h700": { raw: "(min-width: 768px) and (max-height: 700px)" },
        "sm-h700": { raw: "(min-width: 640px) and (max-height: 700px)" },
      },
    },
  },
  plugins: [],
};
