import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
   Avatar,
   Box,
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
import dateformat from "dateformat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../../apis";
import { Dialog } from "../../../components";
import { showAlert } from "../../../redux-saga/redux/actions";
import { Profile } from "../../../utils/interfaces/Profile";
import AddMember from "./AddMember";
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

   const columns: GridColDef[] = useMemo(
      () => [
         {
            field: "fullName",
            headerAlign: "center",
            headerName: "Full name",
            flex: 2,
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
            field: "city",
            align: "center",
            headerAlign: "center",
            headerName: "City",
            width: 70,
            flex: 1,
         },
         {
            field: "region",
            align: "center",
            headerAlign: "center",
            headerName: "Region",
            width: 70,
            flex: 1,
         },
         {
            field: "createdAt",
            align: "center",
            headerAlign: "center",
            headerName: "Joined time",
            flex: 2,
            valueFormatter: (params) => dateformat(params.value, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
         },
         {
            field: "gender",
            align: "center",
            headerAlign: "center",
            headerName: "Gender",
            width: 130,
            flex: 1,
            valueFormatter: (params) =>
               String(params.value[0]).toUpperCase() + String(params.value).slice(1),
         },
         {
            field: "detail",
            align: "center",
            headerAlign: "center",
            headerName: "Detail",
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
            align: "center",
            headerAlign: "center",
            headerName: "Authorize",
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
            align: "center",
            headerAlign: "center",
            headerName: "Delete",
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
      ],
      []
   );

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
                  title: "Delete",
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

   // handle update user
   const handleUpdateUser = useCallback(async (values: Partial<Profile>) => {
      try {
         const res = await api.admin.editUser(values);
         if (res.status === 200) {
            setUsers((prev) => {
               const newUsers = prev.map((user: Profile) => {
                  if (user._id === values._id) {
                     return {
                        ...user,
                        ...values,
                     };
                  }
                  return user;
               });
               return newUsers;
            });
            dispatch(
               showAlert({
                  title: "Update user",
                  message: "Update user successfully",
                  mode: "success",
               })
            );
         } else {
            dispatch(
               showAlert({
                  title: "Update user",
                  message: "Update user failed",
                  mode: "error",
               })
            );
         }
      } catch (err: any) {
         throw new Error(err);
      }
   }, []);

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
                  title: "Authorization",
                  message,
                  mode: "success",
               })
            );
            setUsers((prev) => prev.filter((prevUser) => prevUser._id !== user?._id));
         } else {
            dispatch(
               showAlert({
                  title: "Authorization",
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
         {/* Roles & actions */}
         <Stack mt={2} mb={2} flexDirection="row" justifyContent="space-between" gap={2}>
            {/* Roles */}
            <FormControl sx={{ width: 200 }}>
               <InputLabel id="demo-simple-select-label">Role</InputLabel>
               <Select value={role} label="Selection" onChange={handleChangeRole}>
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
               </Select>
            </FormControl>
            {/* Actions */}
            <Stack flexDirection="row" gap={4}>
               <Tooltip title="Trash Store">
                  <Fab sx={{ zIndex: 0 }} color="info" size="medium">
                     <RestoreFromTrashIcon
                        sx={{ color: theme.palette.primary.main }}
                        onClick={goToTrashes}
                     />
                  </Fab>
               </Tooltip>
               <Tooltip title="Add user">
                  <Fab sx={{ zIndex: 0 }} color="success" size="medium">
                     <AddIcon
                        sx={{ color: theme.myColor.white }}
                        onClick={() => setShowModal(true)}
                     />
                  </Fab>
               </Tooltip>
            </Stack>
         </Stack>

         {users && (
            <Box width="100%">
               <DataGrid
                  autoHeight
                  showCellRightBorder={true}
                  showColumnRightBorder={true}
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
         {user && (
            <DetailUser
               user={user}
               open={showDetail}
               onClose={onClose}
               onSubmit={handleUpdateUser}
            />
         )}

         {/* Dialog confirm delete */}
         <Dialog
            open={showDialog}
            title={`Are you sure to delete ${user?.fullName}?`}
            content="You still can restore user in Trash Store when you deleted"
            onSubmit={handleDeleteUser}
            onClose={onCloseDeleteDialog}
         />

         {/* Modal add member */}
         <Modal open={showModal} onClose={() => setShowModal(false)}>
            <>
               <AddMember onClose={() => setShowModal(false)} />
            </>
         </Modal>
      </>
   );
};

export default Users;
