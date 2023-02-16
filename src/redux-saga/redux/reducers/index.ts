import { combineReducers } from "redux";
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

export default rootReducer;
