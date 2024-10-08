import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#222222",
        "primary-hover": "#111111",
        "primary-light": "#eeeeee",
        "primary-light-hover": "#dddddd",
      },
    },
    screens: { xs: "550px", sm: "640px", md: "768px" },
  },
  plugins: [],
};
export default config;
