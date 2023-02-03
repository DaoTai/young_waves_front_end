import { Avatar, Box, Button, Fab, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
const Comment = () => {
   const [newComment, setNewComment] = useState<string>("");
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      setNewComment(e.target.value);
   };

   const handleSubmit = (e: React.KeyboardEvent): void => {
      if (e.keyCode === 13) {
         console.log("Submit");
      }
   };
   return (
      <>
         <Stack marginBottom={2} mt={2} flexDirection="row" sx={{ gap: 2 }}>
            <Avatar
               sx={{ border: "2px solid #52b2ff", borderRadius: "50%" }}
               srcSet="https://images.immediate.co.uk/production/volatile/sites/3/2017/11/peaky-tommy-5d3c20b.jpg?quality=90&resize=620,414"
            />
            <TextField
               fullWidth
               multiline
               variant="standard"
               placeholder="Write your comment"
               value={newComment}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
               onKeyDown={handleSubmit}
            />
            {newComment && (
               <Box sx={{ cursor: "pointer" }}>
                  <SendIcon />
               </Box>
            )}
         </Stack>
         {/* List other comments */}
         <Box sx={{ height: "50vh", overflow: "auto" }}>
            <Stack marginBottom={2} flexDirection="row" sx={{ gap: 2 }}>
               <Link to="/">
                  <Avatar srcSet="https://images.immediate.co.uk/production/volatile/sites/3/2017/11/peaky-tommy-5d3c20b.jpg?quality=90&resize=620,414" />
               </Link>
               <Box bgcolor="#eee" p={1} borderRadius={4}>
                  <Link to="/">Your name</Link>
                  <Typography paragraph>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aut impedit
                     laboriosam tenetur corporis? Dignissimos tempore quis officia corporis unde
                     repellendus molestias cupiditate? Mollitia, architecto. Optio ipsam cum
                     incidunt vero?
                  </Typography>
               </Box>
            </Stack>
            <Stack marginBottom={2} flexDirection="row" sx={{ gap: 2 }}>
               <Link to="/">
                  <Avatar srcSet="https://images.immediate.co.uk/production/volatile/sites/3/2017/11/peaky-tommy-5d3c20b.jpg?quality=90&resize=620,414" />
               </Link>
               <Box bgcolor="#eee" p={1} borderRadius={4}>
                  <Link to="/">Your name</Link>
                  <Typography paragraph>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aut impedit
                     laboriosam tenetur corporis? Dignissimos tempore quis officia corporis unde
                     repellendus molestias cupiditate? Mollitia, architecto. Optio ipsam cum
                     incidunt vero?
                  </Typography>
               </Box>
            </Stack>
            <Stack marginBottom={2} flexDirection="row" sx={{ gap: 2 }}>
               <Link to="/">
                  <Avatar srcSet="https://images.immediate.co.uk/production/volatile/sites/3/2017/11/peaky-tommy-5d3c20b.jpg?quality=90&resize=620,414" />
               </Link>
               <Box bgcolor="#eee" p={1} borderRadius={4}>
                  <Link to="/">Your name</Link>
                  <Typography paragraph>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea aut impedit
                     laboriosam tenetur corporis? Dignissimos tempore quis officia corporis unde
                     repellendus molestias cupiditate? Mollitia, architecto. Optio ipsam cum
                     incidunt vero?
                  </Typography>
               </Box>
            </Stack>
         </Box>
      </>
   );
};

export default Comment;
