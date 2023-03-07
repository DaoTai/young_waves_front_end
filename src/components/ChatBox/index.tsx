import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Chip, ListItem, Stack, Typography } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import BaseInput from "../BaseInput";
import { Body, Floating, Footer, Heading, MyChatBox } from "./styles";
interface MyChatBoxProps {
   data?: Array<any>;
   visibility?: boolean;
   onClose?: () => void;
}

interface ISocket extends Socket {
   name?: string;
   // other additional attributes here, example:
   // surname?: string;
}

const chats = [
   {
      user: false,
      text: "Hello guy",
   },
   {
      user: true,
      text: "What's up man",
   },
];
const host = "http://localhost:8001";
const ChatBox = ({ visibility, data = chats, onClose = () => {} }: MyChatBoxProps) => {
   const bodyRef = useRef<HTMLDivElement>(null);
   const messageRef = useRef<HTMLDivElement>();
   const socketRef = useRef<Socket>();
   const [hide, setHide] = useState<boolean>(false);
   const [messages, setMessages] = useState(data ?? []);
   const [message, setMessage] = useState<string>("");
   const [id, setId] = useState<string>("");

   useEffect(() => {
      socketRef.current = io(host);
      socketRef.current.on("getId", (data) => {
         setId(data);
      });

      socketRef.current.on("sendDataServer", (dataGot) => {
         setMessages((oldMsgs) => [...oldMsgs, dataGot.data]);
      });
      return () => {
         socketRef.current?.disconnect();
      };
   }, []);

   useEffect(() => {
      bodyRef.current?.scrollTo(0, 9999);
   }, [messages]);

   const toggleHide = () => setHide(!hide);

   const handleSendMsg = () => {
      bodyRef.current?.scrollTo(0, 9999);
      if (message.trim()) {
         const newMsg = {
            id,
            text: message.trim(),
         };
         // setMessages((prev) => {
         //    return [...prev, newMsg];
         // });
         socketRef.current?.emit("sendDataClient", newMsg);
         setMessage("");
         if (messageRef.current) {
            const inputField = messageRef.current.children[0] as HTMLInputElement;
            inputField.focus();
         }
      }
   };

   return (
      <>
         {visibility && (
            <>
               {hide ? (
                  <Floating
                     onClick={toggleHide}
                     alt="Avatar"
                     src="https://blognhanpham.com/wp-content/uploads/2021/01/tommy-shelby-6.jpg"
                  />
               ) : (
                  <MyChatBox>
                     {/* Heading */}
                     <Heading>
                        <Link to="/">
                           <Stack flexDirection="row" alignItems="center" gap={2}>
                              <Avatar
                                 alt="Avatar"
                                 sx={{ width: 42, height: 42, objectFit: "center" }}
                                 src="https://blognhanpham.com/wp-content/uploads/2021/01/tommy-shelby-6.jpg"
                              />
                              <Typography component="span" textOverflow="ellipsis" width={100}>
                                 Dao Tai : {id}
                              </Typography>
                           </Stack>
                        </Link>

                        <Stack flexDirection="row" alignItems="center">
                           <ListItem onClick={toggleHide}>
                              <RemoveIcon />
                           </ListItem>
                           <ListItem onClick={onClose}>
                              <CloseIcon />
                           </ListItem>
                        </Stack>
                     </Heading>

                     {/* Body */}
                     <Body ref={bodyRef}>
                        {messages.map((chat, index) => {
                           return chat.id === id ? (
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
