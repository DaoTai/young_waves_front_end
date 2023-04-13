import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   useTheme,
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
   const theme = useTheme();
   return (
      <Dialog fullWidth open={open} onClose={onClose}>
         <DialogTitle id="alert-dialog-title">
            Are you sure to delete <b>{user?.fullName}</b> ?
         </DialogTitle>
         <DialogContent>
            <DialogContentText>
               You still can restore user in Trash Store when you deleted
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button variant="outlined" sx={{ bgcolor: theme.myColor.white }} onClick={onClose}>
               Cancel
            </Button>
            <Button
               variant="contained"
               color="error"
               sx={{ transition: "0.3s linear all", "&:hover": { color: theme.myColor.white } }}
               onClick={onSubmit}
               autoFocus>
               Agree
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default memo(ConfirmDeleteDialog);