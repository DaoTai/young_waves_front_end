import { Box, Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../../../../Contexts";
import { FormatConversation } from "../../../../utils/interfaces/Chat";
import ListData from "./Container";
const Conversations = ({ onClose }: { onClose: () => void }) => {
   const theme = useTheme();
   const navigate = useNavigate();
   const chatContext = useContext(ChatContext);
   const handleClickChatItem = (conversation: FormatConversation) => {
      chatContext?.handleShowChatBox(conversation);
      onClose();
   };

   const forwardToChatPage = () => {
      navigate("/user/chats");
      onClose();
   };
   return (
      <Box p={2} minWidth="360px" maxHeight="70vh" overflow="auto">
         {/* Heading */}
         <Box mb={1}>
            <Stack mb={1} flexDirection="row" alignItems="center" justifyContent="space-between">
               <Typography variant="h5" fontWeight={700}>
                  Chat
               </Typography>
               <Button
                  variant="outlined"
                  sx={{
                     color: theme.palette.text.primary,
                  }}
                  onClick={forwardToChatPage}>
                  Go to page chat
               </Button>
            </Stack>

            <Divider />
         </Box>

         <ListData onClickItem={handleClickChatItem} />
      </Box>
   );
};

export default Conversations;
