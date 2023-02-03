import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "../../../utils/constants";
import { SignIn } from "../../../utils/interfaces/Auth";

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
