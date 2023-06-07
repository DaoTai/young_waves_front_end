import AddIcon from "@mui/icons-material/Add";
import { Button, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { useState } from "react";
import { addFriend } from "../../../../../redux-saga/redux/actions";
import { Dialog } from "../../../../../components";
const AddFriendBtn = ({ idUser = "", fullName = "" }: { idUser?: string; fullName?: string }) => {
   const auth$ = useSelector(authState$);
   const theme = useTheme();
   const isFriend = auth$.payload.user.friends.includes(idUser);
   const [openDialog, setOpenDialog] = useState<boolean>(false);
   const dispatch = useDispatch();

   const handleAddFriend = async () => {
      !!idUser && dispatch(addFriend(idUser));
   };
   const onOpenDialog = () => setOpenDialog(true);
   const onCloseDialog = () => setOpenDialog(!openDialog);
   return (
      <>
         <Button
            sx={{
               color: theme.palette.white.main,
               fontWeight: 400,
               textOverflow: "clip",
               whiteSpace: "pre",
               overflow: "hidden",
               height: "100%",
               flex: 1,
               background: theme.palette.gradient.main,
               display: `${isFriend ? "none" : null}`,
            }}
            variant="contained"
            onClick={onOpenDialog}
            startIcon={<AddIcon fontSize="large" />}>
            Add friend
         </Button>
         <Dialog
            open={openDialog}
            title="Friend"
            content={"Do u want to add friend with " + fullName}
            onClose={onCloseDialog}
            onSubmit={handleAddFriend}
         />
      </>
   );
};

export default AddFriendBtn;
