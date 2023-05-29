import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
   Avatar,
   Box,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   SelectChangeEvent,
   Stack,
   Typography,
   useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dateformat from "dateformat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../../../apis";
import { Dialog } from "../../../../components";
import { showAlert } from "../../../../redux-saga/redux/actions";
import { Profile } from "../../../../utils/interfaces/Profile";
import DetailUser from "../../Users/Detail";

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

   useEffect(() => {
      (async () => {
         setLoading(true);
         try {
            const res = await api.admin.getTrashedUsers({ admin: role === "Admin" });
            setUsers(res.data);
         } catch (err: any) {
            throw new Error(err);
         }
         setLoading(false);
      })();
   }, [role]);

   // config columns data grid
   const columns: GridColDef[] = useMemo(
      () => [
         {
            field: "fullName",
            headerAlign: "center",
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
            field: "city",
            headerAlign: "center",
            headerName: "City",
            width: 70,
            flex: 1,
         },
         {
            field: "region",
            headerAlign: "center",
            headerName: "Region",
            width: 70,
            flex: 1,
         },
         {
            field: "deletedAt",
            headerAlign: "center",
            headerName: "Deleted at",
            width: 70,
            flex: 2,
            valueFormatter: (params) => dateformat(params.value, "dddd, mmmm dS, yyyy, h:MM:ss TT"),
         },
         {
            field: "detail",
            headerAlign: "center",
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
            field: "restore",
            headerAlign: "center",
            headerName: "Restore",
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            renderCell(params) {
               return (
                  <RestoreFromTrashIcon
                     sx={{
                        cursor: "pointer",
                        transform: "scale(1.2)",
                        flex: 1,
                        color: theme.myColor.link,
                     }}
                     onClick={() => handleRestoreUser(params.id.toString())}
                  />
               );
            },
         },
         {
            field: "delete",
            headerAlign: "center",
            headerName: "Delete",
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            renderCell(params) {
               return (
                  <DeleteIcon
                     sx={{
                        cursor: "pointer",
                        transform: "scale(1.2)",
                        flex: 1,
                        color: theme.palette.error.main,
                     }}
                     onClick={() => onOpenConfirmForceDelete(params.row)}
                  />
               );
            },
         },
      ],
      []
   );
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
                  title: "Restore member",
                  message: "Restored successfully",
                  mode: "success",
               })
            );
            setUsers((prev) => prev.filter((user) => user._id !== idUser));
         } else {
            dispatch(
               showAlert({
                  title: "Restore member",
                  message: "Restore failed",
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
         await api.admin.forceDeleteUser(user?._id as string);
         dispatch(
            showAlert({
               title: "Force delete",
               message: `Deleted successfully`,
               mode: "success",
            })
         );
         setUsers((prev) => prev.filter((prevUser) => prevUser._id !== user?._id));
      } catch (err) {
         console.log(err);
         dispatch(
            showAlert({
               title: "Failure",
               message: `Deleted failed`,
               mode: "error",
            })
         );
      }
      setShowDialog(false);
   };

   return (
      <>
         <Box pt={2}>
            <Stack justifyContent="flex-end">
               <FormControl sx={{ width: 200, pb: 2, pt: 2, ml: "auto" }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                     value={role}
                     label="Selection"
                     sx={{ border: 1, borderColor: theme.myColor.link }}
                     onChange={handleChangeRole}>
                     <MenuItem value="User">User</MenuItem>
                     <MenuItem value="Admin">Admin</MenuItem>
                  </Select>
               </FormControl>
            </Stack>
            {users && (
               <Box width="100%" overflow="overlay">
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
                     components={{
                        NoRowsOverlay: () => (
                           <Typography p={2} textAlign="center">
                              Empty list
                           </Typography>
                        ),
                     }}
                     sx={{ bgcolor: theme.myColor.white }}
                  />
               </Box>
            )}
         </Box>

         {/* Modal detail user */}
         {user && showDetail && (
            <DetailUser user={user} onClose={onClose} onSubmit={handleUpdateUser} />
         )}

         {/* Dialog confirm */}
         <Dialog
            open={showDialog}
            title="Confirm delete user"
            content={`You won't able to restore ${user?.fullName}. Every posts and comments of
                  ${user?.fullName} are also deleted`}
            onClose={() => setShowDialog(false)}
            onSubmit={handleForceDeleteUser}
         />
      </>
   );
};

export default UserTrashes;
