import { defineConfig } from "windicss/helpers";

export default defineConfig({
  theme: {
    extend: {
      colors: {
        black: {
          4: "#F5F5F5",
          6: "#F0F0F0",
          8: "#EAEAEA",
          40: "#999999",
          60: "#656565",
          80: "#303030",
        },
      },
      /* fontSize: {
        xs: "0.875em",
        s: "1em",
        base: "1.25em",
        l: "1.5em",
        xl: "2em",
        "2xl": "4em",
      }, */
      /* letterSpacing: {
        normal: "-0.02em",
        wide: "0em",
      },
      lineHeight: {
        normal: "1.25em",
      },
      screens: {
        // eslint-disable-next-line quote-props
        md: "834px",
        // eslint-disable-next-line quote-props
        sm: "414px",
      }, */
    },
  },
  extract: {
    include: ["src/**/*.{js,ts,jsx,tsx,vue}"],
    exclude: ["node_modules", ".git"],
  },
});
