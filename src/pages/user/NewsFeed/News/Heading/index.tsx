import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
   Button,
   CardHeader,
   Chip,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   IconButton,
   Popover,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import { Image, PostModal } from "../../../../../components";
import { updatePost, deletePost } from "../../../../../redux-saga/redux/actions";
import { signInState$ } from "../../../../../redux-saga/redux/selectors";
import { HeadingNewsProps, ModalRef } from "../../../../../utils/interfaces/Props";
import { INIT_STATE } from "../../../../../utils/constants";
const Heading = ({
   news,
   author,
   createdAt = "",
   indexNews,
   showAction = false,
}: HeadingNewsProps) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const {
      payload: { data },
   } = useSelector(signInState$);
   const idUser = data?.payload?._id;
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const modalRef = useRef<ModalRef>(INIT_STATE.modalRef);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleCopyLinkPost = () => {
      navigator.clipboard.writeText(`${window.location.origin}/news/${news._id}`);
      handleClose();
   };

   const handleShowModal = () => {
      handleClose();
      const { setImages, setPost, setStatus, handleOpen } = modalRef.current;
      handleOpen();
      setImages(news?.attachments);
      setPost(news.body);
      setStatus(news.status);
   };

   const handleUpdate = useCallback(() => {
      const { images, post, status } = modalRef.current;
      const data = {
         ...news,
         attachments: images,
         body: post,
         status,
      };
      dispatch(updatePost({ id: news._id, data, index: indexNews as number }));
   }, []);

   const handleDelete = (id: string) => {
      setOpenDialog(false);
      dispatch(deletePost(id));
   };

   return (
      <>
         <CardHeader
            avatar={
               <Link to={`/user/profile/${author?._id}`}>
                  <Image
                     src={author?.avatar}
                     srcSet={author?.avatar}
                     alt="avatar"
                     borderRadius="50%"
                     objectFit="cover"
                  />
               </Link>
            }
            action={
               showAction && (
                  <IconButton onClick={handleClick}>
                     <MoreVertIcon />
                  </IconButton>
               )
            }
            title={
               <Typography variant="body1">
                  <Link to={`/user/profile/${author?._id}`}>{author?.fullName}</Link>
               </Typography>
            }
            subheader={
               <>
                  {news?.status && (
                     <Typography pr={1} variant="body2" component="span">
                        I'm feeling {news?.status?.toLocaleLowerCase()}
                     </Typography>
                  )}
                  <Typography
                     variant="body2"
                     component="span"
                     sx={{ color: theme.myColor.textSecondary }}>
                     {dateFormat(createdAt, "mmmm dS, yyyy, h:MM TT")}{" "}
                  </Typography>
               </>
            }
            sx={{ pl: 0 }}
         />
         <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}>
            <Stack sx={{ gap: 1 }}>
               {idUser === news?.author?._id && (
                  <>
                     <Button
                        sx={{
                           justifyContent: "flex-start",
                           textTransform: "none",
                           bgcolor: "transparent",
                           color: theme.myColor.link,
                        }}
                        startIcon={<ModeEditIcon />}
                        onClick={handleShowModal}>
                        <Typography variant="body2">Edit</Typography>
                     </Button>

                     <Button
                        sx={{
                           justifyContent: "flex-start",
                           textTransform: "none",
                           bgcolor: "transparent",
                           color: theme.myColor.link,
                        }}
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                           setOpenDialog(true);
                           handleClose();
                        }}>
                        <Typography variant="body2">Delete</Typography>
                     </Button>
                  </>
               )}

               <Button
                  sx={{
                     justifyContent: "flex-start",
                     textTransform: "none",
                     bgcolor: "transparent",
                     color: theme.myColor.link,
                  }}
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyLinkPost}>
                  <Typography variant="body2">Copy link</Typography>
               </Button>
            </Stack>
         </Popover>

         {/* Dialog */}
         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle textAlign="center">Confirm</DialogTitle>
            <DialogContent>
               <DialogContentText>Do you agree to delete this post?</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
               <Button
                  variant="outlined"
                  sx={{ backgroundColor: theme.myColor.white }}
                  onClick={() => setOpenDialog(false)}>
                  Cancel
               </Button>
               <Button variant="contained" type="submit" onClick={() => handleDelete(news._id)}>
                  Agree
               </Button>
            </DialogActions>
         </Dialog>

         {/* Modal */}
         <PostModal onSubmit={handleUpdate} ref={modalRef} />
      </>
   );
};

export default Heading;
