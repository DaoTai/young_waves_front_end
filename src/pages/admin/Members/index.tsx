import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import {
   Avatar,
   Box,
   Button,
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
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../../apis";
import { Dialog } from "../../../components";
import { showAlert } from "../../../redux-saga/redux/actions";
import { Profile, UpdateProfile } from "../../../utils/interfaces/Profile";
import AddMember from "./AddMember";
import DetailUser from "./Detail";
import { Link } from "react-router-dom";

interface StatePopper {
   detail: boolean;
   dialog: boolean;
   modal: boolean;
}

const Users = ({ goToTrashes = () => {} }: { goToTrashes: () => void }) => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [users, setUsers] = useState<Profile[] | []>([]);
   const [user, setUser] = useState<Profile>();
   const [selectedIds, setSelectedIds] = useState<string[]>([]);
   const [role, setRole] = useState<string>("user");
   const [action, setAction] = useState<string>("");
   const [isLoading, setLoading] = useState<boolean>(false);
   const [open, setOpen] = useState<StatePopper>({
      detail: false,
      dialog: false,
      modal: false,
   });

   const handleClosePopper = () => {
      setOpen({
         detail: false,
         dialog: false,
         modal: false,
      });
   };

   useEffect(() => {
      (async () => {
         setLoading(true);
         const { data, statusText } = await api.admin.getAllUserByAdmin({
            admin: role === "admin",
         });
         statusText === "OK" && setUsers(data);
         setLoading(false);
      })();
   }, [role]);

   const columns: GridColDef[] = useMemo(
      () => [
         {
            field: "username",
            headerAlign: "center",
            headerName: "Username",
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
            valueFormatter: (params) => dateformat(params.value, "dd-mm-yyyy"),
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
                  <Fab size="small" color="info" onClick={() => onOpenDetail(params.row)}>
                     <VisibilityIcon />
                  </Fab>
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
                  <Fab size="small" color="error" onClick={() => onOpenConfirmDelete(params.row)}>
                     <DeleteIcon sx={{ flex: 1 }} />
                  </Fab>
               );
            },
         },
         {
            field: "explore",
            align: "center",
            headerAlign: "center",
            headerName: "Explore",
            sortable: false,
            disableColumnMenu: true,
            width: 200,
            flex: 1,
            renderCell(params) {
               return <Link to={"/user/explore/" + params.id}>Profile</Link>;
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
      setOpen((prev) => ({ ...prev, detail: true }));
      setUser(user);
   };

   // open dialog delete
   const onOpenConfirmDelete = (user: Profile) => {
      setUser(user);
      setOpen({ dialog: true, modal: false, detail: false });
   };

   // handle delete user
   const handleDeleteUser = async () => {
      try {
         await api.admin.deleteUser(user?._id as string);
         dispatch(
            showAlert({
               title: "Delete",
               message: `Delete ${user?.fullName} successfully!`,
               mode: "success",
            })
         );
         setUsers((prev) => prev.filter((prevUser) => prevUser._id !== user?._id));
      } catch (err) {
         console.log(err);
         dispatch(
            showAlert({
               title: "Failure",
               message: `Delete ${user?.fullName} failed!`,
               mode: "info",
            })
         );
      }
   };

   // handle update user
   const handleUpdateUser = useCallback(
      async (values: UpdateProfile) => {
         try {
            setLoading(true);
            await api.admin.editUser(values);
            setLoading(false);
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
         } catch (err: any) {
            dispatch(
               showAlert({
                  title: "Update user",
                  message: "Update user failed",
                  mode: "error",
               })
            );
         }
      },
      [user]
   );

   // Select many rows
   const handleSelectionChange = (ids: any) => {
      setSelectedIds(ids);
   };

   // Handle all
   const handleAll = async () => {
      try {
         const res = await api.admin.handleAll({
            action: action,
            memberIds: selectedIds,
            role: role,
         });
         if (res.statusText === "OK") {
            setUsers(users.filter((user) => !selectedIds.includes(user._id)));
            dispatch(
               showAlert({
                  title: action,
                  message: action + "successfully",
                  mode: "success",
               })
            );
         }
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <>
         <Typography variant="h3" textAlign="center" letterSpacing={2}>
            Members
         </Typography>
         {/* Roles & actions */}
         <Stack mt={2} mb={2} flexDirection="row" justifyContent="space-between" gap={2}>
            {/* Roles & Selection action*/}
            <Stack flexDirection="row" gap={4}>
               <FormControl sx={{ width: 100 }}>
                  <InputLabel>Role</InputLabel>
                  <Select value={role} label="Selection" onChange={handleChangeRole}>
                     <MenuItem value="user">User</MenuItem>
                     <MenuItem value="admin">Admin</MenuItem>
                  </Select>
               </FormControl>
               <FormControl sx={{ width: 150 }}>
                  <InputLabel>Action</InputLabel>
                  <Select
                     value={action}
                     label="Action"
                     placeholder="--Select--"
                     onChange={(e) => setAction(e.target.value)}>
                     <MenuItem value="delete">Delete</MenuItem>
                     <MenuItem value="authorize">Authorize</MenuItem>
                  </Select>
               </FormControl>
               <Button
                  disabled={!action || selectedIds.length === 0}
                  variant="contained"
                  onClick={handleAll}
                  sx={{
                     alignSelf: "center",
                     color: theme.myColor.white,
                  }}
                  endIcon={<SendIcon />}>
                  Submit
               </Button>
            </Stack>

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
                        onClick={() => setOpen((prev) => ({ ...prev, modal: true }))}
                     />
                  </Fab>
               </Tooltip>
            </Stack>
         </Stack>

         {users && (
            <Box width="100%">
               <DataGrid
                  checkboxSelection
                  autoHeight
                  showCellRightBorder={true}
                  showColumnRightBorder={true}
                  loading={isLoading}
                  rows={users as Array<Profile>}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => row._id}
                  components={{
                     NoRowsOverlay: () => (
                        <Typography p={2} letterSpacing={2} textAlign="center">
                           No user
                        </Typography>
                     ),
                  }}
                  onSelectionModelChange={handleSelectionChange}
               />
            </Box>
         )}

         {/* Modal detail user */}
         {open.detail && user && (
            <DetailUser
               isLoading={isLoading}
               user={user}
               onClose={handleClosePopper}
               onSubmit={handleUpdateUser}
            />
         )}

         {/* Dialog confirm delete */}
         <Dialog
            open={open.dialog}
            title={`Are you sure to delete ${user?.fullName}?`}
            content="You still can restore user in Trash Store when you deleted"
            onSubmit={handleDeleteUser}
            onClose={handleClosePopper}
         />

         {/* Modal add member */}
         <Modal open={open.modal} onClose={handleClosePopper}>
            <>
               <AddMember onClose={handleClosePopper} />
            </>
         </Modal>
      </>
   );
};

export default Users;
