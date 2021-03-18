const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.vue", "./src/**/*.js"],
  darkMode: false,
  theme: {
    extend: {},
    screens: {
      ...defaultTheme.screens,
      "2xl": "1280px",
    },
  },
  variants: {},
  plugins: [],
};
