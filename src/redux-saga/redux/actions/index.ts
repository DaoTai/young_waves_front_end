import * as CONSTANTS from "../../../utils/constants";
import { SignIn, SignUp } from "../../../utils/interfaces/Auth";
import { Profile } from "../../../utils/interfaces/Profile";

// Actions SIGN-IN
export const signIn = (payload: SignIn) => ({
   type: CONSTANTS.SIGN_IN,
   payload,
});

export const signInSuccess = (payload: SignIn) => ({
   type: CONSTANTS.SIGN_IN_SUCCESS,
   payload,
});

export const signInFailure = (payload: string) => ({
   type: CONSTANTS.SIGN_IN_FAILURE,
   payload,
});

// Actions SIGN-UP
export const signUp = (payload: SignUp) => ({
   type: CONSTANTS.SIGN_UP,
   payload,
});

export const signUpSuccess = (payload: SignUp) => ({
   type: CONSTANTS.SIGN_UP_SUCCESS,
   payload,
});

export const signUpFailure = (payload: string) => ({
   type: CONSTANTS.SIGN_UP_FAILURE,
   payload,
});

// Actions PROFILE
// GET
export const getProfile = (payload: { id: string; accessToken: string }) => ({
   type: CONSTANTS.GET_PROFILE,
   payload,
});

export const getProfileSuccess = (payload: Profile) => ({
   type: CONSTANTS.GET_PROFILE_SUCCESS,
   payload,
});

export const getProfileFailure = (payload: string) => ({
   type: CONSTANTS.GET_PROFILE_FAILURE,
   payload,
});
//UPDATE
export const updateProfile = (payload: Partial<Profile>) => ({
   type: CONSTANTS.UPDATE_PROFILE,
   payload,
});

export const updateProfileSuccess = (payload: Profile) => ({
   type: CONSTANTS.UPDATE_PROFILE_SUCCESS,
   payload,
});

export const updateProfileFailure = (payload: string) => ({
   type: CONSTANTS.UPDATE_PROFILE_FAILURE,
   payload,
});
