import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { memo } from "react";
import { Post, Comment } from "../../../../utils/interfaces/Post";
import { Profile } from "../../../../utils/interfaces/Profile";
import { PostBody } from "../../../../components";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";
const News = ({ listNews, emptyMsg = "No post" }: { listNews: Post[]; emptyMsg?: string }) => {
   const theme = useTheme();
   return (
      <>
         {listNews?.length === 0 ? (
            <Typography variant="h6" textAlign="center" color={theme.myColor.textSecondary}>
               {emptyMsg}
            </Typography>
         ) : (
            listNews?.map((news: Post, index) => {
               return (
                  <Box key={index}>
                     <Card sx={{ pl: 2, pr: 2 }}>
                        {/* Heading */}
                        <Heading
                           status={news?.status as string}
                           author={news?.author as Profile}
                           createdAt={news?.createdAt as string}
                           news={news}
                           indexNews={index}
                           showAction
                        />
                        {/* Images */}
                        {news?.attachments?.length > 0 && (
                           <Images id={news?._id} attachments={news?.attachments} />
                        )}
                        {/* Body */}
                        <PostBody>{news?.body}</PostBody>
                        {/* Actions */}
                        <Actions news={news} />
                     </Card>
                  </Box>
               );
            })
         )}
      </>
   );
};

export default memo(News);
