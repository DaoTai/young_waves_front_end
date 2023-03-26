import { Box, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "../../../../components";
import { getProfile } from "../../../../apis/user";
import { getOwnerPosts } from "../../../../apis/post";
import Heading from "../../Profile/Heading";
import { Profile } from "../../../../utils/interfaces/Profile";
import Introduction from "../../Profile/Introduction";
import { Post } from "../../../../utils/interfaces/Post";
import News from "../../NewsFeed/News";
import { Helmet } from "react-helmet-async";
const Member = () => {
   const { id } = useParams();
   const [user, setUser] = useState<(Profile & { totalPosts: number }) | null>(null);
   const [show, setShow] = useState<boolean>(false);
   const [listNews, setListNews] = useState<Partial<Post[]>>([]);
   useEffect(() => {
      (async () => {
         setShow(true);
         const profile = await getProfile(id as string);
         const newses = await getOwnerPosts(id as string);
         setUser(profile.data);
         setListNews(newses.data);
         setShow(false);
      })();
   }, [id]);

   return (
      <>
         <Helmet>
            <title>{user?.fullName || "Profile"} | Young Waves</title>
         </Helmet>
         {user && (
            <Stack flexDirection="column" sx={{ gap: 1 }}>
               <Box boxShadow={1} borderRadius={1} bgcolor="#fff">
                  <Heading user={user} />
               </Box>
               <Grid container pt={1} spacing={2}>
                  <Grid item xs={12} md={4}>
                     <Introduction user={user} />
                  </Grid>
                  <Grid item xs={12} md={8} display="flex" flexDirection="column" sx={{ gap: 2 }}>
                     <News listNews={listNews as Post[]} />
                  </Grid>
               </Grid>
            </Stack>
         )}
         <Spinner show={show} />
      </>
   );
};

export default Member;
