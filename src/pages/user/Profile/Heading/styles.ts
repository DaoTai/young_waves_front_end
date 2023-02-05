import { styled } from "@mui/material";
import { Button } from "@mui/material";
export const WrapAvatar = styled(Button)((theme) => ({
   position: "relative",
   cursor: "pointer",
   width: "200px",
   height: "200px",
   backgroundColor: "transparent !important",
   img: {
      borderRadius: "50%",
      objectFit: "cover",
      width: "100%",
      height: "100%",
   },
   ".image-input": {
      position: "absolute",
      top: "50%",
      bottom: "50%",
      transform: "scale(0,0)",
      transition: "0.2s ease all",
   },
   "&:hover": {
      ".image-input": {
         transform: "scale(1,1)",
      },
   },
}));
