import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, ListItem, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import dateformat from "dateformat";
import { memo, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import * as api from "../../../../apis";
import { BaseInput } from "../../../../components";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import { Profile } from "../../../../utils/interfaces/Profile";
import { Body, Floating, Footer, Heading, MyChatBox } from "./styles";
import { Message } from "../../../../utils/interfaces/Chat";
interface MyChatBoxProps {
   conversation: Partial<{ idConversation: string; friend: Partial<Profile> }>;
   visibility?: boolean;
   onClose?: (idConversation: string) => void;
}

const host = "http://localhost:8001";
const ChatBox = ({ conversation, onClose = () => {} }: MyChatBoxProps) => {
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload?.user?._id;
   const bodyRef = useRef<HTMLDivElement>(null);
   const messageRef = useRef<HTMLDivElement>();
   const socketRef = useRef<Socket>();
   const ScrollRef = useRef<any>(null);
   const maxPageRef = useRef<number>(1);
   const currentPageRef = useRef<number>(1);
   const [hide, setHide] = useState<boolean>(false);
   const [messages, setMessages] = useState<Message[]>([]);
   const [message, setMessage] = useState<string>("");
   const [page, setPage] = useState<number>(1);
   const [hasMore, setHasMore] = useState<boolean>(true);
   // Work with socket
   useEffect(() => {
      socketRef.current = io(host);
      socketRef.current.emit("addUser", idAuth, conversation.idConversation);
      socketRef.current.on("getMessage", (dataGot: { idSender: string; text: string }) => {
         const newMessage: Message = {
            sender: dataGot.idSender,
            text: dataGot.text,
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
      bodyRef!.current!.scrollTop = bodyRef!.current!.scrollHeight;
      conversation?.idConversation &&
         (async () => {
            try {
               const res = await api.conversation.getDetailConversation({
                  id: conversation?.idConversation as string,
               });
               setMessages(res.data.messages);

               maxPageRef.current = res.data?.maxPage;
            } catch (err) {
               console.error(err);
            }
         })();
   }, [conversation]);

   // Scroll to bottom when send message

   const toggleHide = () => setHide(!hide);

   const fetchMoreData = async () => {
      currentPageRef.current++;
      if (currentPageRef.current <= maxPageRef.current) {
         try {
            const res = await api.conversation.getDetailConversation({
               id: conversation?.idConversation as string,
               page: currentPageRef.current,
            });
            setMessages((prev) => [...prev, ...res.data.messages]);
         } catch (err) {
            console.error(err);
         }
      } else {
         setHasMore(false);
      }
   };

   const handleSendMsg = async () => {
      if (message.trim()) {
         socketRef.current?.emit("sendMessage", {
            idSender: idAuth,
            idReceiver: conversation.friend?._id,
            idConversation: conversation.idConversation,
            text: message.trim(),
         });
         try {
            const res = await api.message.createMessage({
               idConversation: conversation?.idConversation as string,
               sender: idAuth,
               text: message.trim(),
            });
            res.status === 200 && setMessages((prev) => [res.data, ...prev]);
         } catch (err) {
            console.error(err);
         }
         if (messageRef.current) {
            const inputField = messageRef.current.children[0] as HTMLInputElement;
            inputField.focus();
         }
         setMessage("");
      }
   };

   // Display floating ballon
   if (hide) {
      return (
         <Floating
            onClick={toggleHide}
            alt={conversation.friend?.fullName}
            src={conversation.friend?.avatar}
         />
      );
   }

   return (
      <>
         {!!conversation.idConversation && (
            <MyChatBox>
               {/* Heading */}
               <Heading>
                  <Link to={`/user/explore/${conversation.friend?._id}`} style={{ flex: 2 }}>
                     <Stack flexDirection="row" alignItems="center" gap={2}>
                        <Avatar
                           sx={{ width: 42, height: 42, objectFit: "center" }}
                           alt={conversation.friend?.fullName}
                           src={conversation.friend?.avatar}
                        />
                        <Typography component="span" textOverflow="ellipsis" width={100} flex={2}>
                           {conversation.friend?.fullName}
                        </Typography>
                     </Stack>
                  </Link>

                  <Stack flexDirection="row" alignItems="center">
                     <ListItem onClick={toggleHide}>
                        <RemoveIcon />
                     </ListItem>
                     <ListItem onClick={() => onClose(conversation.idConversation as string)}>
                        <CloseIcon />
                     </ListItem>
                  </Stack>
               </Heading>

               {/* Body */}
               <Body ref={bodyRef}>
                  {messages.length === 0 ? (
                     <Typography variant="body1" textAlign="center">
                        You don't have message. <br /> Let's chat together
                     </Typography>
                  ) : (
                     <InfiniteScroll
                        ref={ScrollRef}
                        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
                        inverse={true} //
                        height={400}
                        dataLength={messages.length}
                        hasMore={hasMore}
                        next={fetchMoreData}
                        loader={
                           <Typography variant="body2" textAlign="center">
                              Loading ...
                           </Typography>
                        }>
                        {messages.map((chat, index) => {
                           return (
                              <Stack
                                 key={index}
                                 flexDirection="row"
                                 justifyContent={idAuth === chat.sender ? "flex-end" : "flex-start"}
                                 p={1}>
                                 <Tooltip
                                    title={dateformat(chat.createdAt, "h:MM TT, dd mmmm yyyy ")}
                                    placement="left">
                                    <Typography
                                       variant="body1"
                                       component={chat.text.slice(0, 4) === "http" ? "a" : "p"}
                                       href={chat.text}
                                       target="_blank"
                                       className={
                                          idAuth === chat.sender
                                             ? "message"
                                             : "message message--friend"
                                       }>
                                       {chat.text}
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
                  <BaseInput
                     ref={messageRef}
                     value={message}
                     autoFocus
                     placeholder="Type a message..."
                     onChange={(e) => setMessage(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && handleSendMsg()}
                  />
                  <SendIcon id="send-icon" fontSize="large" onClick={handleSendMsg} />
               </Footer>
            </MyChatBox>
         )}
      </>
   );
};

export default memo(ChatBox);
