import * as CONSTANTS from "../../../utils/constants";
import {
   ALERT_ACTION,
   AUTH_ACTION,
   FRIEND_ACTION,
   OWNER_POSTS_ACTION,
   POSTS_ACTION,
   PROFILE_ACTION,
   TRASH_POSTS_ACTION,
} from "../../../utils/enums";
import { SignIn } from "../../../utils/interfaces/Auth";
import { Post } from "../../../utils/interfaces/Post";
import { ChangePassword, Profile } from "../../../utils/interfaces/Profile";
import { AlertProps } from "../../../utils/interfaces/Props";

// Actions show/hide alert
export const showAlert = (payload: AlertProps) => ({
   type: ALERT_ACTION.SHOW_ALERT,
   payload,
});

export const hideAlert = () => ({
   type: ALERT_ACTION.HIDE_ALERT,
});

// Actions SIGN-IN
export const signIn = (payload: SignIn) => ({
   type: AUTH_ACTION.SIGN_IN,
   payload,
});

export const signInSuccess = (payload: { user: Profile; accessToken: string }) => ({
   type: AUTH_ACTION.SIGN_IN_SUCCESS,
   payload,
});

export const signInFailure = () => ({
   type: AUTH_ACTION.SIGN_IN_FAILURE,
});

// Actions LogOut
export const signOut = () => ({
   type: AUTH_ACTION.SIGN_OUT,
});

export const signOutSuccess = () => ({
   type: AUTH_ACTION.SIGN_OUT_SUCCESS,
});

export const signOutFailure = () => ({
   type: AUTH_ACTION.SIGN_OUT_FAILURE,
});

// Actions PROFILE
// GET

export const getProfile = (payload: string) => ({
   type: PROFILE_ACTION.GET_PROFILE,
   payload,
});

export const getProfileSuccess = (payload: Profile) => ({
   type: PROFILE_ACTION.GET_PROFILE_SUCCESS,
   payload,
});

export const getProfileFailure = (payload: string) => ({
   type: PROFILE_ACTION.GET_PROFILE_FAILURE,
   payload,
});
//UPDATE
export const updateProfile = (payload: Partial<Profile>) => ({
   type: PROFILE_ACTION.UPDATE_PROFILE,
   payload,
});

export const updateProfileSuccess = (payload: Profile) => ({
   type: PROFILE_ACTION.UPDATE_PROFILE_SUCCESS,
   payload,
});

export const updateProfileFailure = (payload: string) => ({
   type: PROFILE_ACTION.UPDATE_PROFILE_FAILURE,
});

// CHANGE-PASSWORD
export const changePasswordProfile = (payload: ChangePassword & { _id: string }) => ({
   type: PROFILE_ACTION.CHANGE_PASSWORD,
   payload,
});

export const changePasswordProfileSuccess = (payload: string) => ({
   type: PROFILE_ACTION.CHANGE_PASSWORD_SUCCESS,
   payload,
});

export const changePasswordProfileFailure = (payload: any) => ({
   type: PROFILE_ACTION.CHANGE_PASSWORD_FAILURE,
   payload,
});

export const addFriend = (payload: string) => ({
   type: FRIEND_ACTION.ADD_FRIEND,
   payload,
});

export const addFriendSuccess = (payload: string) => ({
   type: FRIEND_ACTION.ADD_FRIEND_SUCCESS,
   payload,
});

export const addFriendFailure = (payload: any) => ({
   type: FRIEND_ACTION.ADD_FRIEND_FAILURE,
   payload,
});

export const cancelFriend = (payload: string) => ({
   type: FRIEND_ACTION.CANCEL_FRIEND,
   payload,
});

export const cancelFriendSuccess = (payload: string) => ({
   type: FRIEND_ACTION.CANCEL_FRIEND_SUCCESS,
   payload,
});

export const cancelFriendFailure = (payload: any) => ({
   type: FRIEND_ACTION.CANCEL_FRIEND_FAILURE,
   payload,
});

// POSTS
export const clearPosts = () => ({ type: POSTS_ACTION.CLEAR_POSTS });
export const getPosts = (payload?: number) => ({ type: POSTS_ACTION.GET_POSTS, payload });
export const getPostsSuccess = (payload: {
   posts: Post[];
   currentPage: number;
   maxPage: number;
}) => ({
   type: POSTS_ACTION.GET_POSTS_SUCCESS,
   payload,
});
export const getPostsFailure = () => ({
   type: POSTS_ACTION.GET_POSTS_FAILURE,
});

export const clearOwnerPosts = () => ({ type: OWNER_POSTS_ACTION.CLEAR_OWNER_POSTS });

export const getOwnerPosts = (payload: { id: string; page?: number }) => ({
   type: OWNER_POSTS_ACTION.GET_OWNER_POSTS,
   payload,
});
export const getOwnerPostsSuccess = (payload: {
   posts: Post[];
   currentPage: number;
   maxPage: number;
}) => ({
   type: OWNER_POSTS_ACTION.GET_OWNER_POSTS_SUCCESS,
   payload,
});
export const getOwnerPostsFailure = (payload: any) => ({
   type: OWNER_POSTS_ACTION.GET_OWNER_POSTS_FAILURE,
   payload,
});

