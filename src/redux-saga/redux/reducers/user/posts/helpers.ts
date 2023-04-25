import { Post } from "../../../../../utils/interfaces/Post";

export interface PayLoadPosts {
   posts: Post[] | [];
   currentPage: number;
   maxPage: number;
}

export interface PostsState {
   isLoading: boolean;
   payload: PayLoadPosts;
}

export const init: PostsState = {
   isLoading: false,
   payload: {
      posts: [],
      currentPage: 1,
      maxPage: 1,
   },
};
export interface PostsAction {
   type: string;
   payload: PayLoadPosts &
      Post &
      string & { idPost: string; idLike: string } & { idPost: string; comment: string } & {
         idPost: string;
         idComment: string;
      };
}
