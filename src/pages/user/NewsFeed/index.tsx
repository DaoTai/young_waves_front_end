import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postState$, postsState$ } from "../../../redux-saga/redux/selectors";
import { getPosts } from "../../../redux-saga/redux/actions";
import { Post as IPost } from "../../../utils/interfaces/Post";
import News from "./News";
import { Post, Spinner } from "../../../components";
import Weather from "./Weather";
const NewsFeed = () => {
   const dispatch = useDispatch();
   const { isLoading, action, payload } = useSelector(postsState$);
   const post$ = useSelector(postState$);
   const { data } = payload as { status: string; data: IPost[] & [] };
   const listNews = useMemo(() => {
      return data;
   }, [post$, data]);
   useEffect(() => {
      dispatch(getPosts());
   }, []);
   return (
      <>
         <Stack direction="column" sx={{ gap: 1 }}>
            {/* <Weather /> */}
            <Post />
            <News listNews={listNews} />
         </Stack>
         {/* Spinner */}
         <Spinner show={isLoading} />
         <Outlet />
      </>
   );
};

export default NewsFeed;
