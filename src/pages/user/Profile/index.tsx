import { Box, Grid, Stack, Tab, Tabs, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post, Spinner } from "../../../components";
import { getOwnerPosts, getProfile } from "../../../redux-saga/redux/actions";
import { authState$, ownerPostsState$, profileState$ } from "../../../redux-saga/redux/selectors";
import { TYPE_TAB_PROFILE } from "../../../utils/types";
import News from "../NewsFeed/News";
import Friends from "./Friends";
import Heading from "./Heading";
import Introduction from "./Introduction";
const Profile = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { id } = useParams();
   const auth$ = useSelector(authState$);
   const ownerPosts$ = useSelector(ownerPostsState$);
   const profile$ = useSelector(profileState$);

   const idUser = profile$?.payload?._id;
   const [tab, setTab] = useState<TYPE_TAB_PROFILE>("posts");
   useEffect(() => {
      if (id === auth$.payload.user._id) {
         if (!profile$.payload._id) {
            dispatch(getProfile(id as string));
         }
         dispatch(getOwnerPosts(id as string));
      }
   }, [id]);
   const handleChangeTabPanel = (event: React.SyntheticEvent, newValue: TYPE_TAB_PROFILE) => {
      setTab(newValue);
   };

   const Detail: Record<TYPE_TAB_PROFILE, React.ReactNode> = {
      posts: (
         <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
               <Introduction user={profile$.payload} />
            </Grid>
            <Grid item xs={12} md={8} display="flex" flexDirection="column" sx={{ gap: 2 }}>
               {auth$.payload.user._id == idUser && <Post />}
               <News posts={ownerPosts$.payload} />
            </Grid>
         </Grid>
      ),
      friends: <Friends />,
   };

   return (
      <>
         <Helmet>
            <title>{profile$.payload?.fullName || "Profile"} | Young Waves</title>
         </Helmet>

         <Stack flexDirection="column" gap={2}>
            <Box boxShadow={1} borderRadius={1} bgcolor="#fff" overflow="hidden">
               <Heading user={profile$.payload} totalPosts={ownerPosts$.payload.length} />
            </Box>
            {/* Tab navigate */}
            <Tabs
               value={tab}
               sx={{ bgcolor: theme.myColor.white, boxShadow: 1 }}
               onChange={handleChangeTabPanel}>
               <Tab
                  value="posts"
                  label="posts"
                  sx={{
                     transition: "0.3s linear all",
                     "&:hover": { backgroundColor: theme.myColor.bgGray },
                  }}
               />
               <Tab
                  value="friends"
                  label="Friends"
                  sx={{
                     transition: "0.3s linear all",
                     "&:hover": { backgroundColor: theme.myColor.bgGray },
                  }}
               />
            </Tabs>
            {/* Detail tab */}
            {Detail[tab]}
         </Stack>
         <Spinner show={ownerPosts$.isLoading || profile$.isLoading} />
      </>
   );
};

export default Profile;
