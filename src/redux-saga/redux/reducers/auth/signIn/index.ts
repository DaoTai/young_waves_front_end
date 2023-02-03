import React from "react";
import {
   INIT_STATE,
   SIGN_IN,
   SIGN_IN_SUCCESS,
   SIGN_IN_FAILURE,
} from "../../../../../utils/constants";
const signInReducer = (state = INIT_STATE.signIn, action) => {
   switch (action.type) {
      case SIGN_IN:
         return {
            ...state,
            isLoading: true,
         };
      case SIGN_IN_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      case SIGN_IN_FAILURE:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      default:
         return state;
   }
};

export default signInReducer;
