import { all, call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis";
import * as CONSTANTS from "../../utils/constants";
import * as ACTIONS from "../redux/actions";
import { SignIn, SignUp } from "../../utils/interfaces/Auth";
import { Profile } from "../../utils/interfaces/Profile";
// Saga
// Sign-in
function* signInSaga(action: { type: string; payload: SignIn }) {
   try {
      const data = yield call(api.auth.signInUser, action.payload);
      yield put(ACTIONS.signInSuccess(data));
      const { password, ...localUser } = action.payload;
      action.payload.isRemember
         ? localStorage.setItem("user", JSON.stringify(localUser))
         : localStorage.removeItem("user");
   } catch (err) {
      yield put(ACTIONS.signInFailure(err as string));
   }
}
// Sign-up
function* signUpSaga(action: { type: string; payload: SignUp }) {
   try {
      const data = yield call(api.auth.signUpUser, action.payload);
      yield put(ACTIONS.signUpSuccess(data));
   } catch (err) {
      yield put(ACTIONS.signUpFailure(err as string));
   }
}
// Profile
function* getProfileSaga(action: {
   type: string;
   payload: Profile & { id: string; accessToken: string };
}) {
   try {
      const { id, accessToken } = action.payload;
      const profile = yield call(api.user.getProfile, id, accessToken);
      yield put(ACTIONS.getProfileSuccess(profile));
   } catch (err) {
      yield put(ACTIONS.getProfileFailure(err as string));
   }
}
// Combine saga
export default function* rootSaga() {
   yield all([
      takeLatest(CONSTANTS.SIGN_IN, signInSaga),
      takeLatest(CONSTANTS.SIGN_UP, signUpSaga),
      takeLatest(CONSTANTS.GET_PROFILE, getProfileSaga),
   ]);
}
