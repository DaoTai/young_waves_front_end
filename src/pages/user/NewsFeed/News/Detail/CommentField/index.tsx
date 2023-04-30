import SendIcon from "@mui/icons-material/Send";
import { Fab, Stack, TextField, useTheme } from "@mui/material";
import { useState } from "react";
const CommentField = ({ onSubmit }: { onSubmit: (comment: string) => void }) => {
   const theme = useTheme();
   const [newComment, setNewComment] = useState<string>("");
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
         flexWrap="nowrap">
         <TextField
            fullWidth
            autoFocus
            placeholder="Write your comment"
            value={newComment}
            autoComplete="off"
            spellCheck={false}
            multiline
            sx={{
               outline: 1,
               color: theme.myColor.textSecondary,
               backgroundColor: theme.myColor.bg,
               borderRadius: 1,
               borderColor: "transparent",
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
         />
         {newComment && (
            <Fab
               size="small"
               sx={{
                  boxShadow: 0,
                  color: theme.myColor.white,
                  background: theme.palette.primary.main,
                  border: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                     borderColor: "currentColor",
                     color: theme.palette.primary.main,
                     background: theme.myColor.white,
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
