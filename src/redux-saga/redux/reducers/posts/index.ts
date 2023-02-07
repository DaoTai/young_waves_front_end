import {
   INIT_STATE,
   UPDATE_POSTS,
   UPDATE_POSTS_SUCCESS,
   UPDATE_POSTS_FAILURE,
   DELETE_POSTS,
   DELETE_POSTS_SUCCESS,
   DELETE_POSTS_FAILURE,
   GET_POSTS,
   GET_POSTS_SUCCESS,
   GET_POSTS_FAILURE,
} from "../../../../utils/constants";
import { Action } from "../../../../utils/interfaces/Action";

// UPDATE_POSTS
// UPDATE_POSTS_SUCCESS
// UPDATE_POSTS_FAILURE
// DELETE_POSTS
// DELETE_POSTS_SUCCESS
// DELETE_POSTS_FAILURE
const postsReducer = (state = INIT_STATE.posts, action: Action) => {
   switch (action.type) {
      case GET_POSTS:
         return {
            ...state,
            isLoading: true,
         };
      case GET_POSTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            action: action.type,
         };
      case GET_POSTS_FAILURE:
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
