import { TRASH_POSTS_ACTION } from "../../../../../../utils/enums";
import { Post } from "../../../../../../utils/interfaces/Post";
interface TrashPostsPayload {
   posts: Post[];
   perPage: number;
   maxPage: number;
}

interface TrashPostsState {
   isLoading: boolean;
   trashPosts: Partial<Post[]>;
   maxPage: number;
   perPage: number;
}

interface MyAction {
   type: string;
   payload: string & TrashPostsPayload;
}

const init: TrashPostsState = {
   isLoading: false,
   trashPosts: [],
   maxPage: 0,
   perPage: 0,
};

const trashPostsReducer = (state = init, action: MyAction): TrashPostsState => {
   switch (action.type) {
      case TRASH_POSTS_ACTION.GET_TRASH_POSTS:
         return {
            ...state,
            isLoading: true,
         };
      case TRASH_POSTS_ACTION.GET_TRASH_POSTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            trashPosts: action.payload.posts,
            perPage: action.payload.perPage,
            maxPage: action.payload.maxPage,
         };
      // case CONSTANTS.FORCE_DELETE_POST_SUCCESS:
      //    const idDeletedPost = action.payload;
      //    const updatedPost = state.payload.posts.filter((post: Post) => post._id !== idDeletedPost);
      //    return {
      //       ...state,
      //       isLoading: false,
      //       payload: { ...state.payload, posts: updatedPost },
      //       action: action.type,
      //    };
      // case CONSTANTS.RESTORE_POST_SUCCESS:
      // const idRestoredPost = action.payload as string;
      // const restPosts = state.payload.posts.filter((post: Post) => post._id !== idRestoredPost);
      // return {
      //    ...state,
      //    isLoading: false,
      //    payload: { ...state.payload, posts: restPosts },
      //    action: action.type,
      // };
      // case CONSTANTS.GET_TRASH_POSTS_FAILURE:
      //    return {
      //       ...state,
      //       isLoading: false,
      //       error: action.payload,
      //       action: action.type,
      //    };
      default:
         return state;
   }
};

export default trashPostsReducer;
