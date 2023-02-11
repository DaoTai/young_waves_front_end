import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import { Post, Spinner } from "../../../components";
import { getProfile, getOwnerPosts } from "../../../redux-saga/redux/actions";
import { ownerPostsState$, profileState$ } from "../../../redux-saga/redux/selectors";
import { Post as IPost } from "../../../utils/interfaces/Post";
import { UPDATE_PROFILE_SUCCESS } from "../../../utils/constants";
import News from "../NewsFeed/News";
import Heading from "./Heading";
import Introduction from "./Introduction";
import Navigation from "./Navigation";

const Profile = () => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const ownerPosts$ = useSelector(ownerPostsState$);
   const profile$ = useSelector(profileState$);
   const ownerPosts = ownerPosts$.payload?.data as Array<IPost>;
   const listNews = useMemo(() => {
      return ownerPosts;
   }, [ownerPosts$, ownerPosts, profile$?.action]);
   useEffect(() => {
      if (ownerPosts.length === 0 || profile$?.action === UPDATE_PROFILE_SUCCESS) {
         dispatch(getOwnerPosts(id as string));
      }
      if (!profile$.payload?.data?._id || profile$?.action === UPDATE_PROFILE_SUCCESS) {
         dispatch(getProfile(id as string));
      }
   }, [ownerPosts$?.action, profile$?.action, dispatch]);
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
                  <News listNews={listNews} />
               </Grid>
            </Grid>
         </Stack>
         <Spinner show={ownerPosts$.isLoading || profile$.isLoading} />
         <Outlet />
      </>
   );
};

export default Profile;
