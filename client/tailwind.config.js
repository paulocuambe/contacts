const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      blue: colors.blue,
      black: colors.black,
      gray: colors.gray,
    },
  },
  plugins: [],
}
