import { State } from "../reducers";
export const alertState$ = (state: State) => state.alert;
export const authState$ = (state: State) => state.auth;
export const postsState$ = (state: State) => state.posts;
export const trashPostsState$ = (state: State) => state.trashPosts;
export const ownerPostsState$ = (state: State) => state.ownerPosts;
