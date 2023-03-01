import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Chip, ListItem, Stack, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { BaseInput } from "../../../../components";
import { Body, Footer, Heading, MyChatBox } from "./styles";
interface MyChatBoxProps {
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

const ChatBox = ({ visibility, onClose }: MyChatBoxProps) => {
   const bodyRef = useRef<HTMLElement>(null);
   const messageRef = useRef<HTMLDivElement>();
   const [messages, setMessages] = useState(chats ?? []);
   const [message, setMessage] = useState<string>("");
   const handleSendMsg = () => {
      if (message.trim()) {
         setMessages((prev) => {
            return [
               ...prev,
               {
                  user: true,
                  text: message.trim(),
               },
            ];
         });
         setMessage("");
         // bodyRef.current?.scrollTo(0, bodyRef.current?.scrollHeight);
         bodyRef.current?.scrollTo(999, 9999);
         if (messageRef.current) {
            const inputField = messageRef.current.children[0] as HTMLInputElement;
            inputField.focus();
         }
      }
   };

   return (
      <>
         {
            <MyChatBox>
               {/* Heading */}
               <Heading>
                  <Stack flexDirection="row" alignItems="center" gap={2}>
                     <Avatar
                        alt="Avatar"
                        sx={{ width: 42, height: 42, objectFit: "center" }}
                        src="https://blognhanpham.com/wp-content/uploads/2021/01/tommy-shelby-6.jpg"
                     />
                     <Typography component="span">Dao Tai</Typography>
                  </Stack>

                  <Stack flexDirection="row" alignItems="center">
                     <ListItem>
                        <RemoveIcon />
                     </ListItem>
                     <ListItem>
                        <CloseIcon />
                     </ListItem>
                  </Stack>
               </Heading>

               {/* Body */}
               <Body ref={bodyRef}>
                  {messages.map((chat, index) => {
                     return chat.user ? (
                        <Stack key={index} alignItems="flex-end" p={1}>
                           <Chip
                              label={chat.text}
                              variant="outlined"
                              sx={{ backgroundColor: "pink" }}
                           />
                        </Stack>
                     ) : (
                        <Stack key={index} alignItems="flex-start" p={1}>
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
                     onKeyDown={(e) => (e.which === 13 || e.key === "Enter") && handleSendMsg()}
                  />
                  <SendIcon id="send-icon" fontSize="large" onClick={handleSendMsg} />
               </Footer>
            </MyChatBox>
         }
      </>
   );
};

export default ChatBox;
