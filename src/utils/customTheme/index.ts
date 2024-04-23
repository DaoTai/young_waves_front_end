import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
export const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        secondary: {
          main: "#21212100099",
        },
        primary: {
          main: "#00b0ff",
        },
        text: {
          primary: "#333",
        },
        background: {
          default: "#f5f5f5",
        },
        gradient: {
          main: "linear-gradient(to left, #b378b0 15%, #2196f3 100%)",
        },
        white: {
          main: "#fff",
        },
        gray: {
          main: "rgb(240,242,245)",
        },
        link: {
          main: "#2196f3",
        },
        black: {
          main: "#212121",
        },
      },
    },
    dark: {
      palette: {
        secondary: {
          main: "#fff",
        },
        primary: {
          main: "#00b0ff",
        },
        background: {
          default: "#424242",
        },
        gradient: {
          main: "linear-gradient(to left, #2196f3 15%, #b11eaa 100%)",
        },
        white: {
          main: "#212121",
        },
        gray: {
          main: "#bdbdbd",
        },
        link: {
          main: "#2196f3",
        },
        black: {
          main: "#212121",
        },
        text: {
          primary: "#fff",
        },
      },
    },
  },

  typography: {
    allVariants: {
      fontFamily: "'Poppins', sans-serif",
    },

    gradient: {
      background: "linear-gradient(to left, #2196f3 0%, #b11eaa 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "unset",
          color: "#333",
        },
        fullWidth: {
          fontSize: "18px",
        },
        outlined: {
          background: "#00b0ff",
          '[data-mui-color-scheme="dark"] &': {
            color: "#fff",
          },
          "&:hover": {
            backgroundColor: "#fff",
            color: "#333",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          color: "#333",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.3)",
          },
          "&:focus": {
            backgroundColor: "rgba(255,255,255,0.3)",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: 1,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        img: {
          objectPosition: "top",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: { color: "#4caf50" },
        filledSuccess: { color: "#4caf50" },
        outlinedSuccess: { color: "#4caf50" },
        filledError: { color: red[500] },
        outlinedError: { color: red[500] },
        standardError: { color: red[500] },
      },
    },
  },
});
