import { Profile } from "../Profile";

export interface Conversation {
   members: Partial<Profile[]>;
   _id: string;
   updatedAt: string;
   createdAt: string;
}

export interface FormatConversation {
   friend: Partial<Profile>;
   idConversation: string;
}

export interface Message {
   idConversation?: string;
   createdAt: string;
   updatedAt?: string;
   sender: string;
   text: string;
}
