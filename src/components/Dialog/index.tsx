import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from "@mui/material";

interface Props {
   open: boolean;
   title: string;
   content: string;
   onClose: () => void;
   onSubmit: (...argument: any) => void;
}

const MyDialog = ({ open, title, content, onClose, onSubmit }: Props) => {
   const onClick = () => {
      onSubmit();
      onClose();
   };
   return (
      <Dialog
         open={open}
         keepMounted
         onClose={onClose}
         aria-describedby="alert-dialog-slide-description">
         <DialogTitle>{title}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button variant="outlined" onClick={onClose}>
               Cancel
            </Button>
            <Button variant="contained" onClick={onClick}>
               OK
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default MyDialog;
