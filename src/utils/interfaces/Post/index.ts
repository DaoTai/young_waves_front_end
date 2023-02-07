import { Profile } from "../Profile";
export interface Post {
   _id: string;
   body: string;
   status?: string;
   createdAt?: string;
   updatedAt?: string;
   author: Partial<Profile>;
   likes: Array<string>;
   comments: Array<Comment>;
   attachment: Array<string>;
}
export interface Comment {
   _id: string;
   user: string;
   post: string;
   body: string;
   createdAt: string;
   updatedAt: string;
}
