import { Box, Card, Typography, useTheme } from "@mui/material";
import { PostBody } from "../../../../components";
import { Post } from "../../../../utils/interfaces/Post";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";
const News = ({ posts, emptyMsg = "No post" }: { posts: [] | Post[]; emptyMsg?: string }) => {
   const theme = useTheme();
   return (
      <>
         {posts?.length === 0 ? (
            <Typography variant="h6" textAlign="center" color={theme.myColor.textSecondary}>
               {emptyMsg}
            </Typography>
         ) : (
            posts?.map((post: Post, index) => {
               return (
                  <Box key={post._id}>
                     <Card sx={{ pl: 2, pr: 2 }}>
                        {/* Heading */}
                        <Heading post={post} showAction />
                        {/* Images */}
                        {post?.attachments?.length > 0 && (
                           <Images id={post?._id} attachments={post?.attachments} />
                        )}
                        {/* Body */}
                        <PostBody>{post?.body}</PostBody>
                        {/* Actions */}
                        <Actions post={post} />
                     </Card>
                  </Box>
               );
            })
         )}
      </>
   );
};

export default News;
