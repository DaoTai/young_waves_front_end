import { Box, Grid, Stack } from "@mui/material";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post, Spinner } from "../../../components";
import { getProfile } from "../../../redux-saga/redux/actions";
import { signInState$ } from "../../../redux-saga/redux/selectors";
import News from "../NewsFeed/News";
import Heading from "./Heading";
import Introduction from "./Introduction";
import Navigation from "./Navigation";

const Profile = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const {
      isLoading,
      payload: { data },
   } = useSelector(signInState$);

   useEffect(() => {
      dispatch(
         getProfile({
            id: id as string,
            accessToken: data.accessToken,
         })
      );
   }, [data, dispatch]);
   return (
      <>
         <Helmet>
            <title>Profile | Young Waves</title>
         </Helmet>

         <Stack flexDirection="column" sx={{ gap: 1 }}>
            <Box boxShadow={1} bgcolor="#fff">
               <Heading />
               <Navigation />
            </Box>
            <Grid container pt={1}>
               {/* <Grid item xs={12} md={4}>
                  <Introduction />
               </Grid> */}
               <Grid item xs={12} md={12} display="flex" flexDirection="column" sx={{ gap: 4 }}>
                  <Post />
                  <News />
               </Grid>
            </Grid>
         </Stack>
         <Spinner show={isLoading} />
      </>
   );
};

export default Profile;
