import InfoIcon from "@mui/icons-material/Info";
import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Fab,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DetailsIcon from "@mui/icons-material/Details";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridCallbackDetails, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import dateformat from "dateformat";
import { forceDeletePost, getTrashPosts, restorePost } from "../../../../redux-saga/redux/actions";
import { trashPostsState$ } from "../../../../redux-saga/redux/selectors";
const TrashPosts = () => {
   const theme = useTheme();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { trashPosts, maxPage, page } = useSelector(trashPostsState$);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const [idDelete, setIdDelete] = useState<string>("");
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      dispatch(getTrashPosts(currentPage));
      document.body.scrollIntoView();
   }, [currentPage]);

   const columns: GridColDef[] = [
      {
         field: "status",
         headerName: "Status",
         flex: 1,
         headerAlign: "center",
      },
      {
         field: "body",
         headerName: "Body",
         flex: 1,
         headerAlign: "center",
      },
      {
         field: "deletedAt",
         headerName: "Deleted at",
         valueFormatter: (params) => dateformat(params.value, "mmmm dS, yyyy, h:MM TT"),
         flex: 1,
         headerAlign: "center",
      },
      {
         field: "detail",
         headerName: "Detail",
         flex: 1,
         disableColumnMenu: true,
         sortable: false,
         headerAlign: "center",
         renderCell(params) {
            return (
               <Button
                  sx={{
                     bgcolor: theme.palette.primary.main,
                     "&:hover": {
                        color: theme.palette.primary.main,
                     },
                  }}
                  endIcon={<DetailsIcon />}
                  onClick={() => handleShowDetail(params.row?._id)}>
                  Open
               </Button>
            );
         },
      },
      {
         field: "restore",
         headerName: "Restore",
         flex: 1,
         disableColumnMenu: true,
         sortable: false,
         headerAlign: "center",
         renderCell(params) {
            return (
               <Button
                  color="success"
                  sx={{
                     bgcolor: theme.palette.success.main,
                     "&:hover": {
                        color: theme.palette.success.main,
                     },
                  }}
                  endIcon={<RestoreFromTrashIcon />}
                  onClick={() => handleRestore(params.row?._id)}>
                  Restore
               </Button>
            );
         },
      },
      {
         field: "delete",
         headerName: "Delete",
         flex: 1,
         disableColumnMenu: true,
         sortable: false,
         headerAlign: "center",
         renderCell(params) {
            return (
               <Button
                  sx={{
                     bgcolor: theme.palette.error.main,
                     "&:hover": {
                        color: theme.palette.error.main,
                     },
                  }}
                  endIcon={<DeleteForeverIcon />}
                  onClick={() => handleOpenDialogDelete(params.row?._id)}>
                  Delete
               </Button>
            );
         },
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

   const handleOpenDialogDelete = (id: string) => {
      setOpenDialog(true);
      setIdDelete(id);
   };

   const handlePrevPage = () => {
      setCurrentPage((prev) => {
         return prev > 1 ? prev - 1 : prev;
      });
   };

   const handleNextPage = () => {
      setCurrentPage((prev) => {
         return prev < maxPage ? prev + 1 : prev;
      });
   };

   return (
      <>
         <Helmet>
            <title>Trash | Young Waves</title>
         </Helmet>
         <Box width="100%">
            <DataGrid
               autoHeight
               showCellRightBorder={true}
               showColumnRightBorder={true}
               sx={{
                  bgcolor: theme.myColor.white,
                  button: {
                     border: "1px solid #ccc",
                     margin: "auto",
                     alignItems: "stretch",
                     "&:hover": {
                        borderColor: "currentcolor",
                     },
                  },
               }}
               rows={trashPosts}
               columns={columns}
               getRowId={(row) => row._id}
               hideFooterSelectedRowCount={true}
               hideFooter={true}
               components={{
                  NoRowsOverlay: () => (
                     <Typography p={2} letterSpacing={2} textAlign="center">
                        No trash post
                     </Typography>
                  ),
               }}
            />
            {maxPage > 0 && (
               <Stack
                  pt={2}
                  pb={2}
                  flexDirection="row"
                  gap={2}
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{
                     ".MuiFab-root": {
                        boxShadow: 0,
                        borderColor: theme.myColor.textSecondary,
                        bgcolor: theme.myColor.white,
                        zIndex: 0,
                     },
                  }}>
                  <Fab size="small" onClick={handlePrevPage} disabled={currentPage === 1}>
                     <ArrowBackIosNewIcon fontSize="small" />
                  </Fab>
                  <Typography variant="body1" component="span" letterSpacing={2}>
                     {page} of {maxPage}
                  </Typography>
                  <Fab size="small" onClick={handleNextPage} disabled={currentPage === maxPage}>
                     <ArrowForwardIosIcon fontSize="small" />
                  </Fab>
               </Stack>
            )}
         </Box>
         {/* Dialog delete*/}
         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle
               display="flex"
               justifyContent="center"
               alignItems="center"
               gap={1}
               boxShadow={1}>
               <Typography variant="h5"> Confirm delete</Typography>
               <InfoIcon color="warning" fontSize="large" />
            </DialogTitle>
            <DialogContent sx={{ minWidth: "30vw", p: 2 }}>
               <Typography color={theme.myColor.text} textAlign="center" pt={2}>
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
      </>
   );
};

export default TrashPosts;
