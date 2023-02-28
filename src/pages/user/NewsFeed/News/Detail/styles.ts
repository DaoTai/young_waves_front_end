import { styled, Box, ButtonGroup, Grid } from "@mui/material";

export const MyBox = styled(Box)(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   width: "calc(100% - 32px)",
   maxWidth: "90vw",
   maxHeight: "95vh",
   overflow: "auto",
   background: "linear-gradient(180deg, rgba(0,0,0,0.5), #000)",
   border: "1px solid #000",
   borderRadius: 2,
   paddingBottom: 0,
   boxShadow:
      "0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
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
