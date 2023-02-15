import { styled, Box } from "@mui/material";

export const MyCard = styled(Box)(({ theme }) => ({
   overflow: "hidden",
   transition: "0.3s linear all",
   "&:hover": {
      filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.2))",
      transform: "scale(1.01)",
   },
}));
