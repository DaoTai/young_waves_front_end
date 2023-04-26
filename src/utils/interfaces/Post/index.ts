import { Like } from "../Like";
import { Profile } from "../Profile";
import { Comment } from "../Comment";
export interface Post {
   _id: string;
   body: string;
   status?: string;
   createdAt?: string;
   updatedAt?: string;
   deletedAt?: string;
   author: Partial<Profile>;
   likes: Array<string>;
   comments: Array<string>;
   attachments: Array<string>;
}
export interface DetailPost {
   comments: { data: Comment[]; currentPage: number; maxPage: number };
   post: Post;
}
