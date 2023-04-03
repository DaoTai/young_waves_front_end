import { styled, Box, ButtonGroup, Grid } from "@mui/material";

export const MyBox = styled(Box)(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: "80vw",
   maxWidth: "95vw",
   height: "90vh",
   maxHeight: "90vh",
   overflowY: "auto",
   borderRadius: 4,
   backgroundColor: theme.myColor.white,
   boxShadow:
      "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
   "&::-webkit-scrollbar": {
      display: "none",
   },
}));

export const ButtonSlide = styled(ButtonGroup)(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "0",
   right: "0",
   color: theme.myColor.white,
   transform: "translateY(-50%)",
   borderRadius: 2,
   display: "flex",
   justifyContent: "space-between",
}));

export const Container = styled(Grid)(({ theme }) => ({
   minHeight: "100%",
}));
