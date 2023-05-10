import { Container, Stack, styled } from "@mui/material";
import { HEIGHT_HEADER } from "../../../../utils/constants";

export const WrapperPage = styled(Container)(({ theme }) => ({
   width: "100%",
   padding: "0px !important",
   height: `calc(100vh - ${HEIGHT_HEADER}px - 32px)`,
   borderRadius: 12,
   boxShadow: theme.shadows[1],
   overflow: "hidden",
   ".title": {
      textTransform: "uppercase",
      fontWeight: 600,
      background: theme.myColor.bgGradient,
      textAlign: "center",
      marginBottom: 4,
      textShadow: "0px 2px 2px rgba(0,0,0,0.2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      position: "relative",
      "&:after": {
         content: '""',
         position: "absolute",
         bottom: -4,
         left: 0,
         right: 0,
         height: 4,
         borderRadius: 16,
         background: theme.myColor.bgGradient,
      },
   },
}));

export const FallbackMessage = styled(Stack)(({ theme }) => ({
   height: "100%",
   alignItems: "center",
   gap: 8,
   img: {
      margin: "auto",
   },
}));
