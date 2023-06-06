import SendIcon from "@mui/icons-material/Send";
import { Box, Fab, Stack, Typography, useTheme } from "@mui/material";
import dateformat from "dateformat";
import { ChangeEvent, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import { ChatContext } from "../../../../../Contexts";
import * as api from "../../../../../apis";
import { CloseButton, ImageInput, Textarea } from "../../../../../components";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { URL_SERVER } from "../../../../../utils/constants";
import { Attachment } from "../../../../../utils/interfaces/Attachment";
import { FormatConversation, Message as IMessage } from "../../../../../utils/interfaces/Chat";
import { Body, Footer, WrapAttachments, WrapperChat } from "../styles";
import Message from "./Message";

const ChatFrame = ({ conversation }: { conversation: FormatConversation }) => {
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload?.user?._id;
   const theme = useTheme();
   const uniqueId = useId();
   const chatContext = useContext(ChatContext);
   // Refs
   const bodyRef = useRef<HTMLDivElement>(null);
   const socketRef = useRef<Socket>();
   const maxPageRef = useRef<number>(1);
   const currentPageRef = useRef<number>(1);
   // States
   const [messages, setMessages] = useState<IMessage[]>([]);
   const [message, setMessage] = useState<string>("");
   const [hasMore, setHasMore] = useState<boolean>(true);
   const [isLoading, setLoading] = useState<boolean>(false);
   const [attachments, setAttachments] = useState<Attachment[]>([]);
   const friendAvatar = conversation.friend?.avatar;
   // Work with socket
   useEffect(() => {
      socketRef.current = io(URL_SERVER);
      socketRef.current.emit("addChatUser", idAuth, conversation.idConversation);
      socketRef.current.on("getMessage", (dataGot: { idSender: string; text: string; attachments: any }) => {
         const newMessage: IMessage = {
            _id: uniqueId,
            sender: dataGot.idSender,
            text: dataGot.text,
            createdAt: dateformat(String(new Date())),
            attachments: dataGot.attachments,
         };
         setMessages((oldMsgs) => [newMessage, ...oldMsgs]);
         chatContext?.handleUpdateLastestMsg({
            idConversation: conversation.idConversation,
            text: dataGot.text,
            attachments: dataGot.attachments,
            sender: dataGot.idSender,
         });
      });
      return () => {
         socketRef.current?.disconnect();
      };
   }, []);

   // Call api to get messages
   useEffect(() => {
      bodyRef.current?.scrollIntoView({ behavior: "smooth" });
      conversation?.idConversation &&
         (async () => {
            try {
               const { data } = await api.conversation.getDetailConversation({
                  id: conversation?.idConversation as string,
               });
               setMessages(data.messages);
               maxPageRef.current = data.maxPage;
            } catch (err) {
               console.error(err);
            }
         })();
   }, [conversation]);

   // Get more messages
   const fetchMoreData = async () => {
      currentPageRef.current++;
      if (currentPageRef.current <= maxPageRef.current) {
         try {
            const { data } = await api.conversation.getDetailConversation({
               id: conversation?.idConversation as string,
               page: currentPageRef.current,
            });
            setMessages((prev) => [...prev, ...data.messages]);
         } catch (err) {
            console.error(err);
         }
      } else {
         setHasMore(false);
      }
   };

   // Input message
   const onInputMsg = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
   }, []);

   // Send message
   const handleSendMsg = useCallback(async () => {
      if (!isLoading && message.trim()) {
         setAttachments([]);
         setMessage("");
         const files = attachments.map((attach) => attach?.file);
         const payload = {
            idConversation: conversation?.idConversation as string,
            sender: idAuth,
            text: message.trim(),
         };
         // If exist attachments
         files && Object.assign(payload, { attachments: files });

         try {
            setLoading(true);
            const res = await api.message.createMessage(payload);
            if (res.statusText === "OK") {
               setLoading(false);
               setMessages((prev) => [res.data, ...prev]);
               socketRef.current?.emit("sendMessage", {
                  idSender: idAuth,
                  idReceiver: conversation.friend?._id,
                  idConversation: conversation.idConversation,
                  text: message.trim(),
                  attachments: res.data.attachments,
               });
               chatContext?.handleUpdateLastestMsg(payload);
            }
         } catch (err) {
            console.error(err);
         }
      }
   }, [message, attachments]);

   // Delete message
   const handleDeleteMsg = useCallback(async (idDeleteMsg: string) => {
      if (idDeleteMsg) {
         try {
            setLoading(true);
            const statusText = await api.message.deleteMessage(idDeleteMsg);
            if (statusText === "OK") {
               setMessages((prev) => {
                  return prev.filter((msg) => msg._id !== idDeleteMsg);
               });
            }
         } catch (err) {
            console.error(err);
         }
         setLoading(false);
      }
   }, []);

   // Get preview attachments
   const getAttachments = (files: File[], blobs: string[]) => {
      const newAttachments: Attachment[] = blobs.map((blob, index) => ({
         url: blob,
         file: files[index],
      }));
      setAttachments([...attachments, ...newAttachments]);
   };

   // Remove preview attachments
   const handleRemoveAttachments = (attachment: Attachment) => {
      const newAttachments = attachments.filter((attach) => attach.url !== attachment.url);
      setAttachments(newAttachments);
      URL.revokeObjectURL(attachment.url);
   };

   return (
      <WrapperChat>
         {/* Body */}
         <Body ref={bodyRef}>
            {messages.length === 0 ? (
               <Typography variant="body1" component="h6" textAlign="center" height="100%">
                  You don't have message. <br /> Let's chat together
               </Typography>
            ) : (
               <InfiniteScroll
                  style={{
                     display: "flex",
                     flexDirection: "column-reverse",
                  }}
                  inverse={true}
                  height={"100%"}
                  dataLength={messages.length}
                  hasMore={hasMore}
                  next={fetchMoreData}
                  loader={
                     <Typography variant="body2" textAlign="center">
                        Loading ...
                     </Typography>
                  }>
                  {messages.map((message) => {
                     return (
                        <Message
                           key={message._id}
                           message={message}
                           friendAvatar={friendAvatar as string}
                           onDelete={handleDeleteMsg}
                        />
                     );
                  })}
               </InfiniteScroll>
            )}
         </Body>
         {/* Footer */}
         {isLoading && (
            <Typography variant="subtitle1" color="secondary" component="span" textAlign="center" fontSize="small">
               Message is handling ...
            </Typography>
         )}

         <Footer>
            <ImageInput width={40} height={40} multiple onChange={getAttachments} />
            <Stack flex={2} borderRadius={2} p={1} pb={0} overflow="hidden">
               {attachments.length > 0 && (
                  <WrapAttachments>
                     {attachments.map((attach, index) => (
                        <Box key={attach.url + index} position="relative">
                           <img width="100%" height="100%" src={attach.url} />
                           <CloseButton size="small" onClick={() => handleRemoveAttachments(attach)} />
                        </Box>
                     ))}
                  </WrapAttachments>
               )}
               <Textarea
                  id="form-chat"
                  value={message}
                  placeholder={"Type a message for " + conversation?.friend?.fullName}
                  onChange={onInputMsg}
                  onEnter={handleSendMsg}
               />
            </Stack>
            <Fab size="small" id="send-btn" onClick={handleSendMsg}>
               <SendIcon sx={{ color: theme.palette.link.main }} />
            </Fab>
         </Footer>
      </WrapperChat>
   );
};

export default ChatFrame;
