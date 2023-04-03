import { Typography, useTheme } from "@mui/material";
import React from "react";

const Body = ({ children, ...props }) => {
   const theme = useTheme();
   return (
      <Typography
         variant="body1"
         textAlign="justify"
         color={theme.myColor.text}
         minHeight="5vh"
         p={1}
         borderRadius={1}
         borderColor={theme.myColor.textSecondary}
         {...props}>
         {children}
      </Typography>
   );
};

export default Body;
