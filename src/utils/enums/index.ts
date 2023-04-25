export enum FEATURES_ADMIN {
   statistical = "statistical",
   users = "users",
   trashes = "trashes",
}
export enum TRASHES_ADMIN {
   members = "members",
}

export enum TAB_PROFILE {
   posts = "posts",
   friends = "friends",
}

export enum ALERT_ACTION {
   SHOW_ALERT = "SHOW_ALERT",
   HIDE_ALERT = "HIDE_ALERT",
}

export enum AUTH_ACTION {
   SIGN_IN = "SIGN_IN",
   SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
   SIGN_IN_FAILURE = "SIGN_IN_FAILURE",
   SIGN_OUT = "SIGN_OUT",
   SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
   SIGN_OUT_FAILURE = "SIGN_OUT_FAILURE",
}

export enum PROFILE_ACTION {
   // GET
   GET_PROFILE = "GET_PROFILE",
   GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS",
   GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE",
   // UPDATE
   UPDATE_PROFILE = "UPDATE_PROFILE",
   UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS",
   UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE",
   // CHANGE PASSWORD
   CHANGE_PASSWORD = "CHANGE_PASSWORD",
   CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS",
   CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE",
}

export enum FRIEND_ACTION {
   // ADD
   ADD_FRIEND = "ADD_FRIEND",
   ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS",
   ADD_FRIEND_FAILURE = "ADD_FRIEND_FAILURE",
   // CANCEL
   CANCEL_FRIEND = "CANCEL_FRIEND",
   CANCEL_FRIEND_SUCCESS = "CANCEL_FRIEND_SUCCESS",
   CANCEL_FRIEND_FAILURE = "CANCEL_FRIEND_FAILURE",
}

export enum POSTS_ACTION {
   // Clear posts
   CLEAR_POSTS = "CLEAR_POSTS",
   // Get posts
   GET_POSTS = "GET_POSTS",
   GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS",
   GET_POSTS_FAILURE = "GET_POSTS_FAILURE",
   // Create post
   CREATE_POST = "CREATE_POST",
   CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS",
   CREATE_POST_FAILURE = "CREATE_POST_FAILURE",
   // Update post
   UPDATE_POST = "UPDATE_POST",
   UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS",
   UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE",
   // Delete post
   DELETE_POST = "DELETE_POST",
   DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS",
   DELETE_POST_FAILURE = "DELETE_POST_FAILURE",
   // Like post
   LIKE_POST = "LIKE_POST",
   LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS",
   LIKE_POST_FAILURE = "LIKE_POST_FAILURE",
   // Unlike post
   UNLIKE_POST = "UNLIKE_POST",
   UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS",
   UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE",
   // Comment post
   COMMENT_POST = "COMMENT_POST",
   COMMENT_POST_SUCCESS = "COMMENT_POST_SUCCESS",
   COMMENT_POST_FAILURE = "COMMENT_POST_FAILURE",
   // Update comment
   UPDATE_COMMENT_POST = "COMMENT_POST",
   UPDATE_COMMENT_POST_SUCCESS = "COMMENT_POST_SUCCESS",
   UPDATE_COMMENT_POST_FAILURE = "COMMENT_POST_FAILURE",
   // Delete comment
   DELETE_COMMENT_POST = "DELETE_COMMENT_POST",
   DELETE_COMMENT_POST_SUCCESS = "DELETE_COMMENT_POST_SUCCESS",
   DELETE_COMMENT_POST_FAILURE = "DELETE_COMMENT_POST_FAILURE",
}

export enum OWNER_POSTS_ACTION {
   // Clear owner posts
   CLEAR_OWNER_POSTS = "CLEAR_OWNER_POSTS",
   // Get owner posts
   GET_OWNER_POSTS = "GET_OWNER_POSTS",
   GET_OWNER_POSTS_SUCCESS = "GET_OWNER_POSTS_SUCCESS",
   GET_OWNER_POSTS_FAILURE = "GET_OWNER_POSTS_FAILURE",
}

export enum TRASH_POSTS_ACTION {
   // Get trash posts
   GET_TRASH_POSTS = "GET_TRASH_POSTS",
   GET_TRASH_POSTS_SUCCESS = "GET_TRASH_POSTS_SUCCESS",
   GET_TRASH_POSTS_FAILURE = "GET_TRASH_POSTS_FAILURE",
   // Force delete trash post
   FORCE_DELETE_TRASH_POST = "FORCE_DELETE_TRASH_POST",
   FORCE_DELETE_TRASH_POST_SUCCESS = "FORCE_DELETE_TRASH_POST_SUCCESS",
   FORCE_DELETE_TRASH_POST_FAILURE = "FORCE_DELETE_TRASH_POST_FAILURE",
   // Restore trash post
   RESTORE_TRASH_POST = "RESTORE_TRASH_POST",
   RESTORE_TRASH_POST_SUCCESS = "RESTORE_TRASH_POST_SUCCESS",
   RESTORE_TRASH_POST_FAILURE = "RESTORE_TRASH_POST_FAILURE",
}
