import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
   Avatar,
   Button,
   ButtonBase,
   CardHeader,
   InputBase,
   Paper,
   Popover,
   Stack,
   Tooltip,
   Typography,
   useTheme,
} from "@mui/material";
import dateFormat from "dateformat";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dialog } from "../../components";
import { authState$ } from "../../redux-saga/redux/selectors";
import { Comment } from "../../utils/interfaces/Comment";
interface Props {
   comment: Comment;
   handleDelete?: (id: string) => void;
   onSubmit?: (id: string, updatedComment: string) => void;
   enableActions?: boolean;
}

const MyComment = ({
   comment,
   handleDelete = () => {},
   onSubmit = () => {},
   enableActions = false,
}: Props) => {
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload?.user._id;
   const commentRef = useRef<HTMLDivElement>();
   const bodyCommentRef = useRef<string>(comment?.body);
   const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const [openEditButtons, setOpenEditButtons] = useState<boolean>(false);
   const [value, setValue] = useState<string>(comment.body);

   // Because comment can be empty in first render so must setValue
   useEffect(() => {
      setValue(comment.body);
   }, [comment.body]);
   // Show Popover to choose options
   const handleShowPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setOpenPopover(event.currentTarget);
   };

   // Show dialog confirm delete
   const showDialog = () => {
      setOpenDialog(true);
      setOpenPopover(null);
   };

   // Delete comment
   const handleDeleteComment = () => {
      handleDelete(comment._id);
      setOpenDialog(false);
   };

   // Handle enable for edit comment
   const enableEditComment = () => {
      setOpenPopover(null);
      setOpenEditButtons(true);
      if (commentRef.current) {
         commentRef.current.style.backgroundColor = theme.myColor.white;
         const inputComment = commentRef.current.childNodes[0] as HTMLInputElement;
         inputComment.readOnly = false;
      }
   };

   // Hide edit comment
   const hideEditComment = () => {
      setOpenEditButtons(false);
      if (commentRef.current) {
         commentRef.current.style.backgroundColor = "transparent";
         const inputComment = commentRef.current.childNodes[0] as HTMLInputElement;
         inputComment.readOnly = true;
      }
   };

   // Handle cancel edit comment
   const cancelEditComment = () => {
      setValue(bodyCommentRef.current);
      hideEditComment();
   };

   // Create comment
   const onSubmitComment = () => {
      if (value !== comment.body) {
         onSubmit(comment._id, value);
      }
      hideEditComment();
   };

   // Close dialog
   const onCloseDialog = () => {
      setOpenDialog(false);
   };

   return (
      <>
         <Stack marginBottom={2} flexDirection="row" alignItems="flex-start" sx={{ gap: 1 }}>
            {/* Avatar */}
            <Link
               to={
                  idAuth === comment?.user?._id
                     ? `/user/profile/${auth$.payload?.user._id}`
                     : `/user/explore/${comment?.user?._id}`
               }>
               <Avatar sizes="large" srcSet={comment?.user.avatar} src={comment?.user.avatar} />
            </Link>
            {/* Content */}
            <Paper sx={{ flex: 2, borderRadius: 2, p: 1 }}>
               {/* Heading */}
               <CardHeader
                  title={
                     <Typography
                        variant="body1"
                        component="span"
                        display="flex"
                        flexDirection="row"
                        align="center"
                        sx={{
                           "&:hover": {
                              textDecoration: "underline",
                              textDecorationColor: theme.myColor.link,
                           },
                        }}>
                        <Link
                           to={
                              idAuth === comment?.user?._id
                                 ? `/user/profile/${auth$.payload?.user._id}`
                                 : `/user/explore/${comment?.user?._id}`
                           }
                           style={{ display: "flex", alignItems: "center" }}>
                           {comment?.user.fullName}
                           {/* Display admin icon */}
                           {comment?.user?.isAdmin && (
                              <Tooltip title="Admin" TransitionProps={{ timeout: 1000 }}>
                                 <CheckCircleIcon
                                    fontSize="small"
                                    color="primary"
                                    sx={{ ml: 0.25 }}
                                 />
                              </Tooltip>
                           )}
                        </Link>
                     </Typography>
                  }
                  action={
                     enableActions &&
                     idAuth === comment.user._id && (
                        <ButtonBase sx={{ pt: 1, pr: 2, pl: 2, pb: 0 }} onClick={handleShowPopover}>
                           <MoreHorizIcon />
                        </ButtonBase>
                     )
                  }
                  subheader={
                     <Typography
                        variant="body2"
                        component="div"
                        color={theme.myColor.textSecondary}>
                        {dateFormat(comment?.updatedAt, " mmmm dS, yyyy, h:MM TT")}
                     </Typography>
                  }
                  sx={{ p: 0 }}
               />
               {/* Body */}
               <InputBase
                  fullWidth
                  readOnly
                  multiline
                  maxRows={4}
                  ref={commentRef}
                  value={value}
                  sx={{
                     borderBottom: 1,
                     borderColor: "transparent",
                     "&:focus-within": {
                        borderColor: theme.palette.primary.main,
                     },
                  }}
                  onChange={(e) => setValue(e.target.value)}
               />
               {openEditButtons && (
                  <Stack flexDirection="row" justifyContent="flex-end" mt={2} gap={2}>
                     <Button
                        variant="outlined"
                        sx={{ background: "transparent" }}
                        onClick={cancelEditComment}>
                        Cancel
                     </Button>
                     <Button variant="contained" onClick={onSubmitComment}>
                        Update
                     </Button>
                  </Stack>
               )}
            </Paper>

            {/* Popover options for comment*/}
            <Popover
               open={!!openPopover}
               anchorEl={openPopover}
               onClose={() => setOpenPopover(null)}
               anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
               }}>
               <Stack>
                  <Button
                     startIcon={<EditIcon color="primary" />}
                     sx={{
                        justifyContent: "flex-start",
                        pl: 1,
                        pr: 1,
                        bgcolor: "transparent",
                        "&:hover": {
                           background: theme.myColor.bg,
                        },
                     }}
                     onClick={enableEditComment}>
                     Edit
                  </Button>
                  <Button
                     startIcon={<DeleteIcon color="primary" />}
                     sx={{
                        justifyContent: "space-between",
                        pl: 1,
                        pr: 1,
                        bgcolor: "transparent",
                        "&:hover": {
                           background: theme.myColor.bg,
                        },
                     }}
                     onClick={showDialog}>
                     Delete
                  </Button>
               </Stack>
            </Popover>

            {/* Dialog confirm delete*/}
            <Dialog
               open={openDialog}
               title="Confirm delete"
               content="Are you sure want to delete this comment?"
               onClose={onCloseDialog}
               onSubmit={handleDeleteComment}
            />
         </Stack>
      </>
   );
};

export default MyComment;
