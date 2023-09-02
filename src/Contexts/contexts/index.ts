import { createContext } from "react";
import { ChatContext as IChatContext } from "../../utils/interfaces/Contexts";

export const ChatContext = createContext<IChatContext>({
  socket: undefined,
  updatedConversation: undefined,
  onlineIdUsers: [],
  handleShowChatBox: () => {},
  handleUpdateLastestMsg: () => {},
});
