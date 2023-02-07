import {
   INIT_STATE,
   SIGN_OUT,
   SIGN_OUT_SUCCESS,
   SIGN_OUT_FAILURE,
} from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";

const signOutReducer = (state = INIT_STATE.signOut, action: Action) => {
   switch (action.type) {
      case SIGN_OUT:
         return {
            isLoading: true,
         };
      case SIGN_OUT_SUCCESS:
         return {
            isLoading: false,
            action: action.type,
         };

      case SIGN_OUT_FAILURE:
         return {
            isLoading: false,
            action: action.type,
            error: action.payload,
         };
      default:
         return state;
   }
};

export default signOutReducer;
