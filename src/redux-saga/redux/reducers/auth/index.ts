import {
   INIT_STATE,
   SIGN_IN,
   SIGN_IN_FAILURE,
   SIGN_IN_SUCCESS,
   SIGN_OUT,
   SIGN_OUT_SUCCESS,
   SIGN_OUT_FAILURE,
} from "../../../../utils/constants";
import { SignInPayload } from "../../../../utils/interfaces/Action";

const authInReducer = (
   state = INIT_STATE.signIn,
   action: { type: string; payload: SignInPayload }
) => {
   switch (action.type) {
      case SIGN_IN:
      case SIGN_OUT:
         return {
            ...state,
            isLoading: true,
         };
      case SIGN_IN_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      case SIGN_OUT_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: null,
         };
      case SIGN_IN_FAILURE:
      case SIGN_OUT_FAILURE:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      default:
         return state;
   }
};

export default authInReducer;
