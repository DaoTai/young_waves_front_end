import { Like } from "../Like";
import { Profile } from "../Profile";
import { Comment } from "../Comment";
export interface Post {
   _id: string;
   body: string;
   author: Partial<Profile>;
   likes: Array<string>;
   comments: Array<string>;
   attachments: string[];
   status?: string;
   createdAt?: string;
   updatedAt?: string;
   deletedAt?: string;
}

export interface CreatePost {
   body: string;
   status?: string;
   attachments?: File[];
}

export interface UpdatePost {
   _id: string;
   body: string;
   status?: string;
   deletedAttachments?: string[];
   newAttachments?: File[];
}

export interface DetailPost {
   comments: { data: Comment[]; currentPage: number; maxPage: number };
   post: Post;
}
