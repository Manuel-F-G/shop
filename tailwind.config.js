/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}" // ← ¡ESTO!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
