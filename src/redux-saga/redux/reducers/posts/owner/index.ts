import {
   INIT_STATE,
   GET_OWNER_POSTS,
   GET_OWNER_POSTS_SUCCESS,
   GET_OWNER_POSTS_FAILURE,
   CREATE_POST_SUCCESS,
   UPDATE_POST_SUCCESS,
   DELETE_POST_SUCCESS,
   CREATE_LIKE_SUCCESS,
} from "../../../../../utils/constants";
import { Post } from "../../../../../utils/interfaces/Post";

interface Payload {
   data: Array<Post>;
   status: number;
}
interface MyAction {
   type: string;
   payload: Payload & any;
}

const ownerPostsReducer = (state = INIT_STATE.posts, action: MyAction) => {
   switch (action.type) {
      case GET_OWNER_POSTS:
         return {
            ...state,
            isLoading: true,
         };
      case GET_OWNER_POSTS_SUCCESS:
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
      case UPDATE_POST_SUCCESS:
         const currentState = [...state.payload.data] as Array<Post>;
         const value = action.payload.data as any;
         currentState.splice(action.payload.index, 1, value);
         return {
            ...state,
            isLoading: false,
         };
      case DELETE_POST_SUCCESS:
         const filterData = [...state.payload.data].filter(
            (post: Post) => post._id !== action.payload
         );
         return { ...state, payload: { ...state.payload, data: filterData }, action: action.type };
      case CREATE_LIKE_SUCCESS:
         return {
            ...state,
            action: action.type,
         };
      case GET_OWNER_POSTS_FAILURE:
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

export default ownerPostsReducer;
