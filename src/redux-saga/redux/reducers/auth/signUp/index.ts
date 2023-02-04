import React from "react";
import {
   INIT_STATE,
   SIGN_UP,
   SIGN_UP_SUCCESS,
   SIGN_UP_FAILURE,
} from "../../../../../utils/constants";
import { Action } from "../../../../../utils/interfaces/Action";
const signUpReducer = (state = INIT_STATE.signUp, action: Action) => {
   switch (action.type) {
      case SIGN_UP:
         return {
            ...state,
            isLoading: true,
         };
      case SIGN_UP_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            status: 200,
         };
      case SIGN_UP_FAILURE:
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

export default signUpReducer;
