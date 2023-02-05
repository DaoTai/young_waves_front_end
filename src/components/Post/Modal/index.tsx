import { Send } from "@mui/icons-material";
import { Box, Button, ImageList, ImageListItem, Modal, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { CloseButton, ImageInput } from "../../index";
import { MyBox } from "./styles";

const MyModal = (props: any, ref: any) => {
   const [open, setOpen] = useState(false);
   const [images, setImages] = useState<string[]>([]);

   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const handleSubmit = (e: React.FormEvent<EventTarget>) => {
      e.preventDefault();
   };

   const handleSetImages = (files: any) => {
      setImages(files);
   };

   const handleRemoveImage = (index: number) => {
      setImages((prev: string[]) => {
         const newState = [...prev];
         newState.splice(index, 1);
         return newState;
      });
   };

   useImperativeHandle(ref, () => ({
      handleOpen,
      handleClose,
   }));

   return (
      <Modal open={open} onClose={handleClose}>
         <MyBox>
            {/* Heading */}
            <Typography variant="h4" component="h2" textAlign="center">
               Create new post
            </Typography>
            <CloseButton onClick={handleClose} size="large" />

            <Box>
               <form onSubmit={handleSubmit}>
                  <TextField
                     placeholder="How do you feel..."
                     margin="dense"
                     required
                     fullWidth
                     multiline
                     rows={10}
                  />
                  <ImageList cols={3} rowHeight={164} variant="quilted">
                     {images?.map((item, index) => (
                        <ImageListItem key={item}>
                           <CloseButton onClick={() => handleRemoveImage(index)} />
                           <img srcSet={`${item} 2x`} loading="lazy" placeholder="image" />
                        </ImageListItem>
                     ))}
                  </ImageList>
                  <ImageInput multiple onChange={handleSetImages} />
                  <Button
                     fullWidth
                     type="submit"
                     size="large"
                     variant="contained"
                     endIcon={<Send />}
                     sx={{ marginTop: 2 }}>
                     Create
                  </Button>
               </form>
            </Box>
         </MyBox>
      </Modal>
   );
};

export default forwardRef(MyModal);
