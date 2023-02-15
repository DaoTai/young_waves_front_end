import * as CONSTANTS from "../../../../utils/constants";
import { UsersAction } from "../../../../utils/interfaces/Action";

const usersReducer = (state = CONSTANTS.INIT_STATE.users, action: UsersAction) => {
   switch (action.type) {
      case CONSTANTS.GET_ALL_USER:
         return {
            ...state,
            isLoading: true,
         };
      case CONSTANTS.GET_ALL_USER_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload.data,
         };
      case CONSTANTS.GET_ALL_USER_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload,
         };
      default:
         return state;
   }
};

export default usersReducer;
