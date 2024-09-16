/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#E4F4FB",
          100: "#C9E9F8",
          200: "#93D3F1",
          300: "#5DBDEA",
          400: "#26A7E3",
          500: "#1780B0",
          600: "#105A7B",
          700: "#0C415A",
          800: "#082E3F",
          900: "#041720",
          950: "#020A0E",
        },
      },
      boxShadow: {
        "custom-right": "10px 0 15px rgba(0, 0, 0, 0.2)", // Sombra hacia la derecha
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
