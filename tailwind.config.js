module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        fill: "fill",
      },
      colors: {
        dark: "#2b2b2b",
        darkHover: "#363636",
        gray: "#cccccc",
        disabled: "rgba(0, 0, 0, 0.26)",
        commentGray: "#89898a",
        commentDateGray: "#b6b6b6",
      },
      backgroundImage: {
        hero: "url('../assets/img/hero.jpg')",
      },
    },
  },
  plugins: [],
};
