import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material";
import { memo } from "react";
import { Profile } from "../../../../utils/interfaces/Profile";

interface IPropsConfirmDeleteDialog {
   open: boolean;
   user: Profile | undefined;
   onClose: () => void;
   onSubmit: () => void;
}

const ConfirmDeleteDialog = ({ open, user, onClose, onSubmit }: IPropsConfirmDeleteDialog) => {
   return (
      <Dialog fullWidth open={open} onClose={onClose}>
         <DialogTitle id="alert-dialog-title">
            Are you sure to delete <b>{user?.fullName}</b>?
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               You still can restore user in Trash Store when you deleted
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button variant="outlined" onClick={onClose}>
               Disagree
            </Button>
            <Button variant="contained" color="error" onClick={onSubmit} autoFocus>
               Agree
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default memo(ConfirmDeleteDialog);
