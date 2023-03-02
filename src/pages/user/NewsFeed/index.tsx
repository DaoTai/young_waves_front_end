import { Stack } from "@mui/material";
import { memo, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Post, Spinner } from "../../../components";
import { ChatContext } from "../../../Contexts";
import { getPosts } from "../../../redux-saga/redux/actions";
import { postsState$ } from "../../../redux-saga/redux/selectors";
import News from "./News";
const NewsFeed = () => {
   const dispatch = useDispatch();
   const { isLoading, payload, action } = useSelector(postsState$);
   const { data } = payload as { status: string; data: any };

   useEffect(() => {
      dispatch(getPosts());
   }, []);
   return (
      <>
         <Stack direction="column" sx={{ gap: 1 }}>
            {/* <Weather /> */}
            <Post />
            <News listNews={data} />
         </Stack>
         {/* Spinner */}
         {/* <Spinner show={isLoading} /> */}

         <Outlet />
      </>
   );
};

export default memo(NewsFeed);
