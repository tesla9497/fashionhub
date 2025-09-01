/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "oklch(1 0 0)",
        foreground: "oklch(0.145 0 0)",
        card: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.145 0 0)",
        },
        popover: {
          DEFAULT: "oklch(1 0 0)",
          foreground: "oklch(0.145 0 0)",
        },
        primary: {
          DEFAULT: "oklch(0.205 0 0)",
          foreground: "oklch(0.985 0 0)",
        },
        secondary: {
          DEFAULT: "oklch(0.97 0 0)",
          foreground: "oklch(0.205 0 0)",
        },
        muted: {
          DEFAULT: "oklch(0.97 0 0)",
          foreground: "oklch(0.556 0 0)",
        },
        accent: {
          DEFAULT: "oklch(0.97 0 0)",
          foreground: "oklch(0.205 0 0)",
        },
        destructive: {
          DEFAULT: "oklch(0.577 0.245 27.325)",
          foreground: "oklch(0.577 0.245 27.325)",
        },
        border: "oklch(69.926% 0.00008 271.152)",
        input: "oklch(0.922 0 0)",
        ring: "oklch(69.926% 0.00008 271.152)",
        chart: {
          1: "oklch(0.646 0.222 41.116)",
          2: "oklch(0.6 0.118 184.704)",
          3: "oklch(0.398 0.07 227.392)",
          4: "oklch(0.828 0.189 84.429)",
          5: "oklch(0.769 0.188 70.08)",
        },
        sidebar: {
          DEFAULT: "oklch(0.985 0 0)",
          foreground: "oklch(0.145 0 0)",
          primary: "oklch(0.205 0 0)",
          "primary-foreground": "oklch(0.985 0 0)",
          accent: "oklch(0.97 0 0)",
          "accent-foreground": "oklch(0.205 0 0)",
          border: "oklch(0.922 0 0)",
          ring: "oklch(0.708 0 0)",
        },
        // Soft lavender colors matching the image aesthetic
        lavender: {
          50: "oklch(0.99 0.005 300)",
          100: "oklch(0.97 0.01 300)",
          200: "oklch(0.94 0.015 300)",
          300: "oklch(0.9 0.02 300)",
          400: "oklch(0.85 0.025 300)",
          500: "oklch(0.8 0.03 300)",
        },
      },
      borderRadius: {
        DEFAULT: "0.625rem",
        sm: "calc(0.625rem - 4px)",
        md: "calc(0.625rem - 2px)",
        lg: "0.625rem",
        xl: "calc(0.625rem + 4px)",
      },
    },
  },
  plugins: [],
};
