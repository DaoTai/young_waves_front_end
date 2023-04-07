import { TRASH_POSTS_ACTION } from "../../../../../../utils/enums";
import { Post } from "../../../../../../utils/interfaces/Post";
interface TrashPostsPayload {
   posts: Post[];
   page: number;
   maxPage: number;
}

interface TrashPostsState {
   isLoading: boolean;
   trashPosts: Partial<Post[]>;
   maxPage: number;
   page: number;
}

interface MyAction {
   type: string;
   payload: string & TrashPostsPayload;
}

const init: TrashPostsState = {
   isLoading: false,
   trashPosts: [],
   maxPage: 0,
   page: 0,
};

const trashPostsReducer = (state: TrashPostsState = init, action: MyAction): TrashPostsState => {
   switch (action.type) {
      case TRASH_POSTS_ACTION.GET_TRASH_POSTS:
      case TRASH_POSTS_ACTION.FORCE_DELETE_TRASH_POST:
      case TRASH_POSTS_ACTION.RESTORE_TRASH_POST:
         return {
            ...state,
            isLoading: true,
         };
      case TRASH_POSTS_ACTION.GET_TRASH_POSTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            trashPosts: action.payload.posts,
            page: action.payload.page,
            maxPage: action.payload.maxPage,
         };
      case TRASH_POSTS_ACTION.RESTORE_TRASH_POST_SUCCESS:
         const idRestoredPost = action.payload;
         const newTrashPostsAfterRestore = state.trashPosts.filter((post) => {
            return post?._id !== idRestoredPost;
         });

         return {
            ...state,
            isLoading: false,
            trashPosts: newTrashPostsAfterRestore,
         };
      case TRASH_POSTS_ACTION.FORCE_DELETE_TRASH_POST_SUCCESS:
         const idDeletePost = action.payload;
         const newTrashPostsAfterDelete = state.trashPosts.filter((post) => {
            return post?._id !== idDeletePost;
         });

         return {
            ...state,
            isLoading: false,
            trashPosts: newTrashPostsAfterDelete,
         };
      case TRASH_POSTS_ACTION.GET_TRASH_POSTS_FAILURE:
      case TRASH_POSTS_ACTION.FORCE_DELETE_TRASH_POST:
      case TRASH_POSTS_ACTION.RESTORE_TRASH_POST:
         return {
            ...state,
            isLoading: false,
         };
      default:
         return state;
   }
};

export default trashPostsReducer;
