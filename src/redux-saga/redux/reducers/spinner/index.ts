import React from "react";
import { INIT_STATE, SHOW_SPINNER, HIDE_SPINNER } from "../../../../utils/constants";
const signInReducer = (state = INIT_STATE.spinner, action) => {
   switch (action.type) {
      case SHOW_SPINNER:
         return { isShow: true };
      case HIDE_SPINNER:
         return { isShow: false };
      default:
         return state;
   }
};

export default signInReducer;
