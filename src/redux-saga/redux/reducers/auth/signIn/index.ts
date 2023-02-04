import React from "react";
import {
   INIT_STATE,
   SIGN_IN,
   SIGN_IN_SUCCESS,
   SIGN_IN_FAILURE,
} from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";
const signInReducer = (state = INIT_STATE.signIn, action: Action) => {
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
            accessToken: action.payload.data.accessToken,
            user: action.payload.data.payload,
            status: 200,
         };
      case SIGN_IN_FAILURE:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            status: action.payload.response?.status,
            err: action.payload.response?.data,
         };
      default:
         return state;
   }
};

export default signInReducer;
