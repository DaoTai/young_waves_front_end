import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
   Button,
   CardHeader,
   Chip,
   IconButton,
   Popover,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import dateFormat from "dateformat";
import { Image, PostModal } from "../../../../../components";
import { updatePost } from "../../../../../redux-saga/redux/actions";
import { HeadingNewsProps, ModalRef } from "../../../../../utils/interfaces/Props";
const Heading = ({ news, author, createdAt = "" }: HeadingNewsProps) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
   const modalRef = useRef<ModalRef>({
      handleOpen: () => {},
      handleClose: () => {},
      images: [],
      post: "",
      status: "",
      setImages: () => {},
      setPost: () => {},
      setStatus: () => {},
   });

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleCopyLinkPost = () => {
      navigator.clipboard.writeText(`${window.location.origin}/news/${news._id}`);
   };

   const handleShowModal = () => {
      handleClose();
      const { setImages, setPost, setStatus, handleOpen } = modalRef.current;
      handleOpen();
      setImages(news?.attachments);
      setPost(news.body);
      setStatus(news.status);
   };

   const handleSubmit = () => {
      const { images, post, status } = modalRef.current;
      const data = {
         attachments: images,
         body: post,
         status,
      };
      dispatch(updatePost({ id: news._id, data }));
   };

   const open = Boolean(anchorEl);
   return (
      <>
         <CardHeader
            avatar={
               <Link to={`/user/profile/${author?._id}`}>
                  <Image
                     src={author?.avatar}
                     srcSet={author?.avatar}
                     alt="avatar"
                     style={{ borderRadius: "50%", width: "40px", height: "40px" }}
                  />
               </Link>
            }
            action={
               <IconButton onClick={handleClick}>
                  <MoreVertIcon />
               </IconButton>
            }
            title={<Link to={`/user/profile/${author?._id}`}>{author?.fullName}</Link>}
            subheader={
               <>
                  {news?.status && (
                     <Typography pr={1} variant="body2" component="span">
                        I'm feeling {news?.status?.toLocaleLowerCase()}
                     </Typography>
                  )}
                  <Chip label={dateFormat(createdAt, "mmmm dS, yyyy, h:MM TT")} />
               </>
            }
            sx={{ pl: 0 }}
         />
         <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}>
            <Stack sx={{ gap: 1 }}>
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
                  startIcon={<ContentCopyIcon />}
                  onClick={handleCopyLinkPost}>
                  <Typography variant="body2">Copy link</Typography>
               </Button>
            </Stack>
         </Popover>

         {/* Modal */}
         <PostModal onSubmit={handleSubmit} ref={modalRef} />
      </>
   );
};

export default Heading;
