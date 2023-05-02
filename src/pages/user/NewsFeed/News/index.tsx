import { Box, Card, Paper, TextareaAutosize, Typography, useTheme } from "@mui/material";
import { memo } from "react";
import { PostBody } from "../../../../components";
import { Post } from "../../../../utils/interfaces/Post";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
   posts: [] | Post[];
   emptyMsg?: string;
   currentPage?: number;
   maxPage?: number;
   hasMore?: boolean;
   fetchMoreData?: () => void;
}

const News = ({ posts, emptyMsg = "No post", hasMore, fetchMoreData }: Props) => {
   const theme = useTheme();

   return (
      <>
         {posts?.length === 0 ? (
            <Typography variant="h6" textAlign="center" color={theme.myColor.textSecondary}>
               {emptyMsg}
            </Typography>
         ) : hasMore && fetchMoreData ? (
            <InfiniteScroll
               dataLength={posts?.length}
               hasMore={hasMore}
               next={fetchMoreData}
               loader={
                  <Typography variant="body2" textAlign="center">
                     Loading ...
                  </Typography>
               }>
               {posts?.map((post: Post) => {
                  return (
                     <Paper elevation={0} key={post._id} sx={{ marginBottom: 1 }}>
                        <Card sx={{ pl: 2, pr: 2 }}>
                           {/* Heading */}
                           <Heading post={post} showAction />
                           {/* Body */}
                           <PostBody>{post?.body}</PostBody>
                           {/* Images */}
                           {post?.attachments?.length > 0 && (
                              <Images id={post?._id} attachments={post?.attachments} />
                           )}

                           {/* Actions */}
                           <Actions post={post} />
                        </Card>
                     </Paper>
                  );
               })}
            </InfiniteScroll>
         ) : (
            posts?.map((post: Post) => {
               return (
                  <Paper elevation={0} key={post._id} sx={{ mb: 1 }}>
                     <Card sx={{ pl: 2, pr: 2 }}>
                        {/* Heading */}
                        <Heading post={post} showAction />
                        {/* Body */}
                        <PostBody>{post?.body}</PostBody>
                        {/* Images */}
                        {post?.attachments?.length > 0 && (
                           <Images id={post?._id} attachments={post?.attachments} />
                        )}

                        {/* Actions */}
                        <Actions post={post} />
                     </Card>
                  </Paper>
               );
            })
         )}
      </>
   );
};

export default memo(News);
