import {
   SIGN_IN,
   SIGN_IN_SUCCESS,
   SIGN_IN_FAILURE,
   SHOW_SPINNER,
   HIDE_SPINNER,
} from "../../../utils/constants";
import { SignIn } from "../../../utils/interfaces/Auth";

// Actions display loading when call api
export const showSpinner = () => ({ type: SHOW_SPINNER });
export const hideSpinner = () => ({ type: HIDE_SPINNER });

// Actions SIGN-IN
export const signIn = (payload: SignIn) => ({
   type: SIGN_IN,
   payload,
});

export const signInSuccess = (payload: SignIn) => ({
   type: SIGN_IN_SUCCESS,
   payload,
});

export const signInFailure = (payload: string) => ({
   type: SIGN_IN_FAILURE,
   payload,
});
