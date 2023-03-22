import {
   INIT_STATE,
   GET_PROFILE,
   GET_PROFILE_SUCCESS,
   GET_PROFILE_FAILURE,
   UPDATE_PROFILE,
   UPDATE_PROFILE_SUCCESS,
   UPDATE_PROFILE_FAILURE,
   CHANGE_PASSWORD_PROFILE,
   CHANGE_PASSWORD_PROFILE_SUCCESS,
   CHANGE_PASSWORD_PROFILE_FAILURE,
   ADD_FRIEND,
   ADD_FRIEND_SUCCESS,
   ADD_FRIEND_FAILURE,
} from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";
import { Profile } from "../../../../../utils/interfaces/Profile";

interface StateProfile {
   isLoading: boolean;
   payload: Partial<Profile>;
}

const init: StateProfile = {
   isLoading: false,
   payload: {},
};

const profileReducer = (
   state = init,
   action: { type: string; payload: { data: Object; status: number; message?: string } | any }
) => {
   switch (action.type) {
      case GET_PROFILE:
      case UPDATE_PROFILE:
      case CHANGE_PASSWORD_PROFILE:
      case ADD_FRIEND:
         return {
            ...state,
            isLoading: true,
         };
      case GET_PROFILE_SUCCESS:
      case UPDATE_PROFILE_SUCCESS:
      case CHANGE_PASSWORD_PROFILE_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: { ...state.payload, ...action.payload.data },
            action: action.type,
            status: action.payload.status,
         };
      case ADD_FRIEND_SUCCESS:
         state.payload?.friends?.push(action.payload);
         return {
            ...state,
            isLoading: false,
            action: action.type,
         };

      case GET_PROFILE_FAILURE:
      case UPDATE_PROFILE_FAILURE:
      case CHANGE_PASSWORD_PROFILE_FAILURE:
      case ADD_FRIEND_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload.message,
            action: action.type,
         };
      default:
         return { ...state, isLoading: false };
   }
};

export default profileReducer;
