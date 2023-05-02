import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
   Avatar,
   Button,
   CardHeader,
   IconButton,
   Stack,
   Tooltip,
   Typography,
   useTheme,
} from "@mui/material";
import dateFormat from "dateformat";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog, PostModal } from "../../../../../components";
import { deletePost, updatePost } from "../../../../../redux-saga/redux/actions";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { Post } from "../../../../../utils/interfaces/Post";
import { Actions } from "./styles";
export interface HeadingNewsProps {
   post: Post;
   showAction?: boolean;
}

const Heading = ({ post, showAction = false }: HeadingNewsProps) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const auth$ = useSelector(authState$);
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
      navigator.clipboard.writeText(`${window.location.origin}/news/${post._id}`);
      handleClose();
   };

   const handleShowEditModal = () => {
      handleClose();
      setOpenPostModal(true);
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
                        sx={{
                           width: 50,
                           height: 50,
                           boxShadow: 1,
                        }}
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
                  <Typography
                     fontWeight={500}
                     variant="body1"
                     display="flex"
                     flexDirection="row"
                     align="center">
                     <Link to={`/user/explore/${post?.author?._id}`}>{post?.author?.fullName}</Link>
                     {post?.author.isAdmin && (
                        <Tooltip title="Admin">
                           <CheckCircleIcon fontSize="small" color="primary" sx={{ ml: 0.25 }} />
                        </Tooltip>
                     )}
                  </Typography>
               }
               subheader={
                  <>
                     {post?.status && (
                        <Typography pr={0.5} variant="body2" component="span">
                           I'm feeling {post?.status?.toLocaleLowerCase()}
                        </Typography>
                     )}
                     <Typography
                        variant="body2"
                        component="span"
                        sx={{ color: theme.myColor.textSecondary }}>
                        {dateFormat(post?.createdAt, "h:MM TT, mmmm dS, yyyy")}
                     </Typography>
                  </>
               }
               sx={{ pl: 0, pb: 0.5 }}
            />
            {/* Options */}
            <Actions
               open={!!anchorEl}
               anchorEl={anchorEl}
               onClose={handleClose}
               anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
               }}>
               <Button startIcon={<ContentCopyIcon />} onClick={handleCopyLinkPost}>
                  Copy link
               </Button>
            </Actions>
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
                     src={auth$.payload?.user.avatar}
                     srcSet={auth$.payload?.user.avatar}
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
               <Typography
                  fontWeight={500}
                  variant="body1"
                  display="flex"
                  flexDirection="row"
                  align="center">
                  <Link to={`/user/profile/${auth$.payload?.user._id}`}>
                     {auth$.payload?.user.fullName}
                  </Link>
                  {post?.author.isAdmin && (
                     <Tooltip title="Admin">
                        <CheckCircleIcon fontSize="small" color="primary" sx={{ ml: 0.25 }} />
                     </Tooltip>
                  )}
               </Typography>
            }
            subheader={
               <>
                  {post?.status && (
                     <Typography pr={0.5} variant="body2" component="span">
                        I'm feeling {post?.status?.toLocaleLowerCase()}
                     </Typography>
                  )}
                  <Typography
                     variant="body2"
                     component="span"
                     sx={{ color: theme.myColor.textSecondary }}>
                     {dateFormat(post?.createdAt, "h:MM TT, mmmm dS, yyyy")}
                  </Typography>
               </>
            }
            sx={{ pl: 0, pb: 0.5 }}
         />
         {/* Options */}
         <Actions
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
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
         </Actions>

         {/* Dialog */}
         <Dialog
            open={openDialog}
            title="Confirm delete"
            content="Are you sure want to delete this post?"
            onClose={() => setOpenDialog(false)}
            onSubmit={() => handleDelete(post._id)}
         />
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
