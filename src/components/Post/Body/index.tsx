import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";

const Body = ({ children, ...props }) => {
   const theme = useTheme();
   return (
      <Box pb={1}>
         <Typography
            variant="body1"
            textAlign="justify"
            color={theme.palette.text.primary}
            minHeight="5vh"
            p={1}
            borderRadius={1}
            borderColor={theme.palette.secondary.main}
            {...props}>
            {children}
         </Typography>
         <Divider />
      </Box>
   );
};

export default Body;
