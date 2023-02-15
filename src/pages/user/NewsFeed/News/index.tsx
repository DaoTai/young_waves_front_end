import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { memo } from "react";
import { Post } from "../../../../utils/interfaces/Post";
import { Profile } from "../../../../utils/interfaces/Profile";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";
const News = ({ listNews }: { listNews: Post[] }) => {
   const theme = useTheme();
   return (
      <>
         {listNews?.map((news: Post, index) => {
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
      </>
   );
};

export default memo(News);
