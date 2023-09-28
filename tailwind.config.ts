import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui_components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      black: "#000000",
      primary: "#010101",
      grey: "#EDF2F7",
      primaryBlack: "#282826",
      white: "#FFFFFF",
      borderGrey: "#E0E0E0",
      success: "#42A153",
      successBorder: "#BFE3C2",
      warning: "#DC9B11",
      warningBorder: "#F0D399",
      error: "#E11900",
      errorBorder: "#F9D1CC",
      headingText: "#010101",
    },
  },
  plugins: [],
};
export default config;
