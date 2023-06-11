import { Box, Typography, styled } from "@mui/material";

export const MyBox = styled(Box)(({ theme }) => ({
   position: "absolute",
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
   minWidth: "50vw",
   maxWidth: "98vw",
   minHeight: "50vh",
   maxHeight: "98vh",
   overflow: "auto",
   backgroundColor: theme.palette.white.main,
   border: `1px solid ${theme.palette.black.main}`,
   padding: "24px",
   borderRadius: 2,
   boxShadow: theme.shadows[2],
}));

export const Title = styled(Typography)(({ theme }) => ({
   textAlign: "center",
   padding: 12,
   color: theme.palette.text.primary,
   textTransform: "capitalize",
   textShadow: "1px 2px 3px rgba(0,0,0,0.3)",
   position: "relative",
   "&::after": {
      content: '" "',
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      background: theme.palette.gradient.main,
   },
}));
