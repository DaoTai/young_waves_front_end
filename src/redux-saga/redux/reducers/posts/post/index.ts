import {
   GET_POST,
   GET_POST_SUCCESS,
   GET_POST_FAILURE,
   INIT_STATE,
} from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";

const postReducer = (state = INIT_STATE.post, action: Action) => {
   switch (action.type) {
      case GET_POST:
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
