import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          100: "#003468",
          200: "#232323",
        },
        secondary: {
          100: "#ed6736",
          200: "#89171b",
        },
        yellow: {
          100: "#f7d999",
          200: "#cf9b5c",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
