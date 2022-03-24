const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true,
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        one: "var(--color-a)",
        two: "var(--color-b)",
        three: "var(--color-c)",
        four: "var(--color-d)",
        "primary-bg": "var(--background-primary)",
        "secondary-bg": "var(--background-sec)",
        "primary-text": "var(--color-text-primary)",
        "secondary-text": "var(--color-text-sec)",
      },
      blur: {
        xs: "2px",
        x: {
          sm: "0 2px",
        },
      },
      height: (theme) => ({
        auto: "auto",
        ...theme("spacing"),
        full: "100%",
        screen: "calc(var(--vh) * 100)",
      }),
      minHeight: (theme) => ({
        0: "0",
        ...theme("spacing"),
        full: "100%",
        screen: "calc(var(--vh) * 100)",
      }),
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
    }),
  },
  variants: {
    backgroundColor: ["active"],
    variants: {
      animation: ["responsive", "motion-safe", "motion-reduce"],
    },
  },
  daisyui: {
    themes: [
      {
        concordslight: {
          primary: "#227c9d",
          secondary: "#17c3b2",
          accent: "#fe6d73",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          "base-200": "#fefefd",
          "base-300": "#faf9f9",
          "control-100": "#242423",
          "control-200": "#272726",
          "control-300": "#30302e",
        },
        concordsdark: {
          primary: "#227c9d",
          secondary: "#17c3b2",
          accent: "#fe6d73",
          neutral: "#3d4451",
          "base-100": "#242423",
          "base-200": "#272726",
          "base-300": "#30302e",
        },
      },
      "light",
      "dark",
      "cupcake",
      "business",
    ],
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("daisyui"),
  ],
};
