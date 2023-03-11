import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
   Avatar,
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Fab,
   FormControl,
   InputLabel,
   MenuItem,
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

const Users = ({ goToTrashes = () => {} }: { goToTrashes: () => void }) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [users, setUsers] = useState<Profile[] | []>([]);
   const [user, setUser] = useState<Profile>();
   const [role, setRole] = useState<string>("User");
   const [isLoading, setLoading] = useState<boolean>(false);
   const [showDetail, setShowDetail] = useState<boolean>(false);
   const [showDialog, setShowDialog] = useState<boolean>(false);

   // close detail modal
   const onClose = useCallback(() => {
      setShowDetail(false);
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
         field: "delete",
         headerName: "Option",
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
      setShowDialog(false);
   };
   return (
      <>
         <Typography variant="h3" textAlign="center" letterSpacing={2}>
            Users
         </Typography>
         {/* Select role  */}
         <Stack p={2} flexDirection="row" justifyContent="space-between" gap={2}>
            <Tooltip title="Trash Store">
               <Fab color="info">
                  <RestoreFromTrashIcon
                     sx={{ color: theme.palette.primary.main }}
                     onClick={goToTrashes}
                  />
               </Fab>
            </Tooltip>
            <FormControl sx={{ width: 200 }}>
               <InputLabel id="demo-simple-select-label">Role</InputLabel>
               <Select value={role} label="Selection" onChange={handleChangeRole}>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
               </Select>
            </FormControl>
         </Stack>

         {users && (
            <Box width="100%" height={500}>
               <DataGrid
                  rows={users as Array<Profile>}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row._id}
                  loading={isLoading}
                  hideFooterSelectedRowCount
               />
            </Box>
         )}

         {/* Modal detail user */}
         {user && <DetailUser user={user} open={showDetail} onClose={onClose} />}

         {/* Dialog confirm delete */}
         <Dialog fullWidth open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogTitle id="alert-dialog-title">
               Are you sure to delete <b>{user?.fullName}</b>?
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  You still can restore user in Trash Store when you deleted
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" onClick={() => setShowDialog(false)}>
                  Disagree
               </Button>
               <Button variant="contained" color="error" onClick={handleDeleteUser} autoFocus>
                  Agree
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default Users;
