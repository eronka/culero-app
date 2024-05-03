/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("./colors");

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  variants: {
    backgroundColor: [
      "responsive",
      "hover",
      "focus",
      "active",
      "disabled",
      "enabled",
    ],
    textColor: [
      "responsive",
      "hover",
      "focus",
      "active",
      "disabled",
      "enabled",
    ],
  },
  theme: {
    colors: colors,
    extend: {
      borderRadius: {
        sm: "5px",
        md: "10px",
        lg: "15px",
        "3xl": "30px",
      },
      fontFamily: {
        inter: ["Inter_400Normal", "system-ui", "sans-serif"],
        "inter-thin": ["Inter_100Thin", "Inter", "system-ui", "sans-serif"],
        "inter-extra-light": [
          "Inter_200ExtraLight",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "inter-light": ["Inter_300Light", "Inter", "system-ui", "sans-serif"],
        "inter-normal": ["Inter_400Normal", "Inter", "system-ui", "sans-serif"],
        "inter-medium": ["Inter_500Medium", "Inter", "system-ui", "sans-serif"],
        "inter-semi-bold": [
          "Inter_600SemiBold",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "inter-bold": ["Inter_700Bold", "Inter", "system-ui", "sans-serif"],
        "inter-extra-bold": [
          "Inter_800ExtraBold",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "inter-black": ["Inter_900Black", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
