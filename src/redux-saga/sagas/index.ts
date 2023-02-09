import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis";
import * as CONSTANTS from "../../utils/constants";
import * as ACTIONS from "../redux/actions";
import { SignIn, SignUp } from "../../utils/interfaces/Auth";
import { Profile } from "../../utils/interfaces/Profile";
import { Post } from "../../utils/interfaces/Post";
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

// Sign-out
function* signOutSaga(action) {
   try {
      const res = yield call(api.auth.logOutUser);
      console.log(res);
      if (res.status === 200) {
         yield put(ACTIONS.signOutSuccess());
      } else {
         yield put(ACTIONS.signOutFailure(res));
      }
   } catch (err) {
      yield put(ACTIONS.signOutFailure(err as string));
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

// Update
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

// Change password
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

// Posts
function* getPostsSaga() {
   try {
      const res = yield call(api.post.getPosts);
      yield put(ACTIONS.getPostsSuccess(res));
   } catch (err) {
      yield put(ACTIONS.getPostsFailure(err));
   }
}
// Get detail post
function* getPostSaga(action: { type: string; payload: string }) {
   try {
      const res = yield call(api.post.getDetailPost, action.payload);
      yield put(ACTIONS.getPostSuccess(res));
   } catch (err) {
      yield put(ACTIONS.getPostFailure(err));
   }
}

// Create new post
function* createPost(action: { type: string; payload: string }) {
   try {
      const res = yield call(api.post.createPost, action.payload);
      yield put(ACTIONS.createPostSuccess(res));
   } catch (err) {
      yield put(ACTIONS.createPostFailure(err));
   }
}

// Create comment
function* createComment(action: { type: string; payload: { id: string; comment: string } }) {
   try {
      const res = yield call(api.comment.createComment, action.payload);
      yield put(ACTIONS.createCommentSuccess(res));
   } catch (err) {
      yield put(ACTIONS.createCommentFailure(err));
   }
}

// Combine saga
export default function* rootSaga() {
   yield all([
      takeLatest(CONSTANTS.SIGN_IN, signInSaga),
      takeLatest(CONSTANTS.SIGN_UP, signUpSaga),
      takeLatest(CONSTANTS.GET_PROFILE, getProfileSaga),
      takeLatest(CONSTANTS.SIGN_OUT, signOutSaga),
      takeLatest(CONSTANTS.UPDATE_PROFILE, updateProfileSaga),
      takeLatest(CONSTANTS.CHANGE_PASSWORD_PROFILE, changePasswordProfileSaga),
      takeLatest(CONSTANTS.GET_POSTS, getPostsSaga),
      takeLatest(CONSTANTS.GET_POST, getPostSaga),
      takeLatest(CONSTANTS.CREATE_POST, createPost),
      takeLatest(CONSTANTS.CREATE_COMMENT, createComment),
   ]);
}
