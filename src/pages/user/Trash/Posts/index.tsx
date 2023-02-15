import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
   useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import { getTrashPosts, restorePost, forceDeletePost } from "../../../../redux-saga/redux/actions";
import { trashPostsState$ } from "../../../../redux-saga/redux/selectors";
import { Post } from "../../../../utils/interfaces/Post";
import { AlertProps } from "../../../../utils/interfaces/Props";
import { FORCE_DELETE_POST_SUCCESS } from "../../../../utils/constants";
import { Spinner, Alert } from "../../../../components";
const TrashPosts = () => {
   const theme = useTheme();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { isLoading, payload, action } = useSelector(trashPostsState$);
   const { perPage, maxPage, posts } =
      (payload as {
         perPage: number;
         maxPage: number;
         posts: Post[];
      }) ?? {};
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const [showAlert, setShowAlert] = useState<boolean>(false);
   const [msgAlert, setMsgAlert] = useState<AlertProps>({
      show: showAlert,
      msg: "",
      title: "",
      mode: "success",
      onClose: () => {
         setShowAlert(false);
      },
   });
   const [idDelete, setIdDelete] = useState<string>("");
   useEffect(() => {
      console.log("Dispatch");
      dispatch(getTrashPosts());
   }, []);

   useEffect(() => {
      let timerId = 0;
      if (action === FORCE_DELETE_POST_SUCCESS) {
         timerId = setTimeout(() => setShowAlert(false), 3500);
      }
      return () => {
         clearTimeout(timerId);
      };
   }, [action]);

   const handleShowDetail = (id: string) => {
      navigate(`/user/trash/posts/${id}`);
   };

   const handleRestore = (id: string) => {
      dispatch(restorePost(id));
   };

   const handleForceDelete = () => {
      setShowAlert(true);
      dispatch(forceDeletePost(idDelete));
      setOpenDialog(!openDialog);
   };

   const handleOpenDialog = (id: string) => {
      setOpenDialog(true);
      setIdDelete(id);
   };

   return (
      <>
         <TableContainer component={Paper} sx={{ overflowX: "scroll" }}>
            <Table>
               <TableHead>
                  <TableRow sx={{ bgcolor: theme.myColor.link }}>
                     <TableCell
                        align="left"
                        sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.8 }}>
                        Orders
                     </TableCell>
                     <TableCell
                        align="left"
                        sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.8 }}>
                        Summary
                     </TableCell>
                     <TableCell
                        align="left"
                        sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.8 }}>
                        Created time
                     </TableCell>
                     <TableCell
                        align="left"
                        sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.8 }}>
                        Deleted time
                     </TableCell>
                     <TableCell
                        align="left"
                        sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.8 }}>
                        Detail
                     </TableCell>
                     <TableCell
                        align="center"
                        sx={{ fontWeight: 600, fontSize: 16, lineHeight: 1.8 }}>
                        Options
                     </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {posts?.map((post, index) => (
                     <TableRow key={post._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell
                           sx={{ overflow: "hidden", maxWidth: "15vw", textOverflow: "ellipsis" }}>
                           <Typography component="span" whiteSpace="nowrap" overflow="hidden">
                              {post.body}
                           </Typography>
                        </TableCell>
                        <TableCell>{dateFormat(post.createdAt, "mm/d/yyyy h:MM TT")}</TableCell>
                        <TableCell>{dateFormat(post.deletedAt, "mm/d/yyyy h:MM TT")}</TableCell>
                        <TableCell>
                           <Button
                              variant="outlined"
                              endIcon={<VisibilityIcon />}
                              onClick={() => handleShowDetail(post?._id)}>
                              Watch
                           </Button>
                        </TableCell>
                        <TableCell>
                           <Stack flexDirection="row" justifyContent="space-evenly">
                              <Button
                                 color="success"
                                 variant="outlined"
                                 endIcon={<RestoreIcon />}
                                 onClick={() => handleRestore(post?._id)}>
                                 Restore
                              </Button>
                              <Button
                                 color="error"
                                 variant="contained"
                                 endIcon={<DeleteIcon />}
                                 onClick={() => handleOpenDialog(post?._id)}>
                                 Delete
                              </Button>
                           </Stack>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>

         {/* Dialog */}
         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <Typography variant="h5" p={2} borderBottom={1} textAlign="center">
               Confirm delete
            </Typography>
            <DialogContent sx={{ minWidth: "30vw" }}>
               <Typography color={theme.myColor.text} textAlign="center">
                  Do you sure you want to delete this post ?
               </Typography>
            </DialogContent>
            <DialogActions sx={{ pb: 2, justifyContent: "space-between" }}>
               <Button
                  variant="outlined"
                  sx={{ backgroundColor: theme.myColor.white }}
                  onClick={() => setOpenDialog(false)}>
                  Cancel
               </Button>
               <Button variant="contained" type="submit" onClick={() => handleForceDelete()}>
                  Agree
               </Button>
            </DialogActions>
         </Dialog>

         {/* Alert */}
         {action === FORCE_DELETE_POST_SUCCESS && (
            <Alert
               show={showAlert}
               msg="Delete post successfully!"
               title="Success"
               mode="success"
               onClose={() => {
                  setShowAlert(false);
               }}
            />
         )}

         {/* Spinner */}
         <Spinner show={isLoading} />
      </>
   );
};

export default TrashPosts;
