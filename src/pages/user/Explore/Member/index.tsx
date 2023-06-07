import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useParams, Navigate } from "react-router-dom";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { getOwnerPosts } from "../../../../apis/post";
import { getProfile } from "../../../../apis/user";
import { Spinner } from "../../../../components";
import { Post } from "../../../../utils/interfaces/Post";
import { Profile } from "../../../../utils/interfaces/Profile";
import News from "../../NewsFeed/News";
import Heading from "../../Profile/Heading";
import Introduction from "../../Profile/Introduction";
const Member = () => {
   const { id } = useParams();
   const auth$ = useSelector(authState$);
   const [user, setUser] = useState<(Profile & { totalPosts: number }) | null>(null);
   const [show, setShow] = useState<boolean>(false);
   const [listNews, setListNews] = useState<Post[]>([]);
   const [page, setPage] = useState<number>(1);
   const [hasMore, setHasMore] = useState<boolean>(true);
   const maxPage = useRef<number>(1);

   useEffect(() => {
      (async () => {
         try {
            setShow(true);
            const profileRes = await getProfile(id as string);
            const postsRes = await getOwnerPosts({ id: id as string });
            maxPage.current = postsRes.data.maxPage;
            setUser(profileRes.data);
            setListNews(postsRes.data.posts);
            setShow(false);
         } catch (err: any) {
            throw new Error(err);
         }
      })();
   }, [id]);

   const fetchMoreData = async () => {
      if (page < maxPage.current) {
         const postsRes = await getOwnerPosts({ id: id as string, page: page + 1 });
         setListNews((prev) => [...prev, ...postsRes.data.posts]);
         setPage(page + 1);
      } else {
         setHasMore(false);
      }
   };

   if (auth$.payload?.user._id === id) {
      return <Navigate to={"/user/profile/" + auth$.payload?.user._id} replace />;
   }

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
                     <News posts={listNews} hasMore={hasMore} fetchMoreData={fetchMoreData} />
                  </Grid>
               </Grid>
            </Stack>
         )}
         <Spinner show={show} />
      </>
   );
};

export default Member;
