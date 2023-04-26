import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Typography,
   useTheme,
} from "@mui/material";
import React, { memo } from "react";

interface Props {
   open: boolean;
   onClose: () => void;
   onSubmit: () => void;
}
const DeletionDialog = ({ open, onClose, onSubmit }: Props) => {
   const theme = useTheme();
   return (
      <Dialog open={open} onClose={onClose}>
         <DialogTitle
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            boxShadow={1}>
            Confirm delete
         </DialogTitle>
         <DialogContent sx={{ minWidth: "30vw", p: 2 }}>
            <Typography color={theme.myColor.text} textAlign="center" pt={2}>
               Do you sure you want to delete this post ?
            </Typography>
         </DialogContent>
         <DialogActions sx={{ pb: 2, justifyContent: "space-between" }}>
            <Button
               variant="outlined"
               sx={{ backgroundColor: theme.myColor.white }}
               onClick={onClose}>
               Cancel
            </Button>
            <Button variant="contained" type="submit" onClick={onSubmit}>
               Agree
            </Button>
         </DialogActions>
      </Dialog>
   );
};

export default memo(DeletionDialog);
