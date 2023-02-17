import { Box, Button, Grid, Stack, TextField, useTheme } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "../../../../../../components";
import { createComment } from "../../../../../../redux-saga/redux/actions";
import { profileState$, signInState$ } from "../../../../../../redux-saga/redux/selectors";
import { Post } from "../../../../../../utils/interfaces/Post";
const CommentField = ({ post }: { post: Post }) => {
   const theme = useTheme();
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
      <Stack
         mt={2}
         mb={2}
         gap={1}
         flexDirection="row"
         justifyContent="space-between"
         alignItems="center"
         flexWrap="nowrap">
         <TextField
            fullWidth
            variant="standard"
            placeholder="Write your comment"
            value={newComment}
            autoComplete="off"
            spellCheck={false}
            sx={{
               color: theme.myColor.textSecondary,
               padding: "12px 4px 4px",
               backgroundColor: theme.myColor.bg,
               borderRadius: 1,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            onKeyDown={handleEnter}
         />
         {newComment && (
            <Button
               variant="outlined"
               endIcon={<SendIcon />}
               sx={{ cursor: "pointer", padding: 1 }}
               onClick={handleSubmit}
            />
         )}
      </Stack>
   );
};

export default CommentField;
