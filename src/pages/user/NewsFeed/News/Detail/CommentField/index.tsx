import SendIcon from "@mui/icons-material/Send";
import { Button, Stack, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createComment } from "../../../../../../redux-saga/redux/actions";
const CommentField = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const { id } = useParams();
   const [newComment, setNewComment] = useState<string>("");
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNewComment(e.target.value);
   };
   const handleSubmit = (): void => {
      newComment.trim() &&
         dispatch(
            createComment({
               id: String(id),
               comment: newComment.trim(),
            })
         );
      setNewComment(" ");
   };

   const handleEnter = (e: React.KeyboardEvent) => {
      if (e.which === 13 || e.code == "Enter") {
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
            multiline
            sx={{
               color: theme.myColor.textSecondary,
               padding: "12px 4px 4px",
               backgroundColor: theme.myColor.white,
               borderRadius: 1,
               border: 1,
               borderColor: "transparent",
               "&:hover, &:focus-within": {
                  backgroundColor: theme.myColor.bg,
                  borderColor: theme.palette.primary.main,
               },
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
