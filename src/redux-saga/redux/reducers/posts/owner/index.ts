import {
   INIT_STATE,
   GET_OWNER_POSTS,
   GET_OWNER_POSTS_SUCCESS,
   GET_OWNER_POSTS_FAILURE,
   CREATE_POST_SUCCESS,
   UPDATE_POST_SUCCESS,
   DELETE_POST_SUCCESS,
   CREATE_LIKE_SUCCESS,
   UNLIKE_SUCCESS,
   CREATE_COMMENT_SUCCESS,
} from "../../../../../utils/constants";
import { Like } from "../../../../../utils/interfaces/Like";
import { Post, Comment } from "../../../../../utils/interfaces/Post";

interface Payload {
   data: Array<Post>;
   status: number;
}
interface MyAction {
   type: string;
   payload: Payload & any;
}

const ownerPostsReducer = (state = INIT_STATE.posts, action: MyAction) => {
   switch (action.type) {
      case GET_OWNER_POSTS:
         return {
            ...state,
            isLoading: true,
         };
      case GET_OWNER_POSTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
            action: action.type,
         };
      case CREATE_POST_SUCCESS:
         const prevState = state.payload.data;
         const data = [action.payload.data, ...prevState];
         return {
            isLoading: false,
            payload: { ...state.payload, data: data },
            action: action.type,
         };
      case UPDATE_POST_SUCCESS:
         const currentState = [...state.payload.data] as Array<Post>;
         const value = action.payload.data as any;
         currentState.splice(action.payload.index, 1, value);
         return {
            ...state,
            isLoading: false,
         };
      case DELETE_POST_SUCCESS:
         const filterData = [...state.payload.data].filter(
            (post: Post) => post._id !== action.payload
         );
         return { ...state, payload: { ...state.payload, data: filterData }, action: action.type };
      case CREATE_LIKE_SUCCESS:
         let idPost = action.payload;
         const likedPosts = state.payload.data.map((post: Post) => {
            if (post._id === idPost) {
               const idLike = Math.random() * 100;
               post.likes.push(String(idLike));
               return post;
            }
            return post;
         });

         return {
            isLoading: false,
            payload: { ...state.payload, likedPosts },
            action: action.type,
         };
      case UNLIKE_SUCCESS:
         let idPostUnlike = action.payload;
         const unlikedPosts = state.payload.data.map((post: Post) => {
            if (post._id === idPostUnlike) {
               post.likes.pop();
               return post;
            }
            return post;
         });
         return {
            isLoading: false,
            payload: { ...state.payload, data: unlikedPosts },
            action: action.type,
         };
      case CREATE_COMMENT_SUCCESS:
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
      case GET_OWNER_POSTS_FAILURE:
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

export default ownerPostsReducer;
