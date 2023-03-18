import { all, call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis";
import * as CONSTANTS from "../../utils/constants";
import { SignIn, SignUp } from "../../utils/interfaces/Auth";
import { Post } from "../../utils/interfaces/Post";
import { Profile } from "../../utils/interfaces/Profile";
import * as ACTIONS from "../redux/actions";
// Saga

// Sign-in
function* signInSaga(action: { type: string; payload: SignIn }) {
   try {
      const res = yield call(api.auth.signInUser, action.payload);

      if (res.status === 200) {
         yield put(ACTIONS.signInSuccess(res));
         const { password, ...localUser } = action.payload;
         // Remember username to login
         action.payload.isRemember
            ? localStorage.setItem("user", JSON.stringify(localUser))
            : localStorage.removeItem("user");
      } else {
         yield put(ACTIONS.signInFailure(res as string));
         yield put(
            ACTIONS.showAlert({
               title: "Sign in",
               message: res.message || "Server not working",
            })
         );
      }
   } catch (err) {
      yield put(ACTIONS.signInFailure(err as string));
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
      } else {
         yield put(ACTIONS.getProfileFailure("Get profile failed"));
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
         yield put(
            ACTIONS.showAlert({
               message: "Update successfully",
               title: "Profile",
               mode: "success",
            })
         );
      } else {
         yield put(
            ACTIONS.showAlert({
               message: "Update failed",
               title: "Profile",
               mode: "error",
            })
         );
         yield put(ACTIONS.updateProfileFailure(res.toString()));
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
         yield put(
            ACTIONS.showAlert({
               message: "Change password successfully",
               title: "Password",
               mode: "success",
            })
         );
      } else {
         yield put(
            ACTIONS.showAlert({
               message: "Change password failed",
               title: "Password",
               mode: "error",
            })
         );
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
      yield put(ACTIONS.getPostSuccess(res.data));
   } catch (err) {
      yield put(ACTIONS.getPostFailure(err));
   }
}

// Create new post
function* createPostSaga(action: { type: string; payload: Post }) {
   try {
      const res = yield call(api.post.createPost, action.payload);
      if (res.status === 200) {
         yield put(ACTIONS.createPostSuccess(res));
      } else {
         if (res.status === 413) {
            yield put(
               ACTIONS.showAlert({
                  title: "Create post",
                  message: "Data is invalid",
                  mode: "warning",
               })
            );
         } else {
            yield put(
               ACTIONS.showAlert({
                  title: "Create post",
                  message: "Create post failed",
                  mode: "error",
               })
            );
         }
         yield put(ACTIONS.createPostFailure("Create post failed"));
      }
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
      yield put(ACTIONS.createCommentSuccess(res.data));
   } catch (err) {
      yield put(ACTIONS.createCommentFailure(err));
   }
}

// Delete comment
function* deleteCommentSaga(action: {
   type: string;
   payload: { idPost: string; idComment: string };
}) {
   try {
      const res = yield call(api.comment.deleteComment, action.payload);
      if (res.status === 200) {
         yield put(ACTIONS.deleteCommentSuccess(action.payload));
         yield put(
            ACTIONS.showAlert({
               title: "Success",
               message: "Delete comment successfully!",
               mode: "success",
            })
         );
      } else {
         yield put(
            ACTIONS.showAlert({
               title: "Failure",
               message: "Delete comment failed!",
               mode: "error",
            })
         );
      }
   } catch (err) {
      yield put(ACTIONS.deleteCommentFailure(err));
   }
}

// Like
function* createLikeSaga(action: { type: string; payload: string }) {
   try {
      const res = yield call(api.post.likePost, action.payload);
      if (res.status === 201) {
         // Like post
         yield put(ACTIONS.createLikeSuccess(action.payload));
      }
      if (res.status === 204) {
         // Unlike post
         yield put(ACTIONS.unLikeSuccess(action.payload));
      }
      yield put(ACTIONS.getPosts());
   } catch (err) {
      yield put(ACTIONS.handleLikeFailure(err));
   }
}

// Get all user
function* getAllUserSaga(action: { type: string; payload: { page?: number; name?: string } }) {
   try {
      const res = yield call(api.user.getAllUser, action.payload);
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
      yield put(ACTIONS.getPostSuccess(res.data));
   } catch (err) {
      yield put(ACTIONS.getPostFailure(err));
   }
}

// Restore post
function* restorePost(action: { type: string; payload: string }) {
   try {
      yield call(api.post.restorePost, action.payload);
      yield put(ACTIONS.restorePostSuccess(action.payload));
      yield put(
         ACTIONS.showAlert({
            message: "Restore successfully",
            title: "Post",
            mode: "success",
         })
      );
   } catch (err) {
      yield put(ACTIONS.restorePostFailure(err));
   }
}

// Force delete
function* forceDeletePost(action: { type: string; payload: string }) {
   try {
      const res = yield call(api.post.forceDeletePost, action.payload);
      yield put(ACTIONS.forceDeletePostSuccess(action.payload));
      yield put(
         ACTIONS.showAlert({
            message: "Delete successfully",
            title: "Post",
            mode: "success",
         })
      );
   } catch (err) {
      yield put(ACTIONS.forceDeletePostFailure(err));
   }
}

// Combine saga
export default function* rootSaga() {
   yield all([
      takeLatest(CONSTANTS.SIGN_IN, signInSaga),
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
      takeLatest(CONSTANTS.DELETE_COMMENT, deleteCommentSaga),
      takeLatest(CONSTANTS.HANDLE_LIKE, createLikeSaga),
      takeLatest(CONSTANTS.GET_ALL_USER, getAllUserSaga),
      takeLatest(CONSTANTS.GET_TRASH_POSTS, getTrashPosts),
      takeLatest(CONSTANTS.GET_TRASH_POST, getDetailTrashPost),
      takeLatest(CONSTANTS.RESTORE_POST, restorePost),
      takeLatest(CONSTANTS.FORCE_DELETE_POST, forceDeletePost),
   ]);
}
