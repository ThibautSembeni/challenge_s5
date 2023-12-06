/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
          carbone: "#263238",
          silver: "#263238",
        },
        gray: {
          DEFAULT: "#D0D3D4",
          cool: {
            1: "#F2F2F2",
            2: "#E6E6E6",
            3: "#D7D7D7",
            5: "#B9B9B9",
            7: "#A0A0A0",
            9: "#747678",
            11: "#4D4F53",
          },
          warm: {
            1: "#E0DED8",
            3: "#C3BEB4",
            5: "#AFA59B",
            7: "#988F86",
            9: "#82786F",
            11: "#675C53",
          },
        },
        orange: {
          DEFAULT: "#FF8A00",
          warning: "#FF6700",
          primary: {
            DEFAULT: "#AF0A00",
          },
        },
        red: {
          DEFAULT: "#D52B1E",
        },
        green: {
          DEFAULT: "#31AA66",
        },
      },
      boxShadow: {
        dropdown: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        "dropdown-light": "0px 0px 2px rgba(255, 255, 255, 0.25)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
    require('@tailwindcss/aspect-ratio')
  ],
}

