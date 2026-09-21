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
        // Background layers
        bg: {
          base: "#090A0C",
          surface: "#0F1117",
          elevated: "#14181F",
          overlay: "#1A1F2A",
        },
        // Border
        border: {
          DEFAULT: "#1E2230",
          subtle: "#161921",
          strong: "#2A3045",
        },
        // Text
        text: {
          primary: "#E8EAF0",
          secondary: "#8B90A8",
          muted: "#555B72",
          inverse: "#090A0C",
        },
        // Semantic
        signal: {
          support: "#16A34A",
          "support-bg": "#052E16",
          "support-border": "#166534",
          "support-text": "#4ADE80",
          conflict: "#DC2626",
          "conflict-bg": "#2D0A0A",
          "conflict-border": "#991B1B",
          "conflict-text": "#F87171",
          unresolved: "#D97706",
          "unresolved-bg": "#2D1A00",
          "unresolved-border": "#92400E",
          "unresolved-text": "#FBB040",
          info: "#2563EB",
          "info-bg": "#0D1A3A",
          "info-border": "#1D4ED8",
          "info-text": "#60A5FA",
        },
        // Brand accent
        accent: {
          DEFAULT: "#3B5BFF",
          hover: "#2D4AE8",
          muted: "#1A2A7A",
          text: "#7B93FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.3)",
        elevated: "0 4px 16px 0 rgba(0,0,0,0.5), 0 1px 3px 0 rgba(0,0,0,0.4)",
        drawer: "0 8px 32px 0 rgba(0,0,0,0.6)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-in-right": "slideInRight 0.25s ease-out",
        "slide-in-up": "slideInUp 0.2s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
