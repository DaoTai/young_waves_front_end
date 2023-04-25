import { Send } from "@mui/icons-material";
import {
   Box,
   Button,
   ImageList,
   ImageListItem,
   Modal,
   TextField,
   Typography,
   useTheme,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import { CloseButton, ImageInput } from "../../index";
import { MyBox } from "./styles";
import { Post } from "../../../utils/interfaces/Post";

interface ModalPostProps {
   post?: Post;
   open: boolean;
   onClose: () => void;
   onSubmit: (post: Partial<Post>) => void;
}

const MyModal = ({ post, open, onClose, onSubmit }: ModalPostProps) => {
   const theme = useTheme();
   const [images, setImages] = useState<string[]>([]);
   const [body, setBody] = useState<string>("");
   const [status, setStatus] = useState<string>("");
   useEffect(() => {
      setImages(post?.attachments ?? []);
      setBody(post?.body ?? "");
      setStatus(post?.status ?? "");
   }, [post]);

   const handleSetImages = (files) => {
      setImages((prev) => [...prev, ...files]);
   };
   const handleRemoveImage = (index: number) => {
      setImages((prev: string[]) => {
         const newState = [...prev];
         newState.splice(index, 1);
         return newState;
      });
   };

   const handleSubmit = () => {
      if (body) {
         onSubmit({
            attachments: images,
            body,
            status,
         });
         setImages([]);
         setBody("");
         setStatus("");
         onClose();
      }
   };

   return (
      <Modal open={open} onClose={onClose}>
         <MyBox>
            {/* Heading */}
            <Typography variant="h3" component="h2" textAlign="center" pb={1}>
               Your post
            </Typography>
            <CloseButton onClick={onClose} size="large" />

            <Box borderTop={1} pt={2}>
               <form>
                  <TextField
                     variant="outlined"
                     label="Status"
                     value={status}
                     placeholder="How do you feel..."
                     margin="dense"
                     fullWidth
                     onChange={(e) => setStatus(e.target.value)}
                  />
                  <TextField
                     value={body}
                     autoFocus
                     placeholder="What do you think?"
                     margin="dense"
                     required
                     fullWidth
                     multiline
                     rows={5}
                     sx={{ mb: 2 }}
                     onChange={(e) => setBody(e.target.value)}
                  />
                  {images.length > 0 && (
                     <ImageList cols={3} rowHeight={164} gap={8} variant="quilted">
                        {images?.map((item, index) => (
                           <ImageListItem key={index} sx={{ mb: 1, minHeight: "40vh" }}>
                              <CloseButton onClick={() => handleRemoveImage(index)} />
                              <img srcSet={`${item} 2x`} loading="lazy" placeholder="image" />
                           </ImageListItem>
                        ))}
                     </ImageList>
                  )}
                  <ImageInput multiple onChange={handleSetImages} />
                  <Button
                     fullWidth
                     size="large"
                     variant="contained"
                     endIcon={<Send />}
                     sx={{ marginTop: 2, color: theme.myColor.white }}
                     onClick={handleSubmit}>
                     Create
                  </Button>
               </form>
            </Box>
         </MyBox>
      </Modal>
   );
};

export default memo(MyModal);
