import { combineReducers } from "redux";
import { signInReducer, signUpReducer, signOutReducer } from "./auth";
import { profileReducer } from "./user";
import postsReducer from "./posts";
import postReducer from "./posts/post";
const rootReducer = combineReducers({
   signIn: signInReducer,
   signUp: signUpReducer,
   signOut: signOutReducer,
   profile: profileReducer,
   posts: postsReducer,
   post: postReducer,
});

export default rootReducer;
