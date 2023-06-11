import { Send } from "@mui/icons-material";
import { Box, Button, ImageList, ImageListItem, Modal, TextField, Typography, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../../redux-saga/redux/actions";
import { Post } from "../../../utils/interfaces/Post";
import { CloseButton, ImageInput } from "../../index";
import { MyBox, Title } from "./styles";
import { Attachment } from "../../../utils/interfaces/Attachment";
interface ModalPostProps {
   post?: Post;
   type: "update" | "create";
   onClose: () => void;
}

const MyModal = ({ post, type = "create", onClose }: ModalPostProps) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [body, setBody] = useState<string>("");
   const [status, setStatus] = useState<string>("");
   const [deletedAttachments, setDeletedAttachments] = useState<string[]>([]);
   const [attachments, setAttachments] = useState<Attachment[]>([]);

   useEffect(() => {
      if (post) {
         if (post?.attachments?.length > 0) {
            setAttachments(() => {
               return post.attachments.map((item) => ({ url: item }));
            });
         }
         post?.body && setBody(post.body);
         post?.status && setStatus(post.status);
      }
   }, [post]);

   // onClose modal
   const onCloseModal = () => {
      attachments.forEach((item) => URL.revokeObjectURL(item.url));
      onClose();
   };

   // Add images
   const handleSetImages = (files: File[], blobs: string[]) => {
      const newAttachment = blobs.map((blob, index) => ({ file: files[index], url: blob }));
      setAttachments([...attachments, ...newAttachment]);
   };

   // Remove image
   const handleRemoveImage = (deletedImg: Attachment) => {
      // If seleted image will be deleted which is old image, we set it to delete
      if (deletedImg.url.includes("https://firebasestorage.googleapis.com")) {
         setDeletedAttachments([...deletedAttachments, deletedImg.url]);
      }
      setAttachments(attachments.filter((item) => item.file !== deletedImg?.file || item.url !== deletedImg.url));
      URL.revokeObjectURL(deletedImg.url);
   };

   // Handle submit
   const handleSubmit = () => {
      // Get files
      const files = attachments.filter((item) => item.file).map((item) => item.file);
      // Get urls of old images
      if (body) {
         switch (type) {
            case "create":
               dispatch(
                  createPost({
                     attachments: files as File[],
                     body,
                     status,
                  })
               );
               break;
            case "update":
               dispatch(
                  updatePost({
                     _id: post!._id,
                     body,
                     status,
                     deletedAttachments,
                     newAttachments: files as File[],
                  })
               );
               break;
            default:
               onCloseModal();
         }

         onCloseModal();
      }
   };

   return (
      <Modal open onClose={onCloseModal}>
         <MyBox>
            {/* Heading */}
            <Title variant="h3">{type} post</Title>
            <CloseButton onClick={onCloseModal} size="large" />

            <Box>
               <form encType="multipart/form-data">
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
                  {attachments.length > 0 && (
                     <ImageList cols={3} rowHeight={164} gap={8} variant="quilted">
                        {attachments?.map((item, index) => (
                           <ImageListItem key={index} sx={{ mb: 1, minHeight: "40vh" }}>
                              <CloseButton onClick={() => handleRemoveImage(item)} />
                              <img srcSet={`${item.url} 2x`} placeholder="image" />
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
                     sx={{ marginTop: 2, color: "#fff", textTransform: "capitalize" }}
                     onClick={handleSubmit}>
                     {type}
                  </Button>
               </form>
            </Box>
         </MyBox>
      </Modal>
   );
};

export default memo(MyModal);
