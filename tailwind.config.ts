import type { Config } from "tailwindcss";
import { theme } from "./src/config/theme";
// let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
// let font_scale = Number(theme.fonts.font_size.scale);
// let h6 = font_base / font_base;
// let h5 = h6 * font_scale;
// let h4 = h5 * font_scale;
// let h3 = h4 * font_scale;
// let h2 = h3 * font_scale;
// let h1 = h2 * font_scale;
// let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
// if (theme.fonts.font_family.primary) {
//   fontPrimary = theme.fonts.font_family.primary
//     .replace(/\+/g, " ")
//     .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
//   fontPrimaryType = theme.fonts.font_family.primary_type;
// }
// if (theme.fonts.font_family.secondary) {
//   fontSecondary = theme.fonts.font_family.secondary
//     .replace(/\+/g, " ")
//     .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
//   fontSecondaryType = theme.fonts.font_family.secondary_type;
// }

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // colors: {
      //   text: theme.colors.default.text_color.default,
      //   light: theme.colors.default.text_color.light,
      //   dark: theme.colors.default.text_color.dark,
      //   primary: theme.colors.default.theme_color.primary,
      //   secondary: theme.colors.default.theme_color.secondary,
      //   body: theme.colors.default.theme_color.body,
      //   border: theme.colors.default.theme_color.border,
      //   "theme-light": theme.colors.default.theme_color.theme_light,
      //   "theme-dark": theme.colors.default.theme_color.theme_dark,
      // },

      // fontFamily: {
      //   primary: [fontPrimary, fontPrimaryType],
      //   secondary: [fontSecondary, fontSecondaryType],
      // },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
  ],
};
export default config;
