import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors
        dark: {
          900: "#0c1626", // Darkest (header, footer, dark sections)
          800: "#16263f", // Dark gradient/cards
        },
        accent: {
          gold: "#c6a25f", // Primary accent (buttons, highlights)
          light: "#d8bd86", // Lighter gold (hover, transitions)
        },
        text: {
          light: "#f4f1ea", // Text on dark backgrounds
          dark: "#1d2330", // Text on light backgrounds
        },
        bg: {
          cream: "#fbfaf6", // Light background (catalog pages)
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"], // Luxury serif for headlines
        sans: ["Lato", "sans-serif"], // Clean sans for English
        body: ["var(--font-vazirmatn)", "Vazirmatn", "Tahoma", "sans-serif"], // Farsi
      },
      spacing: {
        "section-xs": "1.5rem", // 24px
        "section-sm": "2rem", // 32px
        "section-md": "3rem", // 48px
        "section-lg": "4rem", // 64px
        "section-xl": "6rem", // 96px
      },
      lineHeight: {
        relaxed: "1.9", // Extra relaxed for Farsi text
        tighter: "1.2",
      },
      letterSpacing: {
        luxury: "0.15em", // 2.4px at 16px font
        wide: "0.05em",
      },
      opacity: {
        85: "0.85",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        zoomSlow: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
        slideIn: "slideIn 0.4s ease-out",
        zoomSlow: "zoomSlow 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
