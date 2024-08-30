/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 100% 90%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-blue': 'rgb(52, 144, 220)', // Ejemplo de color azul en formato RGB
        'custon-mutta-green': 'rgb(223, 255, 103)', // Ejemplo de color verde en formato RGB
      },
    },
  },
  plugins: [],
};
