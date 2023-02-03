import { all, call, put, takeLatest } from "redux-saga/effects";
import { signInUser } from "../../apis/auth";
import { SIGN_IN } from "../../utils/constants";
import { signInFailure, signInSuccess } from "../redux/actions";
import { SignIn } from "../../utils/interfaces/Auth";
// Saga
function* signInSaga(action) {
   try {
      console.log("action: ", action);

      const data = yield call(signInUser, action.payload);
      yield put(signInSuccess(data));
      action.payload.isRemember
         ? localStorage.setItem("username", action.payload.username)
         : localStorage.removeItem("username");
   } catch (err) {
      yield put(signInFailure(err as string));
   }
}

// Combine saga
export default function* rootSaga() {
   yield all([takeLatest(SIGN_IN, signInSaga)]);
}
