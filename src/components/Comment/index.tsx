import { Box, Stack, Typography, Chip, useTheme } from "@mui/material";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Comment } from "../../utils/interfaces/Post";
import Image from "../Image";
const MyComment = ({ comment }: { comment: Comment }) => {
   const theme = useTheme();
   return (
      <>
         {/* List other comments */}
         <Box>
            <Stack marginBottom={2} flexDirection="row" sx={{ gap: 2 }}>
               <Link to={`/user/profile/${comment.user._id}`}>
                  <Image
                     srcSet={comment?.user.avatar}
                     src={comment?.user.avatar}
                     style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  />
               </Link>
               <Box bgcolor="#eee" p={1} borderRadius={4}>
                  <Link to={`/user/profile/${comment.user._id}`}>
                     <Typography variant="subtitle1">{comment.user.fullName}</Typography>
                  </Link>
                  <Chip label={comment.body} />

                  <Typography variant="body2" color={theme.myColor.textSecondary}>
                     {dateFormat(comment.updatedAt, " mmmm dS, yyyy, h:MM TT")}
                  </Typography>
               </Box>
            </Stack>
         </Box>
      </>
   );
};

export default MyComment;
