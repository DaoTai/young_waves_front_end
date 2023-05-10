import { FormatConversation } from "../../interfaces/Chat";
export interface ChatContext {
   handleShowChatBox: (data: FormatConversation) => void;
}
