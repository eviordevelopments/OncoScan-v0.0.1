import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: {
          50: "#0d131a",
          100: "#090d12",
          200: "#05080c",
          elevated: "rgba(255, 255, 255, 0.03)",
        },
        biotech: {
          cyan: "#00F0FF",
          green: "#00FF9D",
          emerald: "#75E65E",
          magenta: "#EC4899",
          violet: "#8B5CF6",
          amber: "#F59E0B",
        },
        line: {
          subtle: "rgba(255, 255, 255, 0.08)",
          glow: "rgba(0, 240, 255, 0.3)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-pattern": "radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        "cyan-glow": "radial-gradient(circle at center, rgba(0, 240, 255, 0.15) 0%, transparent 70%)",
        "magenta-glow": "radial-gradient(circle at center, rgba(236, 72, 153, 0.12) 0%, transparent 70%)",
        "green-glow": "radial-gradient(circle at center, rgba(0, 255, 157, 0.15) 0%, transparent 70%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "scan-line": "scan 3s ease-in-out infinite",
      },
      keyframes: {
        scan: {
          "0%, 100%": { transform: "translateY(0%)", opacity: "0.2" },
          "50%": { transform: "translateY(100%)", opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
