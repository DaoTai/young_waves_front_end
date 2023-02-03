import React from "react";
import { Helmet } from "react-helmet-async";
import Heading from "./Heading";
import Introduction from "./Introduction";
import Navigation from "./Navigation";
import News from "../NewsFeed/News";
import { Post } from "../../../components";
import { Box, Grid, Stack, styled } from "@mui/material";
const Profile = () => {
   return (
      <>
         <Helmet>
            <title>Profile | Young Waves</title>
         </Helmet>

         <Stack flexDirection="column" sx={{ gap: 4 }}>
            <Box boxShadow={1} bgcolor="#fff">
               <Heading />
               <Navigation />
            </Box>
            <Grid container pt={1} bgcolor="#fff">
               <Grid item xs={12} md={4}>
                  <Introduction />
               </Grid>
               <Grid item xs={12} md={8} display="flex" flexDirection="column" sx={{ gap: 4 }}>
                  <Post />
                  <News />
               </Grid>
            </Grid>
         </Stack>
      </>
   );
};

export default Profile;
