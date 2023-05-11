import { Profile } from "../Profile";
import { TYPE_ATTACHMENT } from "../../types";
export interface Conversation {
   members: Partial<Profile[]>;
   _id: string;
   lastestMessage: Message;
   updatedAt: string;
   createdAt: string;
}

export interface Attachment {
   _id?: string;
   type?: TYPE_ATTACHMENT;
   url: string;
}

export interface Message {
   _id: string;
   idConversation?: string;
   createdAt: string;
   updatedAt?: string;
   sender: string;
   content: string;
   attachments?: Attachment[];
}
export interface ResponseConversation {
   conversations: Conversation[];
   currentPage: number;
   maxPage: number;
}

export interface FormatConversation {
   friend: Partial<Profile>;
   idConversation: string;
   lastestMessage: Message;
}

export interface ChatBoxWrapperProps {
   conversation: FormatConversation;
   visibility?: boolean;
   onClose?: (idConversation: string) => void;
}

export interface ChatBoxProps {
   conversation: FormatConversation;
}
