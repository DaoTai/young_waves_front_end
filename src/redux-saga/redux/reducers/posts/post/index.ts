import {
   GET_POST,
   GET_POST_SUCCESS,
   GET_POST_FAILURE,
   UPDATE_POST,
   UPDATE_POST_SUCCESS,
   UPDATE_POST_FAILURE,
   CREATE_COMMENT,
   CREATE_COMMENT_SUCCESS,
   CREATE_COMMENT_FAILURE,
   INIT_STATE,
} from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";
import { Comment } from "../../../../../utils/interfaces/Comment";
import { Post } from "../../../../../utils/interfaces/Post";

interface Data {
   comments: Array<Comment>;
   post: Post;
}

interface Payload {
   data: Array<Data>;
   status: number;
}
interface MyAction {
   type: string;
   payload: Payload;
}

const postReducer = (state = INIT_STATE.post, action: MyAction) => {
   switch (action.type) {
      case GET_POST:
      case CREATE_COMMENT:
      case UPDATE_POST:
         return {
            ...state,
            isLoading: true,
         };
      case GET_POST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            action: action.type,
         };
      case CREATE_COMMENT_SUCCESS:
         const prevComment = state.payload.data.comments;
         const nextComment = [action.payload.data, ...prevComment];
         const newState = {
            ...state.payload,
            data: {
               comments: nextComment,
               post: { ...state.payload.data.post },
            },
         };
         return {
            ...state,
            isLoading: false,
            payload: newState,
            action: action.type,
         };
      case UPDATE_POST_SUCCESS:
         const newPost = { ...state.payload.data.post, ...action.payload };
         const newPayload = {
            ...state.payload,
            data: {
               comments: [...state.payload.data.comments],
               post: newPost,
            },
         };
         return {
            ...state,
            isLoading: false,
            payload: newPayload,
            action: action.type,
         };
      case CREATE_COMMENT_FAILURE:
      case UPDATE_POST_FAILURE:
      case GET_POST_FAILURE:
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
