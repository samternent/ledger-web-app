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
        concordsdark: {
          ...require("daisyui/src/colors/themes")["[data-theme=business]"],
          primary: "#59C3C3",
          secondary: "#84A98C",
          accent: "#92DCE5",
          neutral: "#3d4451",
          "base-100": "#242423",
          "base-200": "#272726",
          "base-300": "#30302e",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.2rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          "--animation-btn": "0.25s", // duration of animation when you click on button
          "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "uppercase", // set default text transform for buttons
          "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          "--border-btn": "1px", // border width of buttons
          "--tab-border": "1px", // border width of tabs
          "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
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
