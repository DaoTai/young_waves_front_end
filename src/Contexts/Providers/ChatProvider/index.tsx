import { Stack } from "@mui/system";
import { useState } from "react";
import { ChatBox } from "../../../pages/user/Chat";
import { FormatConversation } from "../../../utils/interfaces/Chat";
import { ChatContext } from "../../index";
const ChatProvider = ({ children }) => {
   const [conversations, setConversations] = useState<Partial<FormatConversation>[]>([]);
   const onCloseChatBox = (idConversation: string) => {
      setConversations((prev) => {
         return prev.filter((conversation) => conversation.idConversation !== idConversation);
      });
   };

   const handleShowChatBox = (data: Partial<FormatConversation>) => {
      setConversations((prev) => {
         const showedMessage = prev.some(
            (conversation) => conversation.idConversation === data.idConversation
         );
         return showedMessage ? prev : [...prev, data];
      });
   };

   const value = {
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
