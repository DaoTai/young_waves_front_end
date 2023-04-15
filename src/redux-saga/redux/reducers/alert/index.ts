import { ALERT_ACTION } from "../../../../utils/enums";
import { AlertAction, AlertState, init } from "./helpers";
const alertReducer = (state = init, action: AlertAction): AlertState => {
   switch (action.type) {
      case ALERT_ACTION.SHOW_ALERT:
         return {
            ...state,
            isShow: true,
            payload: action.payload,
         };
      case ALERT_ACTION.HIDE_ALERT:
         return init;
      default:
         return state;
   }
};

export default alertReducer;
