import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DetailsIcon from "@mui/icons-material/Details";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import { Box, Button, Fab, Stack, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dateformat from "dateformat";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forceDeletePost, getTrashPosts, restorePost } from "../../../../redux-saga/redux/actions";
import { trashPostsState$ } from "../../../../redux-saga/redux/selectors";
import { Dialog } from "../../../../components";
const TrashPosts = () => {
   const theme = useTheme();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { trashPosts, maxPage, page } = useSelector(trashPostsState$);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const [idDelete, setIdDelete] = useState<string>("");
   const [currentPage, setCurrentPage] = useState(1);

   useEffect(() => {
      trashPosts.length === 0 && dispatch(getTrashPosts(currentPage));
      document.body.scrollIntoView();
   }, [currentPage]);

   const columns: GridColDef[] = useMemo(() => {
      return [
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
            flex: 2,
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
                        color: theme.myColor.white,
                        bgcolor: theme.palette.primary.main,
                        alignItems: "center",
                        "&:hover": {
                           color: theme.palette.primary.main,
                           ".MuiTypography-root": {
                              color: "inherit",
                           },
                        },
                     }}
                     onClick={() => handleShowDetail(params.row?._id)}>
                     <Typography
                        variant="body2"
                        sx={{
                           color: theme.myColor.white,
                           display: { md: "block", xs: "none" },
                        }}>
                        Open
                     </Typography>
                     <DetailsIcon />
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
                        color: theme.myColor.white,
                        bgcolor: theme.palette.success.main,
                        "&:hover": {
                           color: theme.palette.success.main,
                           ".MuiTypography-root": {
                              color: "inherit",
                           },
                        },
                     }}
                     onClick={() => handleRestore(params.row?._id)}>
                     <Typography
                        variant="body2"
                        sx={{
                           color: theme.myColor.white,
                           display: { md: "block", xs: "none" },
                        }}>
                        Restore
                     </Typography>
                     <RestoreFromTrashIcon />
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
                        color: theme.myColor.white,
                        bgcolor: theme.palette.error.main,
                        "&:hover": {
                           color: theme.palette.error.main,
                           ".MuiTypography-root": {
                              color: "inherit",
                           },
                        },
                     }}
                     onClick={() => handleOpenDialogDelete(params.row?._id)}>
                     <Typography
                        variant="body2"
                        sx={{
                           color: theme.myColor.white,
                           display: { md: "block", xs: "none" },
                        }}>
                        Delete
                     </Typography>
                     <DeleteForeverIcon />
                  </Button>
               );
            },
         },
      ];
   }, []);

   const onCloseDialog = useCallback(() => {
      setOpenDialog(false);
   }, []);

   const handleForceDelete = useCallback(() => {
      dispatch(forceDeletePost(idDelete));
      setOpenDialog(!openDialog);
   }, [idDelete]);

   const handleShowDetail = (id: string) => {
      navigate(`/user/trash/posts/${id}`);
   };

   const handleRestore = (id: string) => {
      dispatch(restorePost(id));
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
                  overflow: "scroll",
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
         <Dialog
            open={openDialog}
            title="Confirm delete"
            content="Do you sure you want to delete this post ?"
            onClose={onCloseDialog}
            onSubmit={handleForceDelete}
         />
      </>
   );
};

export default TrashPosts;
