import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import { Avatar, Box, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ChatBoxWrapperProps } from "../../../../utils/interfaces/Chat";
import ChatForm from "./ChatForm";
import { Floating, Heading, MyChatBox } from "./styles";

const ChatBox = ({ conversation, onClose = () => {} }: ChatBoxWrapperProps) => {
   const [hide, setHide] = useState<boolean>(false);

   const toggleHide = () => setHide(!hide);

   // Display floating ballon
   if (hide) {
      return (
         <Tooltip title={conversation.friend?.fullName} arrow>
            <Floating
               onClick={toggleHide}
               alt={conversation.friend?.fullName}
               src={conversation.friend?.avatar}
            />
         </Tooltip>
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

               <ChatForm conversation={conversation} />
            </MyChatBox>
         )}
      </>
   );
};

export default memo(ChatBox);
