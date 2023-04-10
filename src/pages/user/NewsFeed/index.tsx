import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Post } from "../../../components";
import { getPosts } from "../../../redux-saga/redux/actions";
import { postsState$ } from "../../../redux-saga/redux/selectors";
import News from "./News";
const NewsFeed = () => {
   const dispatch = useDispatch();
   const posts$ = useSelector(postsState$);
   useEffect(() => {
      dispatch(getPosts());
   }, []);
   return (
      <>
         <Stack direction="column" sx={{ gap: 2 }}>
            <Post />
            <News posts={posts$.payload} />
         </Stack>
         <Outlet />
      </>
   );
};

export default NewsFeed;
