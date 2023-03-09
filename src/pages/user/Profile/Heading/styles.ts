import { styled } from "@mui/material";
import { Button } from "@mui/material";
export const WrapAvatar = styled(Button)((theme) => ({
   position: "relative",
   cursor: "pointer",
   backgroundColor: "transparent !important",
   transition: "0.2s ease all",

   ".image-input": {
      position: "absolute",
      top: "50%",
      bottom: "50%",
      transform: "scale(0,0)",
      transition: "0.2s ease all",
   },
   "&:hover": {
      opacity: 0.8,
      ".image-input": {
         transform: "scale(1,1)",
      },
   },
}));
