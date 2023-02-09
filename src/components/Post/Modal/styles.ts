import { Box, styled } from "@mui/material";

export const MyBox = styled(Box)(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   minWidth: "60vw",
   maxHeight: "90vh",
   overflow: "auto",
   backgroundColor: "#fff",
   border: "1px solid #000",
   padding: "24px",
   borderRadius: 2,
   boxShadow:
      "box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%), 0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%)",
}));
