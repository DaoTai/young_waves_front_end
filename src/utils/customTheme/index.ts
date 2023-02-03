import { createTheme } from "@mui/material";

export const customTheme = createTheme({
   myColor: {
      text: "#333",
      bg: "#f5f5f5",
      bgGradient: "linear-gradient(to bottom, #4568dc, #b06ab3)",
   },
   palette: {
      secondary: {
         main: "#ff66ff",
      },
      primary: {
         main: "#2196f3",
      },
   },
});
