import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import {
   Avatar,
   Box,
   Button,
   ButtonGroup,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Fab,
   FormControl,
   InputLabel,
   MenuItem,
   Modal,
   Select,
   SelectChangeEvent,
   Stack,
   Tooltip,
   Typography,
   useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import dateformat from "dateformat";
import * as api from "../../../apis";
import { showAlert } from "../../../redux-saga/redux/actions";
import { Profile } from "../../../utils/interfaces/Profile";
import DetailUser from "./Detail";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import AddMember from "../AddMember";
const Users = ({ goToTrashes = () => {} }: { goToTrashes: () => void }) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [users, setUsers] = useState<Profile[] | []>([]);
   const [user, setUser] = useState<Profile>();
   const [role, setRole] = useState<string>("User");
   const [isLoading, setLoading] = useState<boolean>(false);
   const [showDetail, setShowDetail] = useState<boolean>(false);
   const [showDialog, setShowDialog] = useState<boolean>(false);
   const [showModal, setShowModal] = useState<boolean>(false);
   // close detail modal
   const onClose = useCallback(() => {
      setShowDetail(false);
   }, []);

   // close confirm delete dialog
   const onCloseDeleteDialog = useCallback(() => {
      setShowDialog(false);
   }, []);

   useEffect(() => {
      (async () => {
         setLoading(true);
         const res = await api.admin.getAllUserByAdmin({ admin: role === "Admin" });
         res.status === 200 && setUsers(res.data);
         setLoading(false);
      })();
   }, [role]);

   const columns: GridColDef[] = [
      {
         field: "fullName",
         headerName: "Full name",
         width: 160,
         flex: 1,
         renderCell(params) {
            return (
               <Stack
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}>
                  <Avatar src={params.row.avatar} />
                  <Typography variant="subtitle1" component="span" mt={0} textOverflow="clip">
                     {params.formattedValue}
                  </Typography>
               </Stack>
            );
         },
      },
      {
         field: "username",
         headerName: "Username",
         width: 70,
         flex: 1,
      },
      {
         field: "region",
         headerName: "Region",
         width: 70,
         flex: 1,
      },
      {
         field: "createdAt",
         headerName: "Joined time",
         width: 70,
         flex: 1,
         valueFormatter: (params) => dateformat(params.value, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
      },
      {
         field: "gender",
         headerName: "Gender",
         width: 130,
         flex: 1,
         valueFormatter: (params) =>
            String(params.value[0]).toUpperCase() + String(params.value).slice(1),
      },
      {
         field: "detail",
         headerName: "Detail",
         headerAlign: "center",
         sortable: false,
         disableColumnMenu: true,
         width: 200,
         flex: 1,
         renderCell(params) {
            return (
               <VisibilityIcon
                  sx={{ flex: 1, cursor: "pointer", color: theme.palette.success.main }}
                  onClick={() => onOpenDetail(params.row)}
               />
            );
         },
      },

      {
         field: "authorize",
         headerName: "Authorize",
         headerAlign: "center",
         sortable: false,
         disableColumnMenu: true,
         width: 200,
         flex: 1,
         renderCell(params) {
            return (
               <Tooltip title={params.row.isAdmin ? "Authorize to user" : "Authorize to admin"}>
                  <PersonAddIcon
                     sx={{ flex: 1, cursor: "pointer", color: theme.myColor.link }}
                     onClick={() => handleAuthorize(params.row)}
                  />
               </Tooltip>
            );
         },
      },
      {
         field: "delete",
         headerName: "Delete",
         headerAlign: "center",
         sortable: false,
         disableColumnMenu: true,
         width: 200,
         flex: 1,
         renderCell(params) {
            return (
               <DeleteIcon
                  sx={{ flex: 1, cursor: "pointer", color: theme.palette.error.main }}
                  onClick={() => onOpenConfirmDelete(params.row)}
               />
            );
         },
      },
   ];

   // handle change role
   const handleChangeRole = (event: SelectChangeEvent) => {
      setRole(event.target.value as string);
   };

   // open detail modal
   const onOpenDetail = (user: Profile) => {
      setShowDetail(true);
      setUser(user);
   };

   // open dialog delete
   const onOpenConfirmDelete = (user: Profile) => {
      setUser(user);
      setShowDialog(true);
   };

   // handle delete user
   const handleDeleteUser = async () => {
      try {
         const res = await api.admin.deleteUser(user?._id as string);
         if (res.status === 200) {
            dispatch(
               showAlert({
                  title: "Success",
                  message: `Delete ${user?.fullName} successfully!`,
                  mode: "success",
               })
            );
            setUsers((prev) => prev.filter((prevUser) => prevUser._id !== user?._id));
         } else {
            dispatch(
               showAlert({
                  title: "Failure",
                  message: `Delete ${user?.fullName} failed!`,
                  mode: "info",
               })
            );
         }
      } catch (err) {
         console.log(err);
      }
      setShowDialog(false);
   };

   // handle authorize user
   const handleAuthorize = async (user: Profile) => {
      try {
         const res = await api.admin.authorizeUser(user._id as string, user.isAdmin);
         if (res.status === 200) {
            const message = user?.isAdmin
               ? user.fullName + " becomed user"
               : user.fullName + " becomed admin";
            dispatch(
               showAlert({
                  title: "Success",
                  message,
                  mode: "success",
               })
            );
            setUsers((prev) => prev.filter((prevUser) => prevUser._id !== user?._id));
         } else {
            dispatch(
               showAlert({
                  title: "Failure",
                  message: `Authorize ${user?.fullName} failed!`,
                  mode: "error",
               })
            );
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <>
         <Typography variant="h3" textAlign="center" letterSpacing={2}>
            Users
         </Typography>
         {/* Select role  */}
         <Stack mt={2} mb={2} flexDirection="row" justifyContent="space-between" gap={2}>
            <Stack flexDirection="row" gap={4}>
               <Tooltip title="Trash Store">
                  <Fab color="info" size="medium">
                     <RestoreFromTrashIcon
                        sx={{ color: theme.palette.primary.main }}
                        onClick={goToTrashes}
                     />
                  </Fab>
               </Tooltip>
               <Tooltip title="Add user">
                  <Fab color="success" size="medium">
                     <AddIcon
                        sx={{ color: theme.myColor.white }}
                        onClick={() => setShowModal(true)}
                     />
                  </Fab>
               </Tooltip>
            </Stack>

            {/* Roles */}
            <FormControl sx={{ width: 200 }}>
               <InputLabel id="demo-simple-select-label">Role</InputLabel>
               <Select value={role} label="Selection" onChange={handleChangeRole}>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
               </Select>
            </FormControl>
         </Stack>

         {users && (
            <Box width="100%" height="100vh">
               <DataGrid
                  rows={users as Array<Profile>}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row._id}
                  loading={isLoading}
                  hideFooterSelectedRowCount
                  components={{
                     NoRowsOverlay: () => (
                        <Typography p={2} letterSpacing={2} textAlign="center">
                           No user
                        </Typography>
                     ),
                  }}
               />
            </Box>
         )}

         {/* Modal detail user */}
         {user && <DetailUser user={user} open={showDetail} onClose={onClose} />}

         {/* Dialog confirm delete */}
         <ConfirmDeleteDialog
            open={showDialog}
            user={user}
            onSubmit={handleDeleteUser}
            onClose={onCloseDeleteDialog}
         />
         <Modal open={showModal} onClose={() => setShowModal(false)}>
            <AddMember onClose={() => setShowModal(false)} />
         </Modal>
      </>
   );
};

export default Users;
