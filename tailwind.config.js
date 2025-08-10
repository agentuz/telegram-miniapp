export default {
  content: ["./index.html", "./**/*.{ts,tsx}"],,
  theme: {
    extend: {
      colors: {
        usdbg: "#1F1F1F",
        usdgreen: "#27AE60",
        usdblue: "#3498DB"
      },
      borderRadius: { card: "16px" }
    }
  },
  plugins: []
};
