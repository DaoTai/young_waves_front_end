import React from "react";
import { styled, Typography } from "@mui/material";
const OverlayBackground = ({ amount }: { amount?: number }) => {
   const MyDiv = styled("div")({
      position: "absolute",
      inset: "0 0 0 0",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
   });
   return (
      <MyDiv>
         <Typography
            variant="h4"
            textAlign="center"
            color="#fff"
            sx={{ textShadow: "1px 1px 4px rgba(255,255,255,0.3)" }}>
            {amount}+
         </Typography>
      </MyDiv>
   );
};

export default OverlayBackground;
