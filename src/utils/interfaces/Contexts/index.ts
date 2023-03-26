import { FormatConversation } from "../../../pages/user/Chat/Conversations";
export interface ChatContext {
   showChatBox: boolean;
   handleShowChatBox: (data: Partial<FormatConversation>) => void;
}
