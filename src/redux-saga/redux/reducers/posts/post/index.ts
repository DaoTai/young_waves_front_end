import * as CONSTANTS from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";
import { Comment } from "../../../../../utils/interfaces/Comment";
import { Post } from "../../../../../utils/interfaces/Post";

interface Payload {
   comments: Array<Comment>;
   post: Post;
}
interface MyAction {
   type: string;
   payload: Comment | Payload;
}

const postReducer = (state = CONSTANTS.INIT_STATE.post, action: MyAction) => {
   switch (action.type) {
      case CONSTANTS.GET_POST:
      case CONSTANTS.CREATE_COMMENT:
      case CONSTANTS.UPDATE_POST:
      case CONSTANTS.DELETE_POST:
         return {
            ...state,
            isLoading: true,
         };

      case CONSTANTS.GET_POST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            action: action.type,
         };

      case CONSTANTS.CREATE_COMMENT_SUCCESS:
         const newComment = action.payload as Comment;
         const addedNewComments = state.payload.comments as Comment[];
         addedNewComments.unshift(newComment);
         return {
            ...state,
            isLoading: false,
            payload: {
               ...state.payload,
               comments: addedNewComments,
            },
            action: action.type,
         };

      case CONSTANTS.DELETE_POST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: {},
            action: action.type,
         };

      case CONSTANTS.UPDATE_POST_SUCCESS:
         return {
            ...state,
            isLoading: false,
         };

      // case CONSTANTS.CREATE_LIKE_SUCCESS:
      //    console.log("Action like: ", action.payload);
      //    console.log("State: ", state.payload);
      //    return {
      //       ...state,
      //    };

      // case CONSTANTS.UNLIKE_SUCCESS:
      //    console.log("Action unlike: ", action.payload);
      //    console.log("State: ", state.payload);
      //    return {
      //       ...state,
      //    };

      case CONSTANTS.DELETE_POST_FAILURE:
      case CONSTANTS.CREATE_COMMENT_FAILURE:
      case CONSTANTS.UPDATE_POST_FAILURE:
      case CONSTANTS.GET_POST_FAILURE:
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

export default postReducer;
