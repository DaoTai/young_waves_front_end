import { Paper, styled, Stack, Avatar, Box } from "@mui/material";

export const MyChatBox = styled(Paper)(({ theme }) => ({
   position: "relative",
   width: "328px",
   maxWidth: "330px",
   height: "460px",
   padding: 0,
   boxShadow: theme.shadows[2],
   backgroundColor: theme.myColor.white,
   overflowY: "hidden",
}));

export const Heading = styled(Stack)(({ theme }) => ({
   position: "absolute",
   top: 0,
   right: 0,
   left: 0,
   zIndex: 2,
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
   padding: "55px 0",
   overflowY: "auto",
   overflowX: "hidden",
   height: "100%",
   maxWidth: "100%",
}));

export const Footer = styled(Stack)(({ theme }) => ({
   position: "absolute",
   bottom: 0,
   right: 0,
   left: 0,
   zIndex: 2,
   gap: 8,
   padding: 2,
   flexDirection: "row",
   justifyContent: "space-between",
   alignItems: "center",
   color: theme.myColor.text,
   backgroundColor: theme.myColor.white,
   ".MuiInputBase-root": {
      boxShadow: "0px 0px 4px rgba(0,0,0,0.1)",
      flexGrow: 2,
      borderRadius: 0,
      outlined: 0,
   },
   "#send-icon": {
      color: theme.palette.primary.main,
      borderRadius: "50%",
      width: 42,
      height: 42,
      padding: 8,
      cursor: "pointer",
      transition: "0.3s linear all",
      "&:hover": {
         boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
         opacity: 0.8,
      },
   },
}));

export const Floating = styled(Avatar)(({ theme }) => ({
   position: "fixed",
   bottom: 15,
   right: 15,
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
