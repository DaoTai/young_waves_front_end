import { GlobalStyles } from "@mui/material";

const GlobalStyle = () => {
  return (
    <GlobalStyles
      styles={(theme) => ({
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          fontFamily: "'Poppins', sans-serif",
          lineHeight: 1.5,
          textRendering: "optimizeSpeed",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        },
        "html *::-webkit-scrollbar": {
          borderRadius: 0,
          width: "8px",
        },
        "html *::-webkit-scrollbar-thumb": {
          borderRadius: "4px",
          backgroundColor: "rgba(0, 0, 0, 0.15)",
        },
        "html *::-webkit-scrollbar-track ": {
          borderRadius: 0,
          backgroundColor: "rgba(0, 0, 0, 0)",
        },
        a: {
          color: theme.palette.link.main,
          fontWeight: 500,
          textDecoration: "none",
          transition: "0.3s ease all",
          "&:hover": {
            opacity: 0.8,
          },
        },
      })}
    />
  );
};

export default GlobalStyle;
