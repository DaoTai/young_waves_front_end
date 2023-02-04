import { combineReducers } from "redux";
import { signInReducer, signUpReducer } from "./auth";
import { profileReducer } from "./user";
const rootReducer = combineReducers({
   signIn: signInReducer,
   signUp: signUpReducer,
   profile: profileReducer,
});

export default rootReducer;
