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
   attachments: Array<string>;
}
export interface Comment {
   _id: string;
   user: Partial<Profile>;
   post: string;
   body: string;
   createdAt: string;
   updatedAt: string;
}
