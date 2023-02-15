import { Like } from "../Like";
import { Profile } from "../Profile";
export interface Post {
   _id: string;
   body: string;
   status?: string;
   createdAt?: string;
   updatedAt?: string;
   deletedAt?: string;
   author: Partial<Profile>;
   likes: Array<Like>;
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
