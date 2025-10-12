import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#3C494E",
        keppel: "#00B39F",
        saffron: "#EBC017"
      },
      fontFamily: {
        sans: ["'Inter Variable'", "system-ui", "sans-serif"],
        display: ["'Urbanist Variable'", "system-ui", "sans-serif"]
      },
      animation: {
        "fade-in": "fadeIn 400ms ease-in forwards",
        "slide-up": "slideUp 500ms ease-out forwards"
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" }
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  }
}

export default config
