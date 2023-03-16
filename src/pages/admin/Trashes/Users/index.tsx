import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
   Avatar,
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
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
import dateformat from "dateformat";
import DetailUser from "../../Users/Detail";
import { Profile } from "../../../../utils/interfaces/Profile";
import * as api from "../../../../apis";
import { showAlert } from "../../../../redux-saga/redux/actions";

const UserTrashes = () => {
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
         const res = await api.admin.getTrashedUsers({ admin: role === "Admin" });
         res.status === 200 && setUsers(res.data);
         setLoading(false);
      })();
   }, [role]);

   // config columns data grid
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
         field: "deletedAt",
         headerName: "Deleted at",
         width: 70,
         flex: 1,
         valueFormatter: (params) => dateformat(params.value, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
      },
      {
         field: "detail",
         headerName: "Detail",
         width: 200,
         flex: 1,
         sortable: false,
         disableColumnMenu: true,
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
         field: "options",
         headerName: "Options",
         width: 200,
         flex: 1,
         sortable: false,
         disableColumnMenu: true,
         renderCell(params) {
            return (
               <Stack
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flex={1}
                  gap={2}>
                  {
                     <Tooltip title="Restore" arrow>
                        <RestoreIcon
                           sx={{
                              cursor: "pointer",
                              transform: "scale(1.2)",
                              flex: 1,
                              color: theme.myColor.link,
                           }}
                           onClick={() => handleRestoreUser(params.id.toString())}
                        />
                     </Tooltip>
                  }
                  <Tooltip title="Force delete" arrow>
                     <DeleteIcon
                        sx={{
                           cursor: "pointer",
                           transform: "scale(1.2)",
                           flex: 1,
                           color: theme.palette.error.main,
                        }}
                        onClick={() => onOpenConfirmForceDelete(params.row)}
                     />
                  </Tooltip>
               </Stack>
            );
         },
      },
   ];
   // open detail modal
   const onOpenDetail = (user: Profile) => {
      setShowDetail(true);
      setUser(user);
   };

   // open dialog delete
   const onOpenConfirmForceDelete = (user: Profile) => {
      setUser(user);
      setShowDialog(true);
   };

   // handle change role
   const handleChangeRole = (event: SelectChangeEvent) => {
      setRole(event.target.value as string);
   };

   // handle restore user
   const handleRestoreUser = async (idUser: string) => {
      try {
         const res = await api.admin.restoreTrashedUser(idUser);
         if (res.status === 200) {
            dispatch(
               showAlert({
                  title: "Success",
                  message: "Restore user successfully",
                  mode: "success",
               })
            );
            setUsers((prev) => prev.filter((user) => user._id !== idUser));
         } else {
            dispatch(
               showAlert({
                  title: "Failure",
                  message: "Restore user failed",
                  mode: "error",
               })
            );
         }
      } catch (err) {
         console.log(err);
      }
   };

   // handle force delete user
   const handleForceDeleteUser = async () => {
      try {
         const res = await api.admin.forceDeleteUser(user?._id as string);
         if (res.status === 200) {
            dispatch(
               showAlert({
                  title: "Success",
                  message: `Force delete ${user?.fullName} successfully`,
                  mode: "success",
               })
            );
            setUsers((prev) => prev.filter((prevUser) => prevUser._id !== user?._id));
         } else {
            dispatch(
               showAlert({
                  title: "Failure",
                  message: `Force delete ${user?.fullName} failed`,
                  mode: "error",
               })
            );
         }
      } catch (err) {
         console.log(err);
      }
      setShowDialog(false);
   };

   return (
      <>
         <Box pt={2}>
            <Stack justifyContent="flex-end">
               <FormControl sx={{ width: 200, pb: 2, pt: 2, ml: "auto" }}>
                  <InputLabel>Role</InputLabel>
                  <Select value={role} label="Selection" onChange={handleChangeRole}>
                     <MenuItem value="User">User</MenuItem>
                     <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
               </FormControl>
            </Stack>
            {users && (
               <Box width="100%" overflow="overlay" height={500}>
                  <DataGrid
                     rows={users as Array<Profile>}
                     columns={columns}
                     pageSize={10}
                     rowsPerPageOptions={[10]}
                     getRowId={(row) => row._id}
                     loading={isLoading}
                     autoHeight
                     components={{
                        NoRowsOverlay: () => (
                           <Typography p={2} textAlign="center">
                              Empty list
                           </Typography>
                        ),
                     }}
                  />
               </Box>
            )}
         </Box>

         {/* Modal detail user */}
         {user && <DetailUser user={user} open={showDetail} onClose={onClose} />}
         {/* Dialog confirm delete */}
         <Dialog fullWidth open={showDialog} onClose={() => setShowDialog(false)}>
            <DialogTitle>
               Are you sure to delete <b>{user?.fullName}</b>?
            </DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  Note: You won't able to restore {user?.fullName}. Every posts and comments of{" "}
                  {user?.fullName} are also deleted
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button variant="outlined" onClick={() => setShowDialog(false)}>
                  Disagree
               </Button>
               <Button variant="contained" onClick={handleForceDeleteUser} autoFocus>
                  Agree
               </Button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default UserTrashes;
