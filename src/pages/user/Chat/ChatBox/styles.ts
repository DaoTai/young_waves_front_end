import { Avatar, Box, Stack, styled } from "@mui/material";

export const MyChatBox = styled(Stack)(({ theme }) => ({
   position: "relative",
   zIndex: 10,
   flexDirection: "column",
   justifyContent: "space-between",
   width: "328px",
   maxWidth: "330px",
   height: "460px",
   padding: 0,
   boxShadow: theme.shadows[2],
   backgroundColor: theme.myColor.white,
   overflow: "hidden",
}));

export const Heading = styled(Stack)(({ theme }) => ({
   padding: 4,
   maxHeigh: 50,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   boxShadow: "1px 0px 4px rgba(0,0,0,0.2)",
   color: theme.myColor.text,
   backgroundColor: theme.myColor.white,
   ".MuiListItem-root": {
      cursor: "pointer",
      borderRaidus: 4,
      "&:hover": {
         opacity: 0.8,
         backgroundColor: theme.myColor.bg,
         color: theme.palette.primary.main,
      },
   },
}));

export const Body = styled(Box)(({ theme }) => ({
   overflowX: "hidden",
   "&::-webkit-scrollbar": {
      display: "none",
   },
   ".message": {
      maxWidth: "90%",
      whitespace: "pre-wrap",
      borderRadius: 16,
      padding: 8,
      wordBreak: "break-word",
      color: theme.myColor.white,
      background: theme.myColor.bgGradient,
      "&[href^='http']": {
         textDecoration: "underline",
      },
      "&.message--friend": {
         background: theme.myColor.link,
      },
   },
}));

export const Footer = styled(Stack)(({ theme }) => ({
   gap: 8,
   padding: 4,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   color: theme.myColor.text,
   backgroundColor: theme.myColor.white,
   ".MuiInputBase-root": {
      boxShadow: theme.shadows[1],
      flexGrow: 2,
      borderRadius: 16,
   },
   "#send-icon": {
      color: theme.palette.primary.main,
      borderRadius: "50%",
      width: 42,
      height: 42,
      padding: 8,
      cursor: "pointer",
      transform: "rotate(-10deg)",
      transition: "0.3s linear all",
      "&:hover": {
         boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
         opacity: 0.8,
      },
   },
}));

export const Floating = styled(Avatar)(({ theme }) => ({
   position: "relative",
   padding: 2,
   zIndex: 99999,
   width: 56,
   height: 56,
   borderRadius: "50%",
   cursor: "pointer",
   boxShadow: "1px 0px 4px rgba(0,0,0,0.2)",
   img: {
      borderRadius: "50%",
   },
   "&:hover": {
      opacity: 0.8,
   },
}));
