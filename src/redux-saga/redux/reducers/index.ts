import { combineReducers } from "redux";
import { AUTH_ACTION } from "../../../utils/enums";
import { Post } from "../../../utils/interfaces/Post";
import { Profile } from "../../../utils/interfaces/Profile";
import alertReducer from "./alert";
import authReducer from "./auth";
import postsReducer from "./posts";
import ownerPostsReducer from "./user/posts";
import trashPostsReducer from "./user/trash/posts";
import { profileReducer } from "./user";
import { PostsState } from "./posts/helpers";
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
   };
   posts: PostsState;
   trashPosts: { isLoading: boolean; trashPosts: Post[]; page: number; maxPage: number };
   ownerPosts: PostsState;
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
   rootReducer(action.type === AUTH_ACTION.SIGN_OUT_SUCCESS ? undefined : state, action);
