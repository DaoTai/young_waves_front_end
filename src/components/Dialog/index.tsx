import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material";

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
      <Dialog open={open} onClose={onClose}>
         <DialogTitle sx={{ pt: 1, pb: 1 }}>{title}</DialogTitle>
         <Divider />
         <DialogContent>
            <DialogContentText>{content}</DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button variant="outlined" sx={{ bgcolor: "transparent" }} onClick={onClose}>
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
