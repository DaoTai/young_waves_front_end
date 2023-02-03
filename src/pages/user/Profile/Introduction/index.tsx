import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Introduction = () => {
   return (
      <Box pl={1}>
         <Typography variant="h6" mb={1}>
            Intro
         </Typography>
         <Stack flexDirection="row" alignItems="baseline">
            <LocationOnIcon />
            <Typography paragraph pl={1}>
               From: Hanoi, VietNam
            </Typography>
         </Stack>
      </Box>
   );
};

export default Introduction;
