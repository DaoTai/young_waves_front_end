import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Post, Spinner } from "../../../components";
import { getPosts } from "../../../redux-saga/redux/actions";
import { postsState$ } from "../../../redux-saga/redux/selectors";
import News from "./News";
const NewsFeed = () => {
   const dispatch = useDispatch();
   const posts$ = useSelector(postsState$);
   const [page, setPage] = useState<number>(1);
   const [hasMore, setHasMore] = useState<boolean>(true);
   useEffect(() => {
      dispatch(getPosts());
   }, []);

   const fetchMoreData = () => {
      if (page < posts$.payload?.maxPage) {
         dispatch(getPosts(page + 1));
         setPage(page + 1);
      } else {
         setHasMore(false);
      }
   };

   return (
      <>
         <Stack direction="column" sx={{ gap: 2 }}>
            <Post />
            <News posts={posts$.payload.posts} hasMore={hasMore} fetchMoreData={fetchMoreData} />
         </Stack>
         <Outlet />
         <Spinner show={posts$.isLoading} />
      </>
   );
};

export default NewsFeed;
