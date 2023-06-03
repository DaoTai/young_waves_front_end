import { ThemeOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
   interface Palette extends MuiPallete {
      gradient: Palette["primary"];
      white: Palette["primary"];
      gray: Palette["primary"];
      link: Palette["primary"];
      black: Palette["primary"];
   }

   interface PaletteOptions extends MuiPallete {
      gradient: PaletteOptions["primary"];
      white: PaletteOptions["primary"];
      gray: PaletteOptions["primary"];
      link: PaletteOptions["primary"];
      black: PaletteOptions["primary"];
   }
}
declare module "@mui/material/styles" {
   interface TypographyVariants {
      gradient: React.CSSProperties;
   }

   // allow configuration using `createTheme`
   interface TypographyVariantsOptions {
      gradient?: React.CSSProperties;
   }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
   interface TypographyPropsVariantOverrides {
      gradient: true;
   }
}
