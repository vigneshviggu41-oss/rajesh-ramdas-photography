import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#090909",
          soft: "#111111",
          elevated: "#181818",
          subtle: "#222222",
        },
        paper: {
          DEFAULT: "#F2EFE8",
          dim: "rgba(242, 239, 232, 0.72)",
          muted: "rgba(242, 239, 232, 0.45)",
          faint: "rgba(242, 239, 232, 0.18)",
        },
        muted: "#92908B",
        accent: {
          DEFAULT: "#B6A586",
          hover: "#C8B99D",
          gold: "#D4AF37",
          dim: "rgba(182, 165, 134, 0.15)",
        },
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "Cinzel", "serif"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "Newsreader", "Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.24em",
        luxury: "0.32em",
        tightest: "-0.06em",
      },
      lineHeight: {
        headline: "0.82",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
