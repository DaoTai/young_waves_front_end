import { combineReducers } from "redux";
import { signInReducer } from "./auth";
const rootReducer = combineReducers({
   signIn: signInReducer,
});

export default rootReducer;
