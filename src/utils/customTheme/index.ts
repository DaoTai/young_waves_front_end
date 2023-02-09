import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
   myColor: {
      text: "#333",
      white: "#fff",
      textSecondary: "#00000099",
      bg: "#f5f5f5",
      bgGray: "#eee",
      bgGradient: "linear-gradient(to bottom, #4568dc, #b06ab3)",
      link: "#2196f3",
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
               color: "#333",
            },
            fullWidth: {
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
            root: {
               color: "#333",
            },
            h1: {
               textShadow: "1px 1px 1px rgb(0,0,0,0.2)",
               letterSpacing: "2px",
            },
            h2: {
               textShadow: "1px 1px 1px rgb(0,0,0,0.2)",
               letterSpacing: "2px",
            },
            h3: {
               textShadow: "1px 1px 1px rgb(0,0,0,0.2)",
               letterSpacing: "2px",
            },
         },
      },
      MuiChip: {
         styleOverrides: {
            root: {
               backgroundColor: "rgb(181 176 176 / 14%)",
            },
         },
      },
   },
});
