import { Stack } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { ChatBox } from "../../../pages/user/Chat";
import { FormatConversation, SendMessage } from "../../../utils/interfaces/Chat";
import { ChatContext } from "../../index";
import { URL_SERVER } from "../../../utils/constants";
import { Socket, io } from "socket.io-client";
import { useSelector } from "react-redux";
import { authState$ } from "../../../redux-saga/redux/selectors";
const ChatProvider = ({ children }) => {
   const {
      payload: { user },
   } = useSelector(authState$);
   const [conversations, setConversations] = useState<FormatConversation[]>([]);
   const [updatedConversation, setUpdatedConversation] = useState<SendMessage>();
   const [onlineFriendIds, setOnlineFriendIds] = useState<string[]>([]);
   const socketRef = useRef<Socket>();

   // Working with socket
   useEffect(() => {
      socketRef.current = io(URL_SERVER);
      socketRef.current.emit("addOnlineUser", user._id, user.friends);
      socketRef.current.on("getOnlineFriends", (idOnlineFriends: string[]) => {
         setOnlineFriendIds(idOnlineFriends);
      });

      //Nếu friend unount quá nhanh thì socket có thể sẽ chưa gửi kịp
      socketRef.current.on("removeOnlineUser", (onlineIds: string[]) => {
         setOnlineFriendIds(onlineIds);
      });
      return () => {
         socketRef.current?.disconnect();
      };
   }, []);

   const onCloseChatBox = (idConversation: string) => {
      setConversations((prev) => {
         return prev.filter((conversation) => conversation.idConversation !== idConversation);
      });
   };

   const handleShowChatBox = (data: FormatConversation) => {
      setConversations((prev: FormatConversation[]) => {
         const showedMessage = prev.some((conversation) => conversation.idConversation === data.idConversation);
         return showedMessage ? prev : [...prev, data];
      });
   };

   const handleUpdateLastestMsg = (data: SendMessage) => {
      setUpdatedConversation(data);
   };

   const value = {
      updatedConversation,
      onlineFriendIds,
      handleUpdateLastestMsg,
      handleShowChatBox,
   };

   return (
      <ChatContext.Provider value={value}>
         {children}
         <Stack
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="flex-end"
            flexWrap="wrap"
            gap={1}
            maxHeight={460}
            position="fixed"
            right={5}
            bottom={0}
            overflow="hidden">
            {conversations.map((conversation) => {
               return <ChatBox key={conversation.idConversation} conversation={conversation} onClose={onCloseChatBox} />;
            })}
         </Stack>
      </ChatContext.Provider>
   );
};

export default ChatProvider;
