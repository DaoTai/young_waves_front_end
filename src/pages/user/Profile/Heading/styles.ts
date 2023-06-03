import { Box, styled } from "@mui/material";
export const WrapAvatar = styled(Box)(({ theme }) => ({
   position: "relative",
   cursor: "pointer",
   backgroundColor: "transparent !important",
   transition: "0.2s ease all",
   ".admin": {
      border: `4px solid ${theme.palette.primary.main}`,
   },
   ".image-input": {
      position: "absolute",
      bottom: "15%",
      right: "-5px",
      transform: "translate(5px,-15%) ",
      transition: "0.2s ease all",
   },
   "&:hover": {
      filter: "contrast(110%)",
      ".image-input": {
         // transform: "scale(1,1)",
      },
   },
}));
