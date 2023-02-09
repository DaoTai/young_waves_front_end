import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postState$, postsState$ } from "../../../../redux-saga/redux/selectors";
import { getPosts } from "../../../../redux-saga/redux/actions";
import { Post } from "../../../../utils/interfaces/Post";
import { Spinner } from "../../../../components";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";
import { Profile } from "../../../../utils/interfaces/Profile";
const News = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { isLoading, action, payload } = useSelector(postsState$);
   const post$ = useSelector(postState$);
   const { data } = payload as { status: string; data: Post[] & [] };
   const listNews = useMemo(() => {
      return data;
   }, [post$, data]);
   useEffect(() => {
      dispatch(getPosts());
   }, []);
   return (
      <>
         {listNews?.map((news: Post) => {
            return (
               <Box key={news?._id}>
                  <Card sx={{ pl: 2, pr: 2 }}>
                     {/* Heading */}
                     <Heading
                        status={news?.status as string}
                        author={news?.author as Profile}
                        createdAt={news?.createdAt as string}
                        idNews={news?._id}
                     />
                     {/* Images */}
                     {news?.attachments.length > 0 && (
                        <Images id={news?._id} attachments={news?.attachments} />
                     )}
                     {/* Body */}
                     <CardContent
                        sx={{ pl: 1, mb: 1, bgcolor: theme.myColor.bgGray, borderRadius: 2 }}>
                        <Typography variant="body1" color={theme.myColor.text} paragraph>
                           {news?.body}
                        </Typography>
                     </CardContent>
                     {/* Actions */}
                     <Actions likes={news?.likes} comments={news?.comments} id={news?._id} />
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
