import { Box, Stack, Typography, Chip, useTheme } from "@mui/material";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { Comment } from "../../utils/interfaces/Comment";
import Image from "../Image";
const MyComment = ({ comment }: { comment: Comment }) => {
   const theme = useTheme();
   return (
      <>
         {/* List other comments */}
         <Box>
            <Stack marginBottom={2} flexDirection="row" sx={{ gap: 2 }}>
               <Link to={`/user/profile/${comment?.user?._id}`}>
                  <Image
                     srcSet={comment?.user.avatar}
                     src={comment?.user.avatar}
                     width="40px"
                     height="40px"
                     circle
                  />
               </Link>
               <Box flexGrow={2} bgcolor={theme.myColor.bgGray} p={1} borderRadius={2}>
                  <Stack display=" flex" flexDirection="row" alignItems="center" gap={2} pb={1}>
                     <Link to={`/user/profile/${comment?.user._id}`}>{comment?.user.fullName}</Link>
                     <Typography
                        variant="body2"
                        component="span"
                        color={theme.myColor.textSecondary}>
                        {dateFormat(comment?.updatedAt, " mmmm dS, yyyy, h:MM TT")}
                     </Typography>
                  </Stack>
                  <Typography variant="body1" pb={1}>
                     {comment?.body}
                  </Typography>
               </Box>
            </Stack>
         </Box>
      </>
   );
};

export default MyComment;
