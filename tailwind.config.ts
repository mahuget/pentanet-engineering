import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#102A43", dark: "#0a1e30", light: "#1a3d5c" },
        sky: { DEFAULT: "#38BDF8", dark: "#0ea5e9", light: "#7dd3fc" },
        teal: { DEFAULT: "#14B8A6", dark: "#0d9488", light: "#5eead4" },
        emerald: { DEFAULT: "#22C55E", dark: "#16a34a", light: "#86efac" },
        cloud: "#F8FAFC",
        "soft-gray": "#E2E8F0",
        graphite: { DEFAULT: "#171C26", light: "#232a38", surface: "#1e2535" },
        "brand-orange": "#F97316",
        // Keep gold for logo accent (minimally used)
        gold: { DEFAULT: "#F97316", light: "#fdba74", dark: "#ea580c" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.75rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #38BDF8 0%, #14B8A6 100%)",
        "gradient-dark": "linear-gradient(135deg, #102A43 0%, #171C26 100%)",
        "gradient-hero-light": "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.07)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.1), 0 16px 40px rgba(0,0,0,0.12)",
        sky: "0 4px 20px rgba(56,189,248,0.3)",
        teal: "0 4px 20px rgba(20,184,166,0.3)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
