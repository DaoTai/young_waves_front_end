import { AlertColor } from "@mui/material";
import { SHOW_ALERT, HIDE_ALERT, INIT_STATE } from "../../../../utils/constants";

type Payload = {
   isShow: boolean;
   title: string;
   message: string;
   mode: AlertColor;
};

interface MyAction {
   type: "SHOW_ALERT" | "HIDE_ALERT";
   payload: Payload;
}

const alertReducer = (state = INIT_STATE.alert, action: MyAction) => {
   switch (action.type) {
      case SHOW_ALERT:
         return {
            ...state,
            isShow: true,
            payload: action.payload,
         };
      case HIDE_ALERT:
         return {
            ...state,
            isShow: false,
         };
      default:
         return state;
   }
};

export default alertReducer;
