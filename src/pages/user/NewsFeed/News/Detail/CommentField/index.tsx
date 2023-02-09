import { Box, Button, Grid, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Image } from "../../../../../../components";
import { createComment } from "../../../../../../redux-saga/redux/actions";
import { Post } from "../../../../../../utils/interfaces/Post";
const CommentField = ({ post }: { post: Post }) => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const [newComment, setNewComment] = useState<string>("");
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNewComment(e.target.value);
   };
   const handleSubmit = (e): void => {
      dispatch(
         createComment({
            id: String(id),
            comment: newComment.trim(),
         })
      );
      setNewComment("");
   };

   return (
      <Grid
         container
         mb={2}
         mt={2}
         gap={1}
         justifyContent="space-between"
         alignItems="center"
         flexWrap="nowrap">
         <Grid item xs={1} md={1}>
            <Image
               src={post?.author?.avatar}
               srcSet={post?.author?.avatar}
               alt="avatar"
               style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            />
         </Grid>
         <Grid item xs={11} md={11}>
            <TextField
               fullWidth
               multiline
               variant="standard"
               placeholder="Write your comment"
               value={newComment}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
         </Grid>
         {newComment && (
            <Button endIcon={<SendIcon />} sx={{ cursor: "pointer" }} onClick={handleSubmit} />
         )}
      </Grid>
   );
};

export default CommentField;
