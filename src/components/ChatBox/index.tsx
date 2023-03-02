import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Chip, ListItem, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BaseInput from "../BaseInput";
import { Body, Floating, Footer, Heading, MyChatBox } from "./styles";
interface MyChatBoxProps {
   data?: Array<any>;
   visibility?: boolean;
   onClose?: () => void;
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

const ChatBox = ({ visibility, data = chats, onClose = () => {} }: MyChatBoxProps) => {
   const bodyRef = useRef<HTMLElement>(null);
   const messageRef = useRef<HTMLDivElement>();
   const [hide, setHide] = useState<boolean>(false);
   const [messages, setMessages] = useState(data ?? []);
   const [message, setMessage] = useState<string>("");

   useEffect(() => {
      bodyRef.current?.scrollTo(0, bodyRef.current?.scrollHeight);
   }, [message]);

   const toggleHide = () => setHide(!hide);

   const handleSendMsg = () => {
      if (message.trim()) {
         const newMsg = {
            user: true,
            text: message.trim(),
         };
         setMessages((prev) => {
            return [...prev, newMsg];
         });
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
                              <Typography component="span">Dao Tai</Typography>
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
                           return chat.user ? (
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
                              (e.which === 13 || e.key === "Enter") && handleSendMsg()
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

export default ChatBox;
