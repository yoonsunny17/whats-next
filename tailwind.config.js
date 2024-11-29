/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#D91656",
        sub1: "#FFB200",
      },
      fontFamily: {
        display: ["Bebas Neue", "sans-serif"],
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
