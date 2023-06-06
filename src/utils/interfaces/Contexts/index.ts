import { FormatConversation, SendMessage } from "../../interfaces/Chat";
export interface ChatContext {
   updatedConversation: SendMessage | undefined;
   onlineFriendIds: string[];
   handleShowChatBox: (data: FormatConversation) => void;
   handleUpdateLastestMsg: (data: SendMessage) => void;
}
