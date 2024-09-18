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
        barlow: ["Barlow", "sans-serif"],
      },
      screens: {
        belowSm: { raw: "(max-width: 640px)" },
        "bsm-h600": { raw: "(max-width: 640px) and (max-height: 600px)" },
        "sm-h700": {
          raw: "(min-width: 640px) and (max-width: 767px) and (max-height: 700px)",
        },
        "md-h700": {
          raw: "(min-width: 768px) and (max-width: 1023px) and (max-height: 700px)",
        },
        "lg-h700": {
          raw: "(min-width: 1024px) and (max-width: 1279px) and (max-height: 700px)",
        },
        "md-lg-minh800": {
          raw: "(min-width: 768px) and (max-width: 1023px) and (min-height: 800px)",
        },
        "lg-xl-minh800": {
          raw: "(min-width: 1024px) and (max-width: 1279px) and (min-height: 800px)",
        },
        "xl-h700": { raw: "(min-width: 1280px) and (max-height: 700px)" },
        // "lg-h600": { raw: "(min-width: 1024px) and (max-height: 600px)" },
        "xl-minh700": { raw: "(min-width: 1280px) and (min-height: 700px)" },
      },
    },
  },
  plugins: [],
};
