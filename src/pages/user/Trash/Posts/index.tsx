import InfoIcon from "@mui/icons-material/Info";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Typography,
   useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forceDeletePost, getTrashPosts, restorePost } from "../../../../redux-saga/redux/actions";
import { trashPostsState$ } from "../../../../redux-saga/redux/selectors";
const TrashPosts = () => {
   const theme = useTheme();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { isLoading, payload } = useSelector(trashPostsState$);

   const [openDialog, setOpenDialog] = useState<boolean>(false);

   const [idDelete, setIdDelete] = useState<string>("");
   useEffect(() => {
      dispatch(getTrashPosts());
   }, []);

   const handleShowDetail = (id: string) => {
      navigate(`/user/trash/posts/${id}`);
   };

   const handleRestore = (id: string) => {
      dispatch(restorePost(id));
   };

   const handleForceDelete = () => {
      dispatch(forceDeletePost(idDelete));
      setOpenDialog(!openDialog);
   };

   const handleOpenDialog = (id: string) => {
      setOpenDialog(true);
      setIdDelete(id);
   };

   return (
      <>
         <Helmet>
            <title>Trash | Young Waves</title>
         </Helmet>

         {/* Dialog */}
         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle display="flex" justifyContent="center" alignItems="center">
               Confirm delete
               <InfoIcon color="info" />
            </DialogTitle>
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

         {/* Spinner */}
         {/* <Spinner show={isLoading} /> */}
      </>
   );
};

export default TrashPosts;
