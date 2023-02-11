import { combineReducers } from "redux";
import { signInReducer, signUpReducer, signOutReducer } from "./auth";
import { profileReducer } from "./user";
import postsReducer from "./posts";
import postReducer from "./posts/post";
import ownerPostsReducer from "./posts/owner";
const rootReducer = combineReducers({
   signIn: signInReducer,
   signUp: signUpReducer,
   signOut: signOutReducer,
   profile: profileReducer,
   posts: postsReducer,
   ownerPosts: ownerPostsReducer,
   post: postReducer,
});

export default rootReducer;
