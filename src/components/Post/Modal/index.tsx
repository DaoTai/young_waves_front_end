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
import { forwardRef, useImperativeHandle, useState } from "react";
import { CloseButton, ImageInput } from "../../index";
import { MyBox } from "./styles";

const MyModal = ({ onSubmit }: { onSubmit: () => void }, ref) => {
   const theme = useTheme();
   const [open, setOpen] = useState(false);
   const [images, setImages] = useState<string[]>([]);
   const [post, setPost] = useState<string>("");
   const [status, setStatus] = useState<string>("");
   useImperativeHandle(ref, () => ({
      handleOpen,
      handleClose,
      images: images,
      post: post,
      status: status,
      setImages,
      setPost,
      setStatus,
   }));

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
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
      if (post) {
         onSubmit();
         setImages([]);
         setPost("");
         setStatus("");
         handleClose();
      }
   };

   return (
      <Modal open={open} onClose={handleClose}>
         <MyBox>
            {/* Heading */}
            <Typography variant="h3" component="h2" textAlign="center" pb={1}>
               Your post
            </Typography>
            <CloseButton onClick={handleClose} size="large" />

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
                     value={post}
                     placeholder="What do you think?"
                     margin="dense"
                     required
                     fullWidth
                     multiline
                     rows={5}
                     onChange={(e) => setPost(e.target.value)}
                  />
                  <ImageList cols={3} rowHeight={164} gap={8} variant="quilted">
                     {images?.map((item, index) => (
                        <ImageListItem key={index} sx={{ mb: 1, minHeight: "40vh" }}>
                           <CloseButton onClick={() => handleRemoveImage(index)} />
                           <img srcSet={`${item} 2x`} loading="lazy" placeholder="image" />
                        </ImageListItem>
                     ))}
                  </ImageList>
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

export default forwardRef(MyModal);
