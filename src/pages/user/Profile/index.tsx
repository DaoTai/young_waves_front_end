import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Outlet } from "react-router-dom";
import { Post, Spinner } from "../../../components";
import { getProfile, getOwnerPosts } from "../../../redux-saga/redux/actions";
import { ownerPostsState$, profileState$, signInState$ } from "../../../redux-saga/redux/selectors";
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
   const {
      payload: {
         data: {
            payload: { _id },
         },
      },
   } = useSelector(signInState$);
   const profile$ = useSelector(profileState$);
   const ownerPosts = ownerPosts$.payload?.data as Array<IPost>;
   const listNews = useMemo(() => {
      return ownerPosts;
   }, [ownerPosts$, ownerPosts, profile$?.action]);

   // Chưa xử lý xong
   // useEffect(() => {

   //    if (ownerPosts.length === 0 || profile$?.action === UPDATE_PROFILE_SUCCESS) {
   //       dispatch(getOwnerPosts(id as string));
   //    }
   //    if (!profile$.payload?.data?._id || profile$?.action === UPDATE_PROFILE_SUCCESS) {
   //       dispatch(getProfile(id as string));
   //    }
   // }, [ownerPosts$?.action, profile$?.action, dispatch]);
   useEffect(() => {
      dispatch(getOwnerPosts(id as string));
      dispatch(getProfile(id as string));
   }, [id]);
   return (
      <>
         <Helmet>
            <title>Profile | Young Waves</title>
         </Helmet>

         <Stack flexDirection="column" sx={{ gap: 1 }}>
            <Box boxShadow={1} borderRadius={1} bgcolor="#fff">
               <Heading />
               {/* <Navigation home={`/user/profile/${profile$.payload?.data?._id}`} /> */}
            </Box>
            <Grid container pt={1} spacing={1}>
               <Grid item xs={12} md={4}>
                  <Introduction user={profile$.payload?.data} />
               </Grid>
               <Grid item xs={12} md={8} display="flex" flexDirection="column" sx={{ gap: 2 }}>
                  {profile$.payload?.data?._id === _id && <Post />}

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
