import * as CONSTANTS from "../../../utils/constants";
import { SignIn, SignUp } from "../../../utils/interfaces/Auth";
import { Profile, ChangePassword } from "../../../utils/interfaces/Profile";
import { Post } from "../../../utils/interfaces/Post";
import { Comment } from "../../../utils/interfaces/Comment";
import { Like } from "../../../utils/interfaces/Like";
import { AlertProps } from "../../../utils/interfaces/Props";

// Actions show/hide alert
export const showAlert = (payload: AlertProps) => ({
   type: CONSTANTS.SHOW_ALERT,
   payload,
});

export const hideAlert = () => ({
   type: CONSTANTS.HIDE_ALERT,
});

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

export const getProfile = (payload: string) => ({
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

export const addFriend = (payload: string) => ({
   type: CONSTANTS.ADD_FRIEND,
   payload,
});

export const addFriendSuccess = (payload: string) => ({
   type: CONSTANTS.ADD_FRIEND_SUCCESS,
   payload,
});

export const addFriendFailure = (payload: any) => ({
   type: CONSTANTS.ADD_FRIEND_FAILURE,
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

export const getOwnerPosts = (idUser: string) => ({ type: CONSTANTS.GET_OWNER_POSTS, id: idUser });
export const getOwnerPostsSuccess = (payload: Array<Post>) => ({
   type: CONSTANTS.GET_OWNER_POSTS_SUCCESS,
   payload,
});
export const getOwnerPostsFailure = (payload: any) => ({
   type: CONSTANTS.GET_OWNER_POSTS_FAILURE,
   payload,
});

// Trash posts
export const getTrashPosts = () => ({ type: CONSTANTS.GET_TRASH_POSTS });
export const getTrashPostsSuccess = (payload: {
   posts: Post[];
   perPage: number;
   maxPages: number;
}) => ({
   type: CONSTANTS.GET_TRASH_POSTS_SUCCESS,
   payload,
});
export const getTrashPostsFailure = (payload: any) => ({
   type: CONSTANTS.GET_TRASH_POSTS_FAILURE,
   payload,
});

export const getTrashPost = (payload: string) => {
   return {
      type: CONSTANTS.GET_TRASH_POST,
      payload,
   };
};

export const forceDeletePost = (payload: string) => ({
   type: CONSTANTS.FORCE_DELETE_POST,
   payload,
});

export const forceDeletePostSuccess = (payload: string) => ({
   type: CONSTANTS.FORCE_DELETE_POST_SUCCESS,
   payload,
});

export const forceDeletePostFailure = (payload: any) => ({
   type: CONSTANTS.FORCE_DELETE_POST_FAILURE,
   payload,
});

export const restorePost = (payload: string) => ({
   type: CONSTANTS.RESTORE_POST,
   payload,
});

export const restorePostSuccess = (payload: string) => ({
   type: CONSTANTS.RESTORE_POST_SUCCESS,
   payload,
});

export const restorePostFailure = (payload: any) => ({
   type: CONSTANTS.RESTORE_POST_FAILURE,
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

export const createPost = (payload: Partial<Post>) => ({ type: CONSTANTS.CREATE_POST, payload });
export const createPostSuccess = (payload: Partial<Post>) => ({
   type: CONSTANTS.CREATE_POST_SUCCESS,
   payload,
});
export const createPostFailure = (payload: any) => ({
   type: CONSTANTS.CREATE_POST_FAILURE,
   payload,
});

export const updatePost = (payload: { id: string; index: number; data: Partial<Post> }) => ({
   type: CONSTANTS.UPDATE_POST,
   payload,
});
export const updatePostSuccess = (payload: Partial<Post> & { index: number }) => ({
   type: CONSTANTS.UPDATE_POST_SUCCESS,
   payload,
});
export const updatePostFailure = (payload: any) => ({
   type: CONSTANTS.UPDATE_POST_FAILURE,
   payload,
});

export const deletePost = (payload: string) => ({
   type: CONSTANTS.DELETE_POST,
   payload,
});
export const deletePostSuccess = (payload: string) => ({
   type: CONSTANTS.DELETE_POST_SUCCESS,
   payload,
});
export const deletePostFailure = (payload: any) => ({
   type: CONSTANTS.DELETE_POST_FAILURE,
   payload,
});

// Comment
export const createComment = (payload: { id: string; comment: string }) => ({
   type: CONSTANTS.CREATE_COMMENT,
   payload,
});
export const createCommentSuccess = (payload: string) => ({
   type: CONSTANTS.CREATE_COMMENT_SUCCESS,
   payload,
});
export const createCommentFailure = (payload: any) => ({
   type: CONSTANTS.CREATE_COMMENT_FAILURE,
   payload,
});

export const deleteComment = (payload: { idPost: string; idComment: string }) => ({
   type: CONSTANTS.DELETE_COMMENT,
   payload,
});

export const deleteCommentSuccess = (payload: { idPost: string; idComment: string }) => ({
   type: CONSTANTS.DELETE_COMMENT_SUCCESS,
   payload,
});
export const deleteCommentFailure = (payload: any) => ({
   type: CONSTANTS.DELETE_COMMENT_FAILURE,
   payload,
});

// Like
export const handleLike = (payload: string) => ({
   type: CONSTANTS.HANDLE_LIKE,
   payload,
});

export const createLikeSuccess = (payload: string) => ({
   type: CONSTANTS.CREATE_LIKE_SUCCESS,
   payload,
});

export const unLikeSuccess = (payload: string) => ({
   type: CONSTANTS.UNLIKE_SUCCESS,
   payload,
});

export const handleLikeFailure = (payload: any) => ({
   type: CONSTANTS.HANDLE_LIKE_FAILURE,
   payload,
});

// Users
export const getAllUser = (payload?: { page?: number; name?: string }) => ({
   type: CONSTANTS.GET_ALL_USER,
   payload,
});
export const getAllUserSuccess = (payload: {
   users: Array<Profile>;
   currentPage: number;
   maxPage: number;
}) => ({
   type: CONSTANTS.GET_ALL_USER_SUCCESS,
   payload,
});
export const getAllUserFailure = (payload: any) => ({
   type: CONSTANTS.GET_ALL_USER_FAILURE,
   payload,
});
