// tailwind.config.js
export default {
  darkMode: "class", // 👈 REQUIRED for theme toggle
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: "scroll 12s linear infinite",
      },
    },
  },
  plugins: [],
};
