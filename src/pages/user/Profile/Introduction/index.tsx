import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import { profileState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
const Introduction = () => {
   const { isLoading, payload, action, error } = useSelector(profileState$);
   const { region, address } = payload?.data as Profile;
   return (
      <Box pl={1}>
         <Typography variant="h6" component="b" mb={1}>
            Intro
         </Typography>
         <Stack flexDirection="row" alignItems="baseline">
            <LocationOnIcon />
            <Typography paragraph pl={1}>
               From: {address}, {region}
            </Typography>
         </Stack>
      </Box>
   );
};

export default Introduction;
