import { AlertColor } from "@mui/material";

export type Payload = {
   title: string;
   message: string;
   mode: AlertColor;
};

export interface AlertAction {
   type: "SHOW_ALERT" | "HIDE_ALERT";
   payload: Payload;
}

export interface AlertState {
   isShow: boolean;
   payload: Payload;
}

export const init: AlertState = {
   isShow: false,
   payload: { title: "", message: "", mode: "error" },
};
