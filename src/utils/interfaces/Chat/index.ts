import { Profile } from "../Profile";

export interface Conversation {
   members: Partial<Profile[]>;
   _id: string;
}

export interface FormatConversation {
   friend: Partial<Profile>;
   idConversation: string;
}