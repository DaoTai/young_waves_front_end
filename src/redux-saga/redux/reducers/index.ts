import { combineReducers } from "redux";
import { SIGN_OUT_SUCCESS } from "../../../utils/constants";
import { Post } from "../../../utils/interfaces/Post";
import { Profile } from "../../../utils/interfaces/Profile";
import alertReducer from "./alert";
import authReducer from "./auth";
import { postsReducer } from "./posts";
import ownerPostsReducer from "./user/owner/posts";
import trashPostsReducer from "./posts/trash";
import { profileReducer } from "./user";

export interface State {
   alert: { isShow: boolean; payload: any };
   auth: {
      isLoading: boolean;
      payload: {
         accessToken: string;
         user: Profile;
      };
      status?: number | null;
   };
   profile: {
      isLoading: boolean;
      payload: Profile & { totalPosts: number };
      action?: string;
      status?: number;
      error?: string;
   };
   posts: {
      isLoading: boolean;
      payload: Post[];
   };
   trashPosts: { isLoading: boolean; payload: Post[] };
   ownerPosts: { isLoading: boolean; payload: Post[] };
}

const rootReducer = combineReducers({
   alert: alertReducer,
   auth: authReducer,
   profile: profileReducer,
   posts: postsReducer,
   trashPosts: trashPostsReducer,
   ownerPosts: ownerPostsReducer,
});

// hande reset all reducer when sign out success
export default (state, action) =>
   rootReducer(action.type === SIGN_OUT_SUCCESS ? undefined : state, action);
