import { FormatConversation } from "../../interfaces/Chat";
export interface ChatContext {
   handleShowChatBox: (data: Partial<FormatConversation>) => void;
}
