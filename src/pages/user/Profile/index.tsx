import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post, Spinner } from "../../../components";
import { getProfile, getOwnerPosts } from "../../../redux-saga/redux/actions";
import { signInState$, postsState$ } from "../../../redux-saga/redux/selectors";
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
   const posts$ = useSelector(postsState$);
   const ownerPosts = posts$.payload?.data;
   const listNews = useMemo(() => {
      return ownerPosts;
   }, [posts$, ownerPosts]);
   useEffect(() => {
      dispatch(
         getProfile({
            id: id as string,
            accessToken: data.accessToken,
         })
      );
      dispatch(getOwnerPosts(id as string));
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
                  <News listNews={listNews} />
               </Grid>
            </Grid>
         </Stack>
         <Spinner show={isLoading} />
      </>
   );
};

export default Profile;
