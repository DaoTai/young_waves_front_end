import { Avatar, Box, Button, Fab, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Comment } from "../../utils/interfaces/Post";
import Image from "../Image";
const MyComment = ({ comment }: { comment: Comment }) => {
   console.log(comment);
   return (
      <>
         {/* List other comments */}
         <Box>
            <Stack marginBottom={2} flexDirection="row" sx={{ gap: 2 }}>
               <Link to="/">{/* <Image srcSet="" /> */}</Link>
               <Box bgcolor="#eee" p={1} borderRadius={4}>
                  <Link to="/"></Link>
                  <Typography paragraph>{comment.body}</Typography>
               </Box>
            </Stack>
         </Box>
      </>
   );
};

export default MyComment;
