import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Paper,
   Stack,
   Table,
   TableBody,
   TableCell,
   TableCellProps,
   TableContainer,
   TableHead,
   TableRow,
   Typography,
   useTheme,
} from "@mui/material";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../../components";
import { forceDeletePost, getTrashPosts, restorePost } from "../../../../redux-saga/redux/actions";
import { trashPostsState$ } from "../../../../redux-saga/redux/selectors";
import { Post } from "../../../../utils/interfaces/Post";
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

   const [idDelete, setIdDelete] = useState<string>("");
   useEffect(() => {
      dispatch(getTrashPosts());
   }, []);

   const tableCells = [
      {
         name: "Orders",
         align: "left",
      },
      {
         name: "Summary",
         align: "left",
      },
      {
         name: "Created time",
         align: "left",
      },
      {
         name: "Deleted time",
         align: "left",
      },
      {
         name: "Detail",
         align: "left",
      },
      {
         name: "Options",
         align: "center",
      },
   ];

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
         <TableContainer component={Paper} sx={{ overflowX: "scroll" }}>
            <Table>
               <TableHead>
                  <TableRow sx={{ bgcolor: theme.myColor.link }}>
                     {tableCells.map((cell, index) => (
                        <TableCell
                           key={index}
                           align={cell.align as TableCellProps["align"]}
                           sx={{
                              color: theme.myColor.white,
                              fontWeight: 600,
                              fontSize: 16,
                              lineHeight: 2,
                           }}>
                           {cell.name}
                        </TableCell>
                     ))}
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
                              sx={{
                                 color: theme.myColor.white,
                                 bgcolor: theme.palette.warning.dark,
                                 "&:hover": {
                                    color: theme.myColor.text,
                                 },
                              }}
                              onClick={() => handleShowDetail(post?._id)}>
                              Watch
                           </Button>
                        </TableCell>
                        <TableCell>
                           <Stack flexDirection="row" gap={2} flexWrap={"wrap"}>
                              <Button
                                 variant="outlined"
                                 endIcon={<RestoreIcon />}
                                 sx={{
                                    flex: "1 1 0",
                                    color: theme.myColor.white,
                                    bgcolor: theme.palette.success.main,
                                    "&:hover": {
                                       color: theme.myColor.text,
                                    },
                                 }}
                                 onClick={() => handleRestore(post?._id)}>
                                 Restore
                              </Button>
                              <Button
                                 variant="contained"
                                 endIcon={<DeleteIcon />}
                                 sx={{
                                    flex: "1 1 0",
                                    color: theme.myColor.white,
                                    bgcolor: theme.palette.error.main,
                                    "&:hover": {
                                       color: theme.myColor.text,
                                       bgcolor: theme.palette.error.main,
                                    },
                                 }}
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
         <Spinner show={isLoading} />
      </>
   );
};

export default TrashPosts;
