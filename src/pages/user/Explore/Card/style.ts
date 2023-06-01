import { styled, Box, Stack } from "@mui/material";

export const MyCard = styled(Box)(({ theme }) => ({
   overflow: "hidden",
   transition: "0.3s linear all",
   "&:hover": {
      filter: "drop-shadow(1px 1px 4px rgba(0,0,0,0.2))",
   },
}));

export const WrapButtons = styled(Stack)(({ theme }) => ({
   marginTop: 16,
   gap: 8,
   flexDirection: "row",
   flexWrap: "wrap",
   ".btn": {
      color: theme.myColor.white,
      fontWeight: 400,
      textOverflow: "clip",
      whiteSpace: "pre",
      overflow: "hidden",
      height: "100%",
      flex: 1,
      "&.btn--add-friend": {
         background: theme.myColor.bgGradient,
         "&.hide": {
            display: "none !important",
         },
      },
   },
}));
