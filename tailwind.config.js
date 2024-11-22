import innerBorderPlugin from "tailwindcss-inner-border";
import animatedPlugin from "tailwindcss-animated";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // use it to name color https://colors.artyclick.com/color-name-finder/
    colors: {
      white: "#ffffff",
      transparent: "transparent",
      black: "#000000",
      woodSmoke: "#0C0E0F",
      darkGrey: "#383838",
      battleshipGrey: "#818181",
      charcoalGrey: "#3E4246",
      grey: "#909090",
      regentGrey: "#8F99A8",
      bluishGrey: "#7E8D9C",
      ironsideGrey: "#666666",
      mirage: "#171A1C",
      balticSea: "#292D30",
      zeus: "#222527",
      liver: "#4B4C4D",
      darkCoral: "#CC4E4E",
      brightSun: "#FCD34D",
      cornflowerBlue: "#7393F2",
      parisGreen: "#4CD48B",
      aquaHaze: "#F3F3F3",
      boulder: "#757B80",
    },
    extend: {
      backgroundImage: {
        parisGreenGradient: "linear-gradient(90deg, #4CD48B 0%, #778CFC 100%);",
      },
      padding: {
        4.5: "18px",
        5.5: "22px",
        6.5: "26px",
        7.5: "30px",
        9.5: "38px",
      },
      margin: {
        4.5: "18px",
        5.5: "22px",
        6.5: "26px",
        7.5: "30px",
        9.5: "38px",
      },
    },
  },
  plugins: [animatedPlugin, innerBorderPlugin],
};
