import { AlertColor } from "@mui/material";

export interface AlertProps {
   show: boolean;
   msg?: string;
   title?: string;
   mode?: AlertColor;
   onClose: () => void;
}
