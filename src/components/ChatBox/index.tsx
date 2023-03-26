import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Chip, ListItem, Stack, Typography } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import * as api from "../../apis";
import { authState$ } from "../../redux-saga/redux/selectors";
import { Profile } from "../../utils/interfaces/Profile";
import BaseInput from "../BaseInput";
import { Body, Floating, Footer, Heading, MyChatBox } from "./styles";
interface MyChatBoxProps {
   conversation: Partial<{ idConversation: string; friend: Partial<Profile> }>;
   visibility?: boolean;
   onClose?: (idConversation: string) => void;
}

interface ISocket extends Socket {
   name?: string;
   // other additional attributes here, example:
   // surname?: string;
}

interface Message {
   idConversation: string;
   sender: string;
   text: string;
}

const host = "http://localhost:8001";
const ChatBox = ({ conversation, onClose = (idConversation: string) => {} }: MyChatBoxProps) => {
   const { payload } = useSelector(authState$);
   const idUser = payload?.data?.user?._id;
   const bodyRef = useRef<HTMLDivElement>(null);
   const messageRef = useRef<HTMLDivElement>();
   const socketRef = useRef<Socket>();
   const [hide, setHide] = useState<boolean>(false);
   const [messages, setMessages] = useState<Message[]>([]);
   const [message, setMessage] = useState<string>("");

   // Work with socket
   useEffect(() => {
      socketRef.current = io(host);
      socketRef.current.emit("addUser", idUser);

      socketRef.current.on("getMessage", (dataGot) => {
         setMessages((oldMsgs) => [...oldMsgs, dataGot]);
      });
      return () => {
         socketRef.current?.disconnect();
      };
   }, []);

   // Call api to get messages
   useEffect(() => {
      conversation?.idConversation &&
         (async () => {
            try {
               const res = await api.conversation.getDetailConversation(
                  conversation?.idConversation as string
               );
               setMessages(res.data);
            } catch (err) {
               console.error(err);
            }
         })();
   }, [conversation]);

   // Scroll to bottom when send message
   useEffect(() => {
      bodyRef.current?.scrollTo(0, 9999);
   }, [messages]);

   const toggleHide = () => setHide(!hide);

   const handleSendMsg = async () => {
      if (message.trim()) {
         socketRef.current?.emit("sendMessage", {
            idSender: idUser,
            idReceiver: conversation.friend?._id,
            text: message.trim(),
         });
         try {
            const res = await api.message.createMessage({
               idConversation: conversation?.idConversation as string,
               sender: idUser,
               text: message.trim(),
            });
            res.status === 200 && setMessages((prev) => [...prev, res.data]);
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

   return (
      <>
         {!!conversation.idConversation && (
            <>
               {hide ? (
                  <Floating
                     onClick={toggleHide}
                     alt={conversation.friend?.fullName}
                     src={conversation.friend?.avatar}
                  />
               ) : (
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
                              <Typography
                                 component="span"
                                 textOverflow="ellipsis"
                                 width={100}
                                 flex={2}>
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
                        {messages.map((chat, index) => {
                           return chat.sender === idUser ? (
                              <Stack key={index} alignItems="flex-end" p={0.25}>
                                 <Chip
                                    label={chat.text}
                                    variant="outlined"
                                    sx={{ backgroundColor: "pink" }}
                                 />
                              </Stack>
                           ) : (
                              <Stack key={index} alignItems="flex-start" p={0.25}>
                                 <Chip label={chat.text} variant="outlined" />
                              </Stack>
                           );
                        })}
                     </Body>
                     {/* Footer */}
                     <Footer>
                        <BaseInput
                           ref={messageRef}
                           value={message}
                           placeholder="Type a message..."
                           onChange={(e) => setMessage(e.target.value)}
                           onKeyDown={(e) =>
                              (e.keyCode === 13 || e.key === "Enter") && handleSendMsg()
                           }
                        />
                        <SendIcon id="send-icon" fontSize="large" onClick={handleSendMsg} />
                     </Footer>
                  </MyChatBox>
               )}
            </>
         )}
      </>
   );
};

export default memo(ChatBox);
