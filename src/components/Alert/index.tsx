import { Snackbar, Typography } from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { hideAlert } from "../../redux-saga/redux/actions";
import { TIME_ALERT } from "../../utils/constants";
import { AlertProps } from "../../utils/interfaces/Props";
import { MyAlert } from "./styles";
const Alert = ({ message, title = "Error", mode = "error" }: AlertProps) => {
   const dispatch = useDispatch();
   const onClose = () => {
      dispatch(hideAlert());
   };

   return (
      <Snackbar
         open
         autoHideDuration={TIME_ALERT}
         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
         message={message}
         onClose={onClose}>
         <MyAlert severity={mode} closeText="Close" variant="outlined" onClose={onClose}>
            <Typography variant="body1" fontWeight={600}>
               {title}
            </Typography>
            {message}
         </MyAlert>
      </Snackbar>
   );
};

export default memo(Alert);
