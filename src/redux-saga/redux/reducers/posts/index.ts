import {
   INIT_STATE,
   CREATE_POST,
   CREATE_POST_SUCCESS,
   CREATE_POST_FAILURE,
   GET_POSTS,
   GET_POSTS_SUCCESS,
   GET_POSTS_FAILURE,
} from "../../../../utils/constants";
import { Action } from "../../../../utils/interfaces/Action";

interface Payload {
   data: Array<any>;
   status: number;
}
interface MyAction {
   type: string;
   payload: Payload;
}

const postsReducer = (state = INIT_STATE.posts, action: MyAction) => {
   switch (action.type) {
      case GET_POSTS:
      case CREATE_POST:
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
      case CREATE_POST_SUCCESS:
         const prevState = state.payload.data;
         const data = [action.payload.data, ...prevState];
         return {
            isLoading: false,
            payload: { ...state.payload, data: data },
            action: action.type,
         };
      case GET_POSTS_FAILURE:
      case CREATE_POST_FAILURE:
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
