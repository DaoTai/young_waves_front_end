import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import {
   Avatar,
   Box,
   Chip,
   Input,
   ListItem,
   Paper,
   Stack,
   TextareaAutosize,
   TextField,
   Typography,
   useTheme,
} from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { authState$ } from "../../../../redux-saga/redux/selectors";
import * as api from "../../../../apis";
import { BaseInput } from "../../../../components";
import { Body, Floating, Footer, Heading, MyChatBox } from "./styles";
import { Profile } from "../../../../utils/interfaces/Profile";
interface MyChatBoxProps {
   conversation: Partial<{ idConversation: string; friend: Partial<Profile> }>;
   visibility?: boolean;
   onClose?: (idConversation: string) => void;
}

interface Message {
   idConversation?: string;
   sender: string;
   text: string;
}

const host = "http://localhost:8001";
const ChatBox = ({ conversation, onClose = (idConversation: string) => {} }: MyChatBoxProps) => {
   const theme = useTheme();
   const auth$ = useSelector(authState$);
   const idAuth = auth$.payload?.user?._id;
   const bodyRef = useRef<HTMLDivElement>(null);
   const messageRef = useRef<HTMLDivElement>();
   const socketRef = useRef<Socket>();
   const [hide, setHide] = useState<boolean>(false);
   const [messages, setMessages] = useState<Message[]>([]);
   const [message, setMessage] = useState<string>("");

   // Work with socket
   useEffect(() => {
      socketRef.current = io(host);
      socketRef.current.emit("addUser", idAuth, conversation.idConversation);
      socketRef.current.on("getMessage", (dataGot: { idSender: string; text: string }) => {
         const newMessage: Message = {
            sender: dataGot.idSender,
            text: dataGot.text,
         };
         setMessages((oldMsgs) => [...oldMsgs, newMessage]);
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
      // bodyRef.current?.scrollIntoView({ block: "end", inline: "nearest" });
      bodyRef.current?.scrollTo(0, 99999999);
      // bodyRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const toggleHide = () => setHide(!hide);

   const handleSendMsg = async () => {
      bodyRef.current?.scrollTo(0, 99999999);
      // bodyRef.current?.scrollIntoView({ block: "end", inline: "nearest" });
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
                        {messages.length === 0 ? (
                           <Typography variant="body1" textAlign="center">
                              You don't have message. <br /> Let's chat each other
                           </Typography>
                        ) : (
                           messages.map((chat, index) => {
                              return (
                                 <Stack
                                    key={index}
                                    flexDirection="row"
                                    justifyContent={
                                       idAuth === chat.sender ? "flex-end" : "flex-start"
                                    }
                                    p={1}>
                                    <Typography
                                       variant="body1"
                                       component={chat.text.slice(0, 4) === "http" ? "a" : "p"}
                                       href={chat.text}
                                       target="_blank"
                                       whiteSpace="pre-wrap"
                                       maxWidth="90%"
                                       borderRadius={4}
                                       p={1}
                                       sx={{
                                          wordBreak: "break-word",
                                          bgcolor:
                                             idAuth === chat.sender
                                                ? theme.palette.primary.main
                                                : theme.myColor.bgGray,
                                          "&[href^='http']": {
                                             textDecoration: "underline",
                                          },
                                       }}>
                                       {chat.text}
                                    </Typography>
                                 </Stack>
                              );
                           })
                        )}
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
