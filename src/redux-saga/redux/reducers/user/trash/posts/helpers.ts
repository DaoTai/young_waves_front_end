import { Post } from "../../../../../../utils/interfaces/Post";

export interface TrashPostsPayload {
   posts: Post[];
   page: number;
   maxPage: number;
}

export interface TrashPostsState {
   isLoading: boolean;
   trashPosts: Partial<Post[]>;
   maxPage: number;
   page: number;
}

export interface TrashPostsAction {
   type: string;
   payload: string & TrashPostsPayload;
}

export const init: TrashPostsState = {
   isLoading: false,
   trashPosts: [],
   maxPage: 0,
   page: 0,
};
