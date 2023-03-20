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
   const { payload } = useSelector(postsState$);

   useEffect(() => {
      dispatch(getPosts());
   }, []);
   return (
      <>
         <Stack direction="column" sx={{ gap: 2 }}>
            {/* <Weather /> */}
            <Post />
            <News listNews={payload?.data} />
         </Stack>
         {/* Spinner */}
         {/* <Spinner show={isLoading} /> */}

         <Outlet />
      </>
   );
};

export default memo(NewsFeed);
