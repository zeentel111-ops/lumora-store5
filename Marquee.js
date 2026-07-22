/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#0B0B0B",
        charcoal: "#161514",
        "charcoal-2": "#1E1C1A",
        gold: "#D4AF37",
        "gold-light": "#E9CE7A",
        "gold-dim": "#8A7530",
        ivory: "#F7F5F2",
        "ivory-dim": "#C9C4BC",
      },
      fontFamily: {
        ar: ["var(--font-cairo)", "sans-serif"],
        en: ["var(--font-poppins)", "sans-serif"],
      },
      borderColor: {
        line: "rgba(212,175,55,0.22)",
      },
    },
  },
  plugins: [],
};
