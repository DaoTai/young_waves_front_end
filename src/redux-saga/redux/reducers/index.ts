import { combineReducers } from "redux";
import { SIGN_OUT_SUCCESS } from "../../../utils/constants";
import alertReducer from "./alert";
import authReducer from "./auth";
import postsReducer from "./posts";
import ownerPostsReducer from "./posts/owner";
import postReducer from "./posts/post";
import trashPostsReducer from "./posts/trash";
import { profileReducer } from "./user";
import usersReducer from "./users";
const rootReducer = combineReducers({
   alert: alertReducer,
   auth: authReducer,
   profile: profileReducer,
   posts: postsReducer,
   trashPosts: trashPostsReducer,
   ownerPosts: ownerPostsReducer,
   post: postReducer,
   users: usersReducer,
});

// hande reset all reducer when sign out success
export default (state, action) =>
   rootReducer(action.type === SIGN_OUT_SUCCESS ? undefined : state, action);
