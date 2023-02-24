import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import {
   Box,
   Stack,
   Typography,
   Chip,
   useTheme,
   Paper,
   Button,
   CardHeader,
   Popover,
   ListItemButton,
   Dialog,
   DialogContent,
   DialogContentText,
   DialogActions,
   DialogTitle,
} from "@mui/material";
import dateFormat from "dateformat";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Comment } from "../../utils/interfaces/Comment";
import { signInState$ } from "../../redux-saga/redux/selectors";
import Image from "../Image";
const MyComment = ({
   comment,
   handleDelete,
}: {
   comment: Comment;
   handleDelete: (id: string) => void;
}) => {
   const theme = useTheme();
   const { payload } = useSelector(signInState$);
   const idUser = payload?.data?.payload?._id;
   const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const handleShowPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setOpenPopover(event.currentTarget);
   };

   const onShowDialog = () => {
      setOpenDialog(true);
      setOpenPopover(null);
   };

   const onHanleDelete = () => {
      handleDelete(comment._id);
      setOpenDialog(false);
   };

   return (
      <>
         <Stack marginBottom={2} flexDirection="row" sx={{ gap: 2 }}>
            {/* Avatar */}
            <Link to={`/user/profile/${comment?.user?._id}`}>
               <Image
                  srcSet={comment?.user.avatar}
                  src={comment?.user.avatar}
                  width="40px"
                  height="40px"
                  circle
               />
            </Link>
            {/* Content */}
            <Box flexGrow={2} bgcolor={theme.myColor.bgGray} p={1} borderRadius={2}>
               <CardHeader
                  title={
                     <Typography variant="body1" component="span">
                        <Link to={`/user/profile/${comment?.user._id}`}>
                           {comment?.user.fullName}
                        </Link>
                     </Typography>
                  }
                  action={
                     idUser === comment.user._id && (
                        <Button
                           sx={{
                              color: "#000",
                              backgroundColor: "transparent",
                              padding: 1,
                              "&:hover": { backgroundColor: "transparent", opacity: 0.6 },
                           }}
                           onClick={handleShowPopover}>
                           <MoreHorizIcon />
                        </Button>
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
                  sx={{ p: 0, mb: 1 }}
               />
               {/* Comment */}
               <Typography variant="body1" pb={1}>
                  {comment?.body}
               </Typography>
            </Box>

            {/* Pop over */}
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
                     startIcon={<DeleteIcon />}
                     sx={{ pl: 1, pr: 1, bgcolor: "transparent", boxShadow: 1 }}
                     onClick={onShowDialog}>
                     Delete
                  </Button>
               </Stack>
            </Popover>

            {/* Dialog confirm */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(!openDialog)}>
               <DialogTitle textAlign="center">Confirm delete</DialogTitle>
               <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                     Are you sure want to delete this comment?
                  </DialogContentText>
               </DialogContent>
               <DialogActions>
                  <Button
                     variant="outlined"
                     sx={{
                        ".MuiButtonBase": {
                           bgColor: "#fff !important",
                        },
                     }}
                     onClick={() => setOpenDialog(!openDialog)}>
                     Disagree
                  </Button>
                  <Button variant="contained" autoFocus onClick={onHanleDelete}>
                     Agree
                  </Button>
               </DialogActions>
            </Dialog>
         </Stack>
      </>
   );
};

export default MyComment;
