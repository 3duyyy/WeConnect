/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontSize: {
        10: "10px",
      },
      colors: {
        dark: {
          100: "#4B465C",
          200: "#F8F7FA",
          300: "#DBDADE",
        },
        primary: {
          main: "#246AA3",
        },
      },
    },
  },
  plugins: [],
};
