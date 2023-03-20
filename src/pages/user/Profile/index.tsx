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
import { Profile as IProfile } from "../../../utils/interfaces/Profile";
import News from "../NewsFeed/News";
import Heading from "./Heading";
import Introduction from "./Introduction";

const Profile = () => {
   // Nên tách profile vs các account khác vì ko dc dùng chung 1 thg selector như vậyx
   const dispatch = useDispatch();
   const { id } = useParams();
   const { payload } = useSelector(authState$);
   const ownerPosts$ = useSelector(ownerPostsState$);
   const profile$ = useSelector(profileState$);

   const ownerPosts = ownerPosts$.payload?.data as Array<IPost>;
   const idAuth = payload?.data?.user?._id as IProfile;
   const idUser = profile$?.payload?._id;

   useEffect(() => {
      id === String(idAuth) &&
         dispatch(getOwnerPosts(id as string)) &&
         dispatch(getProfile(id as string));
   }, [id]);
   // useLayoutEffect(() => {
   //    // Chưa xử lý thay đổi UI khi update post => redux-reducer
   //    if (profile$?.action === UPDATE_PROFILE_SUCCESS) {
   //       dispatch(getOwnerPosts(id as string));
   //    }
   // }, [profile$]);
   return (
      <>
         <Helmet>
            <title>{profile$.payload?.fullName || "Profile"} | Young Waves</title>
         </Helmet>

         <Stack flexDirection="column">
            <Box boxShadow={1} borderRadius={1} bgcolor="#fff" overflow="hidden">
               <Heading user={profile$.payload} />
            </Box>
            <Grid container pt={2} spacing={2}>
               <Grid item xs={12} md={4}>
                  <Introduction user={profile$.payload} />
               </Grid>
               <Grid item xs={12} md={8} display="flex" flexDirection="column" sx={{ gap: 2 }}>
                  {idAuth == idUser && <Post />}
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
