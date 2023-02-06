import { all, call, delay, put, takeLatest } from "redux-saga/effects";
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
      if (data.status === 200) {
         yield put(ACTIONS.signInSuccess(data));
         const { password, ...localUser } = action.payload;
         action.payload.isRemember
            ? localStorage.setItem("user", JSON.stringify(localUser))
            : localStorage.removeItem("user");
      } else {
         yield put(ACTIONS.signInFailure(data as string));
      }
   } catch (err) {
      yield put(ACTIONS.signInFailure(err as string));
   }
}
// Sign-up
function* signUpSaga(action: { type: string; payload: SignUp }) {
   try {
      const data = yield call(api.auth.signUpUser, action.payload);
      if (data.status === 200) {
         yield put(ACTIONS.signUpSuccess(data));
      } else {
         yield put(ACTIONS.signUpFailure(data));
      }
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
      const { id } = action.payload;
      const res = yield call(api.user.getProfile, id);
      if (res.status === 200) {
         yield put(ACTIONS.getProfileSuccess(res));
      }
   } catch (err) {
      yield put(ACTIONS.getProfileFailure(err as string));
   }
}

// Update saga
function* updateProfileSaga(action: { type: string; payload: Profile }) {
   try {
      const res = yield call(api.user.updateProfile, action.payload);
      if (res.status === 200) {
         yield put(ACTIONS.updateProfileSuccess(res));
      } else {
         yield put(ACTIONS.updateProfileFailure(res));
      }
   } catch (err) {
      yield put(ACTIONS.updateProfileFailure(err as string));
   }
}

function* changePasswordProfileSaga(action: { type: string; payload: Profile }) {
   try {
      const res = yield call(api.user.changePasswordProfile, action.payload);
      if (res.status === 200) {
         yield put(ACTIONS.changePasswordProfileSuccess(res));
      } else {
         yield put(ACTIONS.changePasswordProfileFailure(res));
      }
   } catch (err) {
      yield put(ACTIONS.changePasswordProfileFailure(err as string));
   }
}

// Combine saga
export default function* rootSaga() {
   yield all([
      takeLatest(CONSTANTS.SIGN_IN, signInSaga),
      takeLatest(CONSTANTS.SIGN_UP, signUpSaga),
      takeLatest(CONSTANTS.GET_PROFILE, getProfileSaga),
      takeLatest(CONSTANTS.UPDATE_PROFILE, updateProfileSaga),
      takeLatest(CONSTANTS.CHANGE_PASSWORD_PROFILE, changePasswordProfileSaga),
   ]);
}
