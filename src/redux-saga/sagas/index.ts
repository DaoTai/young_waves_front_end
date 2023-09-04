import { all, call, put, takeLatest } from "redux-saga/effects";
import * as api from "../../apis";
import {
  AUTH_ACTION,
  FRIEND_ACTION,
  OWNER_POSTS_ACTION,
  POSTS_ACTION,
  PROFILE_ACTION,
  TRASH_POSTS_ACTION,
} from "../../utils/enums";
import { SignIn } from "../../utils/interfaces/Auth";
import { CreatePost, UpdatePost } from "../../utils/interfaces/Post";
import { Profile, UpdateProfile } from "../../utils/interfaces/Profile";
import * as ACTIONS from "../redux/actions";
import { persistor } from "../redux/store";

// Sign-in
function* signInSaga(action: { type: string; payload: SignIn }) {
  try {
    const res = yield call(api.auth.signInUser, action.payload);
    yield put(ACTIONS.signInSuccess(res.data));
    const { password, ...user } = action.payload;
    // Remember username to login
    action.payload.isRemember
      ? localStorage.setItem("user", JSON.stringify(user))
      : localStorage.removeItem("user");
  } catch (err: any) {
    yield put(ACTIONS.signInFailure());
    throw new Error(err);
  }
}

// Sign-out
function* signOutSaga() {
  try {
    // Xoá persist
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    yield call(api.auth.logOutUser);
    yield put(ACTIONS.signOutSuccess());
  } catch (err) {
    yield put(ACTIONS.signOutFailure());
  }
}

// Profile
function* getProfileSaga(action: { type: string; payload: string }) {
  try {
    const res = yield call(api.user.getProfile, action.payload);
    yield put(ACTIONS.getProfileSuccess(res.data));
  } catch (err) {
    yield put(ACTIONS.getProfileFailure(err as string));
  }
}

// Update
function* updateProfileSaga(action: { type: string; payload: UpdateProfile }) {
  try {
    const res = yield call(api.user.updateProfile, action.payload);
    yield put(ACTIONS.updateProfileSuccess(res.data));
    yield put(
      ACTIONS.showAlert({
        message: "Update successfully",
        title: "Profile",
        mode: "success",
      })
    );
  } catch (err) {
    yield put(ACTIONS.updateProfileFailure(err as string));
    yield put(
      ACTIONS.showAlert({
        message: "Update failed",
        title: "Profile",
        mode: "error",
      })
    );
  }
}

