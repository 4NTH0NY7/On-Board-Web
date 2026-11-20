import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fondo general de la web (un negro con un levísimo tinte azulado)
        background: "rgb(var(--bg) / <alpha-value>)",
        // El azul marino profundo del logo (para bordes y tarjetas)
        surface: "rgb(var(--surface) / <alpha-value>)",
        // Blanco y grises
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        
        // 🔥 AQUÍ ESTÁ LA MAGIA: Sobrescribimos los azules de Tailwind
        blue: {
          400: "#5289BA", // Azul claro (para textos hover)
          500: "#346595", // Azul Acero / Medio (el de la "o" del logo)
          600: "#254B70", // Azul Marino (el de la "b" y los botones principales)
          900: "#0D1B33", // Azul casi negro (el de la base)
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 1.2s ease both",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;