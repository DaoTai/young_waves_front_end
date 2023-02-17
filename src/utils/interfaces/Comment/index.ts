import { Profile } from "../Profile";
export interface Comment {
   _id: string;
   user: Partial<Profile>;
   post: string;
   body: string;
   createdAt: string;
   updatedAt: string;
}
