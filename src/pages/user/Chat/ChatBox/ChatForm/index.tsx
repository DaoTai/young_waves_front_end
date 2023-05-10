import SendIcon from "@mui/icons-material/Send";
import { Avatar, Stack, TextareaAutosize, Tooltip, Typography } from "@mui/material";
import dateformat from "dateformat";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import * as api from "../../../../../apis";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { FormatConversation, Message } from "../../../../../utils/interfaces/Chat";
import { Body, Footer, WrapperChat } from "../styles";
const host = "http://localhost:8001";
interface Props {
   conversation: FormatConversation;
   height?: number;
}
const ChatFrame = ({ conversation }: { conversation: FormatConversation }) => {
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload?.user?._id;
   const bodyRef = useRef<HTMLDivElement>(null);
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const socketRef = useRef<Socket>();
   const maxPageRef = useRef<number>(1);
   const currentPageRef = useRef<number>(1);
   const [messages, setMessages] = useState<Message[]>([]);
   const [message, setMessage] = useState<string>("");
   const [hasMore, setHasMore] = useState<boolean>(true);
   const friendAvatar = conversation.friend?.avatar;
   // Work with socket
   useEffect(() => {
      socketRef.current = io(host);
      socketRef.current.emit("addUser", idAuth, conversation.idConversation);
      socketRef.current.on("getMessage", (dataGot: { idSender: string; text: string }) => {
         const newMessage: Message = {
            sender: dataGot.idSender,
            content: dataGot.text,
            createdAt: dateformat(String(new Date())),
         };
         setMessages((oldMsgs) => [newMessage, ...oldMsgs]);
      });
      return () => {
         socketRef.current?.disconnect();
      };
   }, []);

   // Call api to get messages
   useEffect(() => {
      bodyRef.current?.scrollIntoView({ behavior: "smooth" });
      textareaRef?.current?.focus();
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

   // Send message
   const handleSendMsg = async () => {
      if (message.trim()) {
         socketRef.current?.emit("sendMessage", {
            idSender: idAuth,
            idReceiver: conversation.friend?._id,
            idConversation: conversation.idConversation,
            content: message.trim(),
         });
         try {
            const res = await api.message.createMessage({
               idConversation: conversation?.idConversation as string,
               sender: idAuth,
               content: message.trim(),
            });
            res.status === 200 && setMessages((prev) => [res.data, ...prev]);
         } catch (err) {
            console.error(err);
         }
         setMessage("");
      }
   };

   //
   const handleShortHandSendMsg = (e: KeyboardEvent) => {
      if (e.shiftKey && e.keyCode === 13) {
         e.preventDefault(); // Ngăn chặn xuống dòng tự động

         const cursorPosition = textareaRef?.current?.selectionStart as number; // Đọc vị trí con trỏ hiện tại
         textareaRef!.current!.value =
            textareaRef?.current?.value.substring(0, cursorPosition) +
            "\n" +
            textareaRef?.current?.value.substring(cursorPosition); // Thêm dòng mới vào vị trí con trỏ
         textareaRef?.current?.setSelectionRange(cursorPosition + 1, cursorPosition + 1); // Đặt lại vị trí con trỏ
         return;
      }
      if (e.key === "Enter") {
         handleSendMsg();
      }
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
                  {messages.map((message, index) => {
                     return (
                        <Stack
                           key={index}
                           flexDirection="row"
                           justifyContent={idAuth === message.sender ? "flex-end" : "flex-start"}
                           alignItems="center"
                           gap={1}
                           p={0.5}
                           pb={1}>
                           {idAuth !== message.sender && (
                              <Avatar
                                 src={friendAvatar}
                                 sx={{
                                    width: 35,
                                    height: 35,
                                 }}
                              />
                           )}
                           <Tooltip
                              arrow
                              title={dateformat(message.createdAt, "h:MM TT, dd mmmm yyyy ")}
                              placement={idAuth === message.sender ? "left" : "right"}>
                              <Typography
                                 variant="body1"
                                 component={message.content.slice(0, 4) === "http" ? "a" : "p"}
                                 href={message.content}
                                 target="_blank"
                                 className={
                                    idAuth === message.sender
                                       ? "message"
                                       : "message message--friend"
                                 }>
                                 {message.content}
                              </Typography>
                           </Tooltip>
                        </Stack>
                     );
                  })}
               </InfiniteScroll>
            )}
         </Body>
         {/* Footer */}
         <Footer>
            <TextareaAutosize
               id="form-chat"
               ref={textareaRef}
               value={message}
               autoFocus
               placeholder={"Type a message for " + conversation?.friend.fullName + "..."}
               onChange={(e) => setMessage(e.target.value)}
               onKeyDown={handleShortHandSendMsg}
            />
            <SendIcon id="send-icon" fontSize="large" onClick={handleSendMsg} />
         </Footer>
      </WrapperChat>
   );
};

export default ChatFrame;
