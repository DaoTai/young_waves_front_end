import { Post } from "../../../../utils/interfaces/Post";
import { POSTS_ACTION } from "../../../../utils/enums";
import { init, PostsAction, PostsState } from "./helpers";
const postsReducer = (state = init, action: PostsAction): PostsState => {
   switch (action.type) {
      case POSTS_ACTION.CLEAR_POSTS:
         return {
            ...init,
            isLoading: false,
         };
      case POSTS_ACTION.GET_POSTS:
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
      case POSTS_ACTION.GET_POSTS_SUCCESS:
         const { currentPage, maxPage, posts } = action.payload;
         return {
            ...state,
            isLoading: false,
            payload: {
               currentPage: currentPage,
               maxPage: maxPage,
               posts: currentPage === 1 ? posts : [...state.payload.posts, ...posts],
            },
         };
      case POSTS_ACTION.CREATE_POST_SUCCESS:
         const newPostsAfterCreated = state.payload.posts.filter((post) => {
            return post._id !== action.payload._id;
         });
         return {
            ...state,
            isLoading: false,
            payload: {
               ...state.payload,
               posts: [action.payload, ...newPostsAfterCreated],
            },
         };
      case POSTS_ACTION.UPDATE_POST_SUCCESS:
         const updatedPost = action.payload as Partial<Post>;
         const updatedPosts = state.payload.posts.map((post: Post) => {
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
            payload: {
               ...state.payload,
               posts: updatedPosts,
            },
         };
      case POSTS_ACTION.DELETE_POST_SUCCESS:
         const idDeletedPost = action.payload as string;
         let newPosts = state.payload.posts.filter((post: Post) => post._id !== idDeletedPost);
         return {
            ...state,
            isLoading: false,
            payload: {
               ...state.payload,
               posts: newPosts,
            },
         };
      case POSTS_ACTION.LIKE_POST_SUCCESS:
         const idLike = action.payload.idLike;
         const idLikedPost = action.payload.idPost;
         const newPostsAfterLike = state.payload.posts.map((post: Post) => {
            if (post._id === idLikedPost && !post.likes.includes(idLike)) {
               post.likes.push(idLike);
            }
            return post;
         });
         return {
            ...state,
            isLoading: false,
            payload: {
               ...state.payload,
               posts: newPostsAfterLike,
            },
         };
      case POSTS_ACTION.UNLIKE_POST_SUCCESS:
         const idUnlike = action.payload.idLike;
         const idUnlikePost = action.payload.idPost;
         const newPostsAfterUnlike = state.payload.posts.map((post: Post) => {
            if (post._id === idUnlikePost) {
               post.likes = post.likes.filter((like) => like !== idUnlike);
            }
            return post;
         });

         return {
            ...state,
            isLoading: false,
            payload: {
               ...state.payload,
               posts: newPostsAfterUnlike,
            },
         };
      case POSTS_ACTION.COMMENT_POST_SUCCESS:
         const idCommentedPost = action.payload.idPost;
         const newComment = action.payload.comment;
         const newPostsAfterComment = state.payload.posts.map((post: Post) => {
            if (post._id === idCommentedPost) {
               post.comments.push(newComment);
               // Chưa tìm ra nguyên nhân lại push 2 lần newComment nên
               // dùng cách cùn này
               post.comments = [...new Set(post.comments)];
            }
            return post;
         });

         return {
            ...state,
            isLoading: false,
            payload: {
               ...state.payload,
               posts: newPostsAfterComment,
            },
         };

      case POSTS_ACTION.DELETE_COMMENT_POST_SUCCESS:
         const idDeletedCommentPost = action.payload.idPost;
         const idDeletedComment = action.payload.idComment;
         const newPostsAfterDeletedComment = state.payload.posts.map((post: Post) => {
            if (post._id === idDeletedCommentPost) {
               post.comments = post.comments.filter((comment) => comment !== idDeletedComment);
            }
            return post;
         });

         return {
            ...state,
            isLoading: false,
            payload: {
               ...state.payload,
               posts: newPostsAfterDeletedComment,
            },
         };
      // Failed
      case POSTS_ACTION.GET_POSTS_FAILURE:
      case POSTS_ACTION.CREATE_POST_FAILURE:
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

export default postsReducer;
