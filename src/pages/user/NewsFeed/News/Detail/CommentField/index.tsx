import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "../../../../../../components";
import { createComment } from "../../../../../../redux-saga/redux/actions";
import { profileState$, signInState$ } from "../../../../../../redux-saga/redux/selectors";
import { Post } from "../../../../../../utils/interfaces/Post";
const CommentField = ({ post }: { post: Post }) => {
   const dispatch = useDispatch();
   const { id } = useParams();
   const [newComment, setNewComment] = useState<string>("");
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNewComment(e.target.value);
   };
   const handleSubmit = (): void => {
      dispatch(
         createComment({
            id: String(id),
            comment: newComment.trim(),
         })
      );
      setNewComment("");
   };

   const handleEnter = (e: React.KeyboardEvent) => {
      if (e.which === 13) {
         handleSubmit();
      }
   };

   return (
      <Box pt={2} pb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
         <TextField
            fullWidth
            variant="standard"
            placeholder="Write your comment"
            value={newComment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onKeyDown={handleEnter}
         />
         {newComment && (
            <Button endIcon={<SendIcon />} sx={{ cursor: "pointer" }} onClick={handleSubmit} />
         )}
      </Box>
   );
};

export default CommentField;
