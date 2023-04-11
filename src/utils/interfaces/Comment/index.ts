import { Profile } from "../Profile";
export interface Comment {
   _id: string;
   isAdmin: boolean;
   user: Partial<Profile>;
   post: string;
   body: string;
   createdAt: string;
   updatedAt: string;
}
