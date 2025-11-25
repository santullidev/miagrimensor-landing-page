/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        headline: ['Poppins', 'Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom pastel palette
        sage: {
          DEFAULT: "hsl(var(--sage-green))",
          50: "hsl(138 16% 95%)",
          100: "hsl(138 16% 85%)",
          200: "hsl(138 16% 75%)",
          300: "hsl(138 16% 65%)",
          400: "hsl(138 16% 55%)",
        },
        cream: {
          DEFAULT: "hsl(var(--warm-cream))",
          50: "hsl(40 39% 98%)",
          100: "hsl(40 39% 93%)",
          200: "hsl(40 39% 88%)",
        },
        terracotta: {
          DEFAULT: "hsl(var(--terracotta))",
          50: "hsl(0 38% 85%)",
          100: "hsl(0 38% 74%)",
          200: "hsl(0 38% 64%)",
        },
        green: {
          DEFAULT: "hsl(var(--green))",
          50: "hsl(142 50% 65%)",
          100: "hsl(142 50% 55%)",
          200: "hsl(142 50% 50%)",
          300: "hsl(142 50% 45%)",
          400: "hsl(142 50% 40%)",
          500: "hsl(142 50% 45%)",
          600: "hsl(142 50% 40%)",
        },
        "green-light": {
          DEFAULT: "hsl(var(--green-light))",
          50: "hsl(142 30% 85%)",
          100: "hsl(142 30% 80%)",
          200: "hsl(142 30% 75%)",
          300: "hsl(142 30% 70%)",
          400: "hsl(142 30% 65%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        modern: "0.875rem", /* 14px */
        "modern-lg": "1rem", /* 16px */
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "soft-lg": "0 4px 16px rgba(0, 0, 0, 0.12)",
        "soft-xl": "0 8px 24px rgba(0, 0, 0, 0.15)",
      },
      spacing: {
        section: "5rem", /* 80px */
        "section-lg": "6rem", /* 96px */
      },
      transitionDuration: {
        smooth: "250ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
