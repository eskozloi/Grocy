import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        black: {
          4: "#F5F5F5",
          6: "#F0F0F0",
          8: "#EAEAEA",
          20: "#CCCCCC",
          40: "#999999",
          60: "#656565",
          80: "#303030",
        },
        green: {
          lime: "#99FF99",
        },
        yellow: {
          light: "#FFE69A",
        },
      },
    },
  },
  extract: {
    include: ["src/**/*.{js,ts,jsx,tsx,vue}"],
    exclude: ["node_modules", ".git"],
  },
});