// Change password
function* changePasswordProfileSaga(action: { type: string; payload: Profile }) {
  try {
    const res = yield call(api.user.changePasswordProfile, action.payload);
    if (res.status === 200) {
      yield put(ACTIONS.changePasswordProfileSuccess(res.data));
      yield put(
        ACTIONS.showAlert({
          message: "Changed successfully",
          title: "Password",
          mode: "success",
        })
      );
    } else {
      yield put(
        ACTIONS.showAlert({
          message: "Changed failed",
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

// Add friend
function* addFriend(action: { type: string; payload: string }) {
  try {
    const res = yield call(api.user.addFriend, action.payload);
    // If not existed conversation, will add new conversation
    if (!res.data.existedConversation) {
      yield call(api.conversation.addConversation, action.payload);
    }
    yield put(ACTIONS.addFriendSuccess(action.payload));
  } catch (err: any) {
    throw new Error(err);
  }
}

// Cancel friend
function* cancelFriend(action: { type: string; payload: string }) {
  try {
    const res = yield call(api.user.cancelFriend, action.payload);
    if (res.status === 200) {
      const canceledFriend = res.data as Profile;
      yield put(ACTIONS.cancelFriendSuccess(canceledFriend._id));
    } else {
      yield put(ACTIONS.cancelFriendFailure("Cancel failed"));
    }
  } catch (err: any) {
    throw new Error(err);
  }
}

// Posts
function* getPostsSaga(action: { type: string; payload: number }) {
  try {
    const res = yield call(api.post.getPosts, action.payload);
    if (res.status === 200) {
      yield put(ACTIONS.getPostsSuccess(res.data));
    } else {
      yield put(ACTIONS.getPostsFailure());
    }
  } catch (err: any) {
    throw new Error(err);
  }
}

// Get owner posts
function* getOwnerPostsSaga(action: { type: string; payload: { id: string; page?: number } }) {
  try {
    const res = yield call(api.post.getOwnerPosts, action.payload);
    yield put(ACTIONS.getOwnerPostsSuccess(res.data));
  } catch (err) {
    yield put(ACTIONS.getOwnerPostsFailure(err));
  }
}

// Create new post
function* createPostSaga(action: { type: string; payload: CreatePost }) {
  try {
    const res = yield call(api.post.createPost, action.payload);
    console.log("Res: ", res);
    yield put(ACTIONS.createPostSuccess(res.data));
  } catch (err: any) {
    yield put(ACTIONS.createPostFailure());
    yield put(
      ACTIONS.showAlert({
        title: "Create post",
        message: err,
        mode: "error",
      })
    );
  }
}

// Update post
function* updatePostSaga(action: { type: string; payload: UpdatePost }) {
  try {
    const res = yield call(api.post.updatePost, action.payload);
    yield put(ACTIONS.updatePostSuccess(res.data));
  } catch (err) {
    yield put(
      ACTIONS.showAlert({
        title: "Update post",
        message: "Update post failed",
        mode: "error",
      })
    );
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

// Delete comment
function* deleteCommentSaga(action: {
  type: string;
  payload: { idPost: string; idComment: string };
}) {
  try {
    const res = yield call(api.comment.deleteComment, action.payload);
    yield put(ACTIONS.deleteCommentSuccess(action.payload));
  } catch (err) {
    yield put(ACTIONS.deleteCommentFailure(err));
  }
}

// Like post
function* handleLikePost(action: { type: string; payload: string }) {
  try {
    const res = yield call(api.post.likePost, action.payload);
    yield put(ACTIONS.likePostSucess({ idPost: action.payload, idLike: res.data }));
  } catch (err) {
    yield put(ACTIONS.likePostFailure(err));
  }
}

// Unlike post
function* handleUnLikePost(action: { type: string; payload: { idPost: string; idLike: string } }) {
  try {
    const res = yield call(api.post.unlikePost, action.payload.idPost);
    yield put(ACTIONS.unLikePostSuccess(action.payload));
  } catch (err) {
    yield put(ACTIONS.unLikePostFailure(err));
  }
}

// Get trash posts
function* getTrashPosts(action: { type: string; payload: number }) {
  try {
    const res = yield call(api.post.getTrashPosts, action.payload);
    yield put(ACTIONS.getTrashPostsSuccess(res.data));
  } catch (err) {
    yield ACTIONS.getTrashPostsFailure(err);
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
        title: "Restore post",
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
    yield call(api.post.forceDeletePost, action.payload);
    yield put(ACTIONS.forceDeletePostSuccess(action.payload));
    yield put(
      ACTIONS.showAlert({
        message: "Delete successfully",
        title: "Delete post",
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
    takeLatest(AUTH_ACTION.SIGN_IN, signInSaga),
    takeLatest(AUTH_ACTION.SIGN_OUT, signOutSaga),
    takeLatest(PROFILE_ACTION.GET_PROFILE, getProfileSaga),
    takeLatest(PROFILE_ACTION.UPDATE_PROFILE, updateProfileSaga),
    takeLatest(PROFILE_ACTION.CHANGE_PASSWORD, changePasswordProfileSaga),
    takeLatest(POSTS_ACTION.GET_POSTS, getPostsSaga),
    takeLatest(FRIEND_ACTION.ADD_FRIEND, addFriend),
    takeLatest(FRIEND_ACTION.CANCEL_FRIEND, cancelFriend),
    takeLatest(OWNER_POSTS_ACTION.GET_OWNER_POSTS, getOwnerPostsSaga),
    takeLatest(POSTS_ACTION.CREATE_POST, createPostSaga),
    takeLatest(POSTS_ACTION.UPDATE_POST, updatePostSaga),
    takeLatest(POSTS_ACTION.DELETE_POST, deletePostSaga),
    takeLatest(POSTS_ACTION.DELETE_COMMENT_POST, deleteCommentSaga),
    takeLatest(POSTS_ACTION.LIKE_POST, handleLikePost),
    takeLatest(POSTS_ACTION.UNLIKE_POST, handleUnLikePost),
    takeLatest(TRASH_POSTS_ACTION.GET_TRASH_POSTS, getTrashPosts),
    takeLatest(TRASH_POSTS_ACTION.RESTORE_TRASH_POST, restorePost),
    takeLatest(TRASH_POSTS_ACTION.FORCE_DELETE_TRASH_POST, forceDeletePost),
  ]);
}
