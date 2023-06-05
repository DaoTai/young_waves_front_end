import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Box, Button, Divider, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dateformat from "dateformat";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../../../apis";
import { Dialog } from "../../../../components";
import { showAlert } from "../../../../redux-saga/redux/actions";
import { Profile } from "../../../../utils/interfaces/Profile";
interface StatePopper {
   detail: boolean;
   dialog: boolean;
}

const UserTrashes = () => {
   const theme = useTheme();
   const dispatch = useDispatch();
   const [users, setUsers] = useState<Profile[] | []>([]);
   const [user, setUser] = useState<Profile>();
   const [role, setRole] = useState<string>("User");
   const [selectedIds, setSelectedIds] = useState<string[]>([]);
   const [action, setAction] = useState<string>("");
   const [open, setOpen] = useState<StatePopper>({
      detail: false,
      dialog: false,
   });
   const [isLoading, setLoading] = useState<boolean>(false);

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
            flex: 2,
            renderCell(params) {
               return (
                  <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={2}>
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
            align: "center",
            flex: 1,
         },
         {
            field: "region",
            headerAlign: "center",
            headerName: "Region",
            width: 70,
            align: "center",
            flex: 1,
         },
         {
            field: "deletedAt",
            headerAlign: "center",
            headerName: "Deleted at",
            align: "center",
            width: 70,
            flex: 2,
            valueFormatter: (params) => dateformat(params.value, "h:MM TT dd-mm-yyyy"),
         },
         {
            field: "restore",
            headerAlign: "center",
            headerName: "Restore",
            align: "center",
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            renderCell(params) {
               return (
                  <Fab size="small" color="success" onClick={() => handleRestoreUser(params.id.toString())}>
                     <RestoreFromTrashIcon />
                  </Fab>
               );
            },
         },
         {
            field: "delete",
            headerAlign: "center",
            align: "center",
            headerName: "Delete",
            flex: 1,
            sortable: false,
            disableColumnMenu: true,
            renderCell(params) {
               return (
                  <Fab size="small" color="error" onClick={() => onOpenConfirmForceDelete(params.row)}>
                     <DeleteIcon />
                  </Fab>
               );
            },
         },
      ],
      []
   );

   const handleClosePopper = useCallback(() => {
      setOpen({
         detail: false,
         dialog: false,
      });
   }, []);

   // open dialog delete
   const onOpenConfirmForceDelete = (user: Profile) => {
      setUser(user);
      setOpen((prev) => ({ ...prev, dialog: true }));
   };

   // handle change role
   const handleChangeRole = (event: React.SyntheticEvent, newValue: string) => {
      setRole(newValue);
   };

   // handle restore user
   const handleRestoreUser = async (idUser: string) => {
      try {
         const { statusText } = await api.admin.restoreTrashedUser(idUser);
         statusText === "OK" &&
            dispatch(
               showAlert({
                  title: "Restore member",
                  message: "Restored successfully",
                  mode: "success",
               })
            );
         setUsers((prev) => prev.filter((user) => user._id !== idUser));
      } catch (err) {
         console.error(err);

         dispatch(
            showAlert({
               title: "Restore member",
               message: "Restore failed",
               mode: "error",
            })
         );
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
         console.error(err);
         dispatch(
            showAlert({
               title: "Failure",
               message: `Deleted failed`,
               mode: "error",
            })
         );
      }
      handleClosePopper();
   };

   // Handle all
   const handleAll = async () => {
      try {
         const res = await api.admin.handleAll({ action: action, memberIds: selectedIds });
         if (res.statusText === "OK") {
            setUsers(users.filter((user) => !selectedIds.includes(user._id)));
            dispatch(
               showAlert({
                  title: action,
                  message: action + " successfully!",
                  mode: "success",
               })
            );
         }
      } catch (err) {
         dispatch(
            showAlert({
               title: action,
               message: action + " failed!",
               mode: "error",
            })
         );
      }
   };

   // Select many rows
   const handleSelectionChange = (ids: any) => {
      setSelectedIds(ids);
   };

   return (
      <>
         <Box pt={2}>
            {/* Select roles & actions */}
            <Box>
               <Divider />
               <Tabs value={role} onChange={handleChangeRole}>
                  <Tab
                     value="User"
                     label="User"
                     sx={{
                        transition: "all 0.3s ease",
                        "&:hover": {
                           bgcolor: theme.palette.background.default,
                        },
                     }}
                  />
                  <Tab
                     value="Admin"
                     label="Admin"
                     sx={{
                        transition: "all 0.3s ease",
                        "&:hover": {
                           bgcolor: theme.palette.background.default,
                        },
                     }}
                  />
               </Tabs>
               <Divider />
            </Box>
            <Stack mt={2} mb={2} gap={2} flexDirection="row" alignItems="center">
               <FormControl sx={{ width: 150 }}>
                  <InputLabel>Action</InputLabel>
                  <Select value={action} label="Action" placeholder="--Select--" onChange={(e) => setAction(e.target.value)}>
                     <MenuItem value="restore">Restore</MenuItem>
                     <MenuItem value="force-delete">ForceDelete</MenuItem>
                  </Select>
               </FormControl>
               <Button
                  disabled={!action || selectedIds.length === 0}
                  variant="contained"
                  onClick={handleAll}
                  sx={{
                     alignSelf: "center",
                     color: theme.palette.white.main,
                     background: `${!action || selectedIds.length === 0 ? null : theme.palette.gradient.main}`,
                  }}
                  endIcon={<SendIcon />}>
                  Submit
               </Button>
            </Stack>

            {/* Table data */}
            {users && (
               <Box width="100%" overflow="overlay">
                  <DataGrid
                     autoHeight
                     checkboxSelection
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
                     onSelectionModelChange={handleSelectionChange}
                  />
               </Box>
            )}
         </Box>

         {/* Dialog confirm */}
         <Dialog
            open={open.dialog}
            title="Confirm delete user"
            content={`You won't able to restore ${user?.fullName}. Every posts and comments of
                  ${user?.fullName} are also deleted`}
            onClose={handleClosePopper}
            onSubmit={handleForceDeleteUser}
         />
      </>
   );
};

export default UserTrashes;
