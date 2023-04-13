import { Box, styled } from "@mui/material";
export const LayOutWrapper = styled(Box)(({ theme }) => ({
   position: "fixed",
   inset: "0 0 0 0",
   zIndex: 999999,
   backgroundColor: "rgba(0,0,0,0.5)",
   backdropFilter: "blur(2px)",
   ".MuiBox-root": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      height: "calc(100% - 32px)",
      backgroundColor: "transparent",
      img: {
         width: "100%",
         height: "100%",
         objectFit: "contain",
         borderRadius: "8px",
         transition: "all 0.3s linear",
      },
   },
}));
