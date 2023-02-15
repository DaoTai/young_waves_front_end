import { all, call, delay, put, takeEvery, takeLatest, take } from "redux-saga/effects";
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
function* signOutSaga() {
   try {
      const res = yield call(api.auth.logOutUser);
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
function* getProfileSaga(action: { type: string; payload: string }) {
   try {
      const res = yield call(api.user.getProfile, action.payload);
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

// Get owner posts
function* getOwnerPostsSaga(action: { type: string; id: string }) {
   try {
      const res = yield call(api.post.getOwnerPosts, action.id);
      yield put(ACTIONS.getOwnerPostsSuccess(res));
   } catch (err) {
      yield put(ACTIONS.getOwnerPostsFailure(err));
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
function* createPostSaga(action: { type: string; payload: Post }) {
   try {
      const res = yield call(api.post.createPost, action.payload);
      yield put(ACTIONS.createPostSuccess(res));
   } catch (err) {
      yield put(ACTIONS.createPostFailure(err));
   }
}

// Update post
function* updatePostSaga(action: {
   type: string;
   payload: { id: string; data: Partial<Post>; index: number };
}) {
   try {
      const { id, data } = action.payload;
      const { author, ...updateData } = data;
      yield call(api.post.updatePost, id, updateData);
      yield put(ACTIONS.updatePostSuccess(action.payload));
      yield put(ACTIONS.getPosts());
   } catch (err) {
      yield put(ACTIONS.updatePostFailure(err));
   }
}

// Delete post
function* deletePostSaga(action: { type: string; payload: string }) {
   try {
      yield call(api.post.deletePost, action.payload);
      yield put(ACTIONS.deletePostSuccess(action.payload));
   } catch (err) {
      yield put(ACTIONS.deletePostFailure(err));
   }
}

// Create comment
function* createCommentSaga(action: { type: string; payload: { id: string; comment: string } }) {
   try {
      const res = yield call(api.comment.createComment, action.payload);
      yield put(ACTIONS.createCommentSuccess(res));
   } catch (err) {
      yield put(ACTIONS.createCommentFailure(err));
   }
}

// Like
// function* createLikeSaga(action: { type: string; payload: string }) {
//    try {
//       const res = yield call(api.like.handleLike, action.payload);
//       yield put(ACTIONS.createLikeSuccess(res));
//       yield put(ACTIONS.getPosts());
//    } catch (err) {
//       yield put(ACTIONS.createCommentFailure(err));
//    }
// }

// Get all user
function* getAllUserSaga() {
   try {
      const res = yield call(api.user.getAllUser);
      yield put(ACTIONS.getAllUserSuccess(res));
   } catch (err) {
      yield put(ACTIONS.getAllUserFailure(err));
   }
}

// Get trash posts
function* getTrashPosts() {
   try {
      const res = yield call(api.post.getTrashPosts);
      yield put(ACTIONS.getTrashPostsSuccess(res.data));
   } catch (err) {
      yield ACTIONS.getTrashPostsFailure(err);
   }
}

// Get detail trash post
function* getDetailTrashPost(action: { type: string; payload: string }) {
   try {
      const res = yield call(api.post.getDetailTrashPost, action.payload);
      yield put(ACTIONS.getPostSuccess(res));
   } catch (err) {
      yield put(ACTIONS.getPostFailure(err));
   }
}

// Restore post
function* restorePost(action: { type: string; payload: string }) {
   try {
      yield call(api.post.restorePost, action.payload);
      yield put(ACTIONS.restorePostSuccess(action.payload));
   } catch (err) {
      yield put(ACTIONS.restorePostFailure(err));
   }
}

// Force delete
function* forceDeletePost(action: { type: string; payload: string }) {
   try {
      const res = yield call(api.post.forceDeletePost, action.payload);
      console.log(res);
      yield put(ACTIONS.forceDeletePostSuccess(action.payload));
   } catch (err) {
      yield put(ACTIONS.forceDeletePostFailure(err));
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
      takeLatest(CONSTANTS.GET_OWNER_POSTS, getOwnerPostsSaga),
      takeLatest(CONSTANTS.GET_POST, getPostSaga),
      takeLatest(CONSTANTS.CREATE_POST, createPostSaga),
      takeLatest(CONSTANTS.UPDATE_POST, updatePostSaga),
      takeLatest(CONSTANTS.DELETE_POST, deletePostSaga),
      takeLatest(CONSTANTS.CREATE_COMMENT, createCommentSaga),
      // takeLatest(CONSTANTS.CREATE_LIKE, createLikeSaga),
      takeLatest(CONSTANTS.GET_ALL_USER, getAllUserSaga),
      takeLatest(CONSTANTS.GET_TRASH_POSTS, getTrashPosts),
      takeLatest(CONSTANTS.GET_TRASH_POST, getDetailTrashPost),
      takeLatest(CONSTANTS.RESTORE_POST, restorePost),
      takeLatest(CONSTANTS.FORCE_DELETE_POST, forceDeletePost),
   ]);
}
