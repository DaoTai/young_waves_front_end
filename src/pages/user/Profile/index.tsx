import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Stack } from "@mui/material";
import { Post } from "../../../components";
import { getProfile } from "../../../redux-saga/redux/actions";
import { signInState$, profileState$ } from "../../../redux-saga/redux/selectors";
import News from "../NewsFeed/News";
import Heading from "./Heading";
import Introduction from "./Introduction";
import Navigation from "./Navigation";
const Profile = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const { accessToken } = useSelector(signInState$);
   const user = useSelector(profileState$);
   useEffect(() => {
      dispatch(
         getProfile({
            id: id as string,
            accessToken,
         })
      );
   }, []);
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
