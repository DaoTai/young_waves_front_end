import * as CONSTANTS from "../../../../utils/constants";
import { Like } from "../../../../utils/interfaces/Like";
import { Post } from "../../../../utils/interfaces/Post";
interface Payload {
   data: Array<Post>;
   status: number;
}
interface MyAction {
   type: string;
   payload: Payload & string;
}

const postsReducer = (state = CONSTANTS.INIT_STATE.posts, action: MyAction) => {
   switch (action.type) {
      case CONSTANTS.GET_POSTS:
      case CONSTANTS.CREATE_POST:
      case CONSTANTS.DELETE_POST:
         return {
            ...state,
            isLoading: true,
         };
      case CONSTANTS.GET_POSTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            action: action.type,
         };
      case CONSTANTS.CREATE_POST_SUCCESS:
         const prevState = state.payload.data;
         const data = [action.payload.data, ...prevState];
         return {
            isLoading: false,
            payload: { ...state.payload, data: data },
            action: action.type,
         };
      case CONSTANTS.DELETE_POST_SUCCESS:
         const deletedId = action.payload;
         const newPostsAfterDeleted = state.payload.data.filter((post: Post) => {
            return post._id !== deletedId;
         });
         return {
            isLoading: false,
            payload: { ...state.payload, data: newPostsAfterDeleted },
            action: action.type,
         };
      case CONSTANTS.GET_POSTS_FAILURE:
      case CONSTANTS.CREATE_POST_FAILURE:
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

export default postsReducer;
