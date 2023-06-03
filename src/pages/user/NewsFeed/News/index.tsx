import { Box, Card, Paper, Stack, Typography, useTheme } from "@mui/material";
import { memo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostBody } from "../../../../components";
import { Post } from "../../../../utils/interfaces/Post";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";

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
      <Box>
         {posts?.length === 0 ? (
            <Typography variant="h6" textAlign="center" color={theme.palette.secondary.main}>
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
               }
               style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
               {posts?.map((post: Post) => {
                  return (
                     <Paper elevation={0} key={post._id}>
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
            <Stack gap={2}>
               {posts?.map((post: Post) => {
                  return (
                     <Paper elevation={0} key={post._id}>
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
            </Stack>
         )}
      </Box>
   );
};

export default memo(News);
