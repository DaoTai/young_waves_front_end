import { PROFILE_ACTION, FRIEND_ACTION } from "../../../../../utils/enums";
import { Profile } from "../../../../../utils/interfaces/Profile";

interface ProfileState {
   isLoading: boolean;
   payload: Partial<Profile>;
}

const init: ProfileState = {
   isLoading: false,
   payload: {},
};

const profileReducer = (
   state = init,
   action: { type: string; payload: { data: Object } | any }
): ProfileState => {
   switch (action.type) {
      case PROFILE_ACTION.GET_PROFILE:
      case PROFILE_ACTION.UPDATE_PROFILE:
      case PROFILE_ACTION.CHANGE_PASSWORD:
      case FRIEND_ACTION.ADD_FRIEND:
      case FRIEND_ACTION.CANCEL_FRIEND:
         return {
            ...state,
            isLoading: true,
         };
      case PROFILE_ACTION.GET_PROFILE_SUCCESS:
      case PROFILE_ACTION.UPDATE_PROFILE_SUCCESS:
      case PROFILE_ACTION.CHANGE_PASSWORD_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: { ...state.payload, ...action.payload.data },
         };
      case FRIEND_ACTION.ADD_FRIEND_SUCCESS:
         state.payload?.friends?.push(action.payload);
         return {
            ...state,
            isLoading: false,
         };
      case FRIEND_ACTION.CANCEL_FRIEND_SUCCESS:
         const newFriendAfterCanceled = state.payload.friends?.filter(
            (friend) => friend !== action.payload
         ) as string[];
         state.payload.friends = newFriendAfterCanceled;

         return {
            ...state,
            isLoading: false,
         };

      case PROFILE_ACTION.GET_PROFILE_FAILURE:
      case PROFILE_ACTION.UPDATE_PROFILE_FAILURE:
      case PROFILE_ACTION.CHANGE_PASSWORD_FAILURE:
      case FRIEND_ACTION.ADD_FRIEND_FAILURE:
      case FRIEND_ACTION.CANCEL_FRIEND_FAILURE:
         return {
            ...state,
            isLoading: false,
         };
      default:
         return { ...state, isLoading: false };
   }
};

export default profileReducer;
