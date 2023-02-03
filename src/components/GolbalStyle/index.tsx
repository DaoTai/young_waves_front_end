import { GlobalStyles } from "@mui/material";
const GlobalStyle = () => {
   return (
      <GlobalStyles
         styles={(theme) => ({
            html: {
               scrollBehavior: "smooth",
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
            body: {
               lineHeight: 1.5,
               textRendering: "optimizeSpeed",
               backgroundColor: theme.myColor.bg,
            },
            a: {
               color: theme.palette.primary.main,
               textDecoration: "none",
               transition: "0.3s ease all",
               "&:hover": {
                  opacity: 0.8,
               },
            },
            div: {
               transition: "0.3s ease all",
            },
            img: {
               transition: "0.3s ease-in all",
               "&:hover": {
                  opacity: 0.8,
               },
            },
         })}
      />
   );
};

export default GlobalStyle;
