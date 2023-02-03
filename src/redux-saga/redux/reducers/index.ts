import { combineReducers } from "redux";
import { signInReducer } from "./auth";
import spinnerReducer from "./spinner";
const rootReducer = combineReducers({
   signIn: signInReducer,
   spinner: spinnerReducer,
});

export default rootReducer;
