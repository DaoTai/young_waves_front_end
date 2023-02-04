import {
   INIT_STATE,
   SIGN_UP,
   SIGN_UP_SUCCESS,
   SIGN_UP_FAILURE,
} from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";
const signUpReducer = (state = INIT_STATE.signUp, action: Action) => {
   switch (action.type) {
      case SIGN_UP:
         return {
            ...state,
            isLoading: true,
         };
      case SIGN_UP_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      case SIGN_UP_FAILURE:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      default:
         return state;
   }
};

export default signUpReducer;
