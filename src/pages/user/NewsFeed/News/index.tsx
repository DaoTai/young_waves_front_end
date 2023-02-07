import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postsState$ } from "../../../../redux-saga/redux/selectors";
import { getPosts } from "../../../../redux-saga/redux/actions";
import { Post } from "../../../../utils/interfaces/Post";
import { Spinner } from "../../../../components";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";
import { Outlet } from "react-router-dom";
import { Profile } from "../../../../utils/interfaces/Profile";
const News = () => {
   const dispatch = useDispatch();
   const { isLoading, action, payload } = useSelector(postsState$);
   const { data } = payload as { status: string; data: Post[] };
   useEffect(() => {
      dispatch(getPosts());
   }, []);
   return (
      <>
         {data?.map((news: Post) => {
            return (
               <Box key={news._id}>
                  <Card>
                     {/* Heading */}
                     <Heading
                        author={news.author as Profile}
                        createdAt={news.createdAt as string}
                        _id={news._id}
                     />
                     {/* Images */}
                     {news.attachment.length > 0 && <Images attachments={news.attachment} />}
                     {/* Body */}
                     <CardContent>
                        <Typography variant="body1" color="text.secondary">
                           {news.body}
                        </Typography>
                     </CardContent>
                     {/* Actions */}
                     <Actions likes={news.likes} comments={news.comments} id={news._id} />
                  </Card>
               </Box>
            );
         })}
         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default News;
