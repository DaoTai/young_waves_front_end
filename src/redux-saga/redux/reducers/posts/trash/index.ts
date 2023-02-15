import * as CONSTANTS from "../../../../../utils/constants";
import { Like } from "../../../../../utils/interfaces/Like";
import { Post } from "../../../../../utils/interfaces/Post";
interface Payload {
   posts: Array<Post>;
   perPage: number;
   maxPages: number;
}
interface MyAction {
   type: string;
   payload: string | Payload;
}

const trashPostsReducer = (state = CONSTANTS.INIT_STATE.trashPosts, action: MyAction) => {
   switch (action.type) {
      case CONSTANTS.GET_TRASH_POSTS:
         return {
            ...state,
            isLoading: true,
         };
      case CONSTANTS.GET_TRASH_POSTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            action: action.type,
         };
      case CONSTANTS.FORCE_DELETE_POST_SUCCESS:
         const idDeletedPost = action.payload;
         const updatedPost = state.payload.posts.filter((post: Post) => post._id !== idDeletedPost);
         return {
            ...state,
            isLoading: false,
            payload: { ...state.payload, posts: updatedPost },
            action: action.type,
         };
      case CONSTANTS.RESTORE_POST_SUCCESS:
         const idRestoredPost = action.payload as string;
         const restPosts = state.payload.posts.filter((post: Post) => post._id !== idRestoredPost);
         return {
            ...state,
            isLoading: false,
            payload: { ...state.payload, posts: restPosts },
            action: action.type,
         };
      case CONSTANTS.GET_TRASH_POSTS_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload,
            action: action.type,
         };
      default:
         return state;
   }
};

export default trashPostsReducer;