// Trash posts
export const getTrashPosts = (payload?: number) => ({
   type: TRASH_POSTS_ACTION.GET_TRASH_POSTS,
   payload,
});
export const getTrashPostsSuccess = (payload: {
   posts: Post[];
   page: number;
   maxPages: number;
}) => ({
   type: TRASH_POSTS_ACTION.GET_TRASH_POSTS_SUCCESS,
   payload,
});
export const getTrashPostsFailure = (payload: any) => ({
   type: TRASH_POSTS_ACTION.GET_TRASH_POSTS_FAILURE,
   payload,
});

export const forceDeletePost = (payload: string) => ({
   type: TRASH_POSTS_ACTION.FORCE_DELETE_TRASH_POST,
   payload,
});

export const forceDeletePostSuccess = (payload: string) => ({
   type: TRASH_POSTS_ACTION.FORCE_DELETE_TRASH_POST_SUCCESS,
   payload,
});

export const forceDeletePostFailure = (payload: any) => ({
   type: TRASH_POSTS_ACTION.FORCE_DELETE_TRASH_POST_FAILURE,
   payload,
});

export const restorePost = (payload: string) => ({
   type: TRASH_POSTS_ACTION.RESTORE_TRASH_POST,
   payload,
});

export const restorePostSuccess = (payload: string) => ({
   type: TRASH_POSTS_ACTION.RESTORE_TRASH_POST_SUCCESS,
   payload,
});

export const restorePostFailure = (payload: any) => ({
   type: TRASH_POSTS_ACTION.RESTORE_TRASH_POST_FAILURE,
   payload,
});

// Post
export const createPost = (payload: Partial<Post>) => ({ type: POSTS_ACTION.CREATE_POST, payload });
export const createPostSuccess = (payload: Partial<Post>) => ({
   type: POSTS_ACTION.CREATE_POST_SUCCESS,
   payload,
});
export const createPostFailure = () => ({
   type: POSTS_ACTION.CREATE_POST_FAILURE,
});

export const updatePost = (payload: Partial<Post>) => ({
   type: POSTS_ACTION.UPDATE_POST,
   payload,
});
export const updatePostSuccess = (payload: Partial<Post>) => ({
   type: POSTS_ACTION.UPDATE_POST_SUCCESS,
   payload,
});
export const updatePostFailure = (payload: any) => ({
   type: POSTS_ACTION.UPDATE_POST_FAILURE,
   payload,
});

export const deletePost = (payload: string) => ({
   type: POSTS_ACTION.DELETE_POST,
   payload,
});
export const deletePostSuccess = (payload: string) => ({
   type: POSTS_ACTION.DELETE_POST_SUCCESS,
   payload,
});
export const deletePostFailure = (payload: any) => ({
   type: POSTS_ACTION.DELETE_POST_FAILURE,
   payload,
});

// Comment
export const createComment = (payload: { idPost: string; comment: string }) => ({
   type: POSTS_ACTION.COMMENT_POST,
   payload,
});
export const createCommentSuccess = (payload: { idPost: string; comment: string }) => ({
   type: POSTS_ACTION.COMMENT_POST_SUCCESS,
   payload,
});
export const createCommentFailure = (payload: any) => ({
   type: POSTS_ACTION.COMMENT_POST_FAILURE,
   payload,
});

export const deleteComment = (payload: { idPost: string; idComment: string }) => ({
   type: POSTS_ACTION.DELETE_COMMENT_POST,
   payload,
});

export const deleteCommentSuccess = (payload: { idPost: string; idComment: string }) => ({
   type: POSTS_ACTION.DELETE_COMMENT_POST_SUCCESS,
   payload,
});
export const deleteCommentFailure = (payload: any) => ({
   type: POSTS_ACTION.DELETE_COMMENT_POST_FAILURE,
   payload,
});

// Like post
export const likePost = (payload: string) => ({
   type: POSTS_ACTION.LIKE_POST,
   payload,
});

export const likePostSucess = (payload: { idPost: string; idLike: string }) => ({
   type: POSTS_ACTION.LIKE_POST_SUCCESS,
   payload,
});

export const likePostFailure = (payload: any) => ({
   type: POSTS_ACTION.LIKE_POST_FAILURE,
   payload,
});

// Unlike post
export const unLikePost = (payload: { idPost: string; idLike: string }) => ({
   type: POSTS_ACTION.UNLIKE_POST,
   payload,
});

export const unLikePostSuccess = (payload: { idPost: string; idLike: string }) => ({
   type: POSTS_ACTION.UNLIKE_POST_SUCCESS,
   payload,
});

export const unLikePostFailure = (payload: any) => ({
   type: POSTS_ACTION.UNLIKE_POST_FAILURE,
   payload,
});
