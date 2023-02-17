import * as CONSTANTS from "../../../../utils/constants";
import { Like } from "../../../../utils/interfaces/Like";
import { Post } from "../../../../utils/interfaces/Post";
import { Comment } from "../../../../utils/interfaces/Comment";
interface Payload {
   data: Array<Post>;
   status: number;
}
interface MyAction {
   type: string;
   payload: any | Payload;
}

const postsReducer = (state = CONSTANTS.INIT_STATE.posts, action: MyAction) => {
   switch (action.type) {
      case CONSTANTS.GET_POSTS:
      case CONSTANTS.CREATE_POST:
      case CONSTANTS.DELETE_POST:
         return {
            ...state,
            isLoading: true,
         };
      case CONSTANTS.GET_POSTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            action: action.type,
         };
      case CONSTANTS.CREATE_POST_SUCCESS:
         const prevState = state.payload.data;
         const data = [action.payload.data, ...prevState];
         return {
            isLoading: false,
            payload: { ...state.payload, data: data },
            action: action.type,
         };
      case CONSTANTS.DELETE_POST_SUCCESS:
         const deletedId = action.payload;
         const newPostsAfterDeleted = state.payload.data.filter((post: Post) => {
            return post._id !== deletedId;
         });
         return {
            isLoading: false,
            payload: { ...state.payload, data: newPostsAfterDeleted },
            action: action.type,
         };
      case CONSTANTS.CREATE_LIKE_SUCCESS:
         const newLike = action.payload as Like;
         const likedPosts = state.payload.data?.map((post: Post) => {
            // Find post contains like in it's list like
            if (post._id === newLike.post) {
               // Add like in list like
               post.likes.unshift(newLike);
            }
            return post;
         });
         return {
            isLoading: false,
            payload: { ...state.payload, data: likedPosts },
            action: action.type,
         };
      case CONSTANTS.UNLIKE_SUCCESS:
         const unLike = action.payload as Like;
         const unLikeNewPosts = state.payload.data?.map((post: Post) => {
            // Find post contains like in it's list like
            if (post._id === unLike.post) {
               // Remove like in list like
               post.likes = post.likes.filter((like) => like._id !== unLike._id);
            }
            return post;
         });
         return {
            isLoading: false,
            payload: { ...state.payload, data: unLikeNewPosts },
            action: action.type,
         };
      case CONSTANTS.CREATE_COMMENT_SUCCESS:
         const newComment = action.payload as Comment;
         const addedCommentPosts = state.payload.data?.map((post: Post) => {
            // Find post contains comment in it's list comment
            if (post._id === newComment.post) {
               // Add comment in list comment
               post.comments.push(newComment._id);
            }
            return post;
         });
         return {
            ...state,
            isLoading: false,
            payload: { ...state.payload, data: addedCommentPosts },
         };
      case CONSTANTS.GET_POSTS_FAILURE:
      case CONSTANTS.CREATE_POST_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload,
            action: action.type,
         };
      default:
         return state;
   }
};

export default postsReducer;
