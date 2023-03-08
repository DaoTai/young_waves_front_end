import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { Post, Spinner } from "../../../components";
import { getOwnerPosts, getProfile } from "../../../redux-saga/redux/actions";
import { ownerPostsState$, profileState$, authState$ } from "../../../redux-saga/redux/selectors";
import { UPDATE_PROFILE_SUCCESS } from "../../../utils/constants";
import { Post as IPost } from "../../../utils/interfaces/Post";
import News from "../NewsFeed/News";
import Heading from "./Heading";
import Introduction from "./Introduction";

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
   } = useSelector(authState$);
   const profile$ = useSelector(profileState$);
   const ownerPosts = ownerPosts$.payload?.data as Array<IPost>;

   useEffect(() => {
      id && dispatch(getOwnerPosts(id as string));
      !profile$?.payload?.data?._id && dispatch(getProfile(id as string));
   }, []);
   useLayoutEffect(() => {
      // Chưa xử lý thay đổi UI khi update post => redux-reducer
      if (profile$?.action === UPDATE_PROFILE_SUCCESS) {
         dispatch(getOwnerPosts(id as string));
      }
   }, [profile$]);
   return (
      <>
         <Helmet>
            <title>{profile$.payload?.data?.fullName || "Profile"} | Young Waves</title>
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
                  {/* If this profile is mine, show post box */}
                  {profile$.payload?.data?._id === _id && <Post />}
                  {/* Display posts */}
                  <News listNews={ownerPosts} />
               </Grid>
            </Grid>
         </Stack>
         <Spinner show={ownerPosts$.isLoading || profile$.isLoading} />
         <Outlet />
      </>
   );
};

export default Profile;
