import { ThemeOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
   interface Theme {
      myColor: {
         text: string;
         bgGradient: string;
         bg: string;
      };
   }
   // allow configuration using `createTheme`
   interface ThemeOptions {
      myColor: {
         text: string;
         bgGradient: string;
         bg: string;
      };
   }
}
