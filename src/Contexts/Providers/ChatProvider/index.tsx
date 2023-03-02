import { createContext, useState, useCallback, ProviderProps } from "react";
import { ChatBox } from "../../../components";
import { ChatContext } from "../../index";
const ChatProvider = ({ children }) => {
   const [showChatBox, setShowChatBox] = useState<boolean>(false);
   const onCloseChatBox = () => {
      setShowChatBox(false);
   };

   const handleShowChatBox = () => {
      setShowChatBox(true);
   };
   const value = {
      showChatBox,
      handleShowChatBox,
   };
   return (
      <ChatContext.Provider value={value}>
         {children}
         <ChatBox visibility={showChatBox} onClose={onCloseChatBox} />
      </ChatContext.Provider>
   );
};

export default ChatProvider;
