import { AlertColor, AlertTitle } from "@mui/material";
import React from "react";
import { MyAlert } from "./styles";
const Alert = ({
   show,
   msg,
   title = "Error",
   mode = "error",
   onClose,
}: {
   show: boolean;
   msg: string;
   title?: string;
   mode?: AlertColor;
   onClose: () => void;
}) => {
   return (
      <>
         {show && (
            <MyAlert severity={mode} closeText="Close" variant="outlined" onClose={onClose}>
               <AlertTitle>{title}</AlertTitle>
               {msg}
            </MyAlert>
         )}
      </>
   );
};

export default Alert;
