import { AlertColor, AlertTitle } from "@mui/material";
import { AlertProps } from "../../utils/interfaces/Props";
import { MyAlert } from "./styles";
const Alert = ({ show, msg, title = "Error", mode = "error", onClose }: AlertProps) => {
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
