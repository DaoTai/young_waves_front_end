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
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../../redux-saga/redux/actions";
import { Post } from "../../../utils/interfaces/Post";
import { CloseButton, ImageInput } from "../../index";
import { MyBox } from "./styles";

interface ModalPostProps {
   post?: Post;
   type: "update" | "create";
   onClose: () => void;
}

const MyModal = ({ post, type = "create", onClose }: ModalPostProps) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [images, setImages] = useState<string[]>([]);
   const [body, setBody] = useState<string>("");
   const [status, setStatus] = useState<string>("");
   const [attachments, setAttachments] = useState<FileList>();
   const [deletedImages, setDeletedImages] = useState<string[]>([]);
   const imagesRef = useRef<string[]>([]);
   useEffect(() => {
      if (post) {
         if (post?.attachments?.length > 0) {
            setImages(post?.attachments);
         }
         post?.body && setBody(post.body);
         post?.status && setStatus(post.status);
      }
   }, [post]);

   useEffect(() => {
      return () => {
         imagesRef.current.forEach((url) => URL.revokeObjectURL(url));
      };
   }, []);

   const handleSetImages = (files: FileList) => {
      setAttachments(files);
      // Remove not image files
      const imageFiles = Array.from(files).filter((file) => !file.type.includes("video"));
      const urlImages = imageFiles.map((file) => URL.createObjectURL(file));
      imagesRef.current = [...images, ...urlImages];
      setImages(imagesRef.current);
   };

   const handleRemoveImage = (deletedImg: string) => {
      URL.revokeObjectURL(deletedImg);
      imagesRef.current = imagesRef.current.filter((url) => url !== deletedImg);
      setImages((prev) => prev.filter((img) => img !== deletedImg));
      setDeletedImages([...deletedImages, deletedImg]);
   };

   const handleSubmit = () => {
      if (body) {
         switch (type) {
            case "create":
               dispatch(
                  createPost({
                     attachments,
                     body,
                     status,
                  })
               );
               onClose();
               return;
            case "update":
               const filteredImages = post?.attachments.filter(
                  (attachment) => !deletedImages?.includes(attachment)
               );
               dispatch(
                  updatePost({
                     _id: post!._id,
                     body,
                     status,
                     attachments: filteredImages,
                     deletedAttachments: deletedImages,
                     files: attachments,
                  })
               );
               onClose();
               return;
            default:
               return;
         }
      }
   };

   return (
      <Modal open onClose={onClose}>
         <MyBox>
            {/* Heading */}
            <Typography variant="h3" component="h2" textAlign="center" pb={1}>
               Your post
            </Typography>
            <CloseButton onClick={onClose} size="large" />

            <Box borderTop={1} pt={2}>
               <form>
                  <TextField
                     fullWidth
                     variant="outlined"
                     label="Status"
                     placeholder="How do you feel..."
                     margin="dense"
                     value={status}
                     onChange={(e) => setStatus(e.target.value)}
                  />
                  <TextField
                     required
                     fullWidth
                     multiline
                     autoFocus
                     placeholder="What do you think?"
                     margin="dense"
                     rows={5}
                     sx={{ mb: 2 }}
                     value={body}
                     onChange={(e) => setBody(e.target.value)}
                  />
                  {images.length > 0 && (
                     <ImageList cols={3} rowHeight={164} gap={8} variant="quilted">
                        {images?.map((item, index) => (
                           <ImageListItem key={index} sx={{ mb: 1, minHeight: "40vh" }}>
                              <CloseButton onClick={() => handleRemoveImage(item)} />
                              <img srcSet={`${item} 2x`} placeholder="image" />
                           </ImageListItem>
                        ))}
                     </ImageList>
                  )}
                  <ImageInput multiple onChange={handleSetImages} />
                  <Button
                     fullWidth
                     disabled={!body.trim()}
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
