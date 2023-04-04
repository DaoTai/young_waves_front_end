import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
   Avatar,
   Button,
   CardHeader,
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
import dateFormat from "dateformat";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostModal } from "../../../../../components";
import { deletePost, updatePost } from "../../../../../redux-saga/redux/actions";
import { authState$, profileState$ } from "../../../../../redux-saga/redux/selectors";
import { INIT_STATE } from "../../../../../utils/constants";
import { Post } from "../../../../../utils/interfaces/Post";

export interface HeadingNewsProps {
   post: Post;
   showAction?: boolean;
}

const Heading = ({ post, showAction = false }: HeadingNewsProps) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const auth$ = useSelector(authState$);
   const profile$ = useSelector(profileState$);
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const [openPostModal, setOpenPostModal] = useState<boolean>(false);
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleCopyLinkPost = () => {
      navigator.clipboard.writeText(`${window.location.origin}/post/${post._id}`);
      handleClose();
   };

   const handleShowEditModal = () => {
      handleClose();
      setOpenPostModal(true);
      // const { setImages, setPost, setStatus, handleOpen } = modalRef.current as ModalRef;
      // setImages(post?.attachments);
      // setPost(post?.body);
      // setStatus(post?.status);
   };

   const handleUpdate = useCallback(
      (updatedPost: Partial<Post>) => {
         dispatch(updatePost({ ...updatedPost, _id: post._id }));
      },
      [post]
   );

   const onClosePostModal = useCallback(() => {
      setOpenPostModal(false);
   }, []);

   const handleDelete = (id: string) => {
      setOpenDialog(false);
      dispatch(deletePost(id));
   };

   // Author post is not current user
   if (auth$.payload?.user?._id !== post?.author._id) {
      return (
         <>
            <CardHeader
               avatar={
                  <Link to={`/user/explore/${post?.author._id}`}>
                     <Avatar
                        src={post?.author.avatar}
                        srcSet={post?.author.avatar}
                        alt="avatar"
                        sx={{ width: 50, height: 50, boxShadow: 1 }}
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
                     <Link to={`/user/explore/${post?.author?._id}`}>{post?.author?.fullName}</Link>
                  </Typography>
               }
               subheader={
                  <>
                     {post?.status && (
                        <Typography pr={1} variant="body2" component="span">
                           I'm feeling {post?.status?.toLocaleLowerCase()}
                        </Typography>
                     )}
                     <Typography
                        variant="body2"
                        component="span"
                        sx={{ color: theme.myColor.textSecondary }}>
                        {dateFormat(post?.createdAt, "mmmm dS, yyyy, h:MM TT")}{" "}
                     </Typography>
                  </>
               }
               sx={{ pl: 0 }}
            />
            {/* Options */}
            <Popover
               open={!!anchorEl}
               anchorEl={anchorEl}
               onClose={handleClose}
               anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
               }}
               sx={{
                  "& button:hover": {
                     background: theme.myColor.link,
                     color: theme.myColor.white,
                  },
               }}>
               <Button
                  sx={{
                     bgcolor: "transparent",
                     color: theme.myColor.link,
                  }}
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyLinkPost}>
                  Copy link
               </Button>
            </Popover>

            {/* Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
               <DialogTitle display="flex" justifyContent="center" alignItems="center">
                  Confirm delete
                  <InfoIcon color="info" />
               </DialogTitle>
               <DialogContent>
                  <DialogContentText>Are you sure want to delete this post?</DialogContentText>
               </DialogContent>
               <DialogActions sx={{ justifyContent: "space-between" }}>
                  <Button
                     variant="outlined"
                     sx={{ backgroundColor: theme.myColor.white }}
                     onClick={() => setOpenDialog(false)}>
                     Cancel
                  </Button>
                  <Button variant="contained" type="submit" onClick={() => handleDelete(post._id)}>
                     Agree
                  </Button>
               </DialogActions>
            </Dialog>

            {/* Modal */}
            <PostModal
               post={post}
               open={openPostModal}
               onClose={onClosePostModal}
               onSubmit={handleUpdate}
            />
         </>
      );
   }

   // Owner post
   return (
      <>
         <CardHeader
            avatar={
               <Link to={`/user/profile/${auth$.payload?.user._id}`}>
                  <Avatar
                     src={profile$.payload?.avatar || auth$.payload?.user.avatar}
                     srcSet={profile$.payload?.avatar || auth$.payload?.user.avatar}
                     alt="avatar"
                     sx={{ width: 50, height: 50, boxShadow: 1 }}
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
                  <Link to={`/user/profile/${auth$.payload?.user._id}`}>
                     {profile$.payload?.fullName || auth$.payload?.user.fullName}
                  </Link>
               </Typography>
            }
            subheader={
               <>
                  {post?.status && (
                     <Typography pr={1} variant="body2" component="span">
                        I'm feeling {post?.status?.toLocaleLowerCase()}
                     </Typography>
                  )}
                  <Typography
                     variant="body2"
                     component="span"
                     sx={{ color: theme.myColor.textSecondary }}>
                     {dateFormat(post?.createdAt, "mmmm dS, yyyy, h:MM TT")}{" "}
                  </Typography>
               </>
            }
            sx={{ pl: 0 }}
         />
         {/* Options */}
         <Popover
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}
            sx={{
               button: {
                  justifyContent: "flex-start",
                  textTransform: "none",
                  bgcolor: "transparent",
                  color: theme.myColor.link,
                  borderRadius: 0,
                  "&:not(:first-of-type)": {
                     borderTop: 1,
                  },
               },
               "& button:hover": {
                  background: theme.myColor.link,
                  color: theme.myColor.white,
               },
            }}>
            <Stack>
               {auth$.payload.user._id === post?.author?._id && (
                  <>
                     <Button startIcon={<ModeEditIcon />} onClick={handleShowEditModal}>
                        Edit
                     </Button>

                     <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                           setOpenDialog(true);
                           handleClose();
                        }}>
                        Delete
                     </Button>
                  </>
               )}

               <Button startIcon={<ContentCopyIcon />} onClick={handleCopyLinkPost}>
                  Copy link
               </Button>
            </Stack>
         </Popover>

         {/* Dialog */}
         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle display="flex" justifyContent="center" alignItems="center">
               Confirm delete
               <InfoIcon color="info" />
            </DialogTitle>
            <DialogContent>
               <DialogContentText>Are you sure want to delete this post?</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
               <Button
                  variant="outlined"
                  sx={{ backgroundColor: theme.myColor.white }}
                  onClick={() => setOpenDialog(false)}>
                  Cancel
               </Button>
               <Button variant="contained" type="submit" onClick={() => handleDelete(post._id)}>
                  Agree
               </Button>
            </DialogActions>
         </Dialog>

         {/* Modal */}
         <PostModal
            post={post}
            open={openPostModal}
            onClose={onClosePostModal}
            onSubmit={handleUpdate}
         />
      </>
   );
};

export default Heading;
