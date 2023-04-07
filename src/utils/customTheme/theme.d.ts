import { ThemeOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
   interface Theme {
      myColor: {
         text: string;
         textSecondary: string;
         bgGradient: string;
         bg: string;
         bgGray: string;
         link: string;
         white: string;
         black: string;
      };
   }
   // allow configuration using `createTheme`
   interface ThemeOptions {
      myColor: {
         text: string;
         textSecondary: string;
         bgGradient: string;
         bg: string;
         bgGray: string;
         link: string;
         white: string;
         black: string;
      };
   }
}
