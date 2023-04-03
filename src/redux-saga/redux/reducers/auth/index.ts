import {
   INIT_STATE,
   SIGN_IN,
   SIGN_IN_FAILURE,
   SIGN_IN_SUCCESS,
   SIGN_OUT,
   SIGN_OUT_SUCCESS,
   SIGN_OUT_FAILURE,
   ADD_FRIEND_SUCCESS,
} from "../../../../utils/constants";
import { SignInPayload } from "../../../../utils/interfaces/Action";
import { Profile } from "../../../../utils/interfaces/Profile";

interface AuthState {
   isLoading: boolean;
   payload: {
      user: Partial<Profile> | null;
      accessToken: string | null;
   } | null;
}

interface AuthPayload {
   accessToken: string;
   user: Partial<Profile>;
}

const init: AuthState = {
   isLoading: false,
   payload: null,
};
const authReducer = (state = init, action: { type: string; payload: AuthPayload }): AuthState => {
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
            payload: { accessToken: null, user: null },
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

export default authReducer;
