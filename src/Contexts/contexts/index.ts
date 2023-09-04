import { createContext } from "react";
import { IChatContext, IVideoCallChatContext } from "../../utils/interfaces/Contexts";

export const ChatContext = createContext<IChatContext>({
  socket: undefined,
  updatedConversation: undefined,
  onlineIdUsers: [],
  handleShowChatBox: () => {},
  handleUpdateLastestMsg: () => {},
});

export const VideoCallContext = createContext<Partial<IVideoCallChatContext>>({});
