import { Post } from "../../../../../utils/interfaces/Post";

export interface PostsState {
   isLoading: boolean;
   payload: Post[] | [];
}

export const init: PostsState = {
   isLoading: false,
   payload: [],
};

export interface PostsAction {
   type: string;
   payload: Post[] &
      Post &
      string & { idPost: string; idLike: string } & { idPost: string; comment: string } & {
         idPost: string;
         idComment: string;
      };
}
