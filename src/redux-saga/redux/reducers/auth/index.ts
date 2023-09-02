import { AUTH_ACTION, FRIEND_ACTION, POSTS_ACTION, PROFILE_ACTION, TRASH_POSTS_ACTION } from "../../../../utils/enums";
import { AuthPayload, AuthState, init } from "./helpers";

const authReducer = (state = init, action: { type: string; payload: AuthPayload | any }): AuthState => {
   switch (action.type) {
      case AUTH_ACTION.SIGN_IN:
      case AUTH_ACTION.SIGN_OUT:
      case PROFILE_ACTION.GET_PROFILE:
      case PROFILE_ACTION.UPDATE_PROFILE:
      case PROFILE_ACTION.CHANGE_PASSWORD:
      case FRIEND_ACTION.ADD_FRIEND:
      case FRIEND_ACTION.CANCEL_FRIEND:
         return {
            ...state,
            isLoading: true,
         };
      case AUTH_ACTION.SIGN_IN_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      case AUTH_ACTION.SIGN_OUT_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: { accessToken: null, user: null },
         };
      case PROFILE_ACTION.GET_PROFILE_SUCCESS:
      case PROFILE_ACTION.UPDATE_PROFILE_SUCCESS:
      case PROFILE_ACTION.CHANGE_PASSWORD_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: {
               accessToken: state.payload?.accessToken as string,
               user: {
                  ...state.payload?.user,
                  ...action.payload,
               },
            },
         };
      case FRIEND_ACTION.ADD_FRIEND_SUCCESS:
         state.payload?.user?.friends?.push(action.payload);
         return {
            ...state,
            isLoading: false,
         };
      case FRIEND_ACTION.CANCEL_FRIEND_SUCCESS:
         const newFriendAfterCanceled = state.payload?.user?.friends?.filter(
            (friend) => friend !== action.payload
         ) as string[];
         state.payload!.user!.friends = newFriendAfterCanceled;
         return {
            ...state,
            isLoading: false,
         };
      case POSTS_ACTION.CREATE_POST_SUCCESS:
      case TRASH_POSTS_ACTION.RESTORE_TRASH_POST_SUCCESS:
         if (state.payload?.user?.totalPosts) {
            state.payload.user.totalPosts += 1;
         }
         return {
            ...state,
            isLoading: false,
         };
      case POSTS_ACTION.DELETE_POST_SUCCESS:
         if (state.payload?.user?.totalPosts) {
            state.payload.user.totalPosts -= 1;
         }
         return {
            ...state,
            isLoading: false,
         };
      case AUTH_ACTION.SIGN_IN_FAILURE:
      case AUTH_ACTION.SIGN_OUT_FAILURE:
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
         return state;
   }
};

export default authReducer;
