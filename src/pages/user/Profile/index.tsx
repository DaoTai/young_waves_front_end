import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, InputAdornment, Stack, Tab, Tabs, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Post, Spinner, BaseInput as Search } from "../../../components";
import { getOwnerPosts, getProfile } from "../../../redux-saga/redux/actions";
import { authState$, ownerPostsState$, profileState$ } from "../../../redux-saga/redux/selectors";
import { Post as IPost } from "../../../utils/interfaces/Post";
import { Profile as IProfile } from "../../../utils/interfaces/Profile";
import { TYPE_TAB_PROFILE } from "../../../utils/types";

import News from "../NewsFeed/News";
import Friends from "./Friends";
import Heading from "./Heading";
import Introduction from "./Introduction";
const Profile = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { id } = useParams();
   const { payload } = useSelector(authState$);
   const ownerPosts$ = useSelector(ownerPostsState$);
   const profile$ = useSelector(profileState$);
   const ownerPosts = ownerPosts$.payload?.data as Array<IPost>;
   const idAuth = payload?.data?.user?._id as IProfile;
   const idUser = profile$?.payload?._id;
   const [tab, setTab] = useState<TYPE_TAB_PROFILE>("posts");
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
               {idAuth == idUser && <Post />}
               <News listNews={ownerPosts} />
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
               <Heading user={profile$.payload} />
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
