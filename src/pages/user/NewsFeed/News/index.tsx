import { Box, Card, CardContent, TextField, Typography, useTheme } from "@mui/material";

import { Post } from "../../../../utils/interfaces/Post";
import { Spinner } from "../../../../components";
import Actions from "./Actions";
import Heading from "./Heading";
import Images from "./Images";
import { Profile } from "../../../../utils/interfaces/Profile";
const News = ({ listNews }: { listNews: Post[] }) => {
   const theme = useTheme();
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
                        news={news}
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
      </>
   );
};

export default News;
