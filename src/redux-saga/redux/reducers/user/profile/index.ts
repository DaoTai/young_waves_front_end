import {
   INIT_STATE,
   GET_PROFILE,
   GET_PROFILE_SUCCESS,
   GET_PROFILE_FAILURE,
   UPDATE_PROFILE,
   UPDATE_PROFILE_SUCCESS,
   UPDATE_PROFILE_FAILURE,
} from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";
const profileReducer = (state = INIT_STATE.profile, action: Action) => {
   switch (action.type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
         return {
            ...state,
            isLoading: true,
         };
      case GET_PROFILE_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      case GET_PROFILE_FAILURE:
      case UPDATE_PROFILE_FAILURE:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      default:
         return state;
   }
};

export default profileReducer;
