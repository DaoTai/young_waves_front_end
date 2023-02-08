import * as CONSTANTS from "../../../utils/constants";
import { SignIn, SignUp } from "../../../utils/interfaces/Auth";
import { Profile, ChangePassword } from "../../../utils/interfaces/Profile";
import { Post } from "../../../utils/interfaces/Post";

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

// Actions LogOut
export const signOut = () => ({
   type: CONSTANTS.SIGN_OUT,
});

export const signOutSuccess = () => ({
   type: CONSTANTS.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (payload: string) => ({
   type: CONSTANTS.SIGN_OUT_FAILURE,
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

// CHANGE-PASSWORD
export const changePasswordProfile = (payload: ChangePassword & { _id: string }) => ({
   type: CONSTANTS.CHANGE_PASSWORD_PROFILE,
   payload,
});

export const changePasswordProfileSuccess = (payload: string) => ({
   type: CONSTANTS.CHANGE_PASSWORD_PROFILE_SUCCESS,
   payload,
});

export const changePasswordProfileFailure = (payload: any) => ({
   type: CONSTANTS.CHANGE_PASSWORD_PROFILE_FAILURE,
   payload,
});

// POSTS
export const getPosts = () => ({ type: CONSTANTS.GET_POSTS });
export const getPostsSuccess = (payload: Array<Post>) => ({
   type: CONSTANTS.GET_POSTS_SUCCESS,
   payload,
});
export const getPostsFailure = (payload: any) => ({
   type: CONSTANTS.GET_POSTS_FAILURE,
   payload,
});
// Post
export const getPost = (id: string) => ({ type: CONSTANTS.GET_POST, payload: id });
export const getPostSuccess = (payload: Post) => ({
   type: CONSTANTS.GET_POST_SUCCESS,
   payload,
});
export const getPostFailure = (payload: any) => ({
   type: CONSTANTS.GET_POST_FAILURE,
   payload,
});

export const createPost = () => ({ type: CONSTANTS.CREATE_POST });
export const createPostSuccess = (payload: Partial<Post>) => ({
   type: CONSTANTS.CREATE_POST_SUCCESS,
   payload,
});
export const createPostFailure = (payload: any) => ({
   type: CONSTANTS.CREATE_POST_FAILURE,
   payload,
});
