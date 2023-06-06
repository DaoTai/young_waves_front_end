import { createContext } from "react";
import { ChatContext as IChatContext } from "../utils/interfaces/Contexts";
export const ChatContext = createContext<IChatContext>({
   updatedConversation: undefined,
   onlineFriendIds: [],
   handleShowChatBox: () => {},
   handleUpdateLastestMsg: () => {},
});
