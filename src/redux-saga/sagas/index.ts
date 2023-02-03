import { all, call, put, takeLatest } from "redux-saga/effects";
import { signInUser } from "../../apis/auth";
import { SIGN_IN } from "../../utils/constants";
import { hideSpinner, showSpinner, signInFailure, signInSuccess } from "../redux/actions";

// Saga
function* signInSaga(action) {
   try {
      // Show loading
      yield put(showSpinner());
      const data = yield call(signInUser, action.payload);
      yield put(signInSuccess(data));
      // Hide loading
      yield put(hideSpinner());
   } catch (err) {
      // Hide loading
      yield put(hideSpinner());
      yield put(signInFailure(err as string));
   }
}

// Combine saga
export default function* rootSaga() {
   yield all([takeLatest(SIGN_IN, signInSaga)]);
}
