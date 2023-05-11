import SendIcon from "@mui/icons-material/Send";
import { Avatar, Stack, TextareaAutosize, Tooltip, Typography } from "@mui/material";
import dateformat from "dateformat";
import { KeyboardEvent, useCallback, useEffect, useId, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import * as api from "../../../../../apis";
import { authState$ } from "../../../../../redux-saga/redux/selectors";
import { FormatConversation, Message as IMessage } from "../../../../../utils/interfaces/Chat";
import { OverlayFullImage } from "../../../../../components";
import { Body, Footer, WrapperChat } from "../styles";
import Message from "./Message";
const host = "http://localhost:8001";

const ChatFrame = ({ conversation }: { conversation: FormatConversation }) => {
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload?.user?._id;
   const idMsg = useId();
   const bodyRef = useRef<HTMLDivElement>(null);
   const textareaRef = useRef<HTMLTextAreaElement>(null);
   const socketRef = useRef<Socket>();
   const maxPageRef = useRef<number>(1);
   const currentPageRef = useRef<number>(1);
   const [messages, setMessages] = useState<IMessage[]>([]);
   const [message, setMessage] = useState<string>("");
   const [hasMore, setHasMore] = useState<boolean>(true);
   const friendAvatar = conversation.friend?.avatar;
   // Work with socket
   useEffect(() => {
      socketRef.current = io(host);
      socketRef.current.emit("addUser", idAuth, conversation.idConversation);
      socketRef.current.on("getMessage", (dataGot: { idSender: string; text: string }) => {
         const newMessage: IMessage = {
            _id: idMsg,
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
               attachments: [
                  {
                     url: "https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/10/2/959628/Vong_Co_3.jpg",
                  },
               ],
            });
            res.status === 200 && setMessages((prev) => [res.data, ...prev]);
         } catch (err) {
            console.error(err);
         }
         setMessage("");
      }
   };

   // Short hand type message
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

   const handleDeleteMsg = useCallback(async (idDeleteMsg: string) => {
      if (idDeleteMsg) {
         try {
            await api.message.deleteMessage(idDeleteMsg);
            setMessages((prev) => {
               return prev.filter((msg) => msg._id !== idDeleteMsg);
            });
         } catch (err) {
            console.error(err);
         }
      }
   }, []);

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
                        <Message
                           key={index}
                           message={message}
                           friendAvatar={friendAvatar as string}
                           onDelete={handleDeleteMsg}
                        />
                        // <Stack
                        //    key={index}
                        //    className="wrap-message"
                        //    justifyContent={idAuth === message.sender ? "flex-end" : "flex-start"}>
                        //    {/* Avatar friend */}
                        //    {idAuth !== message.sender && (
                        //       <Avatar src={friendAvatar} className="avatar" />
                        //    )}
                        //    <Tooltip
                        //       arrow
                        //       title={dateformat(message.createdAt, "h:MM TT, dd mmmm yyyy ")}
                        //       placement={idAuth === message.sender ? "left" : "right"}>
                        //       <Stack className="wrap-content" flexDirection="column">
                        //          <Typography
                        //             variant="body1"
                        //             component={message.content.slice(0, 4) === "http" ? "a" : "p"}
                        //             href={message.content}
                        //             target="_blank"
                        //             className={
                        //                idAuth === message.sender
                        //                   ? "message"
                        //                   : "message message--friend"
                        //             }>
                        //             {message.content}
                        //          </Typography>
                        //          {message!.attachments!.length > 0 && (
                        //             <Stack gap={1} mt={1}>
                        //                {message?.attachments?.map((attachment) => (
                        //                   <img
                        //                      key={attachment._id}
                        //                      src={attachment.url}
                        //                      alt="attachment"
                        //                   />
                        //                ))}
                        //             </Stack>
                        //          )}
                        //       </Stack>
                        //    </Tooltip>
                        // </Stack>
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
