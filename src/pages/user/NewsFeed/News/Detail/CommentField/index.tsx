import SendIcon from "@mui/icons-material/Send";
import { useState, ChangeEvent } from "react";
import { Fab, Stack, TextField, useTheme } from "@mui/material";
import { Textarea } from "../../../../../../components";
const CommentField = ({ onSubmit }: { onSubmit: (comment: string) => void }) => {
   const theme = useTheme();
   const [newComment, setNewComment] = useState<string>("");
   const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
      setNewComment(e.target.value);
   };
   const handleSubmit = (): void => {
      newComment.trim() && onSubmit(newComment.trim());
      setNewComment("");
   };

   return (
      <Stack
         gap={1}
         flexDirection="row"
         justifyContent="space-between"
         alignItems="center"
         flexWrap="nowrap"
         sx={{
            "#comment-field": {
               width: "100%",
               resize: "none",
               padding: 1,
               height: "48px !important",
               fontFamily: "inherit",
               caretColor: theme.palette.primary.main,
               borderRadius: 1,
               outline: "none",
            },
         }}>
         <Textarea
            id="comment-field"
            value={newComment}
            placeholder="Write your comment"
            onChange={handleChange}
            onEnter={handleSubmit}
         />
         {newComment && (
            <Fab
               size="small"
               sx={{
                  boxShadow: 0,
                  color: theme.palette.white.main,
                  background: theme.palette.primary.main,
                  border: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                     borderColor: "currentColor",
                     color: theme.palette.primary.main,
                     background: theme.palette.white.main,
                  },
               }}
               onClick={handleSubmit}>
               <SendIcon />
            </Fab>
         )}
      </Stack>
   );
};

export default CommentField;
