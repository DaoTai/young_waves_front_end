import { AUTH_ACTION } from "../../../../utils/enums";
import { AuthPayload, AuthState, init } from "./helpers";

const authReducer = (state = init, action: { type: string; payload: AuthPayload }): AuthState => {
   switch (action.type) {
      case AUTH_ACTION.SIGN_IN:
      case AUTH_ACTION.SIGN_OUT:
         return {
            ...state,
            isLoading: true,
         };
      case AUTH_ACTION.SIGN_IN_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      case AUTH_ACTION.SIGN_OUT_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: { accessToken: null, user: null },
         };
      case AUTH_ACTION.SIGN_IN_FAILURE:
      case AUTH_ACTION.SIGN_OUT_FAILURE:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      default:
         return state;
   }
};

export default authReducer;
