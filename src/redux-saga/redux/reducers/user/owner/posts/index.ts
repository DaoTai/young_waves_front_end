import { Post } from "../../../../../../utils/interfaces/Post";
import { OWNER_POSTS_ACTION, POSTS_ACTION } from "../../../../../../utils/enums";
interface PostsState {
   isLoading: boolean;
   payload: Post[] | [];
}

const init: PostsState = {
   isLoading: false,
   payload: [],
};

const ownerPostsReducer = (
   state = init,
   action: {
      type: string;
      payload: Post[] &
         Post &
         string & { idPost: string; idLike: string } & { idPost: string; comment: string } & {
            idPost: string;
            idComment: string;
         };
   }
): PostsState => {
   switch (action.type) {
      case OWNER_POSTS_ACTION.GET_OWNER_POSTS:
      case POSTS_ACTION.CREATE_POST:
      case POSTS_ACTION.UPDATE_POST:
      case POSTS_ACTION.DELETE_POST:
      case POSTS_ACTION.LIKE_POST:
      case POSTS_ACTION.UNLIKE_POST:
      case POSTS_ACTION.COMMENT_POST:
      case POSTS_ACTION.DELETE_COMMENT_POST:
         return {
            ...state,
            isLoading: true,
         };
      // Success
      case OWNER_POSTS_ACTION.GET_OWNER_POSTS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: action.payload,
         };
      case POSTS_ACTION.CREATE_POST_SUCCESS:
         return {
            ...state,
            isLoading: false,
            payload: [action.payload, ...state.payload],
         };
      case POSTS_ACTION.UPDATE_POST_SUCCESS:
         const updatedPost = action.payload as Partial<Post>;
         const updatedPosts = state.payload.map((post: Post) => {
            if (post._id === action.payload._id) {
               return {
                  ...post,
                  ...updatedPost,
               };
            }
            return post;
         });
         return {
            ...state,
            isLoading: false,
            payload: updatedPosts,
         };
      case POSTS_ACTION.DELETE_POST_SUCCESS:
         const idDeletedPost = action.payload as string;
         let newPosts = state.payload.filter((post: Post) => post._id !== idDeletedPost);
         return {
            ...state,
            isLoading: false,
            payload: newPosts,
         };
      case POSTS_ACTION.LIKE_POST_SUCCESS:
         const idLike = action.payload.idLike;
         const idLikedPost = action.payload.idPost;
         const newPostsAfterLike = state.payload.map((post: Post) => {
            if (post._id === idLikedPost) {
               post.likes.push(idLike);
            }
            return post;
         });
         return {
            ...state,
            isLoading: false,
            payload: newPostsAfterLike,
         };
      case POSTS_ACTION.UNLIKE_POST_SUCCESS:
         const idUnlike = action.payload.idLike;
         const idUnlikePost = action.payload.idPost;
         const newPostsAfterUnlike = state.payload.map((post: Post) => {
            if (post._id === idUnlikePost) {
               post.likes = post.likes.filter((like) => like !== idUnlike);
            }
            return post;
         });

         return {
            ...state,
            isLoading: false,
            payload: newPostsAfterUnlike,
         };
      case POSTS_ACTION.COMMENT_POST_SUCCESS:
         const idCommentedPost = action.payload.idPost;
         const newComment = action.payload.comment;
         const newPostsAfterComment = state.payload.map((post: Post) => {
            if (post._id === idCommentedPost) {
               post.comments.push(newComment);
            }
            return post;
         });
         return {
            ...state,
            isLoading: false,
            payload: newPostsAfterComment,
         };
      case POSTS_ACTION.DELETE_COMMENT_POST_SUCCESS:
         const idDeletedCommentPost = action.payload.idPost;
         const idDeletedComment = action.payload.idComment;
         const newPostsAfterDeletedComment = state.payload.map((post: Post) => {
            if (post._id === idDeletedCommentPost) {
               post.comments = post.comments.filter((comment) => comment !== idDeletedComment);
            }
            return post;
         });

         return {
            ...state,
            isLoading: false,
            payload: newPostsAfterDeletedComment,
         };

      // Failed
      case OWNER_POSTS_ACTION.GET_OWNER_POSTS_FAILURE:
      case OWNER_POSTS_ACTION.CREATE_OWNER_POST_FAILURE:
      case POSTS_ACTION.UPDATE_POST_FAILURE:
      case POSTS_ACTION.DELETE_POST_FAILURE:
      case POSTS_ACTION.LIKE_POST_FAILURE:
      case POSTS_ACTION.UNLIKE_POST_FAILURE:
         return {
            ...state,
            isLoading: false,
         };
      default:
         return {
            ...state,
            isLoading: false,
         };
   }
};

export default ownerPostsReducer;
