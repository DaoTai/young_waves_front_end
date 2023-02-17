import { combineReducers } from "redux";
import { SIGN_OUT_SUCCESS } from "../../../utils/constants";
import { signInReducer, signUpReducer } from "./auth";
import alertReducer from "./alert";
import { profileReducer } from "./user";
import postsReducer from "./posts";
import postReducer from "./posts/post";
import trashPostsReducer from "./posts/trash";
import ownerPostsReducer from "./posts/owner";
import usersReducer from "./users";
const rootReducer = combineReducers({
   alert: alertReducer,
   signIn: signInReducer,
   signUp: signUpReducer,
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
