import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { ChatBox } from "../../../components";
import { FormatConversation } from "../../../utils/interfaces/Chat";
import { Profile } from "../../../utils/interfaces/Profile";
import { ChatContext } from "../../index";
const ChatProvider = ({ children }) => {
   const [showChatBox, setShowChatBox] = useState<boolean>(false);
   const [conversations, setConversations] = useState<Partial<FormatConversation>[]>([]);
   const onCloseChatBox = (idConversation: string) => {
      setConversations((prev) => {
         return prev.filter((conversation) => conversation.idConversation !== idConversation);
      });
   };

   const handleShowChatBox = (data: Partial<FormatConversation>) => {
      // setShowChatBox(true);
      setConversations((prev) => {
         const showedMessage = prev.some(
            (conversation) => conversation.idConversation === data.idConversation
         );
         return !showedMessage ? [...prev, data] : prev;
      });
   };

   const value = {
      showChatBox,
      handleShowChatBox,
   };

   return (
      <ChatContext.Provider value={value}>
         {children}
         <Stack
            flexDirection="row"
            justifyContent="flex-end"
            gap={2}
            maxHeight={460}
            position="fixed"
            left={3}
            right={3}
            bottom={0}>
            {conversations.map((conversation) => {
               return (
                  <ChatBox
                     key={conversation.idConversation}
                     // visibility={showChatBox}
                     conversation={conversation}
                     onClose={onCloseChatBox}
                  />
               );
            })}
         </Stack>
      </ChatContext.Provider>
   );
};

export default ChatProvider;
