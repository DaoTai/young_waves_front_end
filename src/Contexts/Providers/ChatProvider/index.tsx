import { useState, useEffect } from "react";
import { ChatBox } from "../../../components";
import { ChatContext } from "../../index";
const ChatProvider = ({ children }) => {
   const [showChatBox, setShowChatBox] = useState<boolean>(false);
   const [idConversation, setIdConversation] = useState<string>("");
   const onCloseChatBox = () => {
      setShowChatBox(false);
   };

   const handleShowChatBox = (id: string) => {
      setShowChatBox(true);
      id && setIdConversation(id);
   };

   const value = {
      showChatBox,
      handleShowChatBox,
   };

   return (
      <ChatContext.Provider value={value}>
         {children}
         <ChatBox
            visibility={showChatBox}
            idConversation={idConversation}
            onClose={onCloseChatBox}
         />
      </ChatContext.Provider>
   );
};

export default ChatProvider;
