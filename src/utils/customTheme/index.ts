import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
   myColor: {
      text: "#333",
      textSecondary: "#00000099",
      bg: "#f5f5f5",
      bgGray: "#eee",
      bgGradient: "linear-gradient(to bottom, #4568dc, #b06ab3)",
   },
   palette: {
      secondary: {
         main: "#ff66ff",
      },
      primary: {
         main: "#00b0ff",
      },
   },
   components: {
      MuiButton: {
         styleOverrides: {
            root: {
               backgroundColor: "#00b0ff",
               textTransform: "unset",
               color: "#fff",
               fontSize: "18px",
            },
         },
      },
      MuiTextField: {
         styleOverrides: {
            root: { color: "#333" },
         },
      },
      MuiTypography: {
         styleOverrides: {
            h3: {
               letterSpacing: "2px",
            },
         },
      },
   },
});
